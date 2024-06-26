import { useEffect, useMemo } from "react"
import { useGlobalContext } from "@/contexts/global-context"
import { Cross2Icon } from "@radix-ui/react-icons"
import { Table } from "@tanstack/react-table"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { DataTableFacetedFilter } from "@/components/table/table-faceted-filter"

interface CollectorTableToolbarProps<TData> {
  table: Table<TData>
}

export function CollectorTableToolbar<TData>({
  table,
}: CollectorTableToolbarProps<TData>): JSX.Element {
  const { zones, sitios, chapels, barangays } = useGlobalContext()
  const isFiltered = table.getState().columnFilters.length > 0

  useEffect(() => {
    console.log(table.getState().columnFilters)
  }, [table, table.getState()])
  const zoneOptions = useMemo(() => {
    const values = zones.map((zone) => zone.name)
    return values
  }, [zones])

  return (
    <div className="flex items-center justify-between">
      <div className="flex flex-1 items-center space-x-2">
        <Input
          placeholder="Search alagad..."
          value={(table.getColumn("name")?.getFilterValue() as string) ?? ""}
          onChange={(event) =>
            table.getColumn("name")?.setFilterValue(event.target.value)
          }
          className="max-w-xs md:max-w-md"
        />
        <div className="hidden flex-1 items-center space-x-2 md:flex">
          {table.getColumn("zone") && (
            <DataTableFacetedFilter
              column={table.getColumn("zone")}
              title="Zone"
              options={zoneOptions}
            />
          )}
          {table.getColumn("sitio") && (
            <DataTableFacetedFilter
              column={table.getColumn("sitio")}
              title="Sitio"
              options={sitios}
            />
          )}
          {table.getColumn("sitio") && (
            <DataTableFacetedFilter
              column={table.getColumn("barangay")}
              title="Barangay"
              options={barangays}
            />
          )}
          {table.getColumn("chapel") && (
            <DataTableFacetedFilter
              column={table.getColumn("chapel")}
              title="Chapel"
              options={chapels}
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
    </div>
  )
}
