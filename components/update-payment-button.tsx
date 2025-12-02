"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { ExternalLink } from "lucide-react"

export function UpdatePaymentButton() {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")

  const handleUpdatePayment = async () => {
    console.log("[v0] Update Payment button clicked")
    setError("")
    setLoading(true)

    try {
      console.log("[v0] Making request to /api/stripe/create-portal-session")
      const response = await fetch("/api/stripe/create-portal-session", {
        method: "POST",
      })

      const data = await response.json()

      console.log("[v0] Portal response status:", response.status)
      console.log("[v0] Portal response ok:", response.ok)
      console.log("[v0] Portal response data:", data)

      if (!response.ok) {
        console.log("[v0] Error response:", data)
        setError(data.error || "Failed to open billing portal")
        setLoading(false)
        return
      }

      if (data.url) {
        console.log("[v0] Redirecting to portal URL:", data.url)
        window.location.href = data.url
      } else {
        console.log("[v0] No URL in response:", data)
        setError("No portal URL received")
        setLoading(false)
      }
    } catch (err) {
      console.error("[v0] Update payment error:", err)
      setError("An error occurred. Please try again.")
      setLoading(false)
    }
  }

  return (
    <div className="space-y-2">
      <Button variant="outline" onClick={handleUpdatePayment} disabled={loading}>
        {loading ? "Loading..." : "Update Payment Method"}
      </Button>
      {error && (
        <Alert variant="destructive">
          <AlertDescription className="space-y-2">
            <p>{error}</p>
            {error.includes("dashboard.stripe.com") && (
              <a
                href="https://dashboard.stripe.com/settings/billing/portal"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 text-sm underline hover:no-underline"
              >
                Ir al Dashboard de Stripe <ExternalLink className="h-3 w-3" />
              </a>
            )}
          </AlertDescription>
        </Alert>
      )}
    </div>
  )
}
