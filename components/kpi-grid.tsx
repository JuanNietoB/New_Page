'use client'

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { CountryStats } from '@/lib/mock-data'
import { TrendingUp, Target, Award, Zap } from 'lucide-react'
import { Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts'

interface KPIGridProps {
  stats: CountryStats[]
  kpis: {
    totalCapacity: number
    totalProjects: number
    averageGrowthRate: number
    countriesActive: number
    capacityUnderConstruction: number
    plannedCapacity: number
  }
}

export function KPIGrid({ stats, kpis }: KPIGridProps) {
  // Calculate additional KPIs
  const topGrowthCountry = stats.reduce((prev, current) => 
    prev.growthRate > current.growthRate ? prev : current
  )

  const largestMarket = stats.reduce((prev, current) => 
    prev.totalCapacity > current.totalCapacity ? prev : current
  )

  // Aggregate yearly data for trend
  const yearlyTotals = [2020, 2021, 2022, 2023].map(year => {
    const total = stats.reduce((sum, country) => {
      const yearData = country.yearlyData.find(d => d.year === year)
      return sum + (yearData?.capacity || 0)
    }, 0)
    return { year, capacity: total }
  })

  return (
    <div className="space-y-6">
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {/* Market Leader */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-base">
              <Award className="h-5 w-5 text-primary" />
              Market Leader
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="font-bold text-2xl mb-1">{largestMarket.country}</div>
            <p className="text-sm text-muted-foreground">
              {largestMarket.totalCapacity} MW total capacity
            </p>
          </CardContent>
        </Card>

        {/* Fastest Growing */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-base">
              <TrendingUp className="h-5 w-5 text-primary" />
              Fastest Growing
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="font-bold text-2xl mb-1">{topGrowthCountry.country}</div>
            <p className="text-sm text-muted-foreground">
              +{topGrowthCountry.growthRate}% year-over-year
            </p>
          </CardContent>
        </Card>

        {/* Pipeline Capacity */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-base">
              <Zap className="h-5 w-5 text-primary" />
              Pipeline Capacity
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="font-bold text-2xl mb-1">
              {kpis.capacityUnderConstruction + kpis.plannedCapacity} MW
            </div>
            <p className="text-sm text-muted-foreground">
              Under construction + planned
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Market Trend Chart */}
      <Card>
        <CardHeader>
          <CardTitle>Total Market Capacity Trend</CardTitle>
          <CardDescription>
            Combined capacity growth across all Americas markets
          </CardDescription>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={yearlyTotals}>
              <XAxis dataKey="year" />
              <YAxis />
              <Tooltip 
                formatter={(value: number) => [`${value} MW`, 'Capacity']}
                labelFormatter={(label) => `Year ${label}`}
              />
              <Line 
                type="monotone" 
                dataKey="capacity" 
                stroke="hsl(var(--primary))" 
                strokeWidth={3}
                dot={{ fill: 'hsl(var(--primary))', r: 6 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Market Concentration */}
      <Card>
        <CardHeader>
          <CardTitle>Market Insights</CardTitle>
          <CardDescription>Key metrics and market dynamics</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center justify-between pb-3 border-b">
              <span className="text-sm font-medium">Market Concentration</span>
              <span className="text-sm text-muted-foreground">
                Top 3 countries hold {
                  Math.round((stats.slice(0, 3).reduce((sum, c) => sum + c.totalCapacity, 0) / kpis.totalCapacity) * 100)
                }% of capacity
              </span>
            </div>
            <div className="flex items-center justify-between pb-3 border-b">
              <span className="text-sm font-medium">Average Project Size</span>
              <span className="text-sm text-muted-foreground">
                {Math.round(kpis.totalCapacity / kpis.totalProjects)} MW
              </span>
            </div>
            <div className="flex items-center justify-between pb-3 border-b">
              <span className="text-sm font-medium">Development Pipeline</span>
              <span className="text-sm text-muted-foreground">
                {Math.round(((kpis.capacityUnderConstruction + kpis.plannedCapacity) / kpis.totalCapacity) * 100)}% of current capacity
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium">Market Coverage</span>
              <span className="text-sm text-muted-foreground">
                {kpis.countriesActive} countries tracked
              </span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
