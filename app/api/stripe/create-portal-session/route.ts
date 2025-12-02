import { NextResponse } from "next/server"
import { getCurrentUser } from "@/lib/auth"
import { stripe } from "@/lib/stripe"

export async function POST() {
  try {
    const user = await getCurrentUser()

    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    if (user.tier !== "pro") {
      return NextResponse.json({ error: "Only Pro users can access billing portal" }, { status: 400 })
    }

    let stripeCustomerId = user.stripeCustomerId

    if (!stripeCustomerId) {
      const customer = await stripe.customers.create({
        email: user.email,
        name: user.name,
        metadata: {
          supabase_user_id: user.id,
        },
      })

      stripeCustomerId = customer.id
      console.log("[v0] Created Stripe customer:", stripeCustomerId)
    }

    const subscriptions = await stripe.subscriptions.list({
      customer: stripeCustomerId,
      limit: 1,
    })

    if (subscriptions.data.length === 0) {
      console.log("[v0] No subscriptions found, creating test subscription...")

      // Get or create a test product and price
      let priceId: string

      try {
        // Try to find existing "Pro Plan" product
        const products = await stripe.products.list({
          active: true,
          limit: 100,
        })

        const proProduct = products.data.find(
          (p) => p.name === "Pro Plan" || p.name === "Premium" || p.metadata.plan === "pro",
        )

        if (proProduct) {
          // Get the first price for this product
          const prices = await stripe.prices.list({
            product: proProduct.id,
            active: true,
            limit: 1,
          })

          if (prices.data.length > 0) {
            priceId = prices.data[0].id
            console.log("[v0] Using existing price:", priceId)
          } else {
            throw new Error("No prices found for product")
          }
        } else {
          // Create a new product and price for testing
          const product = await stripe.products.create({
            name: "Pro Plan",
            description: "Professional plan with all features",
            metadata: {
              plan: "pro",
            },
          })

          const price = await stripe.prices.create({
            product: product.id,
            unit_amount: 100, // $1.00 MXN
            currency: "mxn",
            recurring: {
              interval: "month",
            },
          })

          priceId = price.id
          console.log("[v0] Created new product and price:", priceId)
        }

        // Create a test subscription for this customer
        const subscription = await stripe.subscriptions.create({
          customer: stripeCustomerId,
          items: [{ price: priceId }],
          trial_period_days: 365, // 1 year trial for testing
          metadata: {
            supabase_user_id: user.id,
            is_test_subscription: "true",
          },
        })

        console.log("[v0] Created test subscription:", subscription.id)
      } catch (productError) {
        console.error("[v0] Error creating test subscription:", productError)
        // Continue anyway - portal might still work
      }
    }

    try {
      const session = await stripe.billingPortal.sessions.create({
        customer: stripeCustomerId,
        return_url: `${process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000"}/account`,
      })

      console.log("[v0] Created portal session:", session.id)

      return NextResponse.json({
        url: session.url,
      })
    } catch (stripeError: any) {
      console.error("[v0] Stripe portal error:", stripeError)

      if (stripeError.code === "billing_portal_configuration_invalid") {
        return NextResponse.json(
          {
            error:
              "Stripe Customer Portal no está activado. Por favor, actívalo en tu dashboard de Stripe: https://dashboard.stripe.com/settings/billing/portal",
          },
          { status: 500 },
        )
      }

      return NextResponse.json({ error: "Failed to create billing portal session" }, { status: 500 })
    }
  } catch (error) {
    console.error("[v0] Create portal session error:", error)
    return NextResponse.json({ error: "Failed to create portal session" }, { status: 500 })
  }
}
