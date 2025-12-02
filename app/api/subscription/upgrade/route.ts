import { getCurrentUser, upgradeToPro } from '@/lib/auth'
import { NextResponse } from 'next/server'

export async function POST(request: Request) {
  const user = await getCurrentUser()

  if (!user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  if (user.tier === 'pro') {
    return NextResponse.json({ error: 'Already a Pro member' }, { status: 400 })
  }

  try {
    const { billingCycle, paymentMethod } = await request.json()

    // In production, this would process payment with Stripe
    // For now, we'll just upgrade the user
    const result = await upgradeToPro(user.id)

    if (!result.success) {
      return NextResponse.json({ error: result.error }, { status: 400 })
    }

    return NextResponse.json({ 
      success: true, 
      user: result.user,
      subscription: {
        tier: 'pro',
        billingCycle,
        status: 'active',
        nextBillingDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString()
      }
    })
  } catch (error) {
    console.error('Upgrade error:', error)
    return NextResponse.json({ error: 'Failed to process upgrade' }, { status: 500 })
  }
}
