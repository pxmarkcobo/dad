"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { useAuthContext } from "@/contexts/auth-context"
import { useGlobalContext } from "@/contexts/global-context"
import QueryClientProvider from "@/contexts/query-client-context"

import { cn } from "@/lib/utils"
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Toaster } from "@/components/ui/sonner"
import { TooltipProvider } from "@/components/ui/tooltip"
import LoadingScreen from "@/components/loading-screen"
import Sidebar from "@/components/sidebar/sidebar"

export default function AuthenticatedLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const [isCollapsed, setIsCollapsed] = useState(true)

  const { hydrated } = useGlobalContext()

  const router = useRouter()
  const { user } = useAuthContext()

  useEffect(() => {
    if (!user) {
      router.replace("/") // redirect to login
    }
  }, [user, router])

  if (!hydrated) {
    return <LoadingScreen />
  }
  return (
    <TooltipProvider delayDuration={0}>
      <QueryClientProvider>
        <ResizablePanelGroup
          direction="horizontal"
          className="bg-zinc-100 dark:bg-zinc-950"
        >
          <ResizablePanel
            defaultSize={4}
            minSize={15}
            maxSize={20}
            collapsedSize={4}
            defaultChecked
            collapsible={true}
            onCollapse={() => {
              setIsCollapsed(true)
            }}
            onExpand={() => {
              setIsCollapsed(false)
            }}
            className={cn(
              isCollapsed && "min-w-[50px]",
              "h-screen max-w-[240px] transition-all duration-300 ease-in-out max-lg:hidden"
            )}
          >
            <Sidebar collapsed={isCollapsed} />
          </ResizablePanel>
          <ResizableHandle withHandle />
          <ResizablePanel
            className="m-1 h-screen bg-white p-4 dark:bg-zinc-900 lg:rounded-lg lg:shadow-sm lg:ring-1 lg:ring-zinc-950/5 dark:lg:ring-white/10"
            defaultSize={80}
            minSize={80}
          >
            {children}
          </ResizablePanel>
        </ResizablePanelGroup>
        <Toaster />
      </QueryClientProvider>
    </TooltipProvider>
  )
}
