import { useQuery } from '@tanstack/react-query'
import { useFiltersStore } from '@/store/useFiltersStore'
import { RotateCw } from 'lucide-react'
import { useAuthStore } from '@/store/useAuthStore'
// import { StatsNegativeIcon } from '@/components/Icons'

const getTotalBilledHours = async (
  filterClientName: string[],
  filterAgentsName: string[],
  filterTeamLeadsName: string[],
  filterOMsName: string[],
  filterCSMsName: string[],
  startingDateFilter: string,
  endingDateFilter: string,
  access_token: string | null
) => {
  const clientQueryParam = new URLSearchParams()

  filterClientName.forEach((client) => {
    clientQueryParam.append('client', client)
  })

  const agentsQueryParam = new URLSearchParams()

  filterAgentsName.forEach((agent) => {
    agentsQueryParam.append('agentname', agent)
  })
  const teamLeadQueryParam = new URLSearchParams()

  filterTeamLeadsName.forEach((teamlead) => {
    teamLeadQueryParam.append('teamlead', teamlead)
  })
  const OM_QueryParam = new URLSearchParams()

  filterOMsName.forEach((OM) => {
    OM_QueryParam.append('operationmanager', OM)
  })
  const CSM_QueryParam = new URLSearchParams()

  filterCSMsName.forEach((CSM) => {
    CSM_QueryParam.append('customersuccessmanager', CSM)
  })

  try {
    const res = await fetch(
      `http://44.240.77.70:8000/total-billed-hours?${clientQueryParam}&${agentsQueryParam}&${teamLeadQueryParam}&${OM_QueryParam}&${CSM_QueryParam}&startdate=${startingDateFilter}&enddate=${endingDateFilter}`,
      {
        headers: {
          accept: 'application/json',
          Authorization: `Bearer ${access_token}`,
        },
      }
    )

    const data = await res.json()
    if (res.status === 401) {
      return { message: 'Not authenticated' }
    }
    return data
  } catch (error: any) {
    return { message: 'Internal Server Error' }
  }
}

function formatNumberToShort(number: number) {
  if (number < 1000) {
    return number.toString()
  } else if (number < 1000000) {
    return (number / 1000).toFixed(1) + 'K'
  } else if (number < 1000000000) {
    return (number / 1000000).toFixed(1) + 'M'
  } else if (number < 1000000000000) {
    return (number / 1000000000).toFixed(1) + 'B'
  } else {
    return (number / 1000000000000).toFixed(1) + 'T'
  }
}
const TotalBilledHours = () => {
  const {
    filterClientName,
    filterAgentsName,
    filterCSMsName,
    filterOMsName,
    filterTeamLeadsName,
    startingDateFilter,
    endingDateFilter,
  } = useFiltersStore()

  const { access_token } = useAuthStore()

  const { data, isLoading, error, isRefetching, isRefetchError } = useQuery({
    queryKey: [
      'total-billed-hours-count',
      filterClientName,
      filterAgentsName,
      filterTeamLeadsName,
      filterOMsName,
      filterCSMsName,
      startingDateFilter,
      endingDateFilter,
    ],
    queryFn: () =>
      getTotalBilledHours(
        filterClientName,
        filterAgentsName,
        filterTeamLeadsName,
        filterOMsName,
        filterCSMsName,
        startingDateFilter,
        endingDateFilter,
        access_token
      ),
  })

  if (isLoading || isRefetching)
    return (
      <p className=' text-base capitalize text-[#69C920]'>
        <span className=' flex items-center gap-2'>
          <RotateCw className='mr-2 h-4 w-4 animate-spin' />
        </span>
      </p>
    )
  if (error || isRefetchError)
    return <p className=' text-base text-[#69C920]'>Error</p>
  if (data.message) {
    if (data.message === 'Not authenticated')
      return (
        <p className=' text-base text-[#69C920]'>Login Credentials Invalid</p>
      )
    return <p className=' text-base text-[#69C920]'>{data.message}</p>
  }

  return (
    <div className='flex items-center'>
      {data?.data[0].total_hours
        ? formatNumberToShort(data?.data[0].total_hours)
        : 0}

      {/* <StatsNegativeIcon /> */}
    </div>
  )
}

export default TotalBilledHours
