import { useInfiniteQuery } from '@tanstack/react-query'

import { useFiltersStore } from '@/store/useFiltersStore'
import { RotateCw } from 'lucide-react'
import { useAuthStore } from '@/store/useAuthStore'
import useIntersectionObserver from '@/hooks/useIntersectionObserver'
import { BarChart } from './Charts/BarChart'

interface MonthlyActivity {
  month: string
  monthly_rolling_avg_activity: number
}

const getAgentsReportAVG = async (
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
      `http://18.237.25.116:8000/rolling-average-agent-activity-report?${clientQueryParam}&${agentsQueryParam}&${teamLeadQueryParam}&${OM_QueryParam}&${CSM_QueryParam}&startdate=${startingDateFilter}&enddate=${endingDateFilter}&page=${pageParam}`,
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
const RollingAvgAgentsActivityReport = () => {
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
    isFetchingNextPage,
  } = useInfiniteQuery({
    queryKey: [
      'agents-report-avg',
      filterClientName,
      filterAgentsName,
      filterTeamLeadsName,
      filterOMsName,
      filterCSMsName,
      startingDateFilter,
      endingDateFilter,
    ],
    queryFn: ({ pageParam = 1 }) =>
      getAgentsReportAVG(
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
      //
      if (lastPage.message === 'no data found') {
        //
        return undefined
      }
      if (lastPage.message === 'Not authenticated') {
        //
        return undefined
      }
      if (lastPage.message) {
        //
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

  //

  const clientData = data?.pages.flatMap((entry) => {
    if (entry.message !== 'no data found') {
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
          agentsName: name === null ? 'No Name' : name,
          activityAvg:
            totalMonthlyRollingAvg === null
              ? 0
              : Number(
                  totalMonthlyRollingAvg.toFixed(2).replace(/[.,]00$/, '')
                ),
        }
      })
    }
    return
  })

  const agentsName: string[] = []
  const activityAvg: number[] = []

  clientData?.forEach((obj: any) => {
    if (obj?.agentsName) {
      agentsName.push(obj?.agentsName)
    }
    if (obj?.activityAvg) {
      activityAvg.push(obj?.activityAvg)
    }
  })

  return (
    <div>
      {clientData?.length === 0 ? (
        <p className=' text-base text-[#69C920]'>No Data Found</p>
      ) : (
        <div className='flex divide-x '>
          <div className='flex max-h-[480px] max-w-[350px] flex-col gap-6 overflow-y-auto pt-4 text-base font-medium'>
            {clientData?.map((value, index: number) => (
              <div
                //@ts-ignore
                ref={clientData?.length - 2 === index ? lastValueRef : null}
                key={index}
                className='flex gap-16 pl-4 pr-9  '
              >
                <span>
                  {value?.agentsName === null ? 'No Name' : value?.agentsName}
                </span>
                <span className=' ml-auto'>
                  {value?.activityAvg === null ? 0 : value?.activityAvg}
                </span>
              </div>
            ))}
            {hasNextPage && (
              <p className='text-base text-[#69C920] text-center pb-2 flex justify-center'>
                {isFetchingNextPage ? (
                  <RotateCw className='mr-2 h-5 w-5 animate-spin' />
                ) : (
                  'No More Data'
                )}
              </p>
            )}
          </div>

          <div className=' mx-auto max-h-[480px] w-full flex-1 overflow-x-scroll '>
            <BarChart names={agentsName} values={activityAvg} />
          </div>
        </div>
      )}
    </div>
  )
}

export default RollingAvgAgentsActivityReport
