import QueryClientProvider from "@/contexts/query-client-context"

import Sidebar from "@/components/sidebar"
import SiteHeader from "@/components/site-header"

export default function AuthenticatedLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <QueryClientProvider>
      <SiteHeader />
      <div className="flex-1">
        <div className="flex min-h-screen w-full flex-row bg-muted/40">
          <Sidebar />
          <main className="flex-1">{children}</main>
        </div>
      </div>
    </QueryClientProvider>
  )
}
