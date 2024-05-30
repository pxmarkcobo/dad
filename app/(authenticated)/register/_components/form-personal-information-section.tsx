import { CaretSortIcon, CheckIcon } from "@radix-ui/react-icons"
import { useFormContext } from "react-hook-form"

import { SexChoices } from "@/lib/enums"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
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
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"

export default function PersonalInformation() {
  const sexChoices = Object.values(SexChoices)

  const { control, setValue } = useFormContext()

  return (
    <>
      <div className="space-y-4">
        <h2 className="text-l font-semibold text-gray-900 dark:text-white">
          Basic Information
        </h2>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <FormField
            control={control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="mb-2 block text-sm font-medium text-gray-900 dark:text-white">
                  Full Name
                </FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    className="focus:border-primary-500 focus:ring-primary-500 dark:focus:border-primary-500 dark:focus:ring-primary-500 block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder:text-gray-400"
                    placeholder="Please indicate member's full name"
                    autoComplete="off"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={control}
            name="sex"
            render={({ field }) => (
              <FormItem className="space-y-0">
                <FormLabel className="mb-2 block text-sm font-medium text-gray-900 dark:text-white">
                  Sex
                </FormLabel>
                <Popover modal={true}>
                  <PopoverTrigger asChild>
                    <FormControl>
                      <Button
                        variant="outline"
                        role="combobox"
                        className="w-full justify-between bg-gray-50 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder:text-gray-400"
                      >
                        {field.value
                          ? field.value
                          : "Please select member's sex"}
                        <CaretSortIcon className="ml-2 size-4 shrink-0 opacity-50" />
                      </Button>
                    </FormControl>
                  </PopoverTrigger>
                  <PopoverContent className="p-0">
                    <Command>
                      <CommandInput
                        placeholder="Search sex..."
                        className="h-9"
                      />
                      <CommandList>
                        <CommandEmpty>No sex found.</CommandEmpty>
                        <CommandGroup>
                          {sexChoices.map((sex) => (
                            <CommandItem
                              value={sex}
                              key={sex}
                              onSelect={() => {
                                setValue("sex", sex)
                              }}
                            >
                              {sex}
                              <CheckIcon
                                className={cn(
                                  "ml-auto size-4",
                                  sex === field.value
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
            name="birth_date"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="mb-2 block text-sm font-medium text-gray-900 dark:text-white">
                  Date of Birth
                </FormLabel>
                <input
                  {...field}
                  type="date"
                  className="focus:border-primary-500 focus:ring-primary-500 dark:focus:border-primary-500 dark:focus:ring-primary-500 block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder:text-gray-400"
                  required
                />
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={control}
            name="registration_date"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="mb-2 block text-sm font-medium text-gray-900 dark:text-white">
                  Registration Date
                </FormLabel>
                <input
                  {...field}
                  value={field.value}
                  type="date"
                  className="focus:border-primary-500 focus:ring-primary-500 dark:focus:border-primary-500 dark:focus:ring-primary-500 block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder:text-gray-400"
                  required
                />
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
      </div>
      <div className="space-y-4">
        <h1 className="text-sm font-medium leading-none text-gray-900 dark:text-white">
          Situation
        </h1>
        <p className="text-xs font-normal text-gray-500 dark:text-gray-400">
          Please select all that applies
        </p>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
          <FormField
            control={control}
            name="isolated"
            render={({ field }) => (
              <FormItem className="flex items-center space-y-0 rounded-lg border border-gray-200 bg-gray-50 p-4 ps-4 dark:border-gray-700 dark:bg-gray-800">
                <FormControl className="flex items-center">
                  <Checkbox
                    checked={field.value}
                    onCheckedChange={field.onChange}
                    {...field}
                    size="6"
                  />
                </FormControl>
                <div className="ms-4 text-sm">
                  <FormLabel className="font-medium leading-none text-gray-900 dark:text-white">
                    Isolated
                  </FormLabel>
                  <p
                    id="isolated-text"
                    className="mt-1 text-xs font-normal text-gray-500 dark:text-gray-400"
                  >
                    Separated, alone, no contact
                  </p>
                </div>
              </FormItem>
            )}
          />

          <FormField
            control={control}
            name="widowed"
            render={({ field }) => (
              <FormItem className="flex items-center space-y-0 rounded-lg border border-gray-200 bg-gray-50 p-4 ps-4 dark:border-gray-700 dark:bg-gray-800">
                <FormControl className="flex items-center">
                  <Checkbox
                    checked={field.value}
                    onCheckedChange={field.onChange}
                    {...field}
                    size="6"
                  />
                </FormControl>
                <div className="ms-4 text-sm">
                  <FormLabel className="font-medium leading-none text-gray-900 dark:text-white">
                    Widowed
                  </FormLabel>
                  <p
                    id="isolated-text"
                    className="mt-1 text-xs font-normal text-gray-500 dark:text-gray-400"
                  >
                    Spouse has passed away
                  </p>
                </div>
              </FormItem>
            )}
          />

          <FormField
            control={control}
            name="puyopuyo"
            render={({ field }) => (
              <FormItem className="flex items-center space-y-0 rounded-lg border border-gray-200 bg-gray-50 p-4 ps-4 dark:border-gray-700 dark:bg-gray-800">
                <FormControl className="flex items-center">
                  <Checkbox
                    checked={field.value}
                    onCheckedChange={field.onChange}
                    {...field}
                    size="6"
                  />
                </FormControl>
                <div className="ms-4 text-sm">
                  <FormLabel className="font-medium leading-none text-gray-900 dark:text-white">
                    Puyo-puyo
                  </FormLabel>
                  <p
                    id="isolated-text"
                    className="mt-1 text-xs font-normal text-gray-500 dark:text-gray-400"
                  >
                    Lorem ipsum dolor sit
                  </p>
                </div>
              </FormItem>
            )}
          />
        </div>
        <FormField
          control={control}
          name="civil_status"
          render={({ field }) => (
            <FormItem className="space-y-3">
              <FormLabel className="text-sm font-medium leading-none text-gray-900 dark:text-white">
                Civil Status
              </FormLabel>
              <p className="text-xs font-normal text-gray-500 dark:text-gray-400">
                Please select one of the choices below
              </p>
              <FormControl>
                <RadioGroup
                  defaultValue="single"
                  className="grid grid-cols-1 gap-4 md:grid-cols-3"
                  name="status"
                  onValueChange={field.onChange}
                >
                  <FormItem>
                    <FormControl>
                      <FormLabel htmlFor="single">
                        <div className="h-full cursor-pointer rounded-lg border border-gray-200 bg-gray-50 p-4 ps-4 dark:border-gray-700 dark:bg-gray-800">
                          <div className="flex items-center">
                            <div className="flex h-5 items-center">
                              <RadioGroupItem
                                value="Single"
                                id="single"
                                outerSize="6"
                                innerSize="3.5"
                              />
                            </div>
                            <div className="ms-4 text-sm">
                              <label className="cursor-pointer font-medium leading-none text-gray-900 dark:text-white">
                                Single
                              </label>
                              <p className="mt-1 text-xs font-normal text-gray-500 dark:text-gray-400">
                                Not in a relationship
                              </p>
                            </div>
                          </div>
                        </div>
                      </FormLabel>
                    </FormControl>
                  </FormItem>
                  <FormItem>
                    <FormControl>
                      <FormLabel htmlFor="church_marriage">
                        <div className="cursor-pointer rounded-lg border border-gray-200 bg-gray-50 p-4 ps-4 dark:border-gray-700 dark:bg-gray-800">
                          <div className="flex items-center">
                            <div className="flex h-5 items-center">
                              <RadioGroupItem
                                value="Church Marriage"
                                id="church_marriage"
                                outerSize="6"
                                innerSize="3.5"
                              />
                            </div>
                            <div className="ms-4 text-sm">
                              <label
                                htmlFor="church_marriage"
                                className="cursor-pointer font-medium leading-none text-gray-900 dark:text-white"
                              >
                                Church Marriage
                              </label>
                              <p className="mt-1 text-xs font-normal text-gray-500 dark:text-gray-400">
                                Religious wedding ceremony
                              </p>
                            </div>
                          </div>
                        </div>
                      </FormLabel>
                    </FormControl>
                  </FormItem>
                  <FormItem>
                    <FormControl>
                      <FormLabel htmlFor="civil_marriage">
                        <div className="cursor-pointer rounded-lg border border-gray-200 bg-gray-50 p-4 ps-4 dark:border-gray-700 dark:bg-gray-800">
                          <div className="flex items-center">
                            <div className="flex h-5 items-center">
                              <RadioGroupItem
                                value="Civil Marriage"
                                id="civil_marriage"
                                outerSize="6"
                                innerSize="3.5"
                              />
                            </div>
                            <div className="ms-4 text-sm">
                              <label className="cursor-pointer font-medium leading-none text-gray-900 dark:text-white">
                                Civil Marriage
                              </label>
                              <p className="mt-1 text-xs font-normal text-gray-500 dark:text-gray-400">
                                Non-religious legal wedding
                              </p>
                            </div>
                          </div>
                        </div>
                      </FormLabel>
                    </FormControl>
                  </FormItem>
                </RadioGroup>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>
    </>
  )
}
