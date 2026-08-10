import { AuthLayout } from '@/components/layout/AuthLayout'
import { RegisterForm } from '@/components/auth/RegisterForm'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'

export default function RegisterPage() {
  return (
    <AuthLayout>
      <div className="mb-8 text-center animate-fade-up">
        <p className="font-[family-name:var(--font-display)] text-5xl tracking-tight text-[var(--color-ink)]">
          Login Window
        </p>
        <p className="mt-2 text-sm text-[var(--color-ink)]/55">Create your account</p>
      </div>

      <Card className="animate-fade-up-delay">
        <CardHeader>
          <CardTitle>Get started</CardTitle>
          <CardDescription>Register with a username, email, and password.</CardDescription>
        </CardHeader>
        <CardContent>
          <RegisterForm />
        </CardContent>
      </Card>
    </AuthLayout>
  )
}
