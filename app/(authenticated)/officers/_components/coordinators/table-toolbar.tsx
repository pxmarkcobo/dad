import { useGlobalContext } from "@/contexts/global-context"
import { Cross2Icon } from "@radix-ui/react-icons"
import { Table } from "@tanstack/react-table"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { DataTableFacetedFilter } from "@/components/table/table-faceted-filter"
import { DataTableViewOptions } from "@/components/table/table-view-options"

interface CoordinatorTableToolbarProps<TData> {
  table: Table<TData>
}

export function CoordinatorTableToolbar<TData>({
  table,
}: CoordinatorTableToolbarProps<TData>): JSX.Element {
  const { zones, sitios, chapels } = useGlobalContext()
  const isFiltered = table.getState().columnFilters.length > 0

  return (
    <div className="flex items-center justify-between">
      <div className="flex flex-1 items-center space-x-2">
        <Input
          placeholder="Search coordinator..."
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
              options={zones}
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
      <DataTableViewOptions table={table} />
    </div>
  )
}
