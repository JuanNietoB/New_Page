import { NextResponse } from "next/server"
import { getCurrentUser } from "@/lib/auth"
import Stripe from "stripe"

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2024-11-20.acacia",
})

export async function GET() {
  try {
    const user = await getCurrentUser()

    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    console.log("[v0] Fetching invoices for user:", user.email)

    // Get or create Stripe customer
    const customers = await stripe.customers.list({
      email: user.email,
      limit: 1,
    })

    if (customers.data.length === 0) {
      console.log("[v0] No Stripe customer found")
      return NextResponse.json({ invoices: [] })
    }

    const customerId = customers.data[0].id
    console.log("[v0] Found customer:", customerId)

    // Get invoices for this customer
    const invoices = await stripe.invoices.list({
      customer: customerId,
      limit: 10,
    })

    console.log("[v0] Found", invoices.data.length, "invoices")

    // Format invoices for display
    const formattedInvoices = invoices.data.map((invoice) => ({
      id: invoice.id,
      amount: invoice.amount_paid / 100,
      currency: invoice.currency,
      date: invoice.created * 1000,
      status: invoice.status,
      description: invoice.lines.data[0]?.description || "Pro Plan - Monthly",
      pdfUrl: invoice.invoice_pdf,
    }))

    return NextResponse.json({ invoices: formattedInvoices })
  } catch (error) {
    console.error("[v0] Error fetching invoices:", error)
    return NextResponse.json({ error: "Failed to fetch invoices" }, { status: 500 })
  }
}
