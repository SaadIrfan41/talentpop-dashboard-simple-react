import { useQuery } from '@tanstack/react-query'
import { useFiltersStore } from '@/store/useFiltersStore'
import { RotateCw } from 'lucide-react'
import { StatsPositiveIcon } from '@/components/Icons'
import { useAuthStore } from '@/store/useAuthStore'
const getTotalActiveAgents = async (
  filterClientName: string[],
  filterAgentsName: string[],
  filterTeamLeadsName: string[],
  filterOMsName: string[],
  filterCSMsName: string[],
  startingDateFilter: string,
  endingDateFilter: string,
  access_token: string | null
) => {
  try {
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

    const res = await fetch(
      `http://18.237.25.116:8000/active-agents?${clientQueryParam}&${agentsQueryParam}&${teamLeadQueryParam}&${OM_QueryParam}&${CSM_QueryParam}&startdate=${startingDateFilter}&enddate=${endingDateFilter}`,
      {
        headers: {
          accept: 'application/json',
          Authorization: `Bearer ${access_token}`,
        },
      }
    )
    const agents_count = await res.json()
    console.log(agents_count)
    if (res.status === 401) {
      return { message: 'Not authenticated' }
    }
    return agents_count
  } catch (error: any) {
    console.log(error.message)
    return { message: 'Internal Server Error' }
  }
}
const TotalActiveAgents = () => {
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

  const { data, isLoading, error } = useQuery({
    queryKey: [
      'total-active-agents',
      filterClientName,
      filterAgentsName,
      filterTeamLeadsName,
      filterOMsName,
      filterCSMsName,
      startingDateFilter,
      endingDateFilter,
    ],
    queryFn: () =>
      getTotalActiveAgents(
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

  if (isLoading)
    return (
      <p className=' text-base capitalize text-[#69C920]'>
        <span className=' flex items-center gap-2'>
          <RotateCw className='mr-2 h-4 w-4 animate-spin' />
        </span>
      </p>
    )

  if (error) return <p className=' text-base text-[#69C920]'>Error</p>
  if (data.message) {
    if (data.message === 'Not authenticated')
      return (
        <p className=' text-base text-[#69C920]'>Login Credentials Invalid</p>
      )
    return <p className=' text-base text-[#69C920]'>{data.message}</p>
  }
  if (data[0] === 'nothing to return') {
    return (
      <p className=' grid h-[400px] place-items-center  text-3xl font-bold capitalize text-[#69C920] '>
        No Data Found
      </p>
    )
  }

  return (
    <>
      {data?.data[0]?.total_users || 0}
      <StatsPositiveIcon />
    </>
  )
}

export default TotalActiveAgents
