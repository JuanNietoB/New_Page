import { NextResponse } from "next/server"
import { createClient } from "@/lib/supabase/server"

export async function POST(req: Request) {
  try {
    const { sessionId } = await req.json()

    if (!sessionId) {
      return NextResponse.json({ error: "Session ID required" }, { status: 400 })
    }

    console.log("[v0] Checking checkout session completion:", sessionId)

    const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY!)

    const session = await stripe.checkout.sessions.retrieve(sessionId)

    console.log("[v0] Session status:", session.payment_status, "Customer:", session.customer)

    if (session.payment_status === "paid") {
      const supabase = await createClient()

      const {
        data: { user },
      } = await supabase.auth.getUser()

      if (!user) {
        return NextResponse.json({ error: "Not authenticated" }, { status: 401 })
      }

      const { error: updateError } = await supabase
        .from("profiles")
        .update({
          tier: "pro",
          stripe_customer_id: session.customer,
          updated_at: new Date().toISOString(),
        })
        .eq("id", user.id)

      if (updateError) {
        console.error("[v0] Error updating user:", updateError)
        return NextResponse.json({ error: "Failed to update user" }, { status: 500 })
      }

      console.log("[v0] User upgraded to pro via session completion:", user.email)

      return NextResponse.json({
        success: true,
        tier: "pro",
        message: "Successfully upgraded to Pro",
      })
    }

    return NextResponse.json({
      success: false,
      message: "Payment not completed yet",
    })
  } catch (error: any) {
    console.error("[v0] Session completion check error:", error)
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}
