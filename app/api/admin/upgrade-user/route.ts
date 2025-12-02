import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'

export async function POST(request: NextRequest) {
  try {
    const supabase = await createClient()

    // Check if user is admin
    const {
      data: { user },
    } = await supabase.auth.getUser()

    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { data: profile } = await supabase
      .from('profiles')
      .select('is_admin')
      .eq('id', user.id)
      .single()

    if (!profile?.is_admin) {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 })
    }

    // Get email from request
    const { email } = await request.json()

    if (!email) {
      return NextResponse.json({ error: 'Email is required' }, { status: 400 })
    }

    // Update user to Pro tier
    const { data: updatedUser, error } = await supabase
      .from('profiles')
      .update({
        tier: 'pro',
        trial_end_date: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000).toISOString(), // 1 year from now
        updated_at: new Date().toISOString(),
      })
      .eq('email', email)
      .select()
      .single()

    if (error) {
      console.error('[v0] Error upgrading user:', error)
      return NextResponse.json(
        { error: error.message || 'User not found or already Pro' },
        { status: 400 }
      )
    }

    return NextResponse.json({ user: updatedUser })
  } catch (error) {
    console.error('[v0] Error in upgrade user API:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
