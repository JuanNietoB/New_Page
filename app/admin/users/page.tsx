'use client'

import { useState, useEffect } from 'react'
import { useAuth } from '@/components/auth-provider'
import { useRouter } from 'next/navigation'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { Badge } from '@/components/ui/badge'

export default function AdminUsersPage() {
  const { user, isAdmin } = useAuth()
  const router = useRouter()
  const [users, setUsers] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [upgradeEmail, setUpgradeEmail] = useState('')
  const [upgrading, setUpgrading] = useState(false)

  useEffect(() => {
    if (!user) {
      router.push('/signin')
      return
    }
    if (!isAdmin) {
      router.push('/dashboard/free')
      return
    }
    fetchUsers()
  }, [user, isAdmin, router])

  const fetchUsers = async () => {
    try {
      const response = await fetch('/api/admin/users')
      if (response.ok) {
        const data = await response.json()
        setUsers(data.users)
      }
    } catch (error) {
      console.error('Failed to fetch users:', error)
    } finally {
      setLoading(false)
    }
  }

  const upgradeUserToPro = async (email: string) => {
    setUpgrading(true)
    try {
      const response = await fetch('/api/admin/upgrade-user', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      })

      if (response.ok) {
        alert(`User ${email} has been upgraded to Pro!`)
        fetchUsers()
        setUpgradeEmail('')
      } else {
        const error = await response.json()
        alert(`Failed to upgrade user: ${error.error}`)
      }
    } catch (error) {
      alert('Failed to upgrade user')
    } finally {
      setUpgrading(false)
    }
  }

  if (!user || !isAdmin) {
    return null
  }

  return (
    <div className="container mx-auto py-8 px-4">
      <h1 className="text-3xl font-bold mb-8">User Management</h1>

      <Card className="mb-8">
        <CardHeader>
          <CardTitle>Upgrade User to Pro</CardTitle>
          <CardDescription>
            Enter an email address to grant Pro access (user must sign up first)
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex gap-4">
            <div className="flex-1">
              <Label htmlFor="email">Email Address</Label>
              <Input
                id="email"
                type="email"
                placeholder="user@example.com"
                value={upgradeEmail}
                onChange={(e) => setUpgradeEmail(e.target.value)}
              />
            </div>
            <div className="flex items-end">
              <Button
                onClick={() => upgradeUserToPro(upgradeEmail)}
                disabled={!upgradeEmail || upgrading}
              >
                {upgrading ? 'Upgrading...' : 'Upgrade to Pro'}
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>All Users</CardTitle>
          <CardDescription>Manage user accounts and subscriptions</CardDescription>
        </CardHeader>
        <CardContent>
          {loading ? (
            <p>Loading users...</p>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Email</TableHead>
                  <TableHead>Name</TableHead>
                  <TableHead>Tier</TableHead>
                  <TableHead>Trial End</TableHead>
                  <TableHead>Created</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {users.map((u) => (
                  <TableRow key={u.id}>
                    <TableCell>{u.email}</TableCell>
                    <TableCell>{u.full_name || '-'}</TableCell>
                    <TableCell>
                      <Badge variant={u.tier === 'pro' ? 'default' : 'secondary'}>
                        {u.tier.toUpperCase()}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      {u.trial_end_date
                        ? new Date(u.trial_end_date).toLocaleDateString()
                        : '-'}
                    </TableCell>
                    <TableCell>
                      {new Date(u.created_at).toLocaleDateString()}
                    </TableCell>
                    <TableCell>
                      {u.tier !== 'pro' && (
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => upgradeUserToPro(u.email)}
                          disabled={upgrading}
                        >
                          Upgrade
                        </Button>
                      )}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
