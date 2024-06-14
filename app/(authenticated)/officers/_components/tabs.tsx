"use client"

import { usePathname, useRouter, useSearchParams } from "next/navigation"

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

import { RegisterCollector } from "./collectors/register"
import { CollectorsTable } from "./collectors/table"
import { RegisterCoordinator } from "./coordinators/register"
import { CoordinatorsTable } from "./coordinators/table"

export function OfficerTabs() {
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
          <CoordinatorsTable />
        </div>
      </TabsContent>
      <TabsContent value="collectors">
        <div className="pt-6">
          <RegisterCollector />
          <CollectorsTable />
        </div>
      </TabsContent>
    </Tabs>
  )
}
