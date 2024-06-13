import PageHeader from "@/components/header/page-header"

import MemberForm from "./_components/form"

export default function Registration() {
  return (
    <>
      <PageHeader title="Register" />
      <section className="p-4 sm:px-6">
        <MemberForm />
      </section>
    </>
  )
}
