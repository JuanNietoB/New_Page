import { createClient } from "@/lib/supabase/server"
import { NextResponse } from "next/server"
import { getEmailValidationError } from "@/lib/email-validation"

export async function POST(request: Request) {
  const { email, password, name } = await request.json()

  if (!email || !password || !name) {
    return NextResponse.json({ error: "Email, password, and name are required" }, { status: 400 })
  }

  const emailError = getEmailValidationError(email)
  if (emailError) {
    return NextResponse.json({ error: emailError }, { status: 403 })
  }

  const supabase = await createClient()

  const { data: authData, error: authError } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: {
        full_name: name,
      },
      emailRedirectTo:
        process.env.NEXT_PUBLIC_DEV_SUPABASE_REDIRECT_URL ||
        `${process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000"}/dashboard/free`,
    },
  })

  if (authError) {
    return NextResponse.json({ error: authError.message }, { status: 400 })
  }

  if (authData.user) {
    const trialStartDate = new Date()
    const trialEndDate = new Date()
    trialEndDate.setDate(trialEndDate.getDate() + 30)

    await supabase.from("profiles").insert({
      id: authData.user.id,
      email: authData.user.email,
      full_name: name,
      tier: "free",
      trial_start_date: trialStartDate.toISOString(),
      trial_end_date: trialEndDate.toISOString(),
    })
  }

  return NextResponse.json({
    user: authData.user,
    message: "Please check your email to confirm your account",
  })
}
