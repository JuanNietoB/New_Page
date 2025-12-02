"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Download } from "lucide-react"

interface Invoice {
  id: string
  amount: number
  currency: string
  date: number
  status: string
  description: string
  pdfUrl: string | null
}

export function BillingHistory() {
  const [invoices, setInvoices] = useState<Invoice[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchInvoices = async () => {
      try {
        console.log("[v0] Fetching invoices...")
        const response = await fetch("/api/stripe/get-invoices")
        const data = await response.json()
        console.log("[v0] Invoices data:", data)
        setInvoices(data.invoices || [])
      } catch (error) {
        console.error("[v0] Error fetching invoices:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchInvoices()
  }, [])

  const handleDownload = async (invoiceId: string) => {
    console.log("[v0] Downloading invoice:", invoiceId)
    try {
      window.open(`/api/stripe/download-invoice?invoiceId=${invoiceId}`, "_blank")
    } catch (error) {
      console.error("[v0] Error downloading invoice:", error)
    }
  }

  if (loading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Billing History</CardTitle>
          <CardDescription>View your past invoices and payments</CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground">Loading invoices...</p>
        </CardContent>
      </Card>
    )
  }

  if (invoices.length === 0) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Billing History</CardTitle>
          <CardDescription>View your past invoices and payments</CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground">No invoices found</p>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Billing History</CardTitle>
        <CardDescription>View your past invoices and payments</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {invoices.map((invoice) => (
            <div key={invoice.id} className="flex items-center justify-between py-3 border-b last:border-0">
              <div>
                <p className="font-medium">{invoice.description}</p>
                <p className="text-sm text-muted-foreground">{new Date(invoice.date).toLocaleDateString()}</p>
              </div>
              <div className="flex items-center gap-4">
                <p className="font-medium">${invoice.amount.toFixed(2)}</p>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleDownload(invoice.id)}
                  disabled={!invoice.pdfUrl}
                >
                  <Download className="w-4 h-4 mr-2" />
                  Download
                </Button>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
