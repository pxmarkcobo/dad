"use client"

import { start } from "@/lib/commands"
import { Button } from "@/components/ui/button"
import PageHeader from "@/components/page-header"

export default function Settings() {
  const run = async () => {
    await start()
  }
  return (
    <>
      <PageHeader title="Settings" />
      <section className="p-4 sm:px-6">
        <Button onClick={run}>Run Script</Button>
      </section>
    </>
  )
}
