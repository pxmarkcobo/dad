"use client"

import * as React from "react"
import { SelectedMemberProvider } from "@/contexts/members-context"

import MemberCardInformation from "@/components/member-card"
import MobileSidebar from "@/components/mobile-sidebar"

import { MembersTable } from "./_components/table"

export default function Dashboard() {
  return (
    <SelectedMemberProvider>
      <h1 className="text-2xl/8 font-semibold text-zinc-950 dark:text-white sm:text-xl/8">
        <MobileSidebar />
        Dashboard
      </h1>
      <hr className="mt-6 w-full border-t border-zinc-950/10 dark:border-white/10" />
      <div className=" grid items-start gap-4 p-4 sm:px-6 md:gap-8 xl:grid-cols-2">
        <div className="grid auto-rows-max items-start gap-4 md:gap-8 xl:col-span-1">
          <MembersTable />
        </div>
        <MemberCardInformation />
      </div>
    </SelectedMemberProvider>
  )
}
