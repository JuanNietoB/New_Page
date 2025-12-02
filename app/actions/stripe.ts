'use server'

import { stripe } from '@/lib/stripe'
import { PRODUCTS } from '@/lib/products'
import { createClient } from '@/lib/supabase/server'
import { revalidatePath } from 'next/cache'

export async function startCheckoutSession(productId: string) {
  const product = PRODUCTS.find(p => p.id === productId)
  if (!product) {
    throw new Error(`Product with id "${productId}" not found`)
  }

  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  
  if (!user) {
    throw new Error('User must be authenticated to start checkout')
  }

  // Create Checkout Session
  const session = await stripe.checkout.sessions.create({
    customer_email: user.email,
    ui_mode: 'embedded',
    redirect_on_completion: 'never',
    line_items: [
      {
        price_data: {
          currency: "usd",
          product_data: {
            name: product.name,
            description: product.description,
          },
          unit_amount: product.priceInCents,
          recurring: product.type === 'monthly' ? {
            interval: 'month'
          } : {
            interval: 'year'
          }
        },
        quantity: 1,
      },
    ],
    mode: 'subscription',
    metadata: {
      userId: user.id,
      productId: product.id,
      planType: product.type
    }
  })

  return session.client_secret
}

export async function handleSuccessfulPayment(sessionId: string) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  
  if (!user) {
    throw new Error('User must be authenticated')
  }

  // Retrieve the session from Stripe
  const session = await stripe.checkout.sessions.retrieve(sessionId)
  
  if (session.payment_status === 'paid') {
    const planType = session.metadata?.planType as 'monthly' | 'annual'
    
    await supabase
      .from('profiles')
      .update({ tier: 'pro' })
      .eq('id', user.id)

    await supabase
      .from('subscriptions')
      .insert({
        user_id: user.id,
        status: 'active',
        plan_type: planType,
        amount: session.amount_total! / 100,
        stripe_subscription_id: session.subscription as string,
        start_date: new Date().toISOString(),
        end_date: new Date(Date.now() + (planType === 'monthly' ? 30 : 365) * 24 * 60 * 60 * 1000).toISOString()
      })

    await supabase
      .from('payment_history')
      .insert({
        user_id: user.id,
        amount: session.amount_total! / 100,
        status: 'succeeded',
        payment_method: session.payment_method_types[0],
        stripe_payment_id: session.payment_intent as string
      })

    revalidatePath('/dashboard')
    revalidatePath('/account')
    
    return { success: true }
  }

  return { success: false, error: 'Payment not completed' }
}

export async function cancelSubscription() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  
  if (!user) {
    throw new Error('User must be authenticated')
  }

  const { data: subscription } = await supabase
    .from('subscriptions')
    .select('*')
    .eq('user_id', user.id)
    .eq('status', 'active')
    .single()

  if (!subscription || !subscription.stripe_subscription_id) {
    throw new Error('No active subscription found')
  }

  // Cancel the subscription in Stripe
  await stripe.subscriptions.cancel(subscription.stripe_subscription_id)

  await supabase
    .from('subscriptions')
    .update({ 
      status: 'cancelled',
      end_date: new Date().toISOString()
    })
    .eq('id', subscription.id)

  await supabase
    .from('profiles')
    .update({ tier: 'free' })
    .eq('id', user.id)

  revalidatePath('/dashboard')
  revalidatePath('/account')

  return { success: true }
}
