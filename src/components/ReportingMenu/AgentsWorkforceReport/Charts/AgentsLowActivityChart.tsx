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
    indexAxis: 'y' as const,
    maintainAspectRatio: false,
    elements: {
      bar: {
        borderWidth: 2,
      },
    },
    barThickness: 12,
    scales: {
      x: {
        type: 'logarithmic',
      },
    },
    plugins: {
      legend: {
        display: false,
      },
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
      style={{
        height: agentsName.length < 20 ? '100%' : agentsName.length * 20,
      }}
    >
      <Chart
        ref={chartRef}
        //@ts-ignore
        options={options}
        type='bar'
        data={chartData}
        className={`   w-full `}
      />
    </div>
  )
}
