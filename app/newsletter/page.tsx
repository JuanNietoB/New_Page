'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { Mail, TrendingUp, FileText, Bell } from 'lucide-react'

export default function NewsletterPage() {
  const [email, setEmail] = useState('')
  const [name, setName] = useState('')
  const [subscribed, setSubscribed] = useState(false)
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    
    // Simulate subscription
    await new Promise(resolve => setTimeout(resolve, 1000))
    
    setSubscribed(true)
    setLoading(false)
    setEmail('')
    setName('')
  }

  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="container mx-auto px-4 py-20">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-balance font-bold text-5xl md:text-6xl mb-6">
            Stay Informed on Energy Storage
          </h1>
          <p className="text-pretty text-muted-foreground text-lg md:text-xl leading-relaxed">
            Get the latest insights, market trends, and project updates delivered directly to your inbox every week.
          </p>
        </div>
      </section>

      {/* Newsletter Form */}
      <section className="container mx-auto px-4 pb-12">
        <div className="max-w-2xl mx-auto">
          <Card>
            <CardHeader>
              <CardTitle className="text-2xl">Subscribe to Our Newsletter</CardTitle>
              <CardDescription>
                Join thousands of energy professionals staying ahead of market trends
              </CardDescription>
            </CardHeader>
            <CardContent>
              {subscribed ? (
                <Alert>
                  <AlertDescription className="text-base">
                    Thank you for subscribing! Check your email to confirm your subscription.
                  </AlertDescription>
                </Alert>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Name</Label>
                    <Input
                      id="name"
                      type="text"
                      placeholder="John Doe"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="you@company.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                    />
                  </div>

                  <Button type="submit" className="w-full" disabled={loading}>
                    {loading ? 'Subscribing...' : 'Subscribe Now'}
                  </Button>

                  <p className="text-xs text-muted-foreground text-center">
                    We respect your privacy. Unsubscribe at any time.
                  </p>
                </form>
              )}
            </CardContent>
          </Card>
        </div>
      </section>

      {/* What You'll Get Section */}
      <section className="bg-muted/50 py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            <h2 className="text-balance font-bold text-3xl md:text-4xl mb-12 text-center">
              What You Will Get
            </h2>
            
            <div className="grid md:grid-cols-2 gap-8">
              <Card>
                <CardContent className="pt-6">
                  <TrendingUp className="h-12 w-12 text-primary mb-4" />
                  <h3 className="font-semibold text-xl mb-3">Market Trends</h3>
                  <p className="text-muted-foreground leading-relaxed">
                    Weekly analysis of BESS deployment trends, capacity additions, and regional market dynamics across the Americas.
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="pt-6">
                  <FileText className="h-12 w-12 text-primary mb-4" />
                  <h3 className="font-semibold text-xl mb-3">Project Updates</h3>
                  <p className="text-muted-foreground leading-relaxed">
                    Notifications about new BESS projects, status changes, and major milestones in energy storage development.
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="pt-6">
                  <Bell className="h-12 w-12 text-primary mb-4" />
                  <h3 className="font-semibold text-xl mb-3">Policy Insights</h3>
                  <p className="text-muted-foreground leading-relaxed">
                    Updates on regulatory changes, incentive programs, and policy developments affecting energy storage markets.
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="pt-6">
                  <Mail className="h-12 w-12 text-primary mb-4" />
                  <h3 className="font-semibold text-xl mb-3">Exclusive Content</h3>
                  <p className="text-muted-foreground leading-relaxed">
                    Access to special reports, industry interviews, and deep-dive analyses not available elsewhere.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
