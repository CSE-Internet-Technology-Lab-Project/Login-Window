import { useNavigate } from 'react-router-dom'
import { toast } from 'sonner'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { useAuth } from '@/context/AuthContext'

export default function DashboardPage() {
  const navigate = useNavigate()
  const { user, logout } = useAuth()

  const handleLogout = () => {
    logout()
    toast.success('Logged out')
    navigate('/login')
  }

  const memberSince = user?.createdAt
    ? new Date(user.createdAt).toLocaleDateString()
    : 'Just now'

  return (
    <div className="bg-auth bg-grid min-h-screen px-4 py-10">
      <div className="mx-auto max-w-lg animate-fade-up">
        <div className="mb-8 flex items-end justify-between gap-4">
          <div>
            <p className="font-[family-name:var(--font-display)] text-4xl text-[var(--color-ink)]">
              Login Window
            </p>
            <p className="mt-1 text-sm text-[var(--color-ink)]/55">Your account</p>
          </div>
          <Button variant="outline" onClick={handleLogout}>
            Logout
          </Button>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Signed in</CardTitle>
            <CardDescription>Profile loaded from the backend `/api/auth/me` endpoint.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3 text-sm">
            <div className="flex justify-between gap-4 border-b border-[var(--color-sage)]/10 py-2">
              <span className="text-[var(--color-ink)]/55">Username</span>
              <span className="font-medium">{user?.username}</span>
            </div>
            <div className="flex justify-between gap-4 border-b border-[var(--color-sage)]/10 py-2">
              <span className="text-[var(--color-ink)]/55">Email</span>
              <span className="font-medium">{user?.email}</span>
            </div>
            <div className="flex justify-between gap-4 py-2">
              <span className="text-[var(--color-ink)]/55">Member since</span>
              <span className="font-medium">{memberSince}</span>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
