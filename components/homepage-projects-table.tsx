"use client"

import { useState, useMemo } from "react"
import { MapPin, Download } from "lucide-react"
import { Card } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Button } from "@/components/ui/button"
import { mockProjects } from "@/lib/mock-data"

export function HomepageProjectsTable() {
  const [selectedCountry, setSelectedCountry] = useState<string>("United States")
  const [selectedState, setSelectedState] = useState<string>("all")
  const [rowsPerPage, setRowsPerPage] = useState<number>(25)

  const states = useMemo(() => {
    const uniqueStates = Array.from(
      new Set(mockProjects.filter((p) => p.pais === "United States").map((p) => p.provincia)),
    ).sort()
    return uniqueStates
  }, [])

  // Filter projects
  const filteredProjects = useMemo(() => {
    let filtered = mockProjects.filter((p) => p.pais === "United States")

    if (selectedState !== "all") {
      filtered = filtered.filter((p) => p.provincia === selectedState)
    }

    return filtered.slice(0, rowsPerPage)
  }, [selectedState, rowsPerPage])

  const downloadCSV = () => {
    const headers = ["#", "Proyecto", "País", "Estado", "MW", "MWh", "Desarrollador"]
    const rows = filteredProjects.map((project, index) => [
      index + 1,
      project.planta,
      project.pais,
      project.provincia,
      project.mw,
      project.mwh,
      project.empresa,
    ])

    const csvContent = [headers.join(","), ...rows.map((row) => row.map((cell) => `"${cell}"`).join(","))].join("\n")

    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" })
    const link = document.createElement("a")
    const url = URL.createObjectURL(blob)
    link.setAttribute("href", url)
    link.setAttribute("download", "bess-projects.csv")
    link.style.visibility = "hidden"
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  return (
    <Card className="w-full bg-card/80 backdrop-blur-sm border-border/50">
      <div className="px-6 pt-6 pb-4">
        <h3 className="text-2xl font-bold text-cyan-400">Estados Unidos: Lista de Proyectos</h3>
      </div>

      {/* Filters */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4 border-b border-border/50">
        <div>
          <label className="text-sm font-medium text-muted-foreground mb-1.5 block">PAÍS</label>
          <Select value={selectedCountry} disabled>
            <SelectTrigger className="bg-background">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="United States">United States</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div>
          <label className="text-sm font-medium text-muted-foreground mb-1.5 block">PROVINCIA / ESTADO</label>
          <Select value={selectedState} onValueChange={setSelectedState}>
            <SelectTrigger className="bg-background">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Todas</SelectItem>
              {states.map((state) => (
                <SelectItem key={state} value={state}>
                  {state}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Table Info */}
      <div className="px-6 py-3 flex items-center justify-between border-b border-border/50">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <span className="text-sm text-muted-foreground">Filas:</span>
            <Select value={rowsPerPage.toString()} onValueChange={(value) => setRowsPerPage(Number(value))}>
              <SelectTrigger className="w-20 h-8 bg-background">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="10">10</SelectItem>
                <SelectItem value="25">25</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="text-sm text-muted-foreground">
            Mostrando: <span className="text-foreground font-medium">{filteredProjects.length}</span>
          </div>
        </div>
        <Button onClick={downloadCSV} className="bg-emerald-600 hover:bg-emerald-700 text-white">
          <Download className="h-4 w-4 mr-2" />
          Descargar CSV
        </Button>
      </div>

      {/* Table */}
      <div className="overflow-x-auto max-h-[600px] overflow-y-auto [&::-webkit-scrollbar]:w-3 [&::-webkit-scrollbar-track]:bg-black [&::-webkit-scrollbar-thumb]:bg-zinc-800 [&::-webkit-scrollbar-thumb]:rounded-md [&::-webkit-scrollbar-thumb]:border-2 [&::-webkit-scrollbar-thumb]:border-black hover:[&::-webkit-scrollbar-thumb]:bg-zinc-700">
        <table className="w-full">
          <thead>
            <tr className="border-b border-border/50 bg-muted/30">
              <th className="px-4 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider w-12">
                #
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                Proyecto
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                Ubicación
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                MW
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                MWh
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                Desarrollador
              </th>
            </tr>
          </thead>
          <tbody>
            {filteredProjects.map((project, index) => (
              <tr key={project.id} className="border-b border-border/30 hover:bg-muted/20 transition-colors">
                <td className="px-4 py-4 text-sm text-muted-foreground">{index + 1}</td>
                <td className="px-4 py-4">
                  <div>
                    <div className="font-medium text-foreground">{project.planta}</div>
                    <div className="text-sm text-muted-foreground">{project.pais}</div>
                  </div>
                </td>
                <td className="px-4 py-4">
                  <div className="flex items-center gap-2">
                    <MapPin className="h-4 w-4 text-primary" />
                    <div>
                      <div className="text-sm font-medium text-foreground">{project.provincia}</div>
                      <div className="text-xs text-muted-foreground">{project.pais}</div>
                    </div>
                  </div>
                </td>
                <td className="px-4 py-4 text-sm font-medium text-foreground">{project.mw}</td>
                <td className="px-4 py-4 text-sm font-medium text-foreground">{project.mwh}</td>
                <td className="px-4 py-4 text-sm text-muted-foreground">{project.empresa}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Card>
  )
}
