import PageHeader from "@/components/header/page-header"

import { OfficerTabs } from "./_components/tabs"

export default function Officers() {
  return (
    <>
      <PageHeader title="Officers" />
      <section className="p-4 sm:px-6">
        <OfficerTabs />
      </section>
    </>
  )
}
