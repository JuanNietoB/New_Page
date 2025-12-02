"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Loader2, CheckCircle2 } from "lucide-react"
import { useRouter } from "next/navigation"

export function VerifyPaymentButton() {
  const [isVerifying, setIsVerifying] = useState(false)
  const [message, setMessage] = useState("")
  const router = useRouter()

  const handleVerify = async () => {
    setIsVerifying(true)
    setMessage("")

    try {
      console.log("[v0] Fetching latest checkout session from Stripe...")

      const response = await fetch("/api/stripe/verify-latest-payment", {
        method: "POST",
      })

      const data = await response.json()
      console.log("[v0] Verification result:", data)

      if (data.success) {
        setMessage("Payment verified! Redirecting to Pro dashboard...")
        setTimeout(() => {
          router.push("/dashboard/pro")
          router.refresh()
        }, 1500)
      } else {
        setMessage(data.message || "No recent payment found. Please try upgrading again.")
      }
    } catch (error) {
      console.error("[v0] Error verifying payment:", error)
      setMessage("Error verifying payment. Please contact support.")
    } finally {
      setIsVerifying(false)
    }
  }

  return (
    <div className="space-y-4">
      <Button onClick={handleVerify} disabled={isVerifying} className="w-full">
        {isVerifying ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            Checking payment status...
          </>
        ) : (
          <>
            <CheckCircle2 className="mr-2 h-4 w-4" />I just completed payment - Activate Pro
          </>
        )}
      </Button>
      {message && (
        <p className={`text-sm ${message.includes("verified") ? "text-green-600" : "text-muted-foreground"}`}>
          {message}
        </p>
      )}
    </div>
  )
}
