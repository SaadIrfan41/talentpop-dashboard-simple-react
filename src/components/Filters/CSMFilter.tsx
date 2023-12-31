'use client'
import { useFiltersStore } from '@/store/useFiltersStore'
import { useQuery } from '@tanstack/react-query'

import { ChevronDown, ChevronUp, Search, X } from 'lucide-react'
import { Fragment, useEffect, useRef, useState } from 'react'
import { Skeleton } from '../ui/skeleton'
import { useAutoAnimate } from '@formkit/auto-animate/react'
import { useAuthStore } from '@/store/useAuthStore'
import useClickOutside from '@/lib/useClickOutside'
import { useMenuStore } from '@/store/useMenuStore'

const CSMNameFilter = () => {
  const [animateRef] = useAutoAnimate()
  const { access_token } = useAuthStore()

  const clickOutsideRef = useRef<HTMLDivElement>(null)

  const { data, isLoading, error } = useQuery({
    queryKey: ['CSM-names-for-filter'],
    queryFn: () => getCSMNames(),
  })
  const getCSMNames = async () => {
    try {
      // const accessToken = getCookie("talentPOP_token");
      const res = await fetch(
        'http://44.240.77.70:8000/get-csm-names-for-filter',
        {
          headers: {
            accept: 'application/json',
            Authorization: `Bearer ${access_token}`,
          },
        }
      )
      const clientNames = await res.json()

      if (res.status === 401) {
        return { message: 'Not authenticated' }
      }
      return clientNames
    } catch (error: any) {
      return { message: 'Internal Server Error' }
    }
  }
  const searchRef = useRef<HTMLInputElement>(null)
  const [selectedNames, setSelectedNames] = useState([])
  const [filteredData, setFilteredData] = useState([])
  const [selectedAlphabet, setSelectedAlphabet] = useState('A')
  const [showModal, setshowModal] = useState(false)
  const [CSMNames, setCSMNames] = useState([])

  const { addCsmsNames } = useFiltersStore()
  const { resetCSMNames, setResetCSMNames } = useMenuStore()

  useEffect(() => {
    // if (data) {
    //   setFilteredData(data)
    // }
    if (data) {
      const CSMNameList = data
        .map((name: any) => {
          const agentsName = name['customer_success_manager_name']
          return agentsName
        })
        .sort()
      // console.log(agentsNameList)
      setFilteredData(CSMNameList)
      setCSMNames(CSMNameList)
    }
    if (resetCSMNames) {
      setSelectedNames([])
      setResetCSMNames(false)
    }
  }, [data, resetCSMNames, setResetCSMNames])

  useClickOutside(clickOutsideRef, () => {
    setshowModal(false)
  })
  const handleAlphabetClick = (alphabet: any) => {
    setSelectedAlphabet(alphabet)

    const filteredNames = CSMNames.filter((item: any) => {
      const name = item === null ? 'No Name' : item?.toLowerCase()
      if (name) {
        const firstChar = name[0]
        return firstChar?.toLowerCase() === alphabet?.toLowerCase()
      }
    })
    setFilteredData(filteredNames)
  }

  const handleSearchChange = () => {
    const searchText = searchRef.current?.value || ''
    // setSearchText(searchText);

    const filteredNames = CSMNames.filter(
      (item: any) => item?.toLowerCase().includes(searchText.toLowerCase())
    )
    setFilteredData(filteredNames)
  }

  const handleNameCheckboxChange = (event: any, name: any) => {
    const isChecked = event.target.checked

    if (isChecked) {
      //@ts-ignore
      setSelectedNames([...selectedNames, name])
    } else {
      setSelectedNames(
        selectedNames.filter((selectedName) => selectedName !== name)
      )
    }
  }
  const handleNameRemove = (name: string) => {
    setSelectedNames(
      selectedNames.filter((selectedName) => selectedName !== name)
    )
  }

  const renderNameList = () => {
    let currentAlphabet: any = null

    return filteredData.map((item: any, index: any) => {
      const name = item === null ? 'No Name' : item
      //
      const firstChar = name?.charAt(0)?.toUpperCase()

      // Check if the first character is different from the current alphabet
      if (firstChar !== currentAlphabet) {
        currentAlphabet = firstChar
        if (!currentAlphabet?.match(/^[A-Za-z]+$/)) {
          currentAlphabet = '#'
        }
        return (
          <Fragment key={`divider-${index}`}>
            <li className=' relative col-span-3 text-[#163143]'>
              {currentAlphabet}
              <div className='absolute inset-0 top-1/2 mx-auto  h-[2px] max-w-md bg-[#ECECEC]' />
            </li>
            <div>
              <li key={`name-${index}`} className=' flex gap-x-2 text-sm'>
                <div className=' pt-[2px]'>
                  <input
                    // style={{
                    //   accentColor: "#69C920",
                    // }}
                    type='checkbox'
                    className='pt-3 text-white'
                    checked={selectedNames.includes(
                      //@ts-ignore
                      `${name.trim()}`
                    )}
                    onChange={(event) => handleNameCheckboxChange(event, name)}
                  />
                </div>

                <span>{name}</span>
              </li>
            </div>
          </Fragment>
        )
      }

      return (
        <li key={`name-${index}`} className=' flex gap-x-2 text-sm'>
          <div className=' pt-[2px]'>
            <input
              type='checkbox'
              //@ts-ignore
              checked={selectedNames.includes(
                //@ts-ignore
                `${name.trim()}`
              )}
              className='pt-3'
              onChange={(event) => handleNameCheckboxChange(event, name)}
            />
          </div>

          <span>{name}</span>
        </li>
      )
    })
  }

  const clearFilter = () => {
    setResetCSMNames(true), addCsmsNames([])
  }

  if (isLoading)
    return (
      <>
        <Skeleton className=' relative  h-8 w-24 rounded-full  border bg-slate-200  font-bold text-[#163143]' />
      </>
    )

  if (error) return <p className=' text-base text-[#69C920]'>Error</p>
  if (data.message) {
    if (data.message === 'Not authenticated')
      return (
        <p className=' text-base text-[#69C920]'>Login Credentials Invalid</p>
      )
    return <p className=' text-base text-[#69C920]'>{data.message}</p>
  }
  //
  return (
    <div ref={animateRef} style={{ zIndex: 10 }}>
      <button
        disabled={showModal}
        onClick={() => setshowModal(!showModal)}
        className=' relative flex items-center rounded-full border p-1  pl-3 text-sm font-bold text-[#163143]'
      >
        CSM{' '}
        {selectedNames.length > 0 && (
          <span className='flex h-[15px] w-[15px] items-center rounded-full bg-[#EBEBEB] px-1'>
            {selectedNames.length}
          </span>
        )}
        <div ref={animateRef}>
          {showModal ? <ChevronUp /> : <ChevronDown />}
        </div>
      </button>
      {showModal && (
        <div
          ref={clickOutsideRef}
          className=' absolute mx-auto mt-2 min-w-[550px] max-w-xl  rounded-3xl  bg-white shadow-2xl'
        >
          <div className='  p-2 '>
            <div>
              <div className='mt-1 flex h-7 gap-x-2  rounded-full'>
                <div className='relative flex flex-grow items-stretch focus-within:z-10 '>
                  <div className='pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3'>
                    <Search
                      className='h-5 w-5 text-gray-400'
                      aria-hidden='true'
                    />
                  </div>
                  <input
                    type='search'
                    ref={searchRef}
                    // value={searchText}

                    placeholder='Search for CSM'
                    className='block w-full rounded-full border-gray-300 bg-[#F8F9FA] pl-10  focus-visible:outline-none  focus-visible:ring-1 focus-visible:ring-green-500 focus-visible:ring-offset-1 sm:text-sm '
                  />
                  <button
                    type='button'
                    onClick={() => handleSearchChange()}
                    className=' absolute inset-y-0 right-0 -ml-px flex items-center space-x-2 rounded-r-full  border bg-[#69C920] px-4   py-2 pl-3 text-sm font-medium  text-white  focus:border-green-500 focus:outline-none focus:ring-1 focus:ring-green-500'
                  >
                    Search
                  </button>
                </div>
                <button
                  type='button'
                  onClick={() => clearFilter()}
                  className=' relative inset-y-0 right-0 -ml-px flex items-center space-x-2 rounded-full  border bg-[#69C920] px-4   py-2 pl-3 text-sm font-medium  text-white  focus:border-green-500 focus:outline-none focus:ring-1 focus:ring-green-500'
                >
                  Clear Filter
                </button>
                <button
                  type='button'
                  onClick={() => addCsmsNames(selectedNames)}
                  className=' relative inset-y-0 right-0 -ml-px flex items-center space-x-2 rounded-full  border bg-[#69C920] px-4   py-2 pl-3 text-sm font-medium  text-white  focus:border-green-500 focus:outline-none focus:ring-1 focus:ring-green-500'
                >
                  Apply Filter
                </button>
              </div>

              <div className='mt-2 flex justify-around bg-[#ECECEC]/30'>
                {Array.from({ length: 26 }, (_, index) => (
                  <button
                    className={`${
                      selectedAlphabet === String.fromCharCode(65 + index)
                        ? 'text-[#163143]'
                        : 'text-[#90A8B4]'
                    }`}
                    key={index}
                    onClick={() =>
                      handleAlphabetClick(String.fromCharCode(65 + index))
                    }
                  >
                    {String.fromCharCode(65 + index)}
                  </button>
                ))}
              </div>
              {selectedNames.length === 0 ? (
                ''
              ) : (
                <div className=' flex items-center py-4 text-sm text-[#163143]'>
                  <ul className='flex flex-wrap gap-x-5 gap-y-2 pl-2'>
                    <p>Selected CSM:</p>
                    {selectedNames.map((name, index) => (
                      <li
                        className=' flex items-center gap-[10px] rounded-full bg-[#69C920] py-1 pl-2 pr-2 text-white '
                        key={index}
                      >
                        {name}
                        <X
                          onClick={() => handleNameRemove(name)}
                          className='h-[14px] w-[14px] cursor-pointer rounded-full bg-white text-[#163143] '
                        />
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
            <div className=' max-h-72 overflow-y-scroll'>
              <ul className='mt-4 grid grid-cols-3 gap-4'>
                {renderNameList()}
              </ul>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default CSMNameFilter
