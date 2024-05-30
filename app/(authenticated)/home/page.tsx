"use client"

import * as React from "react"
import { SelectedMemberProvider } from "@/contexts/members-context"

import PageHeader from "@/components/page-header"

import MemberCardInformation from "./_components/member-card"
import { MembersTable } from "./_components/table"

export default function Dashboard() {
  return (
    <SelectedMemberProvider>
      <PageHeader title="Dashboard" />
      <div className=" grid items-start gap-4 p-4 sm:px-6 md:gap-8 xl:grid-cols-2">
        <div className="grid auto-rows-max items-start gap-4 md:gap-8 xl:col-span-1">
          <MembersTable />
        </div>
        <MemberCardInformation />
      </div>
    </SelectedMemberProvider>
  )
}
