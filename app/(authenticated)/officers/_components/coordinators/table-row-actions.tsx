"use client"

import { useState } from "react"
import { Row } from "@tanstack/react-table"

import { Coordinator } from "@/lib/schema"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"

import { CoordinatorForm } from "./form"

interface DataTableRowActionsProps<TData> {
  row: Row<Coordinator>
}

export function DataTableRowActions<TData>({
  row,
}: DataTableRowActionsProps<TData>): JSX.Element {
  const [open, onOpenChange] = useState(false)
  const { original } = row

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogTrigger asChild>
        <Button variant="outline" size="default">
          Edit
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Edit Coordinator </DialogTitle>
          <DialogDescription>
            Click save when you&apos;re done.
          </DialogDescription>
        </DialogHeader>
        <CoordinatorForm
          initial={original}
          callback={() => onOpenChange(false)}
        />
      </DialogContent>
    </Dialog>
  )
}
