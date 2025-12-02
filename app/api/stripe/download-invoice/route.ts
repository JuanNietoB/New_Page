import { type NextRequest, NextResponse } from "next/server"
import { getCurrentUser } from "@/lib/auth"
import Stripe from "stripe"

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2024-11-20.acacia",
})

export async function GET(request: NextRequest) {
  try {
    const user = await getCurrentUser()

    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const searchParams = request.nextUrl.searchParams
    const invoiceId = searchParams.get("invoiceId")

    if (!invoiceId) {
      return NextResponse.json({ error: "Invoice ID required" }, { status: 400 })
    }

    console.log("[v0] Fetching invoice:", invoiceId)

    // Get the invoice from Stripe
    const invoice = await stripe.invoices.retrieve(invoiceId)

    if (!invoice.invoice_pdf) {
      return NextResponse.json({ error: "Invoice PDF not available" }, { status: 404 })
    }

    console.log("[v0] Invoice PDF URL:", invoice.invoice_pdf)

    // Redirect to the Stripe-hosted PDF
    return NextResponse.redirect(invoice.invoice_pdf)
  } catch (error) {
    console.error("[v0] Error downloading invoice:", error)
    return NextResponse.json({ error: "Failed to download invoice" }, { status: 500 })
  }
}
