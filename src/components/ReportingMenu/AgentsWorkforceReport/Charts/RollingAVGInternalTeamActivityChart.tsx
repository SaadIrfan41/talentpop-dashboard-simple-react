'use client'
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
  const colorStart = '#163143'
  const colorMid = '#69C920'
  const colorEnd = '#69C920'

  const gradient = ctx.createLinearGradient(0, area.top, 0, area.bottom)

  gradient.addColorStop(0, colorStart)
  gradient.addColorStop(0.5, colorMid)
  gradient.addColorStop(1, colorEnd)

  return gradient
}

export function RollingAVGInternalTeamActivityChart({
  agentsName,
  activityAvg,
}: any) {
  const chartRef = useRef<ChartJS>(null)

  const options = {
    barThickness: agentsName.length < 50 ? 50 : 10,

    maintainAspectRatio: false,
    elements: {
      bar: {
        borderWidth: 2,
      },
    },
    scales: {
      x: {
        ticks: {
          maxRotation: 90,
          minRotation: 90,
        },
      },
    },

    plugins: {
      legend: {
        display: false,
      },
    },
  }

  const [chartData, setChartData] = useState<ChartData<'bar'>>({
    datasets: [],
  })

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
        width: agentsName.length < 50 ? '100%' : agentsName.length * 20,
      }}
      className='mx-auto h-[450px] pt-12 '
    >
      <Chart
        ref={chartRef}
        options={options}
        type='bar'
        data={chartData}
        // width={agentsName.length * 10}
        height={'100%'}
        className={` `}
      />
    </div>
  )
}
