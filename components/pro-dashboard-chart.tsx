'use client'

import { Bar, BarChart, CartesianGrid, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from 'recharts'
import { ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart'
import { CountryStats } from '@/lib/mock-data'

interface ProDashboardChartProps {
  data: CountryStats[]
}

export function ProDashboardChart({ data }: ProDashboardChartProps) {
  // Transform data for the chart
  const years = [2020, 2021, 2022, 2023]
  
  const chartData = years.map(year => {
    const dataPoint: Record<string, number | string> = { year: year.toString() }
    data.forEach(country => {
      const yearData = country.yearlyData.find(d => d.year === year)
      if (yearData) {
        dataPoint[country.country] = yearData.capacity
      }
    })
    return dataPoint
  })

  const countryColors: Record<string, string> = {
    'United States': '#3b82f6', // Blue
    'Brazil': '#10b981', // Green
    'Canada': '#f59e0b', // Amber
    'Mexico': '#ef4444', // Red
    'Chile': '#8b5cf6', // Purple
    'Argentina': '#06b6d4', // Cyan
    'Peru': '#ec4899', // Pink
  }

  return (
    <ChartContainer
      config={{
        'United States': {
          label: 'United States',
          color: countryColors['United States'],
        },
        Brazil: {
          label: 'Brazil',
          color: countryColors['Brazil'],
        },
        Canada: {
          label: 'Canada',
          color: countryColors['Canada'],
        },
        Mexico: {
          label: 'Mexico',
          color: countryColors['Mexico'],
        },
        Chile: {
          label: 'Chile',
          color: countryColors['Chile'],
        },
        Argentina: {
          label: 'Argentina',
          color: countryColors['Argentina'],
        },
        Peru: {
          label: 'Peru',
          color: countryColors['Peru'],
        },
      }}
      className="h-[400px]"
    >
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={chartData}>
          <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
          <XAxis 
            dataKey="year" 
            className="text-sm"
          />
          <YAxis 
            className="text-sm"
            label={{ value: 'Capacity (MW)', angle: -90, position: 'insideLeft' }}
          />
          <ChartTooltip content={<ChartTooltipContent />} />
          <Legend />
          {data.map((country) => (
            <Bar 
              key={country.country}
              dataKey={country.country}
              fill={countryColors[country.country] || '#6b7280'}
              name={country.country}
            />
          ))}
        </BarChart>
      </ResponsiveContainer>
    </ChartContainer>
  )
}
