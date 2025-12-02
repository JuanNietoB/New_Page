"use client"

import { useEffect, useRef } from "react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"

interface BESSProject {
  pais: string
  planta: string
  empresa: string
  mw: number
  mwh: number
  lat: number
  lon: number
  provincia: string
}

interface VisualizationsProps {
  data: BESSProject[]
  filteredData: BESSProject[]
  treemapRegion: string
  setTreemapRegion: (region: string) => void
  treemapMetric: "mw" | "mwh"
  setTreemapMetric: (metric: "mw" | "mwh") => void
  metric: "mw" | "mwh"
  language: string
}

export default function VisualizationsComponent({
  data,
  filteredData,
  treemapRegion,
  setTreemapRegion,
  treemapMetric,
  setTreemapMetric,
  metric,
  language,
}: VisualizationsProps) {
  const treemapRef = useRef<HTMLDivElement>(null)
  const violinRef = useRef<HTMLDivElement>(null)
  const scatterRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (typeof window === "undefined") return

    const loadPlotly = async () => {
      const Plotly = (await import("plotly.js-dist-min")).default

      if (treemapRef.current) {
        const regionData = data.filter((d) => {
          if (treemapRegion === "us") return d.pais === "United States"
          if (treemapRegion === "canada") return d.pais === "Canada"
          return d.pais !== "United States" && d.pais !== "Canada"
        })

        const aggregation = regionData.reduce((acc: any, d) => {
          const country = d.pais || "Unknown"
          const value = d[treemapMetric] || 0
          acc[country] = (acc[country] || 0) + value
          return acc
        }, {})

        const labels = ["Root", ...Object.keys(aggregation)]
        const parents = ["", ...Object.keys(aggregation).map(() => "Root")]
        const values = [
          Object.values(aggregation).reduce((sum: number, val: any) => sum + val, 0),
          ...Object.values(aggregation),
        ]

        Plotly.newPlot(
          treemapRef.current,
          [
            {
              type: "treemap",
              labels,
              parents,
              values,
              textposition: "middle center",
              marker: {
                colors: ["#0f172a", "#1e40af", "#be123c", "#065f46", "#c2410c", "#6b21a8"],
                line: { color: "#fff", width: 2 },
              },
            },
          ],
          {
            height: 500,
            paper_bgcolor: "rgba(0,0,0,0)",
            plot_bgcolor: "rgba(0,0,0,0)",
            font: { color: "#f4f4f5" },
          },
          { responsive: true },
        )
      }

      if (violinRef.current) {
        const usData = filteredData.filter((d) => d.pais === "United States")
        const latamData = filteredData.filter((d) => d.pais !== "United States" && d.pais !== "Canada")

        const traces = []
        if (usData.length > 0) {
          traces.push({
            type: "violin",
            y: usData.map((d) => d[metric] || 0),
            name: "United States",
            marker: { color: "#4fa4df" },
          })
        }
        if (latamData.length > 0) {
          traces.push({
            type: "violin",
            y: latamData.map((d) => d[metric] || 0),
            name: "LATAM",
            marker: { color: "#f06b5c" },
          })
        }

        Plotly.newPlot(
          violinRef.current,
          traces as any,
          {
            height: 400,
            paper_bgcolor: "rgba(0,0,0,0)",
            plot_bgcolor: "rgba(0,0,0,0)",
            font: { color: "#f4f4f5" },
            yaxis: { title: metric.toUpperCase() },
          },
          { responsive: true },
        )
      }

      if (scatterRef.current) {
        const usData = filteredData.filter((d) => d.pais === "United States")
        const latamData = filteredData.filter((d) => d.pais !== "United States" && d.pais !== "Canada")

        const traces = []
        if (usData.length > 0) {
          traces.push({
            x: usData.map((d) => d.mw || 0),
            y: usData.map((d) => d.mwh || 0),
            mode: "markers",
            type: "scatter",
            name: "United States",
            marker: { size: 8, color: "#3498db" },
          })
        }
        if (latamData.length > 0) {
          traces.push({
            x: latamData.map((d) => d.mw || 0),
            y: latamData.map((d) => d.mwh || 0),
            mode: "markers",
            type: "scatter",
            name: "LATAM",
            marker: { size: 8, color: "#e74c3c" },
          })
        }

        Plotly.newPlot(
          scatterRef.current,
          traces as any,
          {
            height: 400,
            paper_bgcolor: "rgba(0,0,0,0)",
            plot_bgcolor: "rgba(0,0,0,0)",
            font: { color: "#f4f4f5" },
            xaxis: { title: "MW", type: "log" },
            yaxis: { title: "MWh", type: "log" },
          },
          { responsive: true },
        )
      }
    }

    loadPlotly()
  }, [data, filteredData, treemapRegion, treemapMetric, metric, language])

  return (
    <div className="space-y-6">
      {/* Treemap */}
      <Card className="shadow-xl">
        <CardHeader>
          <div className="flex flex-wrap justify-between items-start gap-4">
            <div>
              <CardTitle className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                {language === "es" ? "Distribución por País/Región" : "Distribution by Country/Region"}
              </CardTitle>
              <CardDescription>
                {language === "es" ? "Treemap de capacidad instalada" : "Installed capacity treemap"}
              </CardDescription>
            </div>
            <div className="flex gap-3 flex-wrap">
              <div className="flex flex-col gap-2">
                <label className="text-xs uppercase text-muted-foreground font-semibold">
                  {language === "es" ? "Región" : "Region"}
                </label>
                <select
                  className="bg-card border rounded-lg px-3 py-2 text-sm"
                  value={treemapRegion}
                  onChange={(e) => setTreemapRegion(e.target.value)}
                >
                  <option value="latam">LATAM</option>
                  <option value="us">USA</option>
                  <option value="canada">Canada</option>
                </select>
              </div>
              <div className="flex flex-col gap-2">
                <label className="text-xs uppercase text-muted-foreground font-semibold">
                  {language === "es" ? "Métrica" : "Metric"}
                </label>
                <select
                  className="bg-card border rounded-lg px-3 py-2 text-sm"
                  value={treemapMetric}
                  onChange={(e) => setTreemapMetric(e.target.value as "mw" | "mwh")}
                >
                  <option value="mw">MW</option>
                  <option value="mwh">MWh</option>
                </select>
              </div>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div ref={treemapRef} className="w-full min-h-[500px]" />
        </CardContent>
      </Card>

      {/* Violin Chart */}
      <Card className="shadow-xl">
        <CardHeader>
          <CardTitle className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
            {language === "es" ? "Distribución de Capacidad" : "Capacity Distribution"}
          </CardTitle>
          <CardDescription>
            {language === "es" ? "Comparación USA vs LATAM" : "USA vs LATAM comparison"}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div ref={violinRef} className="w-full min-h-[400px]" />
        </CardContent>
      </Card>

      {/* Scatter Plot */}
      <Card className="shadow-xl">
        <CardHeader>
          <CardTitle className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
            MW vs MWh
          </CardTitle>
          <CardDescription>
            {language === "es"
              ? "Relación entre potencia y energía (azul: USA, rojo: LATAM)"
              : "Power vs energy relationship (blue: USA, red: LATAM)"}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div ref={scatterRef} className="w-full min-h-[400px]" />
        </CardContent>
      </Card>
    </div>
  )
}
