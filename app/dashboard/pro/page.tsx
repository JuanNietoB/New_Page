"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import dynamic from "next/dynamic"

const DashboardContent = dynamic(() => import("@/components/pro-dashboard-content"), {
  ssr: false,
  loading: () => (
    <div className="flex items-center justify-center min-h-screen">
      <div className="text-muted-foreground">Loading dashboard...</div>
    </div>
  ),
})

export default function ProDashboardPage() {
  const router = useRouter()
  const [user, setUser] = useState<any>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch("/api/auth/me")
      .then((res) => res.json())
      .then((data) => {
        if (!data.user) {
          router.push("/signin")
        } else if (data.user.tier !== "pro") {
          router.push("/pricing")
        } else {
          setUser(data.user)
          setLoading(false)
        }
      })
  }, [router])

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-muted-foreground">Loading...</div>
      </div>
    )
  }

  if (!user || user.tier !== "pro") {
    return null
  }

  return <DashboardContent />
}
