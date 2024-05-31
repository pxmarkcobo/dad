import { HeartHandshake } from "lucide-react"

export default function LoadingScreen() {
  return (
    <div className="h-m-screen fixed left-1/2 top-1/2">
      <HeartHandshake className="size-12 animate-pulse" />
    </div>
  )
}
