import { redirect } from "next/navigation"
import { getCurrentUser } from "@/lib/auth"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"
import { CancelSubscriptionButton } from "@/components/cancel-subscription-button"
import { UpdatePaymentButton } from "@/components/update-payment-button"
import { SubscribeButton } from "@/components/subscribe-button"
import { BillingHistory } from "@/components/billing-history"
import { PaymentSuccessHandler } from "@/components/payment-success-handler"
import { VerifyPaymentButton } from "@/components/verify-payment-button"

export const dynamic = "force-dynamic"

export default async function AccountPage() {
  const user = await getCurrentUser()

  if (!user) {
    redirect("/signin")
  }

  const trialDaysRemaining =
    user.trialStartDate && user.tier === "free"
      ? Math.max(0, 30 - Math.floor((Date.now() - new Date(user.trialStartDate).getTime()) / (1000 * 60 * 60 * 24)))
      : 0

  return (
    <div className="container mx-auto px-4 py-12 max-w-4xl">
      <PaymentSuccessHandler />

      <h1 className="font-bold text-4xl mb-8">My Account</h1>

      <div className="grid gap-6">
        {/* Account Info */}
        <Card>
          <CardHeader>
            <CardTitle>Account Information</CardTitle>
            <CardDescription>Your profile and subscription details</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-muted-foreground mb-1">Name</p>
                <p className="font-medium">{user.name}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground mb-1">Email</p>
                <p className="font-medium">{user.email}</p>
              </div>
            </div>

            <div>
              <p className="text-sm text-muted-foreground mb-2">Current Plan</p>
              <div className="flex items-center gap-2">
                <Badge variant={user.tier === "pro" ? "default" : "secondary"} className="text-sm">
                  {user.tier === "pro" ? "Pro Plan" : "Free Trial"}
                </Badge>
                {user.tier === "free" && user.trialExpired && (
                  <Badge variant="destructive" className="text-sm">
                    Expired
                  </Badge>
                )}
              </div>
            </div>

            {user.tier === "free" && !user.trialExpired && (
              <div>
                <p className="text-sm text-muted-foreground mb-1">Trial Status</p>
                <p className="font-medium">{trialDaysRemaining} days remaining</p>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Upgrade Prompt */}
        {user.tier === "free" && (
          <Card className="border-primary">
            <CardHeader>
              <CardTitle>Upgrade to Pro</CardTitle>
              <CardDescription>
                Unlock the full power of EnergyStore with interactive maps, advanced KPIs, and complete Americas
                coverage
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="rounded-lg border p-4 bg-muted/50">
                  <div className="flex items-baseline gap-2 mb-2">
                    <span className="font-bold text-3xl">$0.06</span>
                    <span className="text-muted-foreground">MXN/month</span>
                  </div>
                  <ul className="space-y-2 text-sm text-muted-foreground mb-4">
                    <li>✓ Interactive Americas map</li>
                    <li>✓ Advanced KPIs and analytics</li>
                    <li>✓ Complete project database</li>
                    <li>✓ Priority support</li>
                  </ul>
                </div>
                <SubscribeButton />
                <div className="pt-4 border-t">
                  <p className="text-sm text-muted-foreground mb-3">
                    Just completed payment but not seeing Pro access?
                  </p>
                  <VerifyPaymentButton />
                </div>
                <Link href="/pricing">
                  <Button variant="outline" className="w-full bg-transparent">
                    View Full Pricing Details
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Subscription Management */}
        {user.tier === "pro" && (
          <Card>
            <CardHeader>
              <CardTitle>Subscription Management</CardTitle>
              <CardDescription>Manage your Pro subscription</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <p className="text-sm text-muted-foreground mb-1">Billing Cycle</p>
                <p className="font-medium">Monthly - $0.06 MXN/month</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground mb-1">Next Billing Date</p>
                <p className="font-medium">{new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toLocaleDateString()}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground mb-1">Payment Method</p>
                <p className="font-medium">•••• •••• •••• 4242</p>
              </div>
              <div className="flex gap-4 pt-4">
                <UpdatePaymentButton />
                <CancelSubscriptionButton />
              </div>
            </CardContent>
          </Card>
        )}

        {/* Billing History */}
        {user.tier === "pro" && <BillingHistory />}
      </div>
    </div>
  )
}
