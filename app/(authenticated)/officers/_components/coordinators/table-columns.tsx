import { CaretSortIcon } from "@radix-ui/react-icons"
import { ColumnDef } from "@tanstack/react-table"

import { Collector, Coordinator } from "@/lib/schema"
import { Button } from "@/components/ui/button"

import { DataTableRowActions } from "./table-row-actions"

export const columns: ColumnDef<Coordinator>[] = [
  {
    id: "zone",
    accessorKey: "zone",
    accessorFn: (originalRow, index) => originalRow.zone,
    header: ({ column }) => {
      return (
        <Button
          className="p-0"
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Zone
          <CaretSortIcon className="ml-2 size-4" />
        </Button>
      )
    },
    cell: ({ row }) => {
      const value: string = row.getValue("zone")
      return <div className="capitalize">{value}</div>
    },
    filterFn: (row, id, value) => {
      const cell: string = row.getValue(id)
      return value.includes(cell)
    },
  },
  {
    accessorKey: "name",
    header: "Name",
    cell: ({ row }) => {
      return (
        <div className="flex space-x-2">
          <span className="max-w-[500px] truncate font-medium">
            {row.getValue("name")}
          </span>
        </div>
      )
    },
  },
  {
    id: "actions",
    enableHiding: false,
    cell: ({ row }) => <DataTableRowActions row={row} />,
  },
]
