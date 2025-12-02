import { createServerClient } from "@supabase/ssr"
import { NextResponse, type NextRequest } from "next/server"

export async function updateSession(request: NextRequest) {
  let supabaseResponse = NextResponse.next({
    request,
  })

  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || process.env.SUPABASE_URL
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || process.env.SUPABASE_ANON_KEY

  // If no Supabase credentials, skip auth checks and allow request through
  if (!supabaseUrl || !supabaseAnonKey) {
    console.warn("[v0] Supabase credentials not found in middleware, skipping auth checks")
    return supabaseResponse
  }

  try {
    const supabase = createServerClient(supabaseUrl, supabaseAnonKey, {
      cookies: {
        getAll() {
          return request.cookies.getAll()
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value }) => request.cookies.set(name, value))
          supabaseResponse = NextResponse.next({
            request,
          })
          cookiesToSet.forEach(({ name, value, options }) => supabaseResponse.cookies.set(name, value, options))
        },
      },
    })

    let user = null
    try {
      // IMPORTANT: Do not run code between createServerClient and supabase.auth.getUser()
      const {
        data: { user: authUser },
      } = await supabase.auth.getUser()
      user = authUser
    } catch (authError: any) {
      // If session is invalid (403 session_not_found), clear the cookies and continue
      if (authError?.status === 403 || authError?.message?.includes("session_not_found")) {
        // Clear all Supabase auth cookies
        const cookieNames = request.cookies
          .getAll()
          .filter((cookie) => cookie.name.startsWith("sb-"))
          .map((cookie) => cookie.name)

        supabaseResponse = NextResponse.next({ request })
        cookieNames.forEach((name) => {
          supabaseResponse.cookies.delete(name)
        })

        user = null
      } else {
        throw authError
      }
    }

    // Protect dashboard routes
    if (!user && request.nextUrl.pathname.startsWith("/dashboard")) {
      const url = request.nextUrl.clone()
      url.pathname = "/signin"
      return NextResponse.redirect(url)
    }

    // Protect account page
    if (!user && request.nextUrl.pathname.startsWith("/account")) {
      const url = request.nextUrl.clone()
      url.pathname = "/signin"
      return NextResponse.redirect(url)
    }

    if (user && (request.nextUrl.pathname === "/signin" || request.nextUrl.pathname === "/signup")) {
      // Get user's tier from profile
      const { data: profile } = await supabase.from("profiles").select("tier").eq("id", user.id).single()

      const url = request.nextUrl.clone()
      // Redirect to appropriate dashboard based on tier
      if (profile?.tier === "pro") {
        url.pathname = "/dashboard/pro"
      } else {
        url.pathname = "/dashboard/free"
      }
      return NextResponse.redirect(url)
    }

    if (user && request.nextUrl.pathname === "/dashboard") {
      const { data: profile } = await supabase.from("profiles").select("tier").eq("id", user.id).single()

      const url = request.nextUrl.clone()
      if (profile?.tier === "pro") {
        url.pathname = "/dashboard/pro"
      } else {
        url.pathname = "/dashboard/free"
      }
      return NextResponse.redirect(url)
    }

    return supabaseResponse
  } catch (error) {
    console.error("[v0] Supabase middleware error:", error)
    return supabaseResponse
  }
}
