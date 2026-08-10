import { AuthLayout } from '@/components/layout/AuthLayout'
import { LoginForm } from '@/components/auth/LoginForm'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'

export default function LoginPage() {
  return (
    <AuthLayout>
      <div className="mb-8 text-center animate-fade-up">
        <p className="font-[family-name:var(--font-display)] text-5xl tracking-tight text-[var(--color-ink)]">
          Login Window
        </p>
        <p className="mt-2 text-sm text-[var(--color-ink)]/55">Sign in to continue</p>
      </div>

      <Card className="animate-fade-up-delay">
        <CardHeader>
          <CardTitle>Welcome back</CardTitle>
          <CardDescription>Use your email and password to sign in.</CardDescription>
        </CardHeader>
        <CardContent>
          <LoginForm />
        </CardContent>
      </Card>
    </AuthLayout>
  )
}
