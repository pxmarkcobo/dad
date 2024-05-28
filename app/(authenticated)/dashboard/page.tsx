"use client"

import * as React from "react"
import { SelectedMemberProvider } from "@/contexts/members-context"

import MemberCardInformation from "@/components/member-card"

import { MembersTable } from "./_components/table"

export default function Dashboard() {
  return (
    <SelectedMemberProvider>
      <div className=" grid items-start gap-4 p-4 sm:px-6 md:gap-8 lg:grid-cols-3">
        <div className="grid auto-rows-max items-start gap-4 md:gap-8 lg:col-span-2">
          <MembersTable />
        </div>
        <MemberCardInformation />
      </div>
    </SelectedMemberProvider>
  )
}
