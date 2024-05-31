"use client"

import {
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react"

import {
  Collector,
  CollectorSchema,
  Coordinator,
  CoordinatorSchema,
  Member,
  Zone,
} from "@/lib/schema"
import { fetchCollectors, fetchCoordinators, fetchZones } from "@/lib/utils"

interface GlobalDataInterface {
  zones: Zone[]
  collectors: Collector[]
  coordinators: Coordinator[]
  modifyCollector(data: unknown): void
  addCollector(data: unknown): void
  modifyCoordinator(data: unknown): void
  addCoordinator(data: unknown): void
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

  // Collector Handlers
  const modifyCollector = (payload: unknown) => {
    const { success, error, data } = CollectorSchema.safeParse(payload)
    if (!success) return

    setCollectors((prev) =>
      prev.map((collector) => {
        if (collector.id == data.id) {
          return data
        }
        return collector
      })
    )
  }
  const addCollector = (payload: unknown) => {
    const { success, error, data } = CollectorSchema.safeParse(payload)
    if (!success) return

    setCollectors((prev) => [...prev, data])
  }

  // Coordinator Handlers
  const modifyCoordinator = (payload: unknown) => {
    const { success, error, data } = CoordinatorSchema.safeParse(payload)
    if (!success) return

    setCoordinators((prev) =>
      prev.map((coordinator) => {
        if (coordinator.id == data.id) {
          return data
        }
        return coordinator
      })
    )
  }
  const addCoordinator = (payload: unknown) => {
    const { success, error, data } = CoordinatorSchema.safeParse(payload)
    if (!success) return

    setCoordinators((prev) => [...prev, data])
  }

  return (
    <GlobalDataContext.Provider
      value={{
        zones,
        collectors,
        coordinators,
        modifyCollector,
        addCollector,
        modifyCoordinator,
        addCoordinator,
        hydrated,
      }}
    >
      {children}
    </GlobalDataContext.Provider>
  )
}
