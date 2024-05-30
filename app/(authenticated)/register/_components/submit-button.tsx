"use client"

import { useFormStatus } from "react-dom"

import { Button } from "@/components/ui/button"

export function SubmitButton() {
  const { pending } = useFormStatus()

  return (
    <Button className="float-end" type="submit" disabled={pending}>
      Next
    </Button>
  )
}
