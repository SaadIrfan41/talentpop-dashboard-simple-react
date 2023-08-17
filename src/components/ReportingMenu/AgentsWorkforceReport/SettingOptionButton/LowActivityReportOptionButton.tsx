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
import { useState } from 'react'

export function LowActivityReportOptionButton() {
  const [position, setPosition] = useState('bottom')
  const {
    set_Low_Activity_Report_Setting_Option,
    Low_Activity_Report_Setting_Option,
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
        <DropdownMenuRadioGroup value={position} onValueChange={setPosition}>
          <DropdownMenuRadioItem
            onClick={() =>
              set_Low_Activity_Report_Setting_Option('internal_team')
            }
            defaultChecked={
              Low_Activity_Report_Setting_Option === 'internal_team'
            }
            value='internal_team'
          >
            Internal Team
          </DropdownMenuRadioItem>
          <DropdownMenuRadioItem
            onClick={() => set_Low_Activity_Report_Setting_Option('agent')}
            value='agent'
          >
            Agents
          </DropdownMenuRadioItem>
          {/* <DropdownMenuRadioItem value='right'>Right</DropdownMenuRadioItem> */}
        </DropdownMenuRadioGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
