import MobileHeader from "./mobile-header"

export default function PageHeader({ title }: { title: string }) {
  return (
    <>
      <MobileHeader />
      <h1 className="px-4 text-2xl/8 font-semibold text-zinc-950 dark:text-white sm:text-xl/8">
        {title}
      </h1>
      <hr className="mt-6 w-full border-t border-zinc-950/10 dark:border-white/10" />
    </>
  )
}
