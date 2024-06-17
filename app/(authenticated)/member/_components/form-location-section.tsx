import { useGlobalContext } from "@/contexts/global-context"
import { useFormContext } from "react-hook-form"

import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import FormSelectDropdown from "@/components/form/form-select-dropdown"

export default function LocationInformation() {
  const { control } = useFormContext()
  const { zones, chapels, barangays, sitios } = useGlobalContext()

  return (
    <div className="space-y-4 pb-4">
      <h1 className="text-l font-semibold">Location Information</h1>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <FormSelectDropdown
          control={control}
          name="zone"
          options={zones}
          label="Zone"
        />
        <FormSelectDropdown
          control={control}
          name="chapel"
          options={chapels}
          label="Chapel"
        />
        <FormSelectDropdown
          control={control}
          name="barangay"
          options={barangays}
          label="Barangay"
        />
        <FormField
          control={control}
          name="selda"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="mb-2 block text-sm">Selda</FormLabel>
              <FormControl>
                <Input {...field} placeholder="Please set the selda" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormSelectDropdown
          control={control}
          name="sitio"
          options={sitios}
          label="Sitio"
        />
        <FormField
          control={control}
          name="remarks"
          render={({ field }) => (
            <FormItem className="space-y-0">
              <FormLabel className="mb-2 block text-sm">Remarks</FormLabel>
              <FormControl>
                <Textarea
                  {...field}
                  className="max-h-[40px] min-h-[40px] focus-visible:ring-0"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>
    </div>
  )
}
