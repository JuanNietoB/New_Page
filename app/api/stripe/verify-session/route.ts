import { NextResponse } from "next/server"
import { createServerClient } from "@supabase/ssr"
import { cookies } from "next/headers"
import Stripe from "stripe"

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2024-12-18.acacia",
})

export async function POST(request: Request) {
  try {
    const { sessionId } = await request.json()

    if (!sessionId) {
      return NextResponse.json({ error: "Session ID required" }, { status: 400 })
    }

    console.log("[v0] Verifying checkout session:", sessionId)

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

    // Retrieve the checkout session from Stripe
    const session = await stripe.checkout.sessions.retrieve(sessionId)

    console.log("[v0] Session status:", session.payment_status, "Mode:", session.mode)

    if (session.payment_status === "paid" && session.mode === "subscription") {
      // Get the subscription
      const subscriptionId = session.subscription as string
      const subscription = await stripe.subscriptions.retrieve(subscriptionId)

      console.log("[v0] Subscription retrieved:", subscription.id, "Status:", subscription.status)

      // Update user's profile to pro tier
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

      console.log("[v0] User upgraded to pro:", user.email)

      // Create subscription record
      const { error: subscriptionError } = await supabase.from("subscriptions").insert({
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

      // Create payment history record
      const { error: paymentError } = await supabase.from("payment_history").insert({
        user_id: user.id,
        stripe_payment_id: session.payment_intent as string,
        amount: (session.amount_total || 0) / 100,
        status: "succeeded",
        payment_method: "card",
      })

      if (paymentError) {
        console.error("[v0] Error creating payment record:", paymentError)
      }

      return NextResponse.json({ success: true, tier: "pro" })
    }

    return NextResponse.json({ success: false, message: "Payment not completed" })
  } catch (error) {
    console.error("[v0] Error verifying session:", error)
    return NextResponse.json({ error: "Failed to verify session" }, { status: 500 })
  }
}
