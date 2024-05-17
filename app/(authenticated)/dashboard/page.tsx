"use client"

import * as React from "react"

import { DataTable } from "@/components/data-table/data-table"
import MembercardInformation from "@/components/member-card"

export default function Dashboard() {
  return (
    <>
      <div className="grid auto-rows-max items-start gap-4 md:gap-8 lg:col-span-2">
        <DataTable />
      </div>
      <MembercardInformation />
    </>
  )
}
