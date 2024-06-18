import { useEffect, useMemo, useState } from "react"
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
  const { control, watch } = useFormContext()

  const selectedZone = watch("zone")
  const selectedBarangay = watch("barangay")

  const { zones, collectors } = useGlobalContext()
  const [zone, setZone] = useState<any>(zones[0])

  const zoneOptions = useMemo(() => {
    const values = zones.map((zone) => zone.name) as string[]
    return values
  }, [zones])

  const [filteredCollectors, setFilteredCollectors] = useState<string[]>([])

  useEffect(() => {
    setZone(zones.find((zone) => zone.name == selectedZone))
  }, [selectedZone, zones])

  useEffect(() => {
    let values = collectors
    if (selectedBarangay) {
      values = collectors.filter((c) => c.barangay == selectedBarangay)
    }
    setFilteredCollectors(values.map((v) => v.name))
  }, [selectedBarangay, collectors])

  return (
    <div className="space-y-4 pb-4">
      <h1 className="text-l font-semibold">Location Information</h1>
      <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
        <FormSelectDropdown
          control={control}
          name="zone"
          options={zoneOptions}
          label="Zone"
        />
        <FormSelectDropdown
          control={control}
          name="chapel"
          options={zone.chapels}
          label="Chapel"
        />
        <FormSelectDropdown
          control={control}
          name="barangay"
          options={zone.barangays}
          label="Barangay"
        />
        <FormSelectDropdown
          control={control}
          name="collector"
          options={filteredCollectors}
          label="Collector"
        />

        <FormSelectDropdown
          control={control}
          name="sitio"
          options={zone.sitios}
          label="Sitio"
        />
        <FormField
          control={control}
          name="selda"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="mb-2 block text-xs">Selda</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={control}
          name="amount"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="mb-2 block text-xs">Amount</FormLabel>
              <FormControl>
                <Input
                  {...field}
                  type="number"
                  onChange={(event) =>
                    field.onChange(parseInt(event.target.value))
                  }
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={control}
          name="remarks"
          render={({ field }) => (
            <FormItem className="space-y-0">
              <FormLabel className="mb-2 block text-xs">Remarks</FormLabel>
              <FormControl>
                <Input
                  {...field}
                  className="max-h-[40px] min-h-[40px] truncate text-nowrap focus-visible:ring-0"
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
