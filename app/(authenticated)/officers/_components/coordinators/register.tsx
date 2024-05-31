"use client"

import { useState } from "react"
import { UserPlus } from "lucide-react"

import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"

import { CoordinatorForm } from "./form"

export function RegisterCoordinator() {
  const [open, onOpenChange] = useState(false)

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm" className="mb-4 h-8">
          <UserPlus className="mr-2 size-4" />
          Register Coordinator
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Register Coordinator </DialogTitle>
        </DialogHeader>
        <CoordinatorForm callback={() => onOpenChange(false)} />
      </DialogContent>
    </Dialog>
  )
}
