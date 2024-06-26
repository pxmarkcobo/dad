import MobileHeader from "./mobile-header"

export default function PageHeader({ title }: { title: string }) {
  return (
    <div id="page-header">
      <MobileHeader />
      <h1 className="px-4 text-2xl/8 font-semibold sm:text-xl/8">{title}</h1>
      <hr className="mt-4 w-full border-t border-zinc-950/10 dark:border-white/10" />
    </div>
  )
}
