export function CategoryChip({ children }: { children: string }) {
  return (
    <span className="inline-flex w-fit items-center rounded-4xl bg-secondary px-2.5 py-0.5 text-xs font-medium text-secondary-foreground">
      {children}
    </span>
  )
}
