"use client"

import { useState } from "react"
import { useGlobalContext } from "@/contexts/global-context"
import { zodResolver } from "@hookform/resolvers/zod"
import { CaretSortIcon } from "@radix-ui/react-icons"
import { CheckIcon } from "lucide-react"
import { useForm } from "react-hook-form"
import { toast } from "sonner"

import {
  Beneficiary,
  Collector,
  MemberRelationsSchema,
  TMemberRelationsSchema,
} from "@/lib/schema"
import { cn, formatDate } from "@/lib/utils"
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
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { updateMemberRelationsAction } from "@/app/actions"

import { SubmitButton } from "../../../../components/form/form-submit-button"

export default function EditMemberRelations({
  open,
  onOpenChange,
  memberID,
  zone,
  dependents,
  collector,
  reset,
}: {
  open: boolean
  onOpenChange(open: boolean): void
  memberID: string
  zone: string
  dependents: Beneficiary[]
  collector: Collector | undefined
  reset(): void
}) {
  const { collectors } = useGlobalContext()
  const collectorChoices = collectors.filter((c) => c.zone == zone)

  const form = useForm<TMemberRelationsSchema>({
    resolver: zodResolver(MemberRelationsSchema),
    defaultValues: {
      memberID: memberID,
      collector: collector ?? collectorChoices[0],
      primaryBeneficiary: dependents[0],
    },
  })

  const onSubmit = async (data: TMemberRelationsSchema) => {
    const response = await updateMemberRelationsAction(data)
    if (response.success) {
      toast("Successful Member Update", {
        description: formatDate(new Date(), "PPPPp"),
        duration: 3000,
      })
      await reset()
      onOpenChange(false)
    } else {
      toast(`Error: ${response.error_message}`)
    }
  }

  const [dependentOpen, dependentOnOpenChange] = useState(false)
  const [collectorOpen, collectorOnOpenChange] = useState(false)

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        className="sm:max-w-l"
        onCloseAutoFocus={(e) => e.preventDefault()}
        onEscapeKeyDown={(e) => e.preventDefault()}
        onPointerDown={(e) => e.preventDefault()}
        onInteractOutside={(e) => e.preventDefault()}
      >
        <DialogHeader>
          <DialogTitle>Edit Member Relations</DialogTitle>
          <DialogDescription>
            Click save when you&apos;re done.
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <div className="space-y-4 pb-4">
              <div className="min-w-0 flex-1 space-y-8">
                <FormField
                  control={form.control}
                  name="primaryBeneficiary"
                  render={({ field }) => (
                    <FormItem className="grid grid-cols-3 place-items-center gap-2 space-y-0">
                      <FormLabel className="col-span-1 mb-2 ml-auto block text-sm font-medium text-gray-900 dark:text-white">
                        Primary Beneficiary
                      </FormLabel>
                      <Popover
                        modal={true}
                        open={dependentOpen}
                        onOpenChange={dependentOnOpenChange}
                      >
                        <PopoverTrigger asChild>
                          <FormControl>
                            <Button
                              variant="outline"
                              role="combobox"
                              className="col-span-2 w-full justify-between bg-gray-50 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder:text-gray-400"
                            >
                              {field.value
                                ? field.value.name
                                : "Select primary beneficiary"}
                              <CaretSortIcon className="ml-2 size-4 shrink-0 opacity-50" />
                            </Button>
                          </FormControl>
                        </PopoverTrigger>
                        <PopoverContent className="w-full p-0">
                          <Command>
                            <CommandInput
                              placeholder="Search beneficiary..."
                              className="h-9"
                            />
                            <CommandList>
                              <CommandEmpty>No beneficiary found.</CommandEmpty>
                              <CommandGroup>
                                {dependents.map((dependent) => (
                                  <CommandItem
                                    key={dependent.id}
                                    value={dependent.name}
                                    onSelect={() => {
                                      form.setValue(
                                        "primaryBeneficiary",
                                        dependent
                                      )
                                      dependentOnOpenChange(false)
                                    }}
                                  >
                                    {dependent.name}
                                    <CheckIcon
                                      className={cn(
                                        "ml-auto size-4",
                                        dependent.name === field.value?.name
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
              </div>
              <div className="min-w-0 flex-1 space-y-8">
                <FormField
                  control={form.control}
                  name="collector"
                  render={({ field }) => (
                    <FormItem className="grid grid-cols-3 place-items-center gap-2 space-y-0">
                      <FormLabel className="col-span-1 mb-2 ml-auto block text-sm font-medium text-gray-900 dark:text-white">
                        Collector
                      </FormLabel>
                      <Popover
                        modal={true}
                        open={collectorOpen}
                        onOpenChange={collectorOnOpenChange}
                      >
                        <PopoverTrigger asChild>
                          <FormControl>
                            <Button
                              variant="outline"
                              role="combobox"
                              className="col-span-2 w-full justify-between bg-gray-50 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder:text-gray-400"
                            >
                              {field.value
                                ? field.value.name
                                : "Select collector"}
                              <CaretSortIcon className="ml-2 size-4 shrink-0 opacity-50" />
                            </Button>
                          </FormControl>
                        </PopoverTrigger>
                        <PopoverContent className="w-full p-0">
                          <Command>
                            <CommandInput
                              placeholder="Search collector..."
                              className="h-9"
                            />
                            <CommandList>
                              <CommandEmpty>No collector found.</CommandEmpty>
                              <CommandGroup>
                                {collectorChoices.map((collector) => (
                                  <CommandItem
                                    key={collector.id}
                                    value={collector.name}
                                    onSelect={() => {
                                      form.setValue("collector", collector)
                                      collectorOnOpenChange(false)
                                    }}
                                  >
                                    {collector.name}
                                    <CheckIcon
                                      className={cn(
                                        "ml-auto size-4",
                                        collector.id === field.value?.id
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
              </div>
            </div>
            <SubmitButton text="Save changes" />
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}
