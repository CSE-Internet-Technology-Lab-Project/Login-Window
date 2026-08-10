import { cn } from '@/lib/utils'

export function Button({ className, variant = 'default', size = 'default', ...props }) {
  return (
    <button
      className={cn(
        'inline-flex items-center justify-center rounded-lg text-sm font-semibold transition disabled:pointer-events-none disabled:opacity-60',
        variant === 'default' && 'bg-[var(--color-leaf)] text-white hover:bg-[var(--color-sage)]',
        variant === 'outline' &&
          'border border-[var(--color-sage)]/30 bg-white text-[var(--color-ink)] hover:bg-[var(--color-mist)]',
        variant === 'ghost' && 'bg-transparent text-[var(--color-sage)] hover:bg-[var(--color-mist)]',
        size === 'default' && 'h-11 px-4',
        size === 'sm' && 'h-9 px-3',
        className,
      )}
      {...props}
    />
  )
}
