import { getCurrentUser } from "@/lib/auth"
import { NextResponse } from "next/server"

export async function POST(request: Request) {
  const user = await getCurrentUser()

  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  if (user.tier === "pro") {
    return NextResponse.json({ error: "Already a Pro member" }, { status: 400 })
  }

  return NextResponse.json(
    {
      error: "Please use Stripe checkout to upgrade",
      checkoutUrl: "/api/stripe/create-checkout-session",
    },
    { status: 400 },
  )
}
