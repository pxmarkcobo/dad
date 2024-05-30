import PageHeader from "@/components/page-header"

import RegistrationForm from "./_components/form"

export default function Registration() {
  return (
    <>
      <PageHeader title="Register" />
      <section className="p-4 sm:px-6">
        <RegistrationForm />
      </section>
    </>
  )
}
