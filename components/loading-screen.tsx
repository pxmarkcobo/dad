import { HeartPulse } from "lucide-react"

export default function LoadingScreen() {
  return (
    <div className="h-m-screen fixed left-1/2 top-1/2">
      <HeartPulse
        className="size-10 animate-pulse"
        fill="black"
        color="black"
      />
    </div>
  )
}
