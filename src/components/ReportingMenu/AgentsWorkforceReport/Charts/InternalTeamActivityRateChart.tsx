import {
  Chart as ChartJS,
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend,
} from 'chart.js'
import { Radar } from 'react-chartjs-2'

ChartJS.register(
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend
)

const options = {
  //   indexAxis: 'y' as const,
  //   maintainAspectRatio: false,
  //   elements: {
  //     bar: {
  //       borderWidth: 2,
  //     },
  //   },

  plugins: {
    legend: {
      display: false,
    },
    // title: {
    //   display: true,
    //   text: 'Chart.js Horizontal Bar Chart',
    // },
  },
}
const defaultLabels = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
]

export function InternalTeamActivityRateChart({ monthlyAvgActivities }: any) {
  //   const labels = monthlyAvgActivities.map((item: any) => item.month)
  //   const avgActivities = monthlyAvgActivities.map(
  //     (item: any) => item.avg_activity
  //   )
  const avgActivities = defaultLabels.map((month) => {
    const activity = monthlyAvgActivities.find((item: any) => {
      const dateString = item.month
      const fullDateString = dateString + '-01T00:00:00+00:00'
      const date = new Date(fullDateString)
      const monthName = date.toLocaleString('default', { month: 'long' })
      return monthName === month
    })

    return activity ? activity.avg_activity.toFixed(2) : null
  })
  // const dateString = '2023-06'
  // const fullDateString = dateString + '-01T00:00:00+00:00'
  // const date = new Date(fullDateString)
  // const month = date.toLocaleString('default', { month: 'long' })

  const data = {
    // labels: [
    //   'Jan',
    //   'Feb',
    //   'Mar',
    //   'Apr',
    //   'May',
    //   'Jun',
    //   'Jul',
    //   'Aug',
    //   'Sept',
    //   'Oct',
    //   'Nov',
    //   'Dec',
    // ],
    labels: defaultLabels,
    datasets: [
      {
        //   label: '# of Votes',
        data: avgActivities,
        backgroundColor: '#DBF2CA',
        borderColor: '#69C920',
        borderWidth: 1,
        pointBackgroundColor: '#69C920',
      },
    ],
  }
  return (
    <div className=' '>
      <Radar
        // style={{ width: '300px', height: '300px' }}
        data={data}
        options={options}
      />
    </div>
  )
}
