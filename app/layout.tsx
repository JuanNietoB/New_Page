import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { NavHeader } from "@/components/nav-header"
import { Footer } from "@/components/footer"
import { AuthProvider } from "@/components/auth-provider"
import { LanguageProvider } from "@/components/language-provider"
import { createClient } from "@/lib/supabase/server"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "EnergyStore - Battery Energy Storage Systems Analytics",
  description:
    "Track and analyze Battery Energy Storage Systems (BESS) growth across the Americas with comprehensive data and insights.",
  icons: {
    icon: [
      { url: "/icon.svg", type: "image/svg+xml" },
      { url: "/icon-light-32x32.png", sizes: "32x32", type: "image/png" },
    ],
    apple: "/apple-icon.png",
  },
    generator: 'v0.app'
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const supabase = await createClient()
  const {
    data: { user: authUser },
  } = await supabase.auth.getUser()

  let user = null

  if (authUser) {
    const { data: profile } = await supabase.from("profiles").select("*").eq("id", authUser.id).single()

    if (profile) {
      let trialExpired = false
      if (profile.tier === "free" && profile.trial_end_date) {
        const trialEnd = new Date(profile.trial_end_date)
        trialExpired = new Date() > trialEnd
      }

      user = {
        id: authUser.id,
        email: authUser.email,
        name: profile.full_name,
        tier: profile.tier,
        trialStartDate: profile.trial_start_date,
        trialExpired,
        isAdmin: profile.is_admin || false,
      }
    }
  }

  return (
    <html lang="en">
      <body className={inter.className}>
        <LanguageProvider>
          <AuthProvider initialUser={user}>
            <NavHeader />
            {children}
            <Footer />
          </AuthProvider>
        </LanguageProvider>
      </body>
    </html>
  )
}
