import { useRef, useEffect, useState } from 'react'
import type { ChartData, ChartArea } from 'chart.js'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
  BarElement,
  Title,
} from 'chart.js/auto'
import { Chart } from 'react-chartjs-2'

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend)

function createGradient(ctx: CanvasRenderingContext2D, area: ChartArea) {
  const colorStart = '#ff4747'
  const colorMid = '#a03a3a'
  const colorEnd = '#a03a3a'

  const gradient = ctx.createLinearGradient(area.left, 0, area.right, 0)

  gradient.addColorStop(0, colorStart)
  gradient.addColorStop(0.5, colorMid)
  gradient.addColorStop(1, colorEnd)

  return gradient
}

export function AgentsLowActivityChart({ agentsName, activityAvg }: any) {
  const chartRef = useRef<ChartJS>(null)
  const [chartData, setChartData] = useState<ChartData<'bar'>>({
    datasets: [],
  })

  const options = {
    // indexAxis: 'x' as const,
    // barThickness: names.length < 200 ? 50 : 10,
    barThickness: agentsName.length < 30 ? 30 : 10,

    maintainAspectRatio: false,
    elements: {
      bar: {
        borderWidth: 2,
      },
    },
    scales: {
      x: {
        display: false,
      },

      y: {
        type: 'logarithmic',
      },
    },
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

  useEffect(() => {
    const chart = chartRef.current

    if (!chart) {
      return
    }
    const data = {
      labels: agentsName,
      datasets: [
        {
          data: activityAvg,
        },
      ],
    }

    const chartData = {
      ...data,
      datasets: data.datasets.map((dataset) => ({
        ...dataset,
        backgroundColor: createGradient(chart.ctx, chart.chartArea),
      })),
    }

    setChartData(chartData)
  }, [activityAvg, agentsName])

  return (
    <div
      // style={{ width: names.length * 20 }}
      style={{
        width: agentsName.length < 50 ? '100%' : agentsName.length * 15,
      }}
      className='mx-auto h-[450px]  '
    >
      <Chart
        ref={chartRef}
        //@ts-ignore
        options={options}
        type='bar'
        data={chartData}
        // width={names.length * 20}
        height={'100%'}
        className={` `}
      />
    </div>
  )
}
