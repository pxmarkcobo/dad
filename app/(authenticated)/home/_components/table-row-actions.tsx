"use client"

import { useMemberInfo } from "@/contexts/member-info-context"
import { Row } from "@tanstack/react-table"

import { Member } from "@/lib/schema"
import { Button } from "@/components/ui/button"

interface DataTableRowActionsProps<TData> {
  row: Row<TData>
}

export function DataTableRowActions<TData>({
  row,
}: DataTableRowActionsProps<TData>): JSX.Element {
  const { setMemberInfo } = useMemberInfo()
  const { original } = row

  return (
    <div className="flex w-full justify-center">
      <Button
        variant="outline"
        size="default"
        onClick={() => setMemberInfo(original as Member)}
      >
        Show
      </Button>
    </div>
  )
}
