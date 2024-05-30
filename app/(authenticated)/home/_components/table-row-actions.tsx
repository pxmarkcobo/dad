"use client"

import { useSelectedMember } from "@/contexts/members-context"
import { Row } from "@tanstack/react-table"

import { Member } from "@/lib/schema"
import { Button } from "@/components/ui/button"

interface DataTableRowActionsProps<TData> {
  row: Row<TData>
}

export function DataTableRowActions<TData>({
  row,
}: DataTableRowActionsProps<TData>): JSX.Element {
  const { setSelectedMember } = useSelectedMember()
  const { original } = row

  return (
    <Button
      variant="outline"
      size="default"
      onClick={() => setSelectedMember(original as Member)}
    >
      Show
    </Button>
  )
}
