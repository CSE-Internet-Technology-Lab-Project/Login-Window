import { cn } from '@/lib/utils'

export function Input({ className, ...props }) {
  return (
    <input
      className={cn(
        'flex h-11 w-full rounded-lg border border-[var(--color-sage)]/25 bg-white px-3 text-sm text-[var(--color-ink)] outline-none placeholder:text-[var(--color-ink)]/40 focus:border-[var(--color-leaf)] focus:ring-2 focus:ring-[var(--color-leaf)]/20',
        className,
      )}
      {...props}
    />
  )
}
