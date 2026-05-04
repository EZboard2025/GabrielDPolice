export default function Loading() {
  return (
    <div className="container-wide flex min-h-[40vh] items-center justify-center py-16">
      <div className="border-brand/30 border-t-brand size-10 animate-spin rounded-full border-2" />
      <span className="sr-only">Carregando…</span>
    </div>
  )
}
