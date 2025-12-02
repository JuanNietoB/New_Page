"use client"

import { useMemo } from "react"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, ResponsiveContainer, Cell } from "recharts"
import { mockProjects } from "@/lib/mock-data"

export function CompanyProjectsChart() {
  const chartData = useMemo(() => {
    // Filter US projects only
    const usProjects = mockProjects.filter((p) => p.pais === "United States")

    // Count projects by company
    const companyCounts = usProjects.reduce(
      (acc, project) => {
        acc[project.empresa] = (acc[project.empresa] || 0) + 1
        return acc
      },
      {} as Record<string, number>,
    )

    // Convert to array and sort by count (descending)
    const sortedData = Object.entries(companyCounts)
      .map(([empresa, count]) => ({ empresa, count }))
      .sort((a, b) => b.count - a.count)
      .slice(0, 15) // Top 15 companies

    return sortedData
  }, [])

  // Generate gradient colors from blue to green
  const getBarColor = (index: number, total: number) => {
    const ratio = index / (total - 1)
    // Blue to cyan to green gradient
    if (ratio < 0.5) {
      // Blue to cyan
      const localRatio = ratio * 2
      const r = Math.round(59 + (34 - 59) * localRatio)
      const g = Math.round(130 + (211 - 130) * localRatio)
      const b = Math.round(246 + (238 - 246) * localRatio)
      return `rgb(${r}, ${g}, ${b})`
    } else {
      // Cyan to green
      const localRatio = (ratio - 0.5) * 2
      const r = Math.round(34 + (34 - 34) * localRatio)
      const g = Math.round(211 + (197 - 211) * localRatio)
      const b = Math.round(238 + (94 - 238) * localRatio)
      return `rgb(${r}, ${g}, ${b})`
    }
  }

  return (
    <div className="bg-zinc-950 rounded-lg border border-zinc-800 p-6">
      <div className="flex items-start justify-between mb-6">
        <div>
          <h3 className="text-2xl font-bold text-cyan-400 mb-1">Estados Unidos: Proyectos por Empresa</h3>
        </div>
        <div className="text-right">
          <div className="text-sm text-zinc-400">Top 15</div>
          <div className="text-sm text-zinc-400">empresas</div>
        </div>
      </div>

      <div className="h-[400px]">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={chartData} layout="vertical" margin={{ top: 5, right: 30, left: 100, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#27272a" horizontal={true} vertical={false} />
            <XAxis type="number" stroke="#71717a" tick={{ fill: "#a1a1aa" }} />
            <YAxis
              type="category"
              dataKey="empresa"
              stroke="#71717a"
              tick={{ fill: "#a1a1aa", fontSize: 11 }}
              width={90}
            />
            <Bar dataKey="count" radius={[0, 4, 4, 0]}>
              {chartData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={getBarColor(index, chartData.length)} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  )
}
