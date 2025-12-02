"use server"
import { createClient } from "@/lib/supabase/server"

export type UserTier = "free" | "pro" | null

export interface User {
  id: string
  email: string
  name: string
  tier: UserTier
  trialStartDate?: string
  trialExpired?: boolean
  stripeCustomerId?: string
}

const PRO_ACCESS_EMAILS = ["juan@storagelatam.com", "contact@storagelatam.com"]

export async function getCurrentUser(): Promise<User | null> {
  try {
    const supabase = await createClient()

    const {
      data: { user: authUser },
      error: authError,
    } = await supabase.auth.getUser()

    if (authError || !authUser) {
      console.log("[v0] No authenticated user found")
      return null
    }

    const { data: profile, error: profileError } = await supabase
      .from("profiles")
      .select("id, email, full_name, tier, trial_start_date, trial_end_date, stripe_customer_id")
      .eq("id", authUser.id)
      .single()

    if (profileError || !profile) {
      console.log("[v0] Profile not found for user:", authUser.id)
      return null
    }

    let trialExpired = false
    if (profile.trial_end_date) {
      const trialEnd = new Date(profile.trial_end_date)
      const now = new Date()
      trialExpired = now > trialEnd
    }

    const actualTier = PRO_ACCESS_EMAILS.includes(profile.email.toLowerCase()) ? "pro" : (profile.tier as UserTier)

    console.log("[v0] User loaded from Supabase:", profile.email, "tier:", actualTier)

    return {
      id: profile.id,
      email: profile.email,
      name: profile.full_name || profile.email,
      tier: actualTier,
      trialStartDate: profile.trial_start_date,
      trialExpired,
      stripeCustomerId: profile.stripe_customer_id,
    }
  } catch (error) {
    console.error("[v0] getCurrentUser error:", error)
    return null
  }
}

export async function signIn(email: string, password: string) {
  console.log("[v0] SignIn called with email:", email)

  try {
    const supabase = await createClient()

    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    })

    if (error || !data.user) {
      console.log("[v0] Supabase auth error:", error?.message)
      return { success: false, error: "Invalid credentials" }
    }

    const { data: profile, error: profileError } = await supabase
      .from("profiles")
      .select("id, email, full_name, tier, trial_start_date, trial_end_date, stripe_customer_id")
      .eq("id", data.user.id)
      .single()

    if (profileError || !profile) {
      console.log("[v0] Profile not found")
      return { success: false, error: "User profile not found" }
    }

    let trialExpired = false
    if (profile.trial_end_date) {
      const trialEnd = new Date(profile.trial_end_date)
      const now = new Date()
      trialExpired = now > trialEnd
    }

    const actualTier = PRO_ACCESS_EMAILS.includes(profile.email.toLowerCase()) ? "pro" : (profile.tier as UserTier)

    const user: User = {
      id: profile.id,
      email: profile.email,
      name: profile.full_name || profile.email,
      tier: actualTier,
      trialStartDate: profile.trial_start_date,
      trialExpired,
      stripeCustomerId: profile.stripe_customer_id,
    }

    console.log("[v0] User signed in successfully:", user.email, "tier:", user.tier)
    return { success: true, user }
  } catch (error) {
    console.error("[v0] SignIn error:", error)
    return { success: false, error: "Failed to sign in" }
  }
}

export async function signUp(email: string, password: string, name: string) {
  console.log("[v0] SignUp called with email:", email)

  try {
    const supabase = await createClient()

    if (password.length < 6) {
      return {
        success: false,
        error: "Password must be at least 6 characters long.",
      }
    }

    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        emailRedirectTo:
          process.env.NEXT_PUBLIC_DEV_SUPABASE_REDIRECT_URL ||
          `${process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000"}`,
        data: {
          full_name: name,
        },
      },
    })

    if (error || !data.user) {
      console.log("[v0] Supabase signup error:", error?.message)
      return {
        success: false,
        error: error?.message || "Failed to create account",
      }
    }

    const trialStartDate = new Date().toISOString()
    const trialEndDate = new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString()

    const { error: profileError } = await supabase.from("profiles").upsert({
      id: data.user.id,
      email: email,
      full_name: name,
      tier: "free",
      trial_start_date: trialStartDate,
      trial_end_date: trialEndDate,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
      stripe_customer_id: null, // Default value for stripeCustomerId
    })

    if (profileError) {
      console.log("[v0] Profile creation error:", profileError.message)
    }

    const user: User = {
      id: data.user.id,
      email,
      name,
      tier: "free",
      trialStartDate,
      trialExpired: false,
      stripeCustomerId: null, // Default value for stripeCustomerId
    }

    console.log("[v0] User created successfully:", user.id)
    return { success: true, user }
  } catch (error) {
    console.error("[v0] SignUp error:", error)
    return { success: false, error: "Failed to create account" }
  }
}

export async function signOut() {
  try {
    const supabase = await createClient()
    await supabase.auth.signOut()
    return { success: true }
  } catch (error) {
    console.error("[v0] SignOut error:", error)
    return { success: false, error: "Failed to sign out" }
  }
}

export async function upgradeToPro(userId: string) {
  try {
    const supabase = await createClient()

    const trialEndDate = new Date(Date.now() + 365 * 24 * 60 * 60 * 1000).toISOString()

    const { data, error } = await supabase
      .from("profiles")
      .update({
        tier: "pro",
        trial_end_date: trialEndDate,
        updated_at: new Date().toISOString(),
      })
      .eq("id", userId)
      .select()
      .single()

    if (error || !data) {
      return { success: false, error: "User not found" }
    }

    const user: User = {
      id: data.id,
      email: data.email,
      name: data.full_name || data.email,
      tier: "pro",
      trialExpired: false,
      stripeCustomerId: data.stripe_customer_id, // Include stripeCustomerId in the response
    }

    return { success: true, user }
  } catch (error) {
    console.error("[v0] upgradeToPro error:", error)
    return { success: false, error: "Failed to upgrade" }
  }
}
