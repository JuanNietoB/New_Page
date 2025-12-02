"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { AlertCircle, Download } from "lucide-react"
import Link from "next/link"

// USA BESS Project Data (sample from HTML file)
const USA_BESS_DATA = [
  {
    pais: "United States",
    planta: "Kotzebue Hybrid",
    empresa: "Kotzebue Electric Assn Inc",
    mw: 1.2,
    mwh: 1.0,
    lat: 66.837778,
    lon: -162.5569,
    provincia: "AK",
  },
  {
    pais: "United States",
    planta: "Battery Energy Storage System",
    empresa: "Golden Valley Elec Assn Inc",
    mw: 40.0,
    mwh: 11.0,
    lat: 64.8167,
    lon: -147.725,
    provincia: "AK",
  },
  {
    pais: "United States",
    planta: "International Battery Substation (IBSS)",
    empresa: "Chugach Electric Assn Inc",
    mw: 40.0,
    mwh: 80.0,
    lat: 61.169886,
    lon: -149.9131,
    provincia: "AK",
  },
  {
    pais: "United States",
    planta: "Glacier Battery Storage",
    empresa: "Puget Sound Energy Inc",
    mw: 2.0,
    mwh: 4.4,
    lat: 48.88804,
    lon: -121.9462,
    provincia: "WA",
  },
  {
    pais: "United States",
    planta: "Arlington Microgrid",
    empresa: "PUD No 1 of Snohomish County",
    mw: 1.0,
    mwh: 1.4,
    lat: 48.15614,
    lon: -122.1502,
    provincia: "WA",
  },
]

