import { headers } from "next/headers"
import { NextResponse } from "next/server"
import Stripe from "stripe"
import { createClient } from "@supabase/supabase-js"

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2024-12-18.acacia",
})

// Get webhook secret from Stripe dashboard
const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET!

const supabase = createClient(process.env.SUPABASE_URL!, process.env.SUPABASE_SERVICE_ROLE_KEY!)

export async function POST(req: Request) {
  try {
    const body = await req.text()
    const headersList = await headers()
    const signature = headersList.get("stripe-signature")!

    let event: Stripe.Event

    try {
      // Verify webhook signature
      event = stripe.webhooks.constructEvent(body, signature, webhookSecret)
      console.log("[v0] Webhook received:", event.type)
    } catch (err: any) {
      console.error("[v0] Webhook signature verification failed:", err.message)
      return NextResponse.json({ error: "Webhook signature verification failed" }, { status: 400 })
    }

    // Handle different event types
    switch (event.type) {
      case "customer.subscription.deleted":
        await handleSubscriptionDeleted(event.data.object as Stripe.Subscription)
        break

      case "customer.subscription.updated":
        await handleSubscriptionUpdated(event.data.object as Stripe.Subscription)
        break

      case "customer.subscription.created":
        await handleSubscriptionCreated(event.data.object as Stripe.Subscription)
        break

      case "invoice.payment_succeeded":
        await handlePaymentSucceeded(event.data.object as Stripe.Invoice)
        break

      case "invoice.payment_failed":
        await handlePaymentFailed(event.data.object as Stripe.Invoice)
        break

      default:
        console.log("[v0] Unhandled event type:", event.type)
    }

    return NextResponse.json({ received: true })
  } catch (error) {
    console.error("[v0] Webhook error:", error)
    return NextResponse.json({ error: "Webhook handler failed" }, { status: 500 })
  }
}

async function handleSubscriptionDeleted(subscription: Stripe.Subscription) {
  console.log("[v0] Subscription canceled:", subscription.id)

  const customerId = subscription.customer as string

  // Find user by Stripe customer ID
  const { data: profile } = await supabase
    .from("profiles")
    .select("id, email")
    .eq("stripe_customer_id", customerId)
    .single()

  if (!profile) {
    console.error("[v0] Profile not found for customer:", customerId)
    return
  }

  await supabase
    .from("profiles")
    .update({
      tier: "free",
      updated_at: new Date().toISOString(),
    })
    .eq("id", profile.id)

  await supabase
    .from("subscriptions")
    .update({
      status: "canceled",
      end_date: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    })
    .eq("stripe_subscription_id", subscription.id)

  console.log("[v0] User downgraded to free tier:", profile.email)
}

async function handleSubscriptionUpdated(subscription: Stripe.Subscription) {
  console.log("[v0] Subscription updated:", subscription.id, "Status:", subscription.status)

  const customerId = subscription.customer as string

  const { data: profile } = await supabase
    .from("profiles")
    .select("id, email")
    .eq("stripe_customer_id", customerId)
    .single()

  if (!profile) {
    console.error("[v0] Profile not found for customer:", customerId)
    return
  }

  await supabase
    .from("subscriptions")
    .update({
      status: subscription.status,
      updated_at: new Date().toISOString(),
    })
    .eq("stripe_subscription_id", subscription.id)

  if (subscription.status === "canceled" || subscription.status === "unpaid") {
    await supabase
      .from("profiles")
      .update({
        tier: "free",
        updated_at: new Date().toISOString(),
      })
      .eq("id", profile.id)

    console.log("[v0] User downgraded due to subscription status:", profile.email)
  }
}

async function handleSubscriptionCreated(subscription: Stripe.Subscription) {
  console.log("[v0] New subscription created:", subscription.id)

  const customerId = subscription.customer as string

  const { data: profile } = await supabase
    .from("profiles")
    .select("id, email")
    .eq("stripe_customer_id", customerId)
    .single()

  if (!profile) {
    console.error("[v0] Profile not found for customer:", customerId)
    return
  }

  await supabase
    .from("profiles")
    .update({
      tier: "pro",
      updated_at: new Date().toISOString(),
    })
    .eq("id", profile.id)

  await supabase.from("subscriptions").insert({
    user_id: profile.id,
    stripe_subscription_id: subscription.id,
    status: subscription.status,
    plan_type: "pro",
    start_date: new Date(subscription.created * 1000).toISOString(),
    amount: (subscription.items.data[0]?.price.unit_amount || 0) / 100,
  })

  console.log("[v0] User upgraded to pro:", profile.email)
}

async function handlePaymentSucceeded(invoice: Stripe.Invoice) {
  console.log("[v0] Payment succeeded:", invoice.id)

  const customerId = invoice.customer as string

  const { data: profile } = await supabase
    .from("profiles")
    .select("id, email")
    .eq("stripe_customer_id", customerId)
    .single()

  if (!profile) {
    console.error("[v0] Profile not found for customer:", customerId)
    return
  }

  await supabase.from("payment_history").insert({
    user_id: profile.id,
    stripe_payment_id: invoice.payment_intent as string,
    amount: (invoice.amount_paid || 0) / 100,
    status: "succeeded",
    payment_method: invoice.payment_intent ? "card" : "other",
  })

  console.log("[v0] Payment recorded for user:", profile.email)
}

async function handlePaymentFailed(invoice: Stripe.Invoice) {
  console.log("[v0] Payment failed:", invoice.id)

  const customerId = invoice.customer as string

  const { data: profile } = await supabase
    .from("profiles")
    .select("id, email")
    .eq("stripe_customer_id", customerId)
    .single()

  if (!profile) {
    console.error("[v0] Profile not found for customer:", customerId)
    return
  }

  await supabase.from("payment_history").insert({
    user_id: profile.id,
    stripe_payment_id: invoice.payment_intent as string,
    amount: (invoice.amount_due || 0) / 100,
    status: "failed",
    payment_method: "card",
  })

  console.log("[v0] Failed payment recorded for user:", profile.email)
}
