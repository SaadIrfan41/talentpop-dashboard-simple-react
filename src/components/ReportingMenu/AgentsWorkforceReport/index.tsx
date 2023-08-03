import { ChevronDownIcon } from 'lucide-react'
import { useMenuStore } from '@/store/useMenuStore'
import { ExpandIcon, SettingIcon } from '../../Icons'
import TotalActiveAgents from './TotalActiveAgents'
import TotalInternalTeamMembers from './TotalInternalTeamMembers'
import TotalBilledHours from './TotalBilledHours'
import AverageAgentActivity from './AverageAgentActivity'
import AverageInternalTeamActivity from './AverageInternalTeamActivity'
import ClientsWithAgents from './ClientsWithAgents'
import TotalInternalMembers from './TotalInternalMembers'
import AbandonedLateOntimeShifts from './Charts/AbandonedLateOntimeShifts'
import HoursBilledLastMonth from './HoursBilledLastMonth'
import InternalTeamReportAVG from './RollingAVGInternalTeamActivityReport'
import AgentsHighActivityReport from './AgentsHighActivityReport'
import AgentsLowActivityReport from './AgentsLowActivityReport'
import InternalTeamActivityRate from './InternalTeamActivityRate'

const AgentsWorkforceReport = () => {
  const { reportingMenu } = useMenuStore()
  console.log(reportingMenu)

  return (
    <>
      {reportingMenu === 1 && (
        <section className=' rounded-b-2xl rounded-tr-2xl border bg-white  px-7 pb-20 pt-11'>
          <div className=' grid grid-cols-5  gap-4 text-[#163143]'>
            <div className=' flex  min-h-[150px] flex-col rounded-2xl border  pt-4 text-center 2xl:min-h-[180px]'>
              <span className=' mb-4  text-xs   font-extrabold capitalize  2xl:text-base '>
                Total Active Agents
              </span>
              <div className=' h-[2px] w-full bg-[#EFEFEF]' />
              <div className=' flex flex-col py-5 2xl:gap-3 '>
                <span className=' text-sm font-medium 2xl:text-lg'>
                  Active agents
                </span>
                <span className='flex items-center justify-center gap-1 text-2xl font-extrabold 2xl:text-[40px]'>
                  <TotalActiveAgents />
                </span>
              </div>
            </div>
            <div className=' flex  min-h-[150px] flex-col rounded-2xl border  pt-4 text-center 2xl:min-h-[180px]'>
              <span className=' mb-4  text-xs   font-extrabold capitalize  2xl:text-base '>
                Total Internal Members
              </span>
              <div className=' h-[2px] w-full bg-[#EFEFEF]' />
              <div className=' flex flex-col py-5 2xl:gap-3 '>
                <span className=' text-sm font-medium 2xl:text-lg'>
                  Internal Members
                </span>
                <span className='flex items-center justify-center gap-1 text-2xl font-extrabold 2xl:text-[40px]'>
                  <TotalInternalTeamMembers />
                </span>
              </div>
            </div>
            <div className=' flex  min-h-[150px] flex-col rounded-2xl border  pt-4 text-center 2xl:min-h-[180px]'>
              <span className=' mb-4  text-xs   font-extrabold capitalize  2xl:text-base '>
                Total Billed Hours
              </span>
              <div className=' h-[2px] w-full bg-[#EFEFEF]' />
              <div className=' flex flex-col px-3 py-5 2xl:gap-3'>
                <span className=' text-sm font-medium 2xl:text-lg'>
                  Total Bill
                </span>
                <div className='flex items-center justify-center gap-1  text-2xl font-extrabold  2xl:text-[40px]'>
                  <TotalBilledHours />
                </div>
              </div>
            </div>
            <div className=' flex  min-h-[150px] flex-col rounded-2xl border  pt-4 text-center 2xl:min-h-[180px]'>
              <span className=' mb-4  text-xs   font-extrabold capitalize  2xl:text-base '>
                Avg. Agent Activity
              </span>
              <div className=' h-[2px] w-full bg-[#EFEFEF]' />
              <div className=' flex flex-col py-5 2xl:gap-3 '>
                <span className=' text-sm font-medium 2xl:text-lg'>
                  Avg. Rate
                </span>
                <span className='flex items-center justify-center gap-1 text-2xl font-extrabold 2xl:text-[40px]'>
                  <AverageAgentActivity />
                </span>
              </div>
            </div>
            <div className=' flex  min-h-[150px] flex-col rounded-2xl border  pt-4 text-center 2xl:min-h-[180px]'>
              <span className=' mb-4  text-xs   font-extrabold capitalize  2xl:text-base '>
                Avg. Internal Team Activity
              </span>
              <div className=' h-[2px] w-full bg-[#EFEFEF]' />
              <div className=' flex flex-col py-5 2xl:gap-3 '>
                <span className=' text-sm font-medium 2xl:text-lg'>
                  Avg. Rate
                </span>
                <span className='flex items-center justify-center gap-1 text-2xl font-extrabold 2xl:text-[40px]'>
                  <AverageInternalTeamActivity />
                </span>
              </div>
            </div>
          </div>
          <div className=' mt-7 grid grid-cols-4  gap-5 text-[#163143]  '>
            {/* CLIENT NAME # OF AGENTS */}
            <div className='min-h-[500px]  overflow-y-auto  rounded-2xl  border  '>
              <div className='flex items-center px-3 py-4'>
                <span className='  text-base font-extrabold '>
                  Client Name and # of Agents
                </span>
                <div className='ml-auto flex items-center gap-3'>
                  <ExpandIcon />
                  <SettingIcon />
                </div>
              </div>
              <div className=' h-[2px] w-full bg-[#EFEFEF]' />
              <div className='flex max-h-[500px] flex-col gap-6 overflow-y-auto px-4 pt-4'>
                <ClientsWithAgents />
              </div>
            </div>
            {/* TOTAL INTERNAL MEMBEERS */}
            <div className='max- min-h-[500px] overflow-y-auto rounded-2xl  border  '>
              <div className='flex items-center px-3 py-4'>
                <span className='  text-base font-extrabold '>
                  Total Internal Members
                </span>
                <div className='ml-auto flex items-center gap-3'>
                  <ExpandIcon />
                  <SettingIcon />
                </div>
              </div>
              <div className=' h-[2px] w-full bg-[#EFEFEF]' />
              <div className='flex max-h-[500px]  flex-col gap-6 overflow-y-auto px-4 pt-4'>
                <TotalInternalMembers />
              </div>
            </div>
            {/* Abandoned Late Missed Ontime shifts by Percentage and Count */}
            <div className='  col-span-2  rounded-2xl  border px-3'>
              <div className='flex items-center py-4 '>
                <span className=' text-xs font-extrabold 2xl:text-base '>
                  Abandoned Late Missed Ontime shifts by Percentage and Counts
                </span>
                <div className='ml-auto flex items-center gap-3'>
                  <ExpandIcon />
                  <SettingIcon />
                </div>
              </div>
              <div className=' h-[2px] w-full bg-[#EFEFEF]' />
              <div className='flex max-h-[500px]  justify-center px-4 pt-4'>
                <AbandonedLateOntimeShifts />
              </div>
            </div>
          </div>
          {/* HOURS BILLED Monthly PER CLIENT */}
          <div className=' mt-10  min-h-[480px] rounded-2xl border  text-[#163143]  '>
            <div className='flex items-center px-4 py-4 '>
              <h3 className=' text-base font-extrabold'>
                Hours Billed Per Client
              </h3>
              <div className='ml-auto flex items-center gap-3'>
                <ExpandIcon />
                <SettingIcon />
              </div>
            </div>
            <div className=' h-[2px] w-full bg-[#EFEFEF]' />
            <HoursBilledLastMonth />
          </div>
          {/* Rolling Avg. Internal Team Activity Report  */}
          <div className=' mt-10  min-h-[480px] rounded-2xl border text-[#163143]   '>
            <div className='flex items-center px-4 py-4 '>
              <h3 className=' text-base font-extrabold'>
                Rolling Avg. Internal Team Activity Report
              </h3>
              <div className='ml-auto flex items-center gap-3'>
                <ExpandIcon />
                <SettingIcon />
              </div>
            </div>
            <div className=' h-[2px] w-full bg-[#EFEFEF]' />

            <div className=' overflow-x-auto  '>
              <InternalTeamReportAVG />
            </div>
          </div>
          {/* AGENTS ACTIVITY REPORT */}
          <div className='grid  grid-cols-2 gap-10  pt-11'>
            {/* Agents High Activity Report */}
            <div className=' mt-10   min-h-[500px] overflow-y-auto rounded-2xl  border text-[#163143] '>
              <div className='flex items-center px-4 py-4 '>
                <h3 className=' text-base font-extrabold'>
                  High Activity Rate Report (Agents)
                </h3>
                <div className='ml-auto flex items-center gap-3'>
                  <ExpandIcon />
                  <SettingIcon />
                </div>
              </div>
              <div className=' h-[2px] w-full bg-[#EFEFEF]' />
              <div className='flex   gap-4 py-4'>
                <div className=' flex items-center gap-4 pl-3'>
                  <div
                    style={{
                      background:
                        'linear-gradient(90.26deg, #163143 -24.85%, #69C920 80.53%)',
                    }}
                    className='h-[8px] w-[21px] '
                  />
                  <span className=' font-medium'>High Activity Rate</span>
                </div>
                <div className='ml-auto flex items-center gap-4 pr-4 '>
                  <button className='flex items-center  rounded-full bg-[#F8F9FA] px-[15px] py-[10px] text-[#163143]'>
                    {' '}
                    Download
                  </button>
                  <button className='flex items-center  rounded-full bg-[#F8F9FA] px-[15px]  py-[10px] text-[#163143]'>
                    {' '}
                    Sort <ChevronDownIcon className='ml-2' />
                  </button>
                </div>
              </div>
              <div className='max-h-[400px]  w-full overflow-y-auto '>
                <AgentsHighActivityReport />
              </div>
            </div>
            {/* Agents Low Activity Report */}
            <div className=' mt-10  min-h-[500px] overflow-y-auto rounded-2xl  border text-[#163143] '>
              <div className='flex items-center px-4 py-4 '>
                <h3 className=' text-base font-extrabold'>
                  Low Activity Rate Report (Agents)
                </h3>
                <div className='ml-auto flex items-center gap-3'>
                  <ExpandIcon />
                  <SettingIcon />
                </div>
              </div>
              <div className=' h-[2px] w-full bg-[#EFEFEF]' />
              <div className='flex   gap-4 py-4'>
                <div className=' flex items-center gap-4 pl-3'>
                  <div
                    style={{
                      background:
                        'linear-gradient(270.46deg, #ff4747 -6.83%, #a03a3a 143.02%)',
                    }}
                    className='h-[8px] w-[21px] '
                  />
                  <span className=' font-medium'>Low Activity Rate</span>
                </div>
                <div className='ml-auto flex items-center gap-4 pr-4 '>
                  <button className='flex items-center  rounded-full bg-[#F8F9FA] px-[15px] py-[10px] text-[#163143]'>
                    {' '}
                    Download
                  </button>
                  <button className='flex items-center  rounded-full bg-[#F8F9FA] px-[15px]  py-[10px] text-[#163143]'>
                    {' '}
                    Sort <ChevronDownIcon className='ml-2' />
                  </button>
                </div>
              </div>
              <div className=' max-h-[400px] w-full overflow-y-auto '>
                <AgentsLowActivityReport />
              </div>
            </div>
          </div>
          {/*Internal Team Activity Rate  */}
          <div className=' mt-10  min-h-[480px] rounded-2xl border text-[#163143]   '>
            <div className='flex items-center px-4 py-4 '>
              <h3 className=' text-base font-extrabold'>
                Internal Team Activity Rate
              </h3>
              <div className='ml-auto flex items-center gap-3'>
                <ExpandIcon />
                <SettingIcon />
              </div>
            </div>
            <div className=' h-[2px] w-full bg-[#EFEFEF]' />

            <div className=' max-h-[550px] overflow-auto  '>
              <InternalTeamActivityRate />
            </div>
          </div>
        </section>
      )}
    </>
  )
}

export default AgentsWorkforceReport
