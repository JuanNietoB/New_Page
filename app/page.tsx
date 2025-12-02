"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowRight, MapPin, TrendingUp, Zap, BarChart3, Globe } from "lucide-react"
import { useLanguage } from "@/components/language-provider"
import Image from "next/image"
import { HomepageProjectsTable } from "@/components/homepage-projects-table"
import { UsCompanyProjectsChart } from "@/components/us-company-projects-chart"

export default function HomePage() {
  const { t } = useLanguage()

  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="relative container mx-auto px-4 py-20 md:py-32 overflow-hidden">
        {/* Background Images */}
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 opacity-40 flex items-center justify-center">
            <div className="relative w-[60%] h-full">
              <Image src="/hero-map-bg.png" alt="" fill className="object-contain object-center" priority />
            </div>
          </div>
          {/* Gradient Overlay for better text readability */}
          <div className="absolute inset-0 bg-gradient-to-b from-background/70 via-background/80 to-background" />
        </div>

        {/* Hero Content */}
        <div className="relative z-10 mx-auto max-w-4xl text-center">
          <div className="mb-8 flex justify-center">
            <div className="relative w-full max-w-2xl h-64 md:h-80 rounded-xl overflow-hidden shadow-2xl border border-border/30">
              <Image
                src="/modern-battery-energy-storage-facility-with-solar-.jpg"
                alt="Battery Energy Storage and Renewable Energy Infrastructure"
                fill
                className="object-cover"
                priority
              />
            </div>
          </div>

          <h1 className="text-balance font-bold text-5xl md:text-6xl lg:text-7xl leading-tight mb-6">{t.heroTitle}</h1>
          <p className="text-pretty text-muted-foreground text-lg md:text-xl mb-8 leading-relaxed max-w-2xl mx-auto">
            {t.heroSubtitle}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/signup">
              <Button size="lg" className="text-base">
                {t.getStarted}
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
            <Link href="/pricing">
              <Button size="lg" variant="outline" className="text-base bg-transparent">
                {t.viewPricing}
              </Button>
            </Link>
          </div>
          <p className="text-sm text-muted-foreground mt-4">{t.freeTrialNote}</p>

          <div className="mt-12 max-w-6xl mx-auto">
            <HomepageProjectsTable />
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="bg-muted/50 py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-balance font-bold text-3xl md:text-4xl mb-4">{t.comprehensiveBESS}</h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">{t.comprehensiveBESSDesc}</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
            <Card>
              <CardHeader>
                <MapPin className="h-10 w-10 text-primary mb-2" />
                <CardTitle>{t.interactiveMapView}</CardTitle>
                <CardDescription>{t.interactiveMapViewDesc}</CardDescription>
              </CardHeader>
            </Card>

            <Card>
              <CardHeader>
                <TrendingUp className="h-10 w-10 text-primary mb-2" />
                <CardTitle>{t.growthAnalytics}</CardTitle>
                <CardDescription>{t.growthAnalyticsDesc}</CardDescription>
              </CardHeader>
            </Card>

            <Card>
              <CardHeader>
                <BarChart3 className="h-10 w-10 text-primary mb-2" />
                <CardTitle>{t.kpiTitle}</CardTitle>
                <CardDescription>{t.kpiDesc}</CardDescription>
              </CardHeader>
            </Card>

            <Card>
              <CardHeader>
                <Globe className="h-10 w-10 text-primary mb-2" />
                <CardTitle>{t.countryInsights}</CardTitle>
                <CardDescription>{t.countryInsightsDesc}</CardDescription>
              </CardHeader>
            </Card>

            <Card>
              <CardHeader>
                <Zap className="h-10 w-10 text-primary mb-2" />
                <CardTitle>{t.realTimeUpdates}</CardTitle>
                <CardDescription>{t.realTimeUpdatesDesc}</CardDescription>
              </CardHeader>
            </Card>
          </div>

          <div className="mt-16 max-w-6xl mx-auto space-y-8">
            {/* Existing images container */}
            <div className="relative w-full rounded-lg overflow-hidden border border-border/50 shadow-xl flex justify-between gap-4">
              <Image
                src="/dashnuevo-5.png"
                alt="Descripción de la imagen izquierda"
                width={757}
                height={505}
                className="w-[40%] h-auto object-cover"
              />
              <Image
                src="/dashnuevo-2.png"
                alt="BESS Intelligence Features"
                width={1509}
                height={757}
                className="w-[55%] h-auto"
              />
            </div>

            {/* Company Projects Chart */}
            <div className="w-full">
              <UsCompanyProjectsChart />
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="container mx-auto px-4 py-20">
        <div className="bg-primary text-primary-foreground rounded-2xl p-12 text-center max-w-4xl mx-auto">
          <h2 className="text-balance font-bold text-3xl md:text-4xl mb-4">{t.ctaTitle}</h2>
          <p className="text-pretty text-lg mb-8 opacity-90 max-w-2xl mx-auto">{t.ctaSubtitle}</p>
          <Link href="/signup">
            <Button size="lg" variant="secondary" className="text-base">
              {t.getStartedNow}
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </Link>
        </div>
      </section>
    </div>
  )
}
