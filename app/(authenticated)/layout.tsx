"use client"

import { useGlobalData } from "@/contexts/global-context"
import QueryClientProvider from "@/contexts/query-client-context"

import { Toaster } from "@/components/ui/sonner"
import LoadingScreen from "@/components/loading-screen"
import Sidebar from "@/components/sidebar"

export default function AuthenticatedLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const { hydrated } = useGlobalData()

  if (!hydrated) {
    return <LoadingScreen />
  }
  return (
    <QueryClientProvider>
      <div className="relative isolate flex min-h-svh w-full bg-white dark:bg-zinc-900 max-lg:flex-col lg:bg-zinc-100 dark:lg:bg-zinc-950">
        <div className="fixed inset-y-0 left-0 w-64 max-lg:hidden">
          <Sidebar />
        </div>
        <main className="flex flex-1 flex-col pb-2 lg:min-w-0 lg:pl-64 lg:pr-2 lg:pt-2">
          <div className="grow p-6 lg:rounded-lg lg:bg-white lg:p-10 lg:shadow-sm lg:ring-1 lg:ring-zinc-950/5 dark:lg:bg-zinc-900 dark:lg:ring-white/10">
            <div className="max-w-8xl mx-auto">{children}</div>
          </div>
        </main>
      </div>
      <Toaster />
    </QueryClientProvider>
  )
}
