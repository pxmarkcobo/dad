"use client"

import { ReactNode, createContext, useContext, useState } from "react"

import { Collector, Coordinator, Member, Zone } from "@/lib/schema"

interface GlobalDataInterface {
  zones: Zone[]
  collectors: Collector[]
  coordinators: Coordinator[]
  isHydrated: boolean
}

export const GlobalDataContext = createContext<GlobalDataInterface | undefined>(
  undefined
)

export const useGlobalData = (): GlobalDataInterface => {
  const context = useContext(GlobalDataContext)
  if (!context) {
    throw new Error("useGlobalData must be used within a GlobalDataProvider")
  }
  return context
}

export function GlobalDataProvider({
  children,
}: {
  children: ReactNode
}): JSX.Element {
  const [zones, setZones] = useState<Zone[]>([])
  const [collectors, setCollectors] = useState<Collector[]>([])
  const [coordinators, setCoordinators] = useState<Coordinator[]>([])
  const [isHydrated, hydrate] = useState<boolean>(false)

  // TODO: fetch initial data on hydrate
  // cache data
  return (
    <GlobalDataContext.Provider
      value={{ zones, collectors, coordinators, isHydrated }}
    >
      {children}
    </GlobalDataContext.Provider>
  )
}
