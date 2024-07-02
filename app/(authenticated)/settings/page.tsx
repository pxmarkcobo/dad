"use client"

import { ScrollArea } from "@/components/ui/scroll-area"
import PageHeader from "@/components/header/page-header"

import ExportRegistrationData from "./_components/actions/export-registration-data/trigger"
import ProfileForm from "./_components/profile-form"

export default function Settings() {
  return (
    <div className="flex h-full flex-col">
      <PageHeader title="Settings" />
      <ScrollArea className="flex-1 p-4 sm:px-6">
        <ProfileForm />
        <section className="mt-4 space-y-8 border-t pt-4">
          <h2 className="font-semibold">Admin Actions</h2>
          <ExportRegistrationData />
        </section>
      </ScrollArea>
    </div>
  )
}
