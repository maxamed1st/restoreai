import { Button } from "@/components/ui/button"
import { Download } from "lucide-react"
export default function DownloadImage() {
  return(
    <div className="flex flex-col gap-2 m-2">
      <button className="flex items-baseline gap-2">
        <Download className="inline stroke-red-500"/> Download
      </button>

      <Button>Reset</Button>
    </div>
  )
}
