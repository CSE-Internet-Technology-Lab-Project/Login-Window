import { cn } from '@/lib/utils'

export function Card({ className, ...props }) {
  return (
    <div
      className={cn(
        'rounded-2xl border border-[var(--color-sage)]/15 bg-white/90 shadow-lg shadow-[var(--color-ink)]/5 backdrop-blur',
        className,
      )}
      {...props}
    />
  )
}

export function CardHeader({ className, ...props }) {
  return <div className={cn('space-y-1.5 p-6 pb-2', className)} {...props} />
}

export function CardTitle({ className, ...props }) {
  return <h2 className={cn('text-xl font-semibold tracking-tight', className)} {...props} />
}

export function CardDescription({ className, ...props }) {
  return <p className={cn('text-sm text-[var(--color-ink)]/60', className)} {...props} />
}

export function CardContent({ className, ...props }) {
  return <div className={cn('p-6 pt-4', className)} {...props} />
}
