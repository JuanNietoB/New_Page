import { createClient } from "@/lib/supabase/server"
import { NextResponse } from "next/server"
import { getEmailValidationError } from "@/lib/email-validation"

export async function POST(request: Request) {
  const { email, password } = await request.json()

  if (!email || !password) {
    return NextResponse.json({ error: "Email and password are required" }, { status: 400 })
  }

  const emailError = getEmailValidationError(email)
  if (emailError) {
    return NextResponse.json({ error: emailError }, { status: 403 })
  }

  const supabase = await createClient()

  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  })

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 401 })
  }

  if (data.user?.email) {
    const postAuthEmailError = getEmailValidationError(data.user.email)
    if (postAuthEmailError) {
      // Sign out the user immediately
      await supabase.auth.signOut()
      return NextResponse.json(
        {
          error:
            "Your account uses a personal email address. Business email addresses are required. Please contact support@storagelatam.com to update your account.",
        },
        { status: 403 },
      )
    }
  }

  return NextResponse.json({ user: data.user })
}
