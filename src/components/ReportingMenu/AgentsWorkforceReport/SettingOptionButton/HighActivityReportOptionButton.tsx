import { SettingIcon } from '@/components/Icons'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { useReportingMenuStore } from '@/store/useReportingMenuStore'

export function HighActivityReportOptionButton() {
  const {
    set_High_Activity_Report_Setting_Option,
    High_Activity_Report_Setting_Option,
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
        <DropdownMenuRadioGroup value={High_Activity_Report_Setting_Option}>
          <DropdownMenuRadioItem
            onClick={() =>
              set_High_Activity_Report_Setting_Option('internal_team')
            }
            value='internal_team'
          >
            Internal Team
          </DropdownMenuRadioItem>
          <DropdownMenuRadioItem
            onClick={() => set_High_Activity_Report_Setting_Option('agent')}
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
