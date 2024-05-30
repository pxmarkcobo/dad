import MobileSidebar from "@/components/mobile-sidebar"

import RegistrationForm from "./_components/form"

export default function Registration() {
  return (
    <>
      <h1 className="text-2xl/8 font-semibold text-zinc-950 dark:text-white sm:text-xl/8">
        <MobileSidebar />
        Registration
      </h1>
      <hr className="mt-6 w-full border-t border-zinc-950/10 dark:border-white/10" />
      <section className="p-4 sm:px-6">
        <RegistrationForm />
      </section>
    </>
  )
}
