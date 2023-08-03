import { useQuery } from '@tanstack/react-query'

import { useFiltersStore } from '@/store/useFiltersStore'
import { RotateCw } from 'lucide-react'
import { useAuthStore } from '@/store/useAuthStore'
import { MonthlyBilledClientsChart } from './Charts/MonthlyBilledClientsChart'

const getHoursBilledLastMonth = async (
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
      `http://18.237.25.116:8000/hour-billed-per-client-last-month?${clientQueryParam}&${agentsQueryParam}&${teamLeadQueryParam}&${OM_QueryParam}&${CSM_QueryParam}&startdate=${startingDateFilter}&enddate=${endingDateFilter}`,
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
const HoursBilledLastMonth = () => {
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
      'hours-billed-last-month',
      filterClientName,
      filterAgentsName,
      filterTeamLeadsName,
      filterOMsName,
      filterCSMsName,
      startingDateFilter,
      endingDateFilter,
    ],
    queryFn: () =>
      getHoursBilledLastMonth(
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
      <p className=' grid h-[400px] w-full place-items-center  text-center text-3xl  font-bold  capitalize text-[#69C920]'>
        <span className=' flex items-center gap-2'>
          <RotateCw className='mr-2 h-8 w-8 animate-spin' />
        </span>
      </p>
    )
  if (error) return <p className=' text-base text-[#69C920]'>Error</p>
  if (data.message) {
    if (data.message === 'Not authenticated')
      return (
        <p className=' text-base text-[#69C920]'>Login Credentials Invalid</p>
      )
    return (
      <p className=' grid h-[400px] place-items-center  text-3xl font-bold capitalize text-[#69C920] '>
        {data.message}
      </p>
    )
  }
  if (data[0] === 'nothing to return') {
    return (
      <p className=' grid h-[400px] place-items-center  text-3xl font-bold capitalize text-[#69C920] '>
        No Data Found
      </p>
    )
  }
  if (data[0] === 'Nothing to return') {
    return (
      <p className=' grid h-[400px] place-items-center  text-3xl font-bold capitalize text-[#69C920] '>
        No Data Found
      </p>
    )
  }
  const clientName: string[] = []
  const billableHrs: string[] = []

  data?.data?.forEach((obj: any) => {
    clientName.push(obj['hop.name'] === null ? 'No Name' : obj['hop.name'])
    billableHrs.push(obj['summed_hours'].toFixed(2))
  })

  // const clientName: string[] = data.data.map((obj: any) =>
  //   obj["hop.name"] === null ? "No Name" : obj["hop.name"]
  // );
  // const billableHrs: string[] = data.data.map((obj: any) =>
  //   obj["summed_hours"].toFixed(2)
  // );
  //   console.log(clientName, billableHrs)
  return (
    <div className='flex divide-x '>
      <div className='flex max-h-[480px] max-w-[350px] flex-col gap-6 overflow-y-auto pt-4 text-base font-medium'>
        {data?.data?.map((data: any, index: number) => (
          //   <div key={index} className='flex gap-16 pl-4 pr-9  '>
          //     <span>{clientName[index]}</span>
          //     <span className=' ml-auto'>{billableHrs[index]}</span>
          //   </div>
          <div key={index} className='flex gap-16 pl-4 pr-9  '>
            <span>
              {data['hop.name'] === null ? 'No Name' : data['hop.name']}
            </span>
            <span className=' ml-auto'>{data['summed_hours'].toFixed(2)}</span>
          </div>
        ))}
      </div>
      <div className=' mx-auto max-h-[480px] w-full flex-1 overflow-x-scroll '>
        {/* <MyResponsiveBar data={BarsData} /> */}

        <MonthlyBilledClientsChart
          clientName={clientName}
          billableHrs={billableHrs}
        />
      </div>
    </div>
  )
}

export default HoursBilledLastMonth
