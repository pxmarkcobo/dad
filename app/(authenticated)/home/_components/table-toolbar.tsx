import { useMemo } from "react"
import { useGlobalContext } from "@/contexts/global-context"
import { Cross2Icon } from "@radix-ui/react-icons"
import { Table } from "@tanstack/react-table"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { DataTableFacetedFilter } from "@/components/table/table-faceted-filter"
import { DataTableViewOptions } from "@/components/table/table-view-options"

interface DataTableToolbarProps<TData> {
  table: Table<TData>
}

export function DataTableToolbar<TData>({
  table,
}: DataTableToolbarProps<TData>): JSX.Element {
  const { zones, barangays, collectors } = useGlobalContext()
  const isFiltered = table.getState().columnFilters.length > 0

  const uniqueCollectors = useMemo(() => {
    const values = collectors.map((collector) => collector.name) as string[]
    return values
  }, [collectors])

  const zoneOptions = useMemo(() => {
    const values = zones.map((zone) => zone.name)
    return values
  }, [zones])

  return (
    <div className="flex items-center justify-between">
      <div className="flex flex-1 items-center space-x-2">
        <Input
          placeholder="Search members..."
          value={
            (table.getColumn("fullName")?.getFilterValue() as string) ?? ""
          }
          onChange={(event) =>
            table.getColumn("fullName")?.setFilterValue(event.target.value)
          }
          className="max-w-64 md:max-w-48"
        />
        <div className="hidden flex-1 items-center space-x-2 md:flex">
          {table.getColumn("zone") && (
            <DataTableFacetedFilter
              column={table.getColumn("zone")}
              title="Zone"
              options={zoneOptions}
            />
          )}
          {table.getColumn("barangay") && (
            <DataTableFacetedFilter
              column={table.getColumn("barangay")}
              title="Barangay"
              options={barangays}
            />
          )}
          {table.getColumn("collector") && (
            <DataTableFacetedFilter
              column={table.getColumn("collector")}
              title="Alagad"
              options={uniqueCollectors}
            />
          )}
          {isFiltered && (
            <Button
              variant="ghost"
              onClick={() => table.resetColumnFilters()}
              className="h-8 px-2 lg:px-3"
            >
              Reset
              <Cross2Icon className="ml-2 size-4" />
            </Button>
          )}
        </div>
      </div>
      {/* <DataTableViewOptions table={table} /> */}
    </div>
  )
}
