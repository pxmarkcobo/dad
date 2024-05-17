"use client"

import { useEffect, useState } from "react"
import { Cross2Icon } from "@radix-ui/react-icons"
import { Table } from "@tanstack/react-table"

import { fakeZones } from "@/lib/utils"

import { Button } from "../ui/button"
import { Input } from "../ui/input"
import { DataTableFacetedFilter } from "./faceted-filter"
import { DataTableViewOptions } from "./view-options"

interface DataTableToolbarProps<TData> {
  table: Table<TData>
}

interface DropdownOption {
  label: string
  value: string
}

export function DataTableToolbar<TData>({
  table,
}: DataTableToolbarProps<TData>): JSX.Element {
  const isFiltered = table.getState().columnFilters.length > 0
  const [zones, setZones] = useState<DropdownOption[]>([])

  useEffect(() => {
    const zones = fakeZones.map((zone) => ({
      value: zone.name,
      label: zone.name,
    }))
    setZones(zones)
  }, [])

  return (
    <div className="flex items-center justify-between">
      <div className="flex flex-1 items-center space-x-2">
        <Input
          placeholder="Search members..."
          value={(table.getColumn("name")?.getFilterValue() as string) ?? ""}
          onChange={(event) =>
            table.getColumn("name")?.setFilterValue(event.target.value)
          }
          className="max-w-sm"
        />
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
      <DataTableViewOptions table={table} />
    </div>
  )
}
