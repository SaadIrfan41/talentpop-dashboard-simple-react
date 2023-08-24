'use client'

import { zodResolver } from '@hookform/resolvers/zod'
// import { CalendarIcon } from "@radix-ui/react-icons";
import { format } from 'date-fns'
import { useForm } from 'react-hook-form'
import * as z from 'zod'

import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { Calendar } from '@/components/ui/calendar'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'
import { CalendarIcon } from 'lucide-react'

import { useFiltersStore } from '@/store/useFiltersStore'
import { useEffect, useState } from 'react'

const FormSchema = z.object({
  starting_date: z.date({
    required_error: 'Starting Date is required',
  }),
  ending_date: z.date({
    required_error: 'End Date is required',
  }),
})

export function DatePickerForm() {
  const {
    addstartingdate,
    addendingdate,
    startingDateFilter,
    endingDateFilter,
  } = useFiltersStore()
  const [resetDates, setresetDates] = useState(false)

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      starting_date:
        startingDateFilter === '' ? new Date() : new Date(startingDateFilter),
      ending_date:
        endingDateFilter === '' ? new Date() : new Date(endingDateFilter),
    },
  })

  async function onSubmit(formData: z.infer<typeof FormSchema>) {
    const startDate = format(formData.starting_date, 'yyyy-MM-dd')
    const endDate = format(formData.ending_date, 'yyyy-MM-dd')
    addstartingdate(startDate)
    addendingdate(endDate)
  }
  const clearFilter = () => {
    setresetDates(true)
    addstartingdate('')
    addendingdate('')
  }
  useEffect(() => {
    // This effect will trigger whenever randomPassword changes
    if (resetDates) {
      form.setValue('starting_date', new Date())
      form.setValue('ending_date', new Date())
    }
  }, [form, resetDates])

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-8'>
        <FormField
          // defaultValue={
          //   startingDateFilter === ""
          //     ? new Date("2023-01-01")
          //     : new Date(startingDateFilter)
          // }
          control={form.control}
          name='starting_date'
          render={({ field }) => (
            <FormItem className='flex flex-col'>
              <FormLabel>Start Date</FormLabel>
              <Popover>
                <PopoverTrigger asChild>
                  <FormControl>
                    <Button
                      variant={'outline'}
                      className={cn(
                        'w-[240px] pl-3 text-left font-normal',
                        !field.value && 'text-muted-foreground'
                      )}
                    >
                      {field.value ? (
                        startingDateFilter ? (
                          startingDateFilter
                        ) : (
                          format(field.value, 'yyyy-MM-dd')
                        )
                      ) : (
                        <span>Pick Start date</span>
                      )}
                      <CalendarIcon className='ml-auto h-4 w-4 opacity-50' />
                    </Button>
                  </FormControl>
                </PopoverTrigger>
                <PopoverContent className='w-auto p-0' align='start'>
                  <Calendar
                    defaultMonth={field.value}
                    mode='single'
                    selected={field.value}
                    onSelect={field.onChange}
                    disabled={(date) =>
                      date > new Date() || date < new Date('2022-12-31')
                    }
                    initialFocus
                  />
                </PopoverContent>
              </Popover>

              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          // defaultValue={}
          control={form.control}
          name='ending_date'
          render={({ field }) => (
            <FormItem className='flex flex-col'>
              <FormLabel>End Date</FormLabel>
              <Popover>
                <PopoverTrigger asChild>
                  <FormControl>
                    <Button
                      variant={'outline'}
                      className={cn(
                        'w-[240px] pl-3 text-left font-normal',
                        !field.value && 'text-muted-foreground'
                      )}
                    >
                      {field.value ? (
                        format(field.value, 'yyyy-MM-dd')
                      ) : (
                        <span>Pick End date</span>
                      )}
                      <CalendarIcon className='ml-auto h-4 w-4 opacity-50' />
                    </Button>
                  </FormControl>
                </PopoverTrigger>
                <PopoverContent className='w-auto p-0' align='start'>
                  <Calendar
                    defaultMonth={field.value}
                    mode='single'
                    selected={field.value}
                    onSelect={field.onChange}
                    disabled={(date) =>
                      date > new Date() || date < new Date('2022-12-31')
                    }
                    initialFocus
                  />
                </PopoverContent>
              </Popover>

              <FormMessage />
            </FormItem>
          )}
        />
        <div className='flex justify-between'>
          <Button
            size={'sm'}
            onClick={() => clearFilter()}
            className=' bg-[#69C920] text-sm '
            type='button'
          >
            Clear Filter
          </Button>
          <Button size={'sm'} className=' bg-[#69C920]' type='submit'>
            Filter
          </Button>
        </div>
      </form>
    </Form>
  )
}
