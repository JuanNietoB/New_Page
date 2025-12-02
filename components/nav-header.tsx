"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { useAuth } from "@/components/auth-provider"
import { useLanguage } from "@/components/language-provider"
import { useRouter } from "next/navigation"
import { useState, useEffect } from "react"
import Image from "next/image"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import { User, LogOut, Settings, LayoutDashboard, Languages, Menu } from "lucide-react"

export function NavHeader() {
  const { user, refreshUser } = useAuth()
  const { language, setLanguage, t } = useLanguage()
  const router = useRouter()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  useEffect(() => {
    console.log("[v0] Nav header mounted, user tier:", user?.tier)
    refreshUser()
  }, [])

  const handleSignOut = async () => {
    try {
      await fetch("/api/auth/signout", { method: "POST" })
      await refreshUser()
      setMobileMenuOpen(false)
      router.push("/")
      router.refresh()
    } catch (error) {
      console.error("[v0] Sign out error:", error)
    }
  }

  const toggleLanguage = () => {
    setLanguage(language === "en" ? "es" : "en")
  }

  const dashboardUrl = user?.tier === "pro" ? "/dashboard/pro" : "/dashboard/free"
  console.log("[v0] Dashboard URL for user:", { email: user?.email, tier: user?.tier, url: dashboardUrl })

  return (
    <header className="border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50">
      <nav className="container mx-auto flex h-16 items-center justify-between px-4">
        <div className="flex items-center gap-4 md:gap-8">
          <Link href="/" className="flex items-center gap-2">
            <div className="relative h-12 w-12">
              <Image src="/logo.jpeg" alt="EnergyStore Logo" fill className="object-contain" priority />
            </div>
            <span className="font-semibold text-base md:text-lg">EnergyStore</span>
          </Link>

          <div className="hidden md:flex items-center gap-6">
            <Link
              href="/about"
              className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
            >
              {t.about}
            </Link>
            <Link
              href="/pricing"
              className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
            >
              {t.pricing}
            </Link>
            <Link
              href="/blog"
              className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
            >
              {t.blog}
            </Link>
            <Link
              href="/contact"
              className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
            >
              {t.contact}
            </Link>
          </div>
        </div>

        <div className="flex items-center gap-2 md:gap-4">
          <Button variant="outline" size="sm" onClick={toggleLanguage} className="gap-2 hidden sm:flex bg-transparent">
            <Languages className="h-4 w-4" />
            <span className="font-medium">{language === "en" ? "ES" : "EN"}</span>
          </Button>

          {user ? (
            <>
              <Link href={dashboardUrl} className="hidden md:block">
                <Button variant="ghost" size="sm">
                  <LayoutDashboard className="mr-2 h-4 w-4" />
                  {t.dashboard}
                </Button>
              </Link>

              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" size="sm" className="gap-2 bg-transparent">
                    <User className="h-4 w-4" />
                    <span className="hidden sm:inline">{user.name}</span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56">
                  <DropdownMenuLabel>
                    <div className="flex flex-col gap-1">
                      <p className="text-sm font-medium">{user.name}</p>
                      <p className="text-xs text-muted-foreground">{user.email}</p>
                      <p className="text-xs font-semibold text-primary mt-1">
                        {user.tier === "pro" ? t.proPlan : t.freeTrial}
                      </p>
                    </div>
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem asChild className="md:hidden">
                    <Link href={dashboardUrl}>
                      <LayoutDashboard className="mr-2 h-4 w-4" />
                      {t.dashboard}
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link href="/account">
                      <Settings className="mr-2 h-4 w-4" />
                      {t.myAccount}
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={handleSignOut}>
                    <LogOut className="mr-2 h-4 w-4" />
                    {t.signOut}
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </>
          ) : (
            <>
              <Link href="/signin" className="hidden sm:block">
                <Button variant="ghost" size="sm">
                  {t.signIn}
                </Button>
              </Link>
              <Link href="/signup">
                <Button size="sm" className="text-xs sm:text-sm">
                  <span className="hidden sm:inline">{t.startFreeTrial}</span>
                  <span className="sm:hidden">Sign Up</span>
                </Button>
              </Link>
            </>
          )}

          <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
            <SheetTrigger asChild className="md:hidden">
              <Button variant="ghost" size="sm" className="px-2">
                <Menu className="h-5 w-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[300px]">
              <SheetHeader>
                <SheetTitle>Menu</SheetTitle>
              </SheetHeader>
              <div className="flex flex-col gap-4 mt-8">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={toggleLanguage}
                  className="gap-2 justify-start sm:hidden bg-transparent"
                >
                  <Languages className="h-4 w-4" />
                  <span className="font-medium">{language === "en" ? "Switch to Spanish" : "Cambiar a Inglés"}</span>
                </Button>
                <Link href="/about" onClick={() => setMobileMenuOpen(false)}>
                  <Button variant="ghost" className="w-full justify-start">
                    {t.about}
                  </Button>
                </Link>
                <Link href="/pricing" onClick={() => setMobileMenuOpen(false)}>
                  <Button variant="ghost" className="w-full justify-start">
                    {t.pricing}
                  </Button>
                </Link>
                <Link href="/blog" onClick={() => setMobileMenuOpen(false)}>
                  <Button variant="ghost" className="w-full justify-start">
                    {t.blog}
                  </Button>
                </Link>
                <Link href="/contact" onClick={() => setMobileMenuOpen(false)}>
                  <Button variant="ghost" className="w-full justify-start">
                    {t.contact}
                  </Button>
                </Link>
                {!user && (
                  <Link href="/signin" onClick={() => setMobileMenuOpen(false)} className="mt-4">
                    <Button variant="outline" className="w-full bg-transparent">
                      {t.signIn}
                    </Button>
                  </Link>
                )}
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </nav>
    </header>
  )
}
