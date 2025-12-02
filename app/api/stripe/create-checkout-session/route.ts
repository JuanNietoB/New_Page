import { NextResponse } from "next/server"
import { createServerClient } from "@supabase/ssr"
import { cookies } from "next/headers"
import Stripe from "stripe"
import { PRODUCTS } from "@/lib/products"

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2024-12-18.acacia",
})

export async function POST(request: Request) {
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

    const { planType = "monthly" } = await request.json().catch(() => ({}))

    const selectedProduct = PRODUCTS.find((p) => p.type === planType)
    if (!selectedProduct) {
      return NextResponse.json({ error: "Invalid plan type" }, { status: 400 })
    }

    console.log("[v0] Creating checkout session for user:", user.email, "Plan:", selectedProduct.name)

    const { data: profile } = await supabase.from("profiles").select("stripe_customer_id").eq("id", user.id).single()

    let customerId = profile?.stripe_customer_id

    if (!customerId) {
      const customer = await stripe.customers.create({
        email: user.email!,
        metadata: {
          supabase_user_id: user.id,
        },
      })
      customerId = customer.id
      console.log("[v0] Created Stripe customer:", customerId)

      await supabase.from("profiles").update({ stripe_customer_id: customerId }).eq("id", user.id)
    }

    const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || request.headers.get("origin") || "http://localhost:3000"

    console.log("[v0] Using base URL:", baseUrl)
    console.log("[v0] Product price:", selectedProduct.priceInCents, "centavos")

    const session = await stripe.checkout.sessions.create({
      customer: customerId,
      payment_method_types: ["card"],
      line_items: [
        {
          price_data: {
            currency: "mxn",
            product_data: {
              name: selectedProduct.name,
              description: selectedProduct.description,
            },
            unit_amount: selectedProduct.priceInCents,
            recurring: {
              interval: planType === "annual" ? "year" : "month",
            },
          },
          quantity: 1,
        },
      ],
      mode: "subscription",
      success_url: `${baseUrl}/account?success=true&session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${baseUrl}/account?canceled=true`,
      metadata: {
        supabase_user_id: user.id,
        plan_type: planType,
      },
    })

    console.log("[v0] Checkout session created:", session.id)
    console.log("[v0] Success URL:", `${baseUrl}/account?success=true&session_id={CHECKOUT_SESSION_ID}`)

    return NextResponse.json({ url: session.url })
  } catch (error) {
    console.error("[v0] Error creating checkout session:", error)
    return NextResponse.json({ error: "Failed to create checkout session" }, { status: 500 })
  }
}
