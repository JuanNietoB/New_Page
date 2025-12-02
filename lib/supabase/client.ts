import { createBrowserClient as createSupabaseBrowserClient } from "@supabase/ssr"

export const createBrowserClient = () => {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

  if (!supabaseUrl || !supabaseAnonKey) {
    console.warn("[v0] Supabase credentials not found in browser client, returning mock client")
    // Return a mock client that won't crash the app
    return {
      auth: {
        getUser: async () => ({ data: { user: null }, error: { message: "No credentials" } }),
        getSession: async () => ({ data: { session: null }, error: { message: "No credentials" } }),
        signInWithPassword: async () => ({ data: { user: null, session: null }, error: { message: "No credentials" } }),
        signUp: async () => ({ data: { user: null, session: null }, error: { message: "No credentials" } }),
        signOut: async () => ({ error: null }),
      },
      from: () => ({
        select: () => ({
          eq: () => ({
            single: async () => ({ data: null, error: { message: "No credentials" } }),
          }),
        }),
      }),
    } as any
  }

  return createSupabaseBrowserClient(supabaseUrl, supabaseAnonKey)
}

// Keep the old export for backward compatibility
export function createClient() {
  return createBrowserClient()
}
