import { useQuery } from '@tanstack/react-query'
import { useFiltersStore } from '@/store/useFiltersStore'
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js'
import { Doughnut } from 'react-chartjs-2'
import { RotateCw } from 'lucide-react'
import { useAuthStore } from '@/store/useAuthStore'

ChartJS.register(ArcElement, Tooltip, Legend)

const getAbandonedLateOntimeShifts = async (
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
      `http://18.237.25.116:8000/abandoned-late-ontime-shifts-by-count?${clientQueryParam}&${agentsQueryParam}&${teamLeadQueryParam}&${OM_QueryParam}&${CSM_QueryParam}&startdate=${startingDateFilter}&enddate=${endingDateFilter}`,
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

const AbandonedLateOntimeShifts = () => {
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
      'abandoned-late-ontime-shifts',
      filterClientName,
      filterAgentsName,
      filterCSMsName,
      filterOMsName,
      filterTeamLeadsName,
      startingDateFilter,
      endingDateFilter,
    ],
    queryFn: () =>
      getAbandonedLateOntimeShifts(
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
      <p className=' grid h-[400px] w-full place-items-center  text-center text-3xl  font-bold  capitalize text-[#69C920]'>
        {data.message}
      </p>
    )
  }

  const areAllZeros = (array: any) => {
    return array.every((value: number) => value === 0)
  }

  const values = [
    data[0].late_count,
    data[0].abandoned_count,
    data[0].missed_count,
    data[0].ontime_count,
  ]
  const dataAvaliable = !areAllZeros(values)

  console.log('Dougnut Data', dataAvaliable)
  const Chartdata = {
    labels: ['Late', 'Abandoned', 'Missed', 'Ontime'],
    datasets: [
      {
        data: [
          data[0].late_count,
          data[0].abandoned_count,
          data[0].missed_count,
          data[0].ontime_count,
        ],
        backgroundColor: ['#398D5B', '#6EF96C', '#1D542C', '#133418'],
        borderColor: ['#398D5B', '#6EF96C', '#1D542C', '#133418'],
        borderWidth: 1,
      },
    ],
  }

  return dataAvaliable ? (
    <Doughnut
      data={Chartdata}
      options={{
        plugins: {
          legend: { display: true, position: 'bottom' },
        },
      }}
    />
  ) : (
    <p className=' grid h-[400px] place-items-center  text-3xl font-bold capitalize text-[#69C920] '>
      No Data Found
    </p>
  )
}

export default AbandonedLateOntimeShifts
