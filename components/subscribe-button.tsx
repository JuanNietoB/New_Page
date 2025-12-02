"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"

export function SubscribeButton() {
  const [loading, setLoading] = useState(false)

  const handleSubscribe = async () => {
    console.log("[v0] Subscribe button clicked")
    setLoading(true)

    try {
      console.log("[v0] Making request to /api/stripe/create-checkout-session")
      const response = await fetch("/api/stripe/create-checkout-session", {
        method: "POST",
      })

      console.log("[v0] Checkout response status:", response.status)
      console.log("[v0] Checkout response ok:", response.ok)

      if (!response.ok) {
        const errorData = await response.json()
        console.error("[v0] Checkout error:", errorData)
        throw new Error("Failed to create checkout session")
      }

      const { url } = await response.json()
      console.log("[v0] Redirecting to checkout URL:", url)

      if (url) {
        window.location.href = url
      }
    } catch (error) {
      console.error("[v0] Error:", error)
      alert("Failed to start checkout. Please try again.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <Button onClick={handleSubscribe} disabled={loading}>
      {loading ? "Loading..." : "Subscribe to Pro"}
    </Button>
  )
}
