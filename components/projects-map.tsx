"use client"

import { useEffect, useRef, useState } from "react"
import type { BESSProject } from "@/lib/mock-data"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Battery, Calendar, Building2, Zap, MapPin } from "lucide-react"

interface ProjectsMapProps {
  projects: BESSProject[]
}

export function ProjectsMap({ projects }: ProjectsMapProps) {
  const mapContainerRef = useRef<HTMLDivElement>(null)
  const mapInstanceRef = useRef<any>(null)
  const [selectedProject, setSelectedProject] = useState<BESSProject | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [leafletLoaded, setLeafletLoaded] = useState(false)

  useEffect(() => {
    if (typeof window === "undefined") return

    // Check if Leaflet is already loaded
    if ((window as any).L) {
      setLeafletLoaded(true)
      setIsLoading(false)
      return
    }

    // Load Leaflet CSS
    const cssLink = document.createElement("link")
    cssLink.rel = "stylesheet"
    cssLink.href = "https://unpkg.com/leaflet@1.9.4/dist/leaflet.css"
    document.head.appendChild(cssLink)

    // Load Leaflet JS
    const script = document.createElement("script")
    script.src = "https://unpkg.com/leaflet@1.9.4/dist/leaflet.js"
    script.async = true
    script.onload = () => {
      setLeafletLoaded(true)
      setIsLoading(false)
    }
    script.onerror = () => {
      console.error("[v0] Failed to load Leaflet from CDN")
      setIsLoading(false)
    }
    document.head.appendChild(script)

    return () => {
      // Cleanup on unmount
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove()
        mapInstanceRef.current = null
      }
    }
  }, [])

  useEffect(() => {
    if (!leafletLoaded || !mapContainerRef.current || mapInstanceRef.current) return

    const L = (window as any).L
    if (!L) return

    // Initialize map
    const map = L.map(mapContainerRef.current, {
      center: [39.8283, -98.5795], // Center of USA
      zoom: 4,
      zoomControl: true,
      attributionControl: true,
    })

    L.tileLayer("https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png", {
      attribution:
        '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>',
      subdomains: "abcd",
      maxZoom: 20,
    }).addTo(map)

    mapInstanceRef.current = map

    projects.forEach((project) => {
      const marker = L.circleMarker([project.lat, project.lon], {
        radius: 8,
        fillColor: "#3b82f6",
        color: "#ffffff",
        weight: 2,
        opacity: 1,
        fillOpacity: 0.8,
      }).addTo(map)

      const popupContent = `
        <div style="color: #1f2937; font-family: system-ui;">
          <strong style="font-size: 14px; display: block; margin-bottom: 4px;">${project.planta}</strong>
          <span style="font-size: 12px; color: #6b7280;">${project.mw} MW • ${project.provincia}</span>
        </div>
      `
      marker.bindPopup(popupContent)

      marker.on("click", () => {
        setSelectedProject(project)
      })
    })
  }, [leafletLoaded, projects])

  if (isLoading) {
    return (
      <div className="w-full h-[600px] bg-muted/30 rounded-lg animate-pulse flex items-center justify-center">
        <p className="text-muted-foreground">Loading map...</p>
      </div>
    )
  }

  if (!leafletLoaded) {
    return (
      <div className="w-full h-[600px] bg-muted/30 rounded-lg flex items-center justify-center">
        <p className="text-destructive">Failed to load map. Please refresh the page.</p>
      </div>
    )
  }

  return (
    <div className="space-y-4">
      <div className="space-y-1">
        <h2 className="text-2xl font-bold text-primary">Projects Map</h2>
        <p className="text-muted-foreground">Geographic location of BESS projects across the Americas</p>
      </div>

      <div className="relative rounded-lg overflow-hidden border border-border">
        <div ref={mapContainerRef} className="w-full h-[600px]" />

        <div className="absolute bottom-4 left-4 bg-background/90 backdrop-blur border rounded-lg px-4 py-2 shadow-lg z-[1000]">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-primary" />
            <span className="font-semibold">{projects.length} projects</span>
          </div>
        </div>
      </div>

      {selectedProject && (
        <Card className="border-primary">
          <CardContent className="pt-6">
            <div className="flex items-start justify-between mb-4">
              <div>
                <h3 className="font-semibold text-xl mb-1">{selectedProject.planta}</h3>
                <p className="text-muted-foreground flex items-center gap-1">
                  <MapPin className="h-4 w-4" />
                  {selectedProject.provincia}, {selectedProject.pais}
                </p>
              </div>
              <Badge variant={selectedProject.status === "operational" ? "default" : "secondary"}>
                {selectedProject.status === "operational"
                  ? "Operational"
                  : selectedProject.status === "under-construction"
                    ? "Under Construction"
                    : "Planned"}
              </Badge>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-4 border-t">
              <div>
                <p className="text-sm text-muted-foreground mb-1">Capacity (MW)</p>
                <p className="font-semibold flex items-center gap-1">
                  <Battery className="h-4 w-4" />
                  {selectedProject.mw} MW
                </p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground mb-1">Capacity (MWh)</p>
                <p className="font-semibold flex items-center gap-1">
                  <Zap className="h-4 w-4" />
                  {selectedProject.mwh} MWh
                </p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground mb-1">Developer</p>
                <p className="font-semibold flex items-center gap-1">
                  <Building2 className="h-4 w-4" />
                  {selectedProject.empresa}
                </p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground mb-1">Year</p>
                <p className="font-semibold flex items-center gap-1">
                  <Calendar className="h-4 w-4" />
                  {selectedProject.year}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
