'use client'
import { useMenuStore } from '@/store/useMenuStore'

const Overview = () => {
  const { reportingMenu } = useMenuStore()

  return (
    <div>
      {reportingMenu === 0 && (
        <div className=' space-y-7 rounded-b-2xl rounded-tr-2xl border bg-white px-7  pb-20 pt-11'>
          OverView
        </div>
      )}
    </div>
  )
}

export default Overview
