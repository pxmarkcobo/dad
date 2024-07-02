import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"

import { ExportRegistrationDataForm } from "./form"

export default function ExportRegistrationData() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">Generate Report</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Export Registration Data</DialogTitle>
          <DialogDescription>
            Generate an excel file of members data for a specified registration
            date.
          </DialogDescription>
        </DialogHeader>
        <ExportRegistrationDataForm />
      </DialogContent>
    </Dialog>
  )
}
