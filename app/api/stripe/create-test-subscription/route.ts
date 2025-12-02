import { NextResponse } from "next/server"
import { createClient } from "@/lib/supabase/server"
import Stripe from "stripe"

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2024-12-18.acacia",
})

export async function POST(req: Request) {
  try {
    const supabase = await createClient()
    const {
      data: { user },
    } = await supabase.auth.getUser()

    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    console.log("[v0] Creating test subscription for user:", user.email)

    // Get or create customer
    let customerId: string

    const { data: profile } = await supabase.from("profiles").select("email, full_name").eq("id", user.id).single()

    const customers = await stripe.customers.list({
      email: user.email!,
      limit: 1,
    })

    if (customers.data.length > 0) {
      customerId = customers.data[0].id
      console.log("[v0] Found existing customer:", customerId)
    } else {
      const customer = await stripe.customers.create({
        email: user.email!,
        name: profile?.full_name || user.email!,
        metadata: {
          supabase_user_id: user.id,
        },
      })
      customerId = customer.id
      console.log("[v0] Created new customer:", customerId)
    }

    // Create or get a test price (you need to create this in Stripe first)
    const prices = await stripe.prices.list({
      active: true,
      limit: 1,
    })

    if (prices.data.length === 0) {
      return NextResponse.json(
        {
          error: "No products found. Please create a product in Stripe first.",
          setupRequired: true,
        },
        { status: 400 },
      )
    }

    const priceId = prices.data[0].id
    console.log("[v0] Using price:", priceId)

    // Create subscription
    const subscription = await stripe.subscriptions.create({
      customer: customerId,
      items: [{ price: priceId }],
      payment_behavior: "default_incomplete",
      payment_settings: { save_default_payment_method: "on_subscription" },
      expand: ["latest_invoice.payment_intent"],
    })

    console.log("[v0] Created subscription:", subscription.id)

    // Update database
    await supabase.from("subscriptions").upsert({
      user_id: user.id,
      stripe_subscription_id: subscription.id,
      status: subscription.status,
      current_period_start: new Date(subscription.current_period_start * 1000).toISOString(),
      current_period_end: new Date(subscription.current_period_end * 1000).toISOString(),
      cancel_at_period_end: subscription.cancel_at_period_end,
    })

    return NextResponse.json({
      subscriptionId: subscription.id,
      clientSecret: (subscription.latest_invoice as Stripe.Invoice).payment_intent as any,
    })
  } catch (error: any) {
    console.error("[v0] Error creating test subscription:", error)
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}