export default function FreeDashboardPage() {
  const router = useRouter()
  const [user, setUser] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [selectedState, setSelectedState] = useState("__ALL__")
  const [sortBy, setSortBy] = useState("mw-desc")
  const [limit, setLimit] = useState(50)
  const [activeTab, setActiveTab] = useState("summary")

  useEffect(() => {
    fetch("/api/auth/me")
      .then((res) => res.json())
      .then((data) => {
        if (!data.user) {
          router.push("/signin")
        } else {
          setUser(data.user)
        }
        setLoading(false)
      })
      .catch(() => {
        router.push("/signin")
      })
  }, [router])

  if (loading) {
    return <div className="container mx-auto px-4 py-12 text-center">Loading...</div>
  }

  if (!user) return null

  // Calculate KPIs
  const filteredData =
    selectedState === "__ALL__" ? USA_BESS_DATA : USA_BESS_DATA.filter((p) => p.provincia === selectedState)
  const totalMW = filteredData.reduce((sum, p) => sum + p.mw, 0)
  const totalMWh = filteredData.reduce((sum, p) => sum + p.mwh, 0)
  const totalProjects = filteredData.length
  const states = [...new Set(USA_BESS_DATA.map((p) => p.provincia))].sort()

  const calculateTrialDaysRemaining = () => {
    if (!user.trial_end_date) return 0
    const now = new Date()
    const trialEnd = new Date(user.trial_end_date)
    const diffTime = trialEnd.getTime() - now.getTime()
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
    return Math.max(0, diffDays)
  }

  const trialDaysRemaining = calculateTrialDaysRemaining()
  const isTrialExpired = trialDaysRemaining === 0

  // Sort projects
  const sortedData = [...filteredData].sort((a, b) => {
    const [field, dir] = sortBy.split("-")
    const multiplier = dir === "desc" ? -1 : 1
    if (field === "mw") return (a.mw - b.mw) * multiplier
    if (field === "mwh") return (a.mwh - b.mwh) * multiplier
    if (field === "name") return a.planta.localeCompare(b.planta) * multiplier
    return 0
  })

  const displayData = sortedData.slice(0, limit)

  const downloadCSV = () => {
    const headers = ["Project Name", "Company", "State", "MW", "MWh"]
    const rows = displayData.map((p) => [p.planta, p.empresa, p.provincia, p.mw, p.mwh])
    const csv = [headers, ...rows].map((row) => row.join(",")).join("\n")
    const blob = new Blob([csv], { type: "text/csv" })
    const url = URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = "bess-usa-free-version.csv"
    a.click()
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-10 border-b bg-background/95 backdrop-blur">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between gap-4 flex-wrap">
          <h1 className="text-xl font-bold bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent">
            BESS USA Dashboard - Free Version
          </h1>
          <div className="flex gap-2 flex-wrap items-center">
            <Link href="/upgrade">
              <Button variant="default" className="bg-gradient-to-r from-blue-500 to-purple-500">
                Upgrade to Pro
              </Button>
            </Link>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-6">
        {user.tier === "free" && (
          <Alert className={isTrialExpired ? "mb-6 border-destructive" : "mb-6"}>
            <AlertCircle className="h-4 w-4" />
            <AlertTitle>
              {isTrialExpired ? "Free Trial Expired" : `${trialDaysRemaining} Days Remaining in Your Trial`}
            </AlertTitle>
            <AlertDescription className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
              <span>
                {isTrialExpired
                  ? "Upgrade to Pro to continue accessing BESS data and analytics"
                  : "Access limited to USA data with 5 sample projects"}
              </span>
              <Link href="/upgrade">
                <Button size="sm" variant={isTrialExpired ? "default" : "outline"}>
                  {isTrialExpired ? "Upgrade Now" : "View Pro Features"}
                </Button>
              </Link>
            </AlertDescription>
          </Alert>
        )}

        {/* Filters */}
        <Card className="p-4 mb-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="text-sm text-muted-foreground mb-2 block">Filter by State</label>
              <select
                value={selectedState}
                onChange={(e) => setSelectedState(e.target.value)}
                className="w-full px-3 py-2 rounded-lg border bg-card text-foreground"
              >
                <option value="__ALL__">All States</option>
                {states.map((state) => (
                  <option key={state} value={state}>
                    {state}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </Card>

        {/* KPI Grid */}
        <div className="grid grid-cols-2 gap-4 mb-6">
          <Card className="p-6 relative overflow-hidden group hover:shadow-lg transition-all">
            <div className="absolute right-0 top-0 w-32 h-32 bg-gradient-to-br from-blue-500/20 to-transparent rounded-full -mr-16 -mt-16" />
            <div className="relative z-10">
              <p className="text-xs text-muted-foreground uppercase tracking-wide font-semibold mb-1">Total Capacity</p>
              <p className="text-3xl font-bold bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent">
                {totalMW.toFixed(1)} MW
              </p>
              <p className="text-xs text-muted-foreground mt-1">From {totalProjects} projects</p>
            </div>
          </Card>

          <Card className="p-6 relative overflow-hidden group hover:shadow-lg transition-all">
            <div className="absolute right-0 top-0 w-32 h-32 bg-gradient-to-br from-purple-500/20 to-transparent rounded-full -mr-16 -mt-16" />
            <div className="relative z-10">
              <p className="text-xs text-muted-foreground uppercase tracking-wide font-semibold mb-1">Energy Storage</p>
              <p className="text-3xl font-bold bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent">
                {totalMWh.toFixed(1)} MWh
              </p>
              <p className="text-xs text-muted-foreground mt-1">Total capacity</p>
            </div>
          </Card>
        </div>

        {/* Tab Controls */}
        <Card className="p-2 mb-6">
          <div className="flex gap-2 flex-wrap">
            <button
              onClick={() => setActiveTab("summary")}
              className={`px-4 py-2 rounded-full font-semibold text-sm transition-all ${
                activeTab === "summary"
                  ? "bg-blue-500 text-white shadow-lg"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              Summary
            </button>
            <button
              onClick={() => setActiveTab("map")}
              className={`px-4 py-2 rounded-full font-semibold text-sm transition-all ${
                activeTab === "map" ? "bg-blue-500 text-white shadow-lg" : "text-muted-foreground hover:text-foreground"
              }`}
            >
              Map
            </button>
            <button
              onClick={() => setActiveTab("table")}
              className={`px-4 py-2 rounded-full font-semibold text-sm transition-all ${
                activeTab === "table"
                  ? "bg-blue-500 text-white shadow-lg"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              Projects Table
            </button>
          </div>
        </Card>

        {/* Summary Tab */}
        {activeTab === "summary" && (
          <div className="space-y-6">
            <Card className="p-8 bg-gradient-to-br from-blue-500/10 to-purple-500/5 border-blue-500/20">
              <div className="text-center">
                <h1 className="text-3xl font-bold mb-3 bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent">
                  BESS USA Dashboard
                </h1>
                <p className="text-muted-foreground max-w-2xl mx-auto">
                  Track Battery Energy Storage Systems across the United States. Free version includes limited sample
                  data.
                </p>
              </div>
            </Card>

            <Card className="p-6">
              <h2 className="text-xl font-bold mb-4 bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent">
                Sample Projects by State
              </h2>
              <div className="space-y-3">
                {[...new Set(USA_BESS_DATA.map((p) => p.provincia))].map((state) => {
                  const stateProjects = USA_BESS_DATA.filter((p) => p.provincia === state)
                  const stateMW = stateProjects.reduce((sum, p) => sum + p.mw, 0)
                  return (
                    <div
                      key={state}
                      className="flex items-center justify-between p-3 rounded-lg border hover:bg-accent/50 transition-colors"
                    >
                      <div>
                        <p className="font-semibold">{state}</p>
                        <p className="text-sm text-muted-foreground">{stateProjects.length} projects</p>
                      </div>
                      <div className="text-right">
                        <p className="font-bold text-lg">{stateMW.toFixed(1)} MW</p>
                      </div>
                    </div>
                  )
                })}
              </div>
            </Card>

            {/* Upgrade CTA */}
            <Card className="p-8 bg-gradient-to-br from-blue-500/10 to-purple-500/10 border-blue-500/20">
              <div className="text-center">
                <h3 className="text-2xl font-bold mb-3">Unlock Full USA Coverage</h3>
                <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
                  Upgrade to Pro to access all USA BESS projects, interactive maps, advanced analytics, and data export
                  features.
                </p>
                <Link href="/upgrade">
                  <Button size="lg" className="bg-gradient-to-r from-blue-500 to-purple-500">
                    Upgrade to Pro - Full Access
                  </Button>
                </Link>
              </div>
            </Card>
          </div>
        )}

        {/* Map Tab */}
        {activeTab === "map" && (
          <div className="space-y-4">
            <Card className="p-6">
              <h2 className="text-xl font-bold mb-4 bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent">
                Project Map
              </h2>
              <div className="relative w-full aspect-[2/1] bg-muted rounded-lg overflow-hidden">
                {/* Map Container */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <svg viewBox="0 0 1000 600" className="w-full h-full" style={{ backgroundColor: "#1a1a2e" }}>
                    {/* USA Map Background (simplified) */}
                    <rect x="0" y="0" width="1000" height="600" fill="#0f172a" />

                    {/* Grid lines */}
                    <g opacity="0.1">
                      {[...Array(20)].map((_, i) => (
                        <line key={`v-${i}`} x1={i * 50} y1="0" x2={i * 50} y2="600" stroke="#94a3b8" strokeWidth="1" />
                      ))}
                      {[...Array(12)].map((_, i) => (
                        <line
                          key={`h-${i}`}
                          x1="0"
                          y1={i * 50}
                          x2="1000"
                          y2={i * 50}
                          stroke="#94a3b8"
                          strokeWidth="1"
                        />
                      ))}
                    </g>

                    {/* Project Markers */}
                    {USA_BESS_DATA.map((project, idx) => {
                      // Convert lat/lon to SVG coordinates (simplified projection)
                      // USA roughly: lat 25-50, lon -125 to -65
                      const x = ((project.lon + 125) / 60) * 1000
                      const y = ((50 - project.lat) / 25) * 600

                      return (
                        <g key={idx}>
                          {/* Marker glow */}
                          <circle cx={x} cy={y} r="8" fill="#3b82f6" opacity="0.3" />
                          {/* Marker */}
                          <circle
                            cx={x}
                            cy={y}
                            r="4"
                            fill="#60a5fa"
                            stroke="#3b82f6"
                            strokeWidth="2"
                            className="hover:r-6 transition-all cursor-pointer"
                          >
                            <title>{`${project.planta} - ${project.mw} MW`}</title>
                          </circle>
                        </g>
                      )
                    })}
                  </svg>
                </div>

                {/* Map Controls Overlay */}
                <div className="absolute top-4 left-4 bg-card/90 backdrop-blur-sm rounded-lg p-3 border">
                  <p className="text-xs text-muted-foreground uppercase font-semibold mb-1">Projects on map</p>
                  <p className="text-2xl font-bold bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent">
                    {USA_BESS_DATA.length} projects
                  </p>
                </div>

                {/* Legend */}
                <div className="absolute bottom-4 left-4 bg-card/90 backdrop-blur-sm rounded-lg p-3 border">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-blue-500"></div>
                    <span className="text-xs text-muted-foreground">BESS Project Location</span>
                  </div>
                </div>

                {/* Attribution */}
                <div className="absolute bottom-4 right-4 text-xs text-muted-foreground">USA Sample Data</div>
              </div>
            </Card>

            {/* Project List Below Map */}
            <Card className="p-6">
              <h3 className="text-lg font-bold mb-4">Sample Projects</h3>
              <div className="grid gap-3">
                {USA_BESS_DATA.map((project, idx) => (
                  <div
                    key={idx}
                    className="flex items-start justify-between p-3 rounded-lg border hover:bg-accent/50 transition-colors"
                  >
                    <div className="flex-1">
                      <p className="font-semibold">{project.planta}</p>
                      <p className="text-sm text-muted-foreground">{project.empresa}</p>
                      <p className="text-xs text-muted-foreground mt-1">
                        {project.provincia} • {project.lat.toFixed(4)}, {project.lon.toFixed(4)}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="font-bold text-blue-500">{project.mw} MW</p>
                      <p className="text-sm text-muted-foreground">{project.mwh} MWh</p>
                    </div>
                  </div>
                ))}
              </div>
            </Card>

            {/* Upgrade CTA */}
            <Card className="p-8 bg-gradient-to-br from-blue-500/10 to-purple-500/10 border-blue-500/20">
              <div className="text-center">
                <h3 className="text-2xl font-bold mb-3">Unlock Interactive Map Features</h3>
                <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
                  Upgrade to Pro for full interactive maps with zoom, clustering, detailed project info, and coverage of
                  all USA BESS projects.
                </p>
                <Link href="/upgrade">
                  <Button size="lg" className="bg-gradient-to-r from-blue-500 to-purple-500">
                    Upgrade to Pro
                  </Button>
                </Link>
              </div>
            </Card>
          </div>
        )}

        {/* Table Tab */}
        {activeTab === "table" && (
          <div className="space-y-4">
            {/* Table Controls */}
            <Card className="p-4">
              <div className="flex flex-wrap gap-4 items-end justify-between">
                <div className="flex gap-4 flex-wrap flex-1">
                  <div className="flex-1 min-w-[160px]">
                    <label className="text-xs text-muted-foreground uppercase mb-2 block">Sort By</label>
                    <select
                      value={sortBy}
                      onChange={(e) => setSortBy(e.target.value)}
                      className="w-full px-3 py-2 rounded-lg border bg-card text-foreground text-sm"
                    >
                      <option value="mw-desc">Capacity (MW) - High to Low</option>
                      <option value="mw-asc">Capacity (MW) - Low to High</option>
                      <option value="mwh-desc">Storage (MWh) - High to Low</option>
                      <option value="name-asc">Name (A-Z)</option>
                    </select>
                  </div>
                  <div className="min-w-[120px]">
                    <label className="text-xs text-muted-foreground uppercase mb-2 block">Show</label>
                    <select
                      value={limit}
                      onChange={(e) => setLimit(Number(e.target.value))}
                      className="w-full px-3 py-2 rounded-lg border bg-card text-foreground text-sm"
                    >
                      <option value={10}>10 rows</option>
                      <option value={25}>25 rows</option>
                      <option value={50}>50 rows</option>
                    </select>
                  </div>
                </div>
                <Button onClick={downloadCSV} className="bg-gradient-to-r from-green-500 to-emerald-500">
                  <Download className="w-4 h-4 mr-2" />
                  Download CSV
                </Button>
              </div>
            </Card>

            {/* Projects Table */}
            <Card className="overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-muted/50 sticky top-0">
                    <tr>
                      <th className="text-left p-3 text-xs uppercase text-muted-foreground font-semibold">
                        Project Name
                      </th>
                      <th className="text-left p-3 text-xs uppercase text-muted-foreground font-semibold">Company</th>
                      <th className="text-left p-3 text-xs uppercase text-muted-foreground font-semibold">State</th>
                      <th className="text-right p-3 text-xs uppercase text-muted-foreground font-semibold">MW</th>
                      <th className="text-right p-3 text-xs uppercase text-muted-foreground font-semibold">MWh</th>
                    </tr>
                  </thead>
                  <tbody>
                    {displayData.map((project, idx) => (
                      <tr key={idx} className="border-b hover:bg-accent/50 transition-colors">
                        <td className="p-3">
                          <div className="font-semibold">{project.planta}</div>
                        </td>
                        <td className="p-3 text-sm text-muted-foreground">{project.empresa}</td>
                        <td className="p-3">
                          <span className="inline-flex items-center gap-2 px-2 py-1 rounded-full bg-blue-500/10 text-blue-500 text-xs font-semibold">
                            {project.provincia}
                          </span>
                        </td>
                        <td className="p-3 text-right font-semibold">{project.mw.toFixed(1)}</td>
                        <td className="p-3 text-right font-semibold">{project.mwh.toFixed(1)}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </Card>

            <div className="text-center text-sm text-muted-foreground">
              Showing {displayData.length} of {filteredData.length} projects
            </div>
          </div>
        )}
      </main>
    </div>
  )
}
