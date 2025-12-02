"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Check } from "lucide-react"
import { useAuth } from "@/components/auth-provider"
import { Checkout } from "@/components/checkout"
import { PRODUCTS } from "@/lib/products"

export default function UpgradePage() {
  const [selectedProduct, setSelectedProduct] = useState("pro-monthly")
  const router = useRouter()
  const { user } = useAuth()

  const monthlyProduct = PRODUCTS.find((p) => p.id === "pro-monthly")!
  const annualProduct = PRODUCTS.find((p) => p.id === "pro-annual")!

  if (!user) {
    return (
      <div className="container mx-auto px-4 py-12 max-w-4xl">
        <Alert>
          <AlertDescription>Please sign in(Start Free Trial) to upgrade your account.</AlertDescription>
        </Alert>
      </div>
    )
  }

  if (user.tier === "pro") {
    return (
      <div className="container mx-auto px-4 py-12 max-w-4xl">
        <Alert>
          <AlertDescription>
            You are already a Pro member! Visit your dashboard to access all features.
          </AlertDescription>
        </Alert>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-balance font-bold text-4xl md:text-5xl mb-4">Upgrade to Pro</h1>
          <p className="text-muted-foreground text-lg">Unlock the full power of EnergyStore analytics</p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Plan Selection */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Choose Your Plan</CardTitle>
                <CardDescription>Select monthly or annual billing</CardDescription>
              </CardHeader>
              <CardContent>
                <RadioGroup value={selectedProduct} onValueChange={setSelectedProduct}>
                  <div className="space-y-3">
                    <div
                      className={`flex items-center space-x-3 border rounded-lg p-4 cursor-pointer transition-colors ${
                        selectedProduct === "pro-monthly"
                          ? "border-primary bg-primary/5"
                          : "hover:border-muted-foreground/50"
                      }`}
                    >
                      <RadioGroupItem value="pro-monthly" id="monthly" />
                      <Label htmlFor="monthly" className="flex-1 cursor-pointer">
                        <div className="flex items-center justify-between">
                          <div>
                            <div className="font-semibold">Monthly</div>
                            <div className="text-sm text-muted-foreground">Billed monthly</div>
                          </div>
                          <div className="font-bold text-xl">${monthlyProduct.priceInCents / 100}</div>
                        </div>
                      </Label>
                    </div>

                    <div
                      className={`flex items-center space-x-3 border rounded-lg p-4 cursor-pointer transition-colors ${
                        selectedProduct === "pro-annual"
                          ? "border-primary bg-primary/5"
                          : "hover:border-muted-foreground/50"
                      }`}
                    >
                      <RadioGroupItem value="pro-annual" id="annual" />
                      <Label htmlFor="annual" className="flex-1 cursor-pointer">
                        <div className="flex items-center justify-between">
                          <div>
                            <div className="flex items-center gap-2">
                              <span className="font-semibold">Annual</span>
                              <span className="bg-primary text-primary-foreground text-xs px-2 py-0.5 rounded-full">
                                Save 20%
                              </span>
                            </div>
                            <div className="text-sm text-muted-foreground">Billed annually</div>
                          </div>
                          <div>
                            <div className="font-bold text-xl">${annualProduct.priceInCents / 100}</div>
                            <div className="text-xs text-muted-foreground text-right">
                              ${Math.round(annualProduct.priceInCents / 12 / 100)}/mo
                            </div>
                          </div>
                        </div>
                      </Label>
                    </div>
                  </div>
                </RadioGroup>
              </CardContent>
            </Card>

            {/* What's Included */}
            <Card>
              <CardHeader>
                <CardTitle>What's Included</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {PRODUCTS.find((p) => p.id === selectedProduct)?.features.map((feature, index) => (
                    <div key={index} className="flex items-start gap-3">
                      <Check className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                      <span className="text-sm">{feature}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Stripe Checkout */}
          <div>
            <Checkout key={selectedProduct} productId={selectedProduct} />
          </div>
        </div>
      </div>
    </div>
  )
}
