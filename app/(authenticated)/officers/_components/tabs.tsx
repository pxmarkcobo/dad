"use client"

import { usePathname, useRouter, useSearchParams } from "next/navigation"
import { useGlobalContext } from "@/contexts/global-context"
import { UserPlus } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

import { RegisterCollector } from "./collectors/register"
import { columns as CollectorColumns } from "./collectors/table-columns"
import { RegisterCoordinator } from "./coordinators/register"
import { columns as CoordinatorColumns } from "./coordinators/table-columns"
import { OfficersTable } from "./table"

export function OfficerTabs() {
  const { collectors, coordinators } = useGlobalContext()
  const router = useRouter()
  const pathname = usePathname()
  const params = useSearchParams()
  const tab = params.get("tab") || "coordinators"

  const updateTabSearchParam = (value: string) => {
    router.push(`${pathname}?tab=${value}`)
  }

  return (
    <Tabs defaultValue={tab} className="w-full">
      <TabsList className="grid w-full grid-cols-2">
        <TabsTrigger
          value="coordinators"
          onClick={() => updateTabSearchParam("coordinators")}
        >
          Coordinators
        </TabsTrigger>
        <TabsTrigger
          value="collectors"
          onClick={() => updateTabSearchParam("collectors")}
        >
          Collectors
        </TabsTrigger>
      </TabsList>
      <TabsContent value="coordinators">
        <div className="pt-6">
          <RegisterCoordinator />
          <OfficersTable data={coordinators} columns={CoordinatorColumns} />
        </div>
      </TabsContent>
      <TabsContent value="collectors">
        <div className="pt-6">
          <RegisterCollector />
          <OfficersTable data={collectors} columns={CollectorColumns} />
        </div>
      </TabsContent>
    </Tabs>
  )
}