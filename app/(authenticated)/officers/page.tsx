import { ScrollArea } from "@/components/ui/scroll-area"
import PageHeader from "@/components/header/page-header"

import { OfficerTabs } from "./_components/tabs"

export default function Officers() {
  return (
    <div className="flex h-full flex-col">
      <PageHeader title="Officers" />
      <ScrollArea className="flex-1 p-4 sm:px-6">
        <OfficerTabs />
      </ScrollArea>
    </div>
  )
}
