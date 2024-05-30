"use client"

import {
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react"

import { Collector, Coordinator, Member, Zone } from "@/lib/schema"
import { fetchCollectors, fetchCoordinators, fetchZones } from "@/lib/utils"

interface GlobalDataInterface {
  zones: Zone[]
  collectors: Collector[]
  coordinators: Coordinator[]
  hydrated: boolean
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
  const [hydrated, hydrate] = useState<boolean>(false)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const zones = await fetchZones()
        setZones(zones)

        const collectors = await fetchCollectors()
        setCollectors(collectors)

        const coordinators = await fetchCoordinators()
        setCoordinators(coordinators)

        hydrate(true)
      } catch (error) {
        console.error("Failed to fetch data", error)
      }
    }

    fetchData()
  }, []) // Empty dependency array ensures this runs once when component mounts

  return (
    <GlobalDataContext.Provider
      value={{ zones, collectors, coordinators, hydrated }}
    >
      {children}
    </GlobalDataContext.Provider>
  )
}
