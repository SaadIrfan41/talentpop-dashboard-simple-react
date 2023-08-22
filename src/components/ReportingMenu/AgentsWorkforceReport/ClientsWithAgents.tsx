import { useInfiniteQuery } from '@tanstack/react-query'
import { useFiltersStore } from '@/store/useFiltersStore'
import { RotateCw } from 'lucide-react'
import { useAuthStore } from '@/store/useAuthStore'
import { UpIcon } from '@/components/Icons'
import useIntersectionObserver from '@/hooks/useIntersectionObserver'

const getClienWithAgentsCount = async (
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
      `http://18.237.25.116:8000/active-agents-by-client?${clientQueryParam}&${agentsQueryParam}&${teamLeadQueryParam}&${OM_QueryParam}&${CSM_QueryParam}&startdate=${startingDateFilter}&enddate=${endingDateFilter}&page=${pageParam}`,
      {
        headers: {
          accept: 'application/json',
          Authorization: `Bearer ${access_token}`,
        },
      }
    )
    const data = await res.json()
    //
    if (res.status === 401) {
      return { message: 'Not authenticated' }
    }
    return data
  } catch (error: any) {
    return { message: 'Internal Server Error' }
  }
}

const ClientsWithAgents = () => {
  const {
    filterClientName,
    filterAgentsName,
    filterTeamLeadsName,
    filterOMsName,
    filterCSMsName,
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
    isRefetching,
  } = useInfiniteQuery({
    queryKey: [
      'clients-with-agents',
      filterClientName,
      filterAgentsName,
      filterTeamLeadsName,
      filterOMsName,
      filterCSMsName,
      startingDateFilter,
      endingDateFilter,
    ],
    queryFn: ({ pageParam = 1 }) =>
      getClienWithAgentsCount(
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

    // select: (data) => ({
    //   ...data,
    //   pages: data.pages.map((page) => page),
    // }),
  })
  const lastValueRef = useIntersectionObserver<HTMLLIElement>(
    () => void fetchNextPage(),
    [hasNextPage]
  )
  if (isLoading || isRefetching)
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
  //   if (data[0] === 'nothing to return') {
  //     return (
  //       <p className=' grid h-[400px] place-items-center  text-3xl font-bold capitalize text-[#69C920] '>
  //         No Data Found
  //       </p>
  //     )
  //   }
  //   const lastPage = data?.pages[data.pages.length - 1]
  //
  //   const agentsToDisplay = lastPage.slice(0, -1)
  return (
    <>
      {data?.pages?.length === 0 ? (
        <p className=' text-base text-[#69C920]'>No Data Found</p>
      ) : (
        data?.pages
          .flat()
          .slice(0, -1)
          .map((value: any, index: number) => (
            <div
              //@ts-ignore
              ref={data.pages.flat().length - 2 === index ? lastValueRef : null}
              key={index}
            >
              <span className=' text-base font-medium'>
                {value['projects.name']
                  ? value['projects.name'].replace(`Customer Service -`, '')
                  : 'No Name'}
              </span>
              <div className='flex items-center gap-1'>
                <span className=' text-lg font-bold'>{value.user_count}</span>
                <UpIcon />
                <div
                  style={{
                    background:
                      'linear-gradient(90.26deg, #163143 -24.85%, #69C920 80.53%)',
                    width:
                      value.user_count > 100 ? '100%' : `${value.user_count}%`,
                  }}
                  className={` h-3`}
                />
              </div>
            </div>
          ))
      )}
      {hasNextPage && (
        <p className='text-base text-[#69C920] text-center pb-2 flex justify-center'>
          {isFetchingNextPage ? (
            <RotateCw className='mr-2 h-5 w-5 animate-spin' />
          ) : (
            'No More Data'
          )}
        </p>
      )}
    </>
  )
}

export default ClientsWithAgents
