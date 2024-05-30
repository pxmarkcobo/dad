import { CaretSortIcon } from "@radix-ui/react-icons"
import { ColumnDef } from "@tanstack/react-table"

import { Member, Zone } from "@/lib/schema"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"

import { DataTableRowActions } from "./table-row-actions"

export const columns: ColumnDef<Member>[] = [
  {
    id: "zone",
    accessorKey: "zone",
    accessorFn: (originalRow, index) => originalRow.zone.label,
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
          {row.original.roles.collector ? (
            <Badge variant="secondary">Collector</Badge>
          ) : row.original.roles.coordinator ? (
            <Badge variant="secondary">Coordinator</Badge>
          ) : null}
        </div>
      )
    },
  },
  // {
  //   accessorKey: "address",
  //   header: ({ column }) => {
  //     return (
  //       <Button
  //         variant="ghost"
  //         className="p-0"
  //         onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
  //       >
  //         Address
  //         <CaretSortIcon className="ml-2 size-4" />
  //       </Button>
  //     )
  //   },
  //   cell: ({ row }) => (
  //     <div className="capitalize">{row.getValue("address") || "-"}</div>
  //   ),
  //   filterFn: (row, id, value) => {
  //     return value.includes(row.getValue(id))
  //   },
  // },
  // {
  //   accessorKey: "chapel",
  //   header: ({ column }) => {
  //     return (
  //       <Button
  //         variant="ghost"
  //         className="p-0"
  //         onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
  //       >
  //         Chapel
  //         <CaretSortIcon className="ml-2 size-4" />
  //       </Button>
  //     )
  //   },
  //   cell: ({ row }) => (
  //     <div className="capitalize">{row.getValue("chapel") || "-"}</div>
  //   ),
  //   filterFn: (row, id, value) => {
  //     return value.includes(row.getValue(id))
  //   },
  // },
  {
    id: "actions",
    enableHiding: false,
    cell: ({ row }) => <DataTableRowActions row={row} />,
  },
]
