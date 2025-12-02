"use client"

import { useEffect, useState } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { Loader2, CheckCircle2 } from "lucide-react"

export function PaymentSuccessHandler() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [isProcessing, setIsProcessing] = useState(false)
  const [showSuccess, setShowSuccess] = useState(false)

  useEffect(() => {
    const handlePaymentSuccess = async () => {
      const success = searchParams.get("success")
      const sessionId = searchParams.get("session_id")

      console.log("[v0] PaymentSuccessHandler mounted")
      console.log("[v0] URL params - success:", success, "session_id:", sessionId)
      console.log("[v0] Full URL:", window.location.href)

      if (success === "true" && sessionId && !isProcessing) {
        setIsProcessing(true)
        console.log("[v0] Starting payment verification for session:", sessionId)

        try {
          const response = await fetch("/api/stripe/verify-session", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ sessionId }),
          })

          console.log("[v0] Verify session response status:", response.status)

          const data = await response.json()
          console.log("[v0] Verification response data:", data)

          if (data.success) {
            console.log("[v0] ✓ Payment verified successfully!")

            setShowSuccess(true)

            // Wait 2 seconds to show success message, then redirect
            setTimeout(() => {
              console.log("[v0] Redirecting to Pro dashboard...")
              router.push("/dashboard/pro")
            }, 2000)
          } else {
            console.error("[v0] ✗ Payment verification failed:", data.message || data.error)
            alert("Payment verification failed. Please contact support.")
            // Clean URL and stay on account page
            router.push("/account")
          }
        } catch (error) {
          console.error("[v0] ✗ Error verifying payment:", error)
          alert("Error processing payment. Please contact support.")
          router.push("/account")
        } finally {
          setIsProcessing(false)
        }
      }
    }

    handlePaymentSuccess()
  }, [searchParams, router, isProcessing])

  // Show success state
  if (showSuccess) {
    return (
      <div className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50 flex items-center justify-center">
        <div className="bg-card p-8 rounded-lg shadow-lg flex flex-col items-center gap-4 max-w-md">
          <div className="bg-green-100 rounded-full p-4">
            <CheckCircle2 className="h-12 w-12 text-green-600" />
          </div>
          <h2 className="text-2xl font-bold text-center">¡Pago realizado con éxito!</h2>
          <p className="text-center text-muted-foreground">Bienvenido a la versión Pro. Redirigiendo al dashboard...</p>
        </div>
      </div>
    )
  }

  // Show loading state while processing
  if (isProcessing) {
    return (
      <div className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50 flex items-center justify-center">
        <div className="bg-card p-6 rounded-lg shadow-lg flex flex-col items-center gap-4">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
          <p className="text-lg font-medium">Procesando tu pago...</p>
          <p className="text-sm text-muted-foreground">Por favor espera mientras actualizamos tu cuenta</p>
        </div>
      </div>
    )
  }

  return null
}
