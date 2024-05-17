import MobileSidebar from "@/components/mobile-sidebar"
import Sidebar from "@/components/sidebar"
import SiteHeader from "@/components/site-header"

export default function AuthenticatedLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <>
      <SiteHeader />
      <div className="flex-1">
        <div className="flex min-h-screen w-full flex-row bg-muted/40">
          <Sidebar />
          <div className="flex flex-col sm:gap-4">
            <main className="grid flex-1 items-start gap-4 p-4 sm:px-6 md:gap-8 lg:grid-cols-3 xl:grid-cols-3">
              {children}
            </main>
          </div>
        </div>
      </div>
    </>
  )
}
