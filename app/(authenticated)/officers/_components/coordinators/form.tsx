"use client"

import { useGlobalData } from "@/contexts/global-context"
import { zodResolver } from "@hookform/resolvers/zod"
import { CaretSortIcon } from "@radix-ui/react-icons"
import { formatDate } from "date-fns"
import { CheckIcon } from "lucide-react"
import { useForm } from "react-hook-form"
import { toast } from "sonner"

import {
  Collector,
  CollectorSchema,
  Coordinator,
  CoordinatorSchema,
} from "@/lib/schema"
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
  Form,
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
import { SubmitButton } from "@/components/submit-button"
import { postCoordinatorAction } from "@/app/actions"

export function CoordinatorForm({
  initial,
  callback,
}: {
  initial?: Coordinator
  callback(): void
}) {
  const { zones, modifyCoordinator, addCoordinator } = useGlobalData()
  const create = initial === undefined

  const form = useForm<Coordinator>({
    resolver: zodResolver(CoordinatorSchema),
    defaultValues: {
      id: initial?.id ?? "",
      name: initial?.name ?? "",
      zone: initial?.zone ?? zones[0],
    },
  })

  const onSubmit = async (data: Coordinator) => {
    const {
      success,
      error_message,
      data: coordinator,
    } = await postCoordinatorAction(data)
    let message = ""
    if (success) {
      if (!create) {
        modifyCoordinator(coordinator)
        message = "Successful Coordinator Update"
      } else {
        addCoordinator(coordinator)
        message = "Successful Coordinator Registration"
      }
      toast(message, {
        description: formatDate(new Date(), "PPPPp"),
        duration: 3000,
      })
      callback()
    } else {
      toast(`Error: ${error_message}`)
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <div className="space-y-4 pb-4">
          <div className="min-w-0 flex-1 space-y-8">
            <FormField
              control={form.control}
              name="zone"
              render={({ field }) => (
                <FormItem className="grid grid-cols-4 place-items-center gap-2 space-y-0">
                  <FormLabel className="col-span-1 mb-2 ml-auto block text-sm font-medium text-gray-900 dark:text-white">
                    Zone
                  </FormLabel>
                  <Popover modal={true}>
                    <PopoverTrigger asChild>
                      <FormControl>
                        <Button
                          variant="outline"
                          role="combobox"
                          className="col-span-3 w-full justify-between bg-gray-50 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder:text-gray-400"
                        >
                          {field.value ? field.value.name : "Select zone"}
                          <CaretSortIcon className="ml-2 size-4 shrink-0 opacity-50" />
                        </Button>
                      </FormControl>
                    </PopoverTrigger>
                    <PopoverContent className="w-full p-0">
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
                                key={zone.id}
                                value={zone.name}
                                onSelect={() => {
                                  form.setValue("zone", zone)
                                }}
                              >
                                {zone.name}
                                <CheckIcon
                                  className={cn(
                                    "ml-auto size-4",
                                    zone.id === field.value?.id
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
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem className="grid grid-cols-4 place-items-center gap-2 space-y-0">
                  <FormLabel className="col-span-1 mb-2 ml-auto block text-sm font-medium text-gray-900 dark:text-white">
                    Full Name
                  </FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      className="focus:border-primary-500 focus:ring-primary-500 dark:focus:border-primary-500 dark:focus:ring-primary-500 col-span-3 block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder:text-gray-400"
                      placeholder="Please set the full name"
                      required={true}
                      autoComplete="off"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </div>
        <SubmitButton text={create ? "Submit" : "Save Changes"} />
      </form>
    </Form>
  )
}
