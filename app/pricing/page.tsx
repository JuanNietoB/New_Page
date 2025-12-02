"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Check, X } from "lucide-react"
import { useLanguage } from "@/components/language-provider"

export default function PricingPage() {
  const { t } = useLanguage()

  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="container mx-auto px-4 py-12 md:py-20">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-balance font-bold text-3xl md:text-5xl lg:text-6xl mb-4 md:mb-6">{t.simplePricing}</h1>
          <p className="text-pretty text-muted-foreground text-base md:text-lg lg:text-xl leading-relaxed">
            {t.pricingSubtitle}
          </p>
        </div>
      </section>

      {/* Pricing Cards */}
      <section className="container mx-auto px-4 pb-12 md:pb-20">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 max-w-5xl mx-auto">
          {/* Free Trial */}
          <Card className="relative">
            <CardHeader>
              <CardTitle className="text-xl md:text-2xl">{t.freeTrialTitle}</CardTitle>
              <CardDescription>{t.freeTrialDesc}</CardDescription>
              <div className="mt-4">
                <span className="font-bold text-3xl md:text-4xl">$0</span>
                <span className="text-muted-foreground text-sm md:text-base">{t.perMonth}</span>
              </div>
              <p className="text-sm text-muted-foreground mt-2">{t.daysFreeTrial}</p>
            </CardHeader>
            <CardContent className="space-y-4">
              <Link href="/signup" className="block">
                <Button className="w-full bg-transparent" variant="outline">
                  {t.startFreeTrialBtn}
                </Button>
              </Link>

              <div className="space-y-3 pt-4">
                <div className="flex items-start gap-3">
                  <Check className="h-4 w-4 md:h-5 md:w-5 text-primary mt-0.5 flex-shrink-0" />
                  <span className="text-sm">{t.basicDashboard}</span>
                </div>
                <div className="flex items-start gap-3">
                  <Check className="h-4 w-4 md:h-5 md:w-5 text-primary mt-0.5 flex-shrink-0" />
                  <span className="text-sm">{t.limitedCountry}</span>
                </div>
                <div className="flex items-start gap-3">
                  <Check className="h-4 w-4 md:h-5 md:w-5 text-primary mt-0.5 flex-shrink-0" />
                  <span className="text-sm">{t.basicCharts}</span>
                </div>
                <div className="flex items-start gap-3">
                  <X className="h-4 w-4 md:h-5 md:w-5 text-muted-foreground mt-0.5 flex-shrink-0" />
                  <span className="text-sm text-muted-foreground">{t.interactiveMap}</span>
                </div>
                <div className="flex items-start gap-3">
                  <X className="h-4 w-4 md:h-5 md:w-5 text-muted-foreground mt-0.5 flex-shrink-0" />
                  <span className="text-sm text-muted-foreground">{t.advancedKPIs}</span>
                </div>
                <div className="flex items-start gap-3">
                  <X className="h-4 w-4 md:h-5 md:w-5 text-muted-foreground mt-0.5 flex-shrink-0" />
                  <span className="text-sm text-muted-foreground">{t.dataExport}</span>
                </div>
              </div>

              <p className="text-xs text-muted-foreground pt-2">{t.notAvailableEmail}</p>
            </CardContent>
          </Card>

          {/* Pro Plan */}
          <Card className="relative border-primary shadow-lg">
            <div className="absolute -top-3 md:-top-4 left-1/2 -translate-x-1/2">
              <span className="bg-primary text-primary-foreground px-3 md:px-4 py-1 rounded-full text-xs md:text-sm font-semibold">
                {t.mostPopular}
              </span>
            </div>
            <CardHeader className="pt-8">
              <CardTitle className="text-xl md:text-2xl">{t.proPlanTitle}</CardTitle>
              <CardDescription>{t.proPlanDesc}</CardDescription>
              <div className="mt-4">
                <span className="font-bold text-3xl md:text-4xl">$500</span>
                <span className="text-muted-foreground text-sm md:text-base">{t.perMonth}</span>
              </div>
              <p className="text-sm text-primary mt-2">{t.orAnnual}</p>
            </CardHeader>
            <CardContent className="space-y-4">
              <Link href="/upgrade" className="block">
                <Button className="w-full">{t.upgradeNow}</Button>
              </Link>

              <div className="space-y-3 pt-4">
                <div className="flex items-start gap-3">
                  <Check className="h-4 w-4 md:h-5 md:w-5 text-primary mt-0.5 flex-shrink-0" />
                  <span className="text-sm font-medium">{t.everythingInFree}</span>
                </div>
                <div className="flex items-start gap-3">
                  <Check className="h-4 w-4 md:h-5 md:w-5 text-primary mt-0.5 flex-shrink-0" />
                  <span className="text-sm">{t.interactiveMapAll}</span>
                </div>
                <div className="flex items-start gap-3">
                  <Check className="h-4 w-4 md:h-5 md:w-5 text-primary mt-0.5 flex-shrink-0" />
                  <span className="text-sm">{t.completeCountry}</span>
                </div>
                <div className="flex items-start gap-3">
                  <Check className="h-4 w-4 md:h-5 md:w-5 text-primary mt-0.5 flex-shrink-0" />
                  <span className="text-sm">{t.advancedBarCharts}</span>
                </div>
                <div className="flex items-start gap-3">
                  <Check className="h-4 w-4 md:h-5 md:w-5 text-primary mt-0.5 flex-shrink-0" />
                  <span className="text-sm">{t.comprehensiveKPIs}</span>
                </div>
                <div className="flex items-start gap-3">
                  <Check className="h-4 w-4 md:h-5 md:w-5 text-primary mt-0.5 flex-shrink-0" />
                  <span className="text-sm">{t.exportData}</span>
                </div>
                <div className="flex items-start gap-3">
                  <Check className="h-4 w-4 md:h-5 md:w-5 text-primary mt-0.5 flex-shrink-0" />
                  <span className="text-sm">{t.prioritySupport}</span>
                </div>
                <div className="flex items-start gap-3">
                  <Check className="h-4 w-4 md:h-5 md:w-5 text-primary mt-0.5 flex-shrink-0" />
                  <span className="text-sm">{t.apiAccess}</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="bg-muted/50 py-12 md:py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-balance font-bold text-2xl md:text-3xl lg:text-4xl mb-8 md:mb-12 text-center">
              {t.faqTitle}
            </h2>

            <div className="space-y-6">
              <div>
                <h3 className="font-semibold text-base md:text-lg mb-2">{t.cancelAnytime}</h3>
                <p className="text-sm md:text-base text-muted-foreground leading-relaxed">{t.cancelAnswer}</p>
              </div>

              <div>
                <h3 className="font-semibold text-base md:text-lg mb-2">{t.paymentMethods}</h3>
                <p className="text-sm md:text-base text-muted-foreground leading-relaxed">{t.paymentAnswer}</p>
              </div>

              <div>
                <h3 className="font-semibold text-base md:text-lg mb-2">{t.annualDiscount}</h3>
                <p className="text-sm md:text-base text-muted-foreground leading-relaxed">{t.annualAnswer}</p>
              </div>

              <div>
                <h3 className="font-semibold text-base md:text-lg mb-2">{t.enterprisePlans}</h3>
                <p className="text-sm md:text-base text-muted-foreground leading-relaxed">{t.enterpriseAnswer}</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
