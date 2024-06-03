"use client"

import { useFormStatus } from "react-dom"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"

export function SubmitButton({
  text,
  className,
}: {
  text: string
  className?: string
}) {
  const { pending } = useFormStatus()

  return (
    <Button
      className={cn("float-end", className)}
      type="submit"
      disabled={pending}
    >
      {text}
    </Button>
  )
}
