import { useInfiniteQuery } from '@tanstack/react-query'

import { useFiltersStore } from '@/store/useFiltersStore'
import { RotateCw } from 'lucide-react'
import { useAuthStore } from '@/store/useAuthStore'
import { RollingAVGInternalTeamActivityChart } from './Charts/RollingAVGInternalTeamActivityChart'
import useIntersectionObserver from '@/hooks/useIntersectionObserver'

interface MonthlyActivity {
  month: string
  monthly_rolling_avg_activity: number
}

const getInterTeamReportAVG = async (
  filterClientName: string[],
  filterAgentsName: string[],
  filterTeamLeadsName: string[],
  filterOMsName: string[],
  filterCSMsName: string[],
  startingDateFilter: string,
  endingDateFilter: string,
  access_token: string | null,
  pageParam: number
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
      `http://18.237.25.116:8000/rolling-average-internal-team-activity-report?${clientQueryParam}&${agentsQueryParam}&${teamLeadQueryParam}&${OM_QueryParam}&${CSM_QueryParam}&startdate=${startingDateFilter}&enddate=${endingDateFilter}&page=${pageParam}`,
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
    console.log(error.message)
    return { message: 'Internal Server Error' }
  }
}
const InternalTeamReportAVG = () => {
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

  const {
    data,
    isLoading,
    error,
    fetchNextPage,
    hasNextPage,
    // isFetchingNextPage,
  } = useInfiniteQuery({
    queryKey: [
      'internal-team-report-avg',
      filterClientName,
      filterAgentsName,
      filterTeamLeadsName,
      filterOMsName,
      filterCSMsName,
      startingDateFilter,
      endingDateFilter,
    ],
    queryFn: ({ pageParam = 1 }) =>
      getInterTeamReportAVG(
        filterClientName,
        filterAgentsName,
        filterTeamLeadsName,
        filterOMsName,
        filterCSMsName,
        startingDateFilter,
        endingDateFilter,
        access_token,
        Number(pageParam)
      ),
    getNextPageParam: (lastPage, pages) => {
      // console.log('LAST PAGE', lastPage)
      if (lastPage.message === 'no data found') {
        // console.log('No Data Found')
        return undefined
      }
      if (lastPage.message === 'Not authenticated') {
        // console.log('User Not Authorized ')
        return undefined
      }
      if (lastPage.message) {
        // console.log(lastPage.message)
        return undefined
      }
      return pages.length + 1
    },
  })
  const lastValueRef = useIntersectionObserver<HTMLLIElement>(
    () => void fetchNextPage(),
    [hasNextPage]
  )

  if (isLoading)
    return (
      <p className=' grid h-[400px] w-full place-items-center  text-center text-3xl  font-bold  capitalize text-[#69C920]'>
        <span className=' flex items-center gap-2'>
          <RotateCw className='mr-2 h-8 w-8 animate-spin' />
        </span>
      </p>
    )
  if (error) return <p className=' text-base text-[#69C920]'>Error</p>
  if (data?.pages[0].message) {
    if (data?.pages[0].message === 'Not authenticated')
      return (
        <p className=' text-base text-[#69C920]'>Login Credentials Invalid</p>
      )
    return (
      <p className=' grid h-[400px] place-items-center  text-3xl font-bold capitalize text-[#69C920]'>
        {data?.pages[0].message}
      </p>
    )
  }

  // console.log(data?.pages[0].name)

  const clientData = data?.pages.flatMap((entry) => {
    return entry.map(({ name, monthly_rolling_avg_activity }: any) => {
      let totalMonthlyRollingAvg
      // Calculate the total sum of monthly_rolling_avg_activity rates
      if (startingDateFilter || endingDateFilter) {
        totalMonthlyRollingAvg = monthly_rolling_avg_activity.reduce(
          (total: number, item: MonthlyActivity) =>
            total + item.monthly_rolling_avg_activity,
          0
        )
      } else {
        totalMonthlyRollingAvg =
          monthly_rolling_avg_activity[0].monthly_rolling_avg_activity
      }

      return {
        agentsName: name,
        activityAvg: totalMonthlyRollingAvg,
      }
    })
  })
  console.log(clientData)
  const agentsName: string[] = []
  const activityAvg: string[] = []

  clientData?.forEach((obj: any) => {
    agentsName.push(obj['agentsName'] === null ? 'No Name' : obj['agentsName'])
    activityAvg.push(
      obj['activityAvg'] === null ? 0 : obj['activityAvg'].toFixed(2)
    )
  })

  return (
    // <>Rollling AVG</>
    <RollingAVGInternalTeamActivityChart
      agentsName={agentsName}
      activityAvg={activityAvg}
    />
  )
}

export default InternalTeamReportAVG
