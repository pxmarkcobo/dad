import { ScrollArea } from "@/components/ui/scroll-area"
import PageHeader from "@/components/header/page-header"

import MemberForm from "./_components/form"

export default function Registration() {
  return (
    <div className="flex h-full flex-col">
      <PageHeader title="Register" />
      <ScrollArea className="flex-1 p-4 sm:px-6">
        <MemberForm />
      </ScrollArea>
    </div>
  )
}
