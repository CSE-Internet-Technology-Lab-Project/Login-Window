export function AuthLayout({ children }) {
  return (
    <div className="bg-auth bg-grid relative flex min-h-screen items-center justify-center px-4 py-10">
      <div
        className="pointer-events-none absolute left-1/2 top-16 h-40 w-40 -translate-x-1/2 rounded-full bg-[var(--color-leaf)]/20 blur-3xl"
        style={{ animation: 'soft-pulse 5s ease-in-out infinite' }}
      />
      <div className="relative z-10 w-full max-w-md">{children}</div>
    </div>
  )
}
