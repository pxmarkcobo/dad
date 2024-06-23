"use client"

import React, { useEffect, useState } from "react"
import { useMemberInfo } from "@/contexts/member-info-context"
import { keepPreviousData, useQuery } from "@tanstack/react-query"
import {
  ColumnFiltersState,
  PaginationState,
  SortingState,
  VisibilityState,
  flexRender,
  getCoreRowModel,
  getFacetedRowModel,
  getFacetedUniqueValues,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table"
import { DocumentSnapshot } from "firebase/firestore"

import { Member } from "@/lib/schema"
import { fetchMembers, fetchTotalMembersCount } from "@/lib/utils"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { DataTablePagination } from "@/components/table/table-pagination"

import { columns } from "./table-columns"
import TableRowsSkeleton from "./table-rows-loading"
import { DataTableToolbar } from "./table-toolbar"

export function MembersTable(): JSX.Element {
  const { setMemberInfo } = useMemberInfo()
  const [lastDoc, setLastDoc] = useState<DocumentSnapshot | null>(null)
  const [pageCount, setPageCount] = useState<number>(-1)

  useEffect(() => {
    const fetch = async () => {
      const total = await fetchTotalMembersCount()
      setPageCount(Math.ceil(total / 10))
    }
    fetch()
  }, [])

  const [sorting, setSorting] = React.useState<SortingState>([])
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
  )
  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({})
  const [rowSelection, setRowSelection] = React.useState({})

  const [{ pageIndex, pageSize }, setPagination] =
    React.useState<PaginationState>({
      pageIndex: 0,
      pageSize: 10,
    })
  const pagination = React.useMemo(
    () => ({
      pageIndex,
      pageSize,
    }),
    [pageIndex, pageSize]
  )

  const fetchDataOptions = {
    pageIndex,
    pageSize,
    lastDoc,
  }

  const { status, data } = useQuery({
    queryKey: ["members", pagination],
    queryFn: () => fetchMembers(fetchDataOptions),
    placeholderData: keepPreviousData,
  })

  useEffect(() => {
    if (status == "success") {
      setLastDoc(data.lastDoc ?? null)
    }
  }, [status, data])

  const defaultData = React.useMemo(() => [], [])

  const table = useReactTable({
    data: data?.rows ?? defaultData,
    columns: columns,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
      pagination,
    },
    manualPagination: true,
    pageCount: pageCount,
    onPaginationChange: setPagination,
    onRowSelectionChange: setRowSelection,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    onColumnVisibilityChange: setColumnVisibility,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    // getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFacetedRowModel: getFacetedRowModel(),
    getFacetedUniqueValues: getFacetedUniqueValues(),
  })

  return (
    <div className="space-y-4">
      <DataTableToolbar table={table} />
      <div className="rounded-sm border">
        <Table className="table-fixed">
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup, index) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <TableHead key={header.id}>
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {status === "pending" && <TableRowsSkeleton />}
            {status === "success" && table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  className="cursor-pointer	"
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                  onClick={() => setMemberInfo(row.original as Member)}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <DataTablePagination table={table} />
    </div>
  )
}
