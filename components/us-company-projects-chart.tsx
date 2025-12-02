"use client"

import { Card, CardContent } from "@/components/ui/card"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from "recharts"
import { mockProjects } from "@/lib/mock-data"

export function UsCompanyProjectsChart() {
  const getUsCompanyProjectCounts = () => {
    const filtered = mockProjects.filter((p) => p.pais === "United States")

    const counts = filtered.reduce(
      (acc, project) => {
        const company = project.empresa || "Unknown"
        acc[company] = (acc[company] || 0) + 1
        return acc
      },
      {} as Record<string, number>,
    )

    return Object.entries(counts)
      .map(([company, count]) => ({ company, count }))
      .sort((a, b) => b.count - a.count)
      .slice(0, 15)
  }

  const data = getUsCompanyProjectCounts()

  return (
    <Card className="p-6 bg-zinc-900/50 border-zinc-800">
      <CardContent className="p-0">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
            Estados Unidos: Proyectos por Empresa
          </h3>
          <span className="text-xs text-muted-foreground">Top 15 empresas</span>
        </div>

        <div className="h-[400px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={data} margin={{ top: 20, right: 20, left: 20, bottom: 80 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#333" />
              <XAxis
                dataKey="company"
                tick={{ fill: "#888", fontSize: 10 }}
                interval={0}
                angle={-45}
                textAnchor="end"
                height={70}
              />
              <YAxis tick={{ fill: "#888", fontSize: 11 }} allowDecimals={false} />
              <Tooltip
                contentStyle={{
                  backgroundColor: "#1f1f1f",
                  border: "1px solid #333",
                  borderRadius: "8px",
                }}
                labelStyle={{ color: "#fff" }}
                formatter={(value: number) => [value.toString(), "Proyectos"]}
              />
              <Bar dataKey="count" radius={[4, 4, 0, 0]} fill="#3b82f6">
                {data.map((entry, index) => (
                  <Cell key={`us-company-${index}`} fill={`hsl(${220 - index * 5}, 70%, ${60 - index * 2}%)`} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  )
}
