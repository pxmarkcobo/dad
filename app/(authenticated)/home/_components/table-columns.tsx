import { CaretSortIcon } from "@radix-ui/react-icons"
import { ColumnDef } from "@tanstack/react-table"

import { Member } from "@/lib/schema"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"

import { DataTableRowActions } from "./table-row-actions"

export const columns: ColumnDef<Member>[] = [
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
      return value.includes(row.getValue(id))
    },
  },
  {
    accessorKey: "name",
    header: "Name",
    cell: ({ row }) => {
      return (
        <div className="flex space-x-2">
          <span className="truncate font-medium">{row.getValue("name")}</span>
          {row.original.roles.collector ? (
            <Badge variant="secondary">Collector</Badge>
          ) : row.original.roles.coordinator ? (
            <Badge variant="secondary">Coordinator</Badge>
          ) : null}
        </div>
      )
    },
  },
  {
    id: "barangay",
    accessorKey: "barangay",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          className="p-0"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Barangay
          <CaretSortIcon className="ml-2 size-4" />
        </Button>
      )
    },
    cell: ({ row }) => (
      <div className="capitalize">{row.getValue("barangay")}</div>
    ),
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id))
    },
  },
  {
    id: "collector",
    accessorKey: "collector",
    accessorFn: (originalRow, index) => originalRow.collector?.name,
    header: ({ column }) => {
      return (
        <Button
          className="p-0"
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Collector
          <CaretSortIcon className="ml-2 size-4" />
        </Button>
      )
    },
    cell: ({ row }) => {
      const value: string = row.getValue("collector")
      return <div className="truncate text-nowrap capitalize">{value}</div>
    },
    filterFn: (row, id, value) => {
      const cell: string = row.getValue(id)
      return value.includes(cell)
    },
  },
  {
    id: "actions",
    enableHiding: false,
    cell: ({ row }) => <DataTableRowActions row={row} />,
  },
]
