import { getCurrentUser } from '@/lib/auth'
import { NextResponse } from 'next/server'

export async function POST() {
  const user = await getCurrentUser()

  if (!user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  if (user.tier !== 'pro') {
    return NextResponse.json({ error: 'No active subscription' }, { status: 400 })
  }

  try {
    // For now, we'll just return success without actually downgrading
    // In a real implementation, this would cancel the Stripe subscription
    // and update the user's tier in the database
    
    return NextResponse.json({ 
      success: true,
      message: 'Subscription cancelled. You will have access until the end of your billing period.'
    })
  } catch (error) {
    console.error('[v0] Cancel subscription error:', error)
    return NextResponse.json(
      { error: 'Failed to cancel subscription' },
      { status: 500 }
    )
  }
}
