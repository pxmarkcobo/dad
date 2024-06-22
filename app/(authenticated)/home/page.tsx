"use client"

import { MemberInfoProvider } from "@/contexts/member-info-context"

import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable"
import { ScrollArea } from "@/components/ui/scroll-area"
import PageHeader from "@/components/header/page-header"

import MemberCardInformation from "./_components/member-card"
import { MembersTable } from "./_components/table"

export default function Home() {
  return (
    <MemberInfoProvider>
      <div className="flex h-full flex-col">
        <PageHeader title="Dashboard" />
        <ResizablePanelGroup
          direction="horizontal"
          className="flex flex-1 p-4 sm:px-6"
        >
          <ResizablePanel className="h-full" defaultSize={60} minSize={40}>
            <ScrollArea className="h-full">
              <MembersTable />
            </ScrollArea>
          </ResizablePanel>
          <ResizableHandle withHandle className="mx-1" />
          <ResizablePanel className="h-full" defaultSize={40} minSize={30}>
            <MemberCardInformation />
          </ResizablePanel>
        </ResizablePanelGroup>
      </div>
    </MemberInfoProvider>
  )
}
