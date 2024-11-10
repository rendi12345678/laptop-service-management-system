"use client"

import * as React from "react"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { format } from "date-fns"
import { Calendar as CalendarIcon } from "lucide-react"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Calendar } from "@/components/ui/calendar"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"

// Define the validation schema using Zod
const formSchema = z.object({
  checkIn: z.date().refine((date) => {
    const today = new Date()
    return date >= today
  }, "Check-in date must be today or later"),
  checkOut: z.date()
    // @ts-ignore
    .refine((date, ctx) => date > ctx.parent.checkIn, "Check-out date must be after check-in")
    .refine((date) => {
      const today = new Date()
      return date >= today
    }, "Check-out date must be today or later"),
  guests: z.number().min(1, "Minimum 1 guest"),
  rooms: z.number().min(1, "Minimum 1 room"),
})

export default function HomestayForm() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      checkIn: undefined,
      checkOut: undefined,
      guests: 1,
      rooms: 1,
    },
  })

  function onSubmit(values: z.infer<typeof formSchema>) {
    // Handle form submission
    console.log(values)
  }

  return (
    <div className="bg-transparent mx-6 z-10 relative -mt-36 rounded-lg text-left flex flex-col">
      <h2 className="text-background text-left mb-4 max-w-[13ch]">Find your stay in Bali</h2>
      <div className="w-full max-w-2xl bg-white p-6 rounded-lg shadow-md">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            {/* Check-in field */}
            <FormField
              control={form.control}
              name="checkIn"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Check-in Date</FormLabel>
                  <FormControl>
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button
                          variant={"outline"}
                          className="w-full justify-start text-left font-normal"
                        >
                          <CalendarIcon className="mr-2 h-4 w-4" />
                          {field.value ? format(field.value, "PPP") : <span>Pick a date</span>}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0">
                        <Calendar
                          mode="single"
                          selected={field.value}
                          onSelect={(date) => field.onChange(date)}
                          initialFocus
                        />
                      </PopoverContent>
                    </Popover>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Check-out field */}
            <FormField
              control={form.control}
              name="checkOut"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Check-out Date</FormLabel>
                  <FormControl>
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button
                          variant={"outline"}
                          className="w-full justify-start text-left font-normal"
                        >
                          <CalendarIcon className="mr-2 h-4 w-4" />
                          {field.value ? format(field.value, "PPP") : <span>Pick a date</span>}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0">
                        <Calendar
                          mode="single"
                          selected={field.value}
                          onSelect={(date) => field.onChange(date)}
                          initialFocus
                          // @ts-ignore
                          disableDate={(date) => date <= form.getValues("checkIn")}
                        />
                      </PopoverContent>
                    </Popover>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Guests and Rooms in one row */}
            <div className="flex gap-4">
              {/* Guests field */}
              <FormField
                control={form.control}
                name="guests"
                render={({ field }) => (
                  <FormItem className="flex-1">
                    <FormLabel>Number of Guests</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        min={1}
                        className="p-3 border border-gray-300 rounded-md w-full"
                        value={field.value}
                        onChange={(e) => field.onChange(Number(e.target.value))}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Rooms field */}
              <FormField
                control={form.control}
                name="rooms"
                render={({ field }) => (
                  <FormItem className="flex-1">
                    <FormLabel>Number of Rooms</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        min={1}
                        className="p-3 border border-gray-300 rounded-md w-full"
                        value={field.value}
                        onChange={(e) => field.onChange(Number(e.target.value))}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            {/* Submit Button */}
            <Button
              type="submit"
              className="w-full py-3 bg-primary text-white font-semibold rounded-lg transition"
            >
              Search
            </Button>
          </form>
        </Form>
      </div>
    </div>
  )
}
