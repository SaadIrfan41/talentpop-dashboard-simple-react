'use client'
// import { useFiltersStore } from "@/store/useFiltersStore";
import { ChevronDown, ChevronUp, XCircle } from 'lucide-react'
import { useRef, useState } from 'react'
import { DatePickerForm } from '../Forms/DateFilterForm'
import useClickOutside from '@/lib/useClickOutside'
import { useAutoAnimate } from '@formkit/auto-animate/react'

// import { useAutoAnimate } from "@formkit/auto-animate/react";

// import { Skeleton } from "../ui/skeleton";

const DateFilter = () => {
  const [showModal, setshowModal] = useState(false)
  const clickOutsideRef = useRef<HTMLDivElement>(null)
  const [animateRef] = useAutoAnimate()

  useClickOutside(clickOutsideRef, () => {
    setshowModal(false)
  })
  return (
    <div ref={animateRef} style={{ zIndex: 10 }}>
      <button
        // disabled={showModal}
        onClick={() => setshowModal(!showModal)}
        className=' relative flex items-center rounded-full border p-1  pl-3 text-sm font-bold text-[#163143]'
      >
        Date
        <div>{showModal ? <ChevronUp /> : <ChevronDown />}</div>
      </button>
      {showModal && (
        <div
          // ref={clickOutsideRef}
          className=' absolute mx-auto mt-3 min-w-[300px] max-w-xl  rounded-3xl  bg-white shadow-2xl'
        >
          <div
            onClick={() => setshowModal(false)}
            className='absolute right-0 text-red-400  hover:cursor-pointer top-[-5px] '
          >
            <XCircle />
          </div>
          <div className='  flex flex-col items-center py-5 '>
            <DatePickerForm />
          </div>
          <button></button>
        </div>
      )}
    </div>
  )
}

export default DateFilter
