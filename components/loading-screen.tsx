import { HeartHandshake } from "lucide-react"

export default function LoadingScreen() {
  return (
    <div className="h-m-screen fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
      <HeartHandshake className="size-16 animate-pulse" />
    </div>
  )
}
