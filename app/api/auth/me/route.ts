import { createClient } from "@/lib/supabase/server"
import { NextResponse } from "next/server"

export async function GET() {
  try {
    const supabase = await createClient()

    const {
      data: { user },
      error: authError,
    } = await supabase.auth.getUser()

    if (authError || !user) {
      return NextResponse.json({ user: null }, { status: 401 })
    }

    const { data: profile } = await supabase.from("profiles").select("*").eq("id", user.id).single()

    if (!profile) {
      return NextResponse.json({ user: null }, { status: 401 })
    }

    // Calculate if trial has expired
    let trialExpired = false
    if (profile.tier === "free" && profile.trial_end_date) {
      const trialEnd = new Date(profile.trial_end_date)
      trialExpired = new Date() > trialEnd
    }

    return NextResponse.json({
      user: {
        id: user.id,
        email: user.email,
        name: profile.full_name,
        tier: profile.tier,
        trialStartDate: profile.trial_start_date,
        trialExpired,
        isAdmin: profile.is_admin || false,
      },
    })
  } catch (error) {
    console.error("[v0] Error in /api/auth/me:", error)
    return NextResponse.json({ user: null, error: "Failed to fetch user" }, { status: 401 })
  }
}
