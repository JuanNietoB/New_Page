import { NextResponse } from "next/server"
import { createServerClient } from "@supabase/ssr"
import { cookies } from "next/headers"
import Stripe from "stripe"

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2024-12-18.acacia",
})

export async function POST() {
  try {
    const cookieStore = await cookies()
    const supabase = createServerClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.SUPABASE_ANON_KEY!, {
      cookies: {
        getAll: () => cookieStore.getAll(),
        setAll: (cookies) => {
          cookies.forEach(({ name, value, options }) => {
            cookieStore.set(name, value, options)
          })
        },
      },
    })

    const {
      data: { user },
    } = await supabase.auth.getUser()

    if (!user) {
      return NextResponse.json({ error: "Not authenticated" }, { status: 401 })
    }

    console.log("[v0] Checking for recent payments for user:", user.email)

    // Get user's stripe customer ID
    const { data: profile } = await supabase
      .from("profiles")
      .select("stripe_customer_id, tier")
      .eq("id", user.id)
      .single()

    if (!profile?.stripe_customer_id) {
      return NextResponse.json({ success: false, message: "No Stripe customer found" })
    }

    // Check if already pro
    if (profile.tier === "pro") {
      return NextResponse.json({ success: true, message: "Already a Pro member" })
    }

    console.log("[v0] Fetching checkout sessions for customer:", profile.stripe_customer_id)

    // Get recent checkout sessions for this customer
    const sessions = await stripe.checkout.sessions.list({
      customer: profile.stripe_customer_id,
      limit: 10,
    })

    console.log("[v0] Found", sessions.data.length, "sessions")

    // Find the most recent successful payment
    const successfulSession = sessions.data.find(
      (session) => session.payment_status === "paid" && session.mode === "subscription",
    )

    if (!successfulSession) {
      return NextResponse.json({
        success: false,
        message: "No successful payment found. Please complete checkout first.",
      })
    }

    console.log("[v0] Found successful session:", successfulSession.id)

    // Get the subscription
    const subscriptionId = successfulSession.subscription as string
    const subscription = await stripe.subscriptions.retrieve(subscriptionId)

    console.log("[v0] Subscription status:", subscription.status)

    // Update user to pro tier
    const { error: profileError } = await supabase
      .from("profiles")
      .update({
        tier: "pro",
        updated_at: new Date().toISOString(),
      })
      .eq("id", user.id)

    if (profileError) {
      console.error("[v0] Error updating profile:", profileError)
      return NextResponse.json({ error: "Failed to update profile" }, { status: 500 })
    }

    console.log("[v0] ✓ User upgraded to pro:", user.email)

    // Create or update subscription record
    const { error: subscriptionError } = await supabase.from("subscriptions").upsert({
      user_id: user.id,
      stripe_subscription_id: subscription.id,
      status: subscription.status,
      plan_type: "pro",
      start_date: new Date(subscription.created * 1000).toISOString(),
      amount: (subscription.items.data[0]?.price.unit_amount || 0) / 100,
    })

    if (subscriptionError) {
      console.error("[v0] Error creating subscription record:", subscriptionError)
    }

    // Create payment history record if it doesn't exist
    const { error: paymentError } = await supabase.from("payment_history").upsert({
      user_id: user.id,
      stripe_payment_id: successfulSession.payment_intent as string,
      amount: (successfulSession.amount_total || 0) / 100,
      status: "succeeded",
      payment_method: "card",
    })

    if (paymentError) {
      console.error("[v0] Error creating payment record:", paymentError)
    }

    return NextResponse.json({ success: true, tier: "pro" })
  } catch (error) {
    console.error("[v0] Error verifying latest payment:", error)
    return NextResponse.json({ error: "Failed to verify payment" }, { status: 500 })
  }
}
