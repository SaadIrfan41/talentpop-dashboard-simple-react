// 'use client'

// import * as React from 'react'
// import { DropdownMenuCheckboxItemProps } from '@radix-ui/react-dropdown-menu'

import { SettingIcon } from '@/components/Icons'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  //   DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { useReportingMenuStore } from '@/store/useReportingMenuStore'

export function AbandonedLateOntimeShiftsButton() {
  const {
    set_Abandoned_Late_Ontime_Shift_Setting_Option,
    Abandoned_Late_Ontime_Shift_Setting_Option,
  } = useReportingMenuStore()

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant='outline'
          className=' border-none focus-visible:ring-0 focus-visible:ring-offset-0'
        >
          <SettingIcon />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className='w-56'>
        <DropdownMenuLabel>Select Options</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuRadioGroup
          value={Abandoned_Late_Ontime_Shift_Setting_Option}
          // onValueChange={setPosition}
        >
          <DropdownMenuRadioItem
            onClick={() =>
              set_Abandoned_Late_Ontime_Shift_Setting_Option('count')
            }
            value='count'
          >
            By Count
          </DropdownMenuRadioItem>
          <DropdownMenuRadioItem
            onClick={() =>
              set_Abandoned_Late_Ontime_Shift_Setting_Option('percentage')
            }
            value='percentage'
          >
            By Percentage
          </DropdownMenuRadioItem>
          {/* <DropdownMenuRadioItem value='right'>Right</DropdownMenuRadioItem> */}
        </DropdownMenuRadioGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
