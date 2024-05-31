import { CircleCheck, CircleX } from "lucide-react"

interface StatusIconProps {
  id: string
  isChecked: boolean
}

export default function StatusIcon({ id, isChecked }: StatusIconProps) {
  return isChecked ? (
    <CircleCheck id={id} fill="hsl(var(--primary))" color="white" />
  ) : (
    <CircleX id={id} fill="red" color="white" />
  )
}
