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
  const { zones, sitios, chapels } = useGlobalContext()
  const isFiltered = table.getState().columnFilters.length > 0

  return (
    <div className="flex items-center justify-between">
      <div className="flex flex-1 items-center space-x-2">
        <Input
          placeholder="Search officer..."
          value={(table.getColumn("name")?.getFilterValue() as string) ?? ""}
          onChange={(event) =>
            table.getColumn("name")?.setFilterValue(event.target.value)
          }
          className="max-w-md"
        />
        {table.getColumn("zone") && (
          <DataTableFacetedFilter
            column={table.getColumn("zone")}
            title="Zone"
            options={zones}
          />
        )}
        {table.getColumn("sitio") && (
          <DataTableFacetedFilter
            column={table.getColumn("sitio")}
            title="Sitio"
            options={sitios}
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
      <DataTableViewOptions table={table} />
    </div>
  )
}
