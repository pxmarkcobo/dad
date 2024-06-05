import * as React from "react"
import { MemberInfoProvider } from "@/contexts/member-info-context"

import PageHeader from "@/components/page-header"

import MemberCardInformation from "./_components/member-card"
import { MembersTable } from "./_components/table"

export default function Home() {
  return (
    <MemberInfoProvider>
      <PageHeader title="Dashboard" />
      <div className=" grid items-start gap-4 p-4 md:gap-8 xl:grid-cols-3">
        <div className="grid auto-rows-max items-start gap-4 md:gap-8 xl:col-span-2">
          <MembersTable />
        </div>
        <MemberCardInformation />
      </div>
    </MemberInfoProvider>
  )
}
