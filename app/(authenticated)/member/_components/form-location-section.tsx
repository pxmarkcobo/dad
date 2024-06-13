import { useGlobalContext } from "@/contexts/global-context"
import { CaretSortIcon, CheckIcon } from "@radix-ui/react-icons"
import { useFormContext } from "react-hook-form"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command"
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { Textarea } from "@/components/ui/textarea"

export default function LocationInformation() {
  const { control, setValue } = useFormContext()
  const { zones, chapels, barangays, sitios } = useGlobalContext()

  return (
    <div className="space-y-4 pb-4">
      <h1 className="text-l font-semibold">Location Information</h1>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <FormField
          control={control}
          name="zone"
          render={({ field }) => (
            <FormItem className="space-y-0">
              <FormLabel className="mb-2 block text-sm">Zone</FormLabel>
              <Popover modal={true}>
                <PopoverTrigger asChild>
                  <FormControl>
                    <Button
                      variant="outline"
                      role="combobox"
                      className="w-full justify-between"
                    >
                      {field.value ? `Zone ${field.value}` : "Select zone"}
                      <CaretSortIcon className="ml-2 size-4 shrink-0 opacity-50" />
                    </Button>
                  </FormControl>
                </PopoverTrigger>
                <PopoverContent className="w-[200px] p-0">
                  <Command>
                    <CommandInput
                      placeholder="Search zone..."
                      className="h-9"
                    />
                    <CommandList>
                      <CommandEmpty>No zone found.</CommandEmpty>
                      <CommandGroup>
                        {zones.map((zone) => (
                          <CommandItem
                            value={zone}
                            key={zone}
                            onSelect={() => {
                              setValue("zone", zone)
                            }}
                          >
                            Zone {zone}
                            <CheckIcon
                              className={cn(
                                "ml-auto size-4",
                                zone === field.value
                                  ? "opacity-100"
                                  : "opacity-0"
                              )}
                            />
                          </CommandItem>
                        ))}
                      </CommandGroup>
                    </CommandList>
                  </Command>
                </PopoverContent>
              </Popover>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={control}
          name="chapel"
          render={({ field }) => (
            <FormItem className="space-y-0">
              <FormLabel className="mb-2 block text-sm">Chapel</FormLabel>
              <Popover modal={true}>
                <PopoverTrigger asChild>
                  <FormControl>
                    <Button
                      variant="outline"
                      role="combobox"
                      className="w-full justify-between"
                    >
                      {field.value ? field.value : "Select chapel"}
                      <CaretSortIcon className="ml-2 size-4 shrink-0 opacity-50" />
                    </Button>
                  </FormControl>
                </PopoverTrigger>
                <PopoverContent className="w-[200px] p-0">
                  <Command>
                    <CommandInput
                      placeholder="Search chapel..."
                      className="h-9"
                    />
                    <CommandList>
                      <CommandEmpty>No chapel found.</CommandEmpty>
                      <CommandGroup>
                        {chapels.map((chapel) => (
                          <CommandItem
                            value={chapel}
                            key={chapel}
                            onSelect={() => {
                              setValue("chapel", chapel)
                            }}
                          >
                            {chapel}
                            <CheckIcon
                              className={cn(
                                "ml-auto size-4",
                                chapel === field.value
                                  ? "opacity-100"
                                  : "opacity-0"
                              )}
                            />
                          </CommandItem>
                        ))}
                      </CommandGroup>
                    </CommandList>
                  </Command>
                </PopoverContent>
              </Popover>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={control}
          name="barangay"
          render={({ field }) => (
            <FormItem className="space-y-0">
              <FormLabel className="mb-2 block text-sm">Barangay</FormLabel>
              <Popover modal={true}>
                <PopoverTrigger asChild>
                  <FormControl>
                    <Button
                      variant="outline"
                      role="combobox"
                      className="w-full justify-between"
                    >
                      {field.value ? field.value : "Select barangay"}
                      <CaretSortIcon className="ml-2 size-4 shrink-0 opacity-50" />
                    </Button>
                  </FormControl>
                </PopoverTrigger>
                <PopoverContent className="w-[200px] p-0">
                  <Command>
                    <CommandInput
                      placeholder="Search barangay..."
                      className="h-9"
                    />
                    <CommandList>
                      <CommandEmpty>No barangay found.</CommandEmpty>
                      <CommandGroup>
                        {barangays.map((barangay) => (
                          <CommandItem
                            value={barangay}
                            key={barangay}
                            onSelect={() => {
                              setValue("barangay", barangay)
                            }}
                          >
                            {barangay}
                            <CheckIcon
                              className={cn(
                                "ml-auto size-4",
                                barangay === field.value
                                  ? "opacity-100"
                                  : "opacity-0"
                              )}
                            />
                          </CommandItem>
                        ))}
                      </CommandGroup>
                    </CommandList>
                  </Command>
                </PopoverContent>
              </Popover>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={control}
          name="selda"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="mb-2 block text-sm">Selda</FormLabel>
              <FormControl>
                <Input
                  {...field}
                  placeholder="Please set the selda"
                  required={true}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={control}
          name="sitio"
          render={({ field }) => (
            <FormItem className="space-y-0">
              <FormLabel className="mb-2 block text-sm">Sitio</FormLabel>
              <Popover modal={true}>
                <PopoverTrigger asChild>
                  <FormControl>
                    <Button
                      variant="outline"
                      role="combobox"
                      className="w-full justify-between"
                    >
                      {field.value ? field.value : "Select sitio (optional)"}
                      <CaretSortIcon className="ml-2 size-4 shrink-0 opacity-50" />
                    </Button>
                  </FormControl>
                </PopoverTrigger>
                <PopoverContent className="w-[200px] p-0">
                  <Command>
                    <CommandInput
                      placeholder="Search sitio..."
                      className="h-9"
                    />
                    <CommandList>
                      <CommandEmpty>No sitio found.</CommandEmpty>
                      <CommandGroup>
                        {sitios.map((sitio) => (
                          <CommandItem
                            value={sitio}
                            key={sitio}
                            onSelect={() => {
                              setValue("sitio", sitio)
                            }}
                          >
                            {sitio}
                            <CheckIcon
                              className={cn(
                                "ml-auto size-4",
                                sitio === field.value
                                  ? "opacity-100"
                                  : "opacity-0"
                              )}
                            />
                          </CommandItem>
                        ))}
                      </CommandGroup>
                    </CommandList>
                  </Command>
                </PopoverContent>
              </Popover>
              <FormMessage />
            </FormItem>
          )}
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
