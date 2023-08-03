import { useMenuStore } from '@/store/useMenuStore'
import { TicketsClosedByAgent } from './AgentsWorkforceReport/Tables/TicketsClosedByAgent'
import { AvgFirstTimeResponse } from './AgentsWorkforceReport/Tables/AvgFirstTimeResponse'
import { AvgResolutionTimeByAgent } from './AgentsWorkforceReport/Tables/AvgResolutionTimeByAgent'
import { MessagesSentByAgent } from './AgentsWorkforceReport/Tables/MessagesSentByAgent'
import { OneTouchTicketByAgent } from './AgentsWorkforceReport/Tables/OneTouchTicketByAgent'
import { FirstResponseTimeByClient } from './AgentsWorkforceReport/Tables/FirstResponseTimeByClient'
import { AvgCSATScore } from './AgentsWorkforceReport/Tables/AvgCSATScore'
import { RollingAvgCSATScore } from './AgentsWorkforceReport/Tables/RollingAvgCSATScore'
import { RollingAvgFirstResponseTimeByClient } from './AgentsWorkforceReport/Tables/RollingAvgFirstResponseTimeByClient'
import { OneTouchTicketByAccount } from './AgentsWorkforceReport/Tables/OneTouchTicketByAccount'
import { RollingAvgMessagesSentByAgent } from './AgentsWorkforceReport/Tables/RollingAvgMessagesSentByAgent'
import { RollingAvgResolutionTime } from './AgentsWorkforceReport/Tables/RollingAvgResolutionTime'
import { RollingAvgFirstResponseTime } from './AgentsWorkforceReport/Tables/RollingAvgFirstResponseTime'
import { AvgRolingClosedTicketsByAgent } from './AgentsWorkforceReport/Tables/AvgRolingClosedTicketsByAgent'

const GlobalPerformance = () => {
  const { reportingMenu } = useMenuStore()

  return (
    <div>
      {reportingMenu === 2 && (
        <div className=' space-y-7 rounded-b-2xl rounded-tr-2xl border bg-white px-7  pb-20 pt-11'>
          {/* # of Tickets Closed by Agent  */}
          <div className='  min-h-[480px] rounded-2xl border text-[#163143]   '>
            <div className='flex items-center px-4 py-4 '>
              <h3 className=' text-base font-extrabold'>
                # of Tickets Closed by Agent
              </h3>
            </div>
            <div className=' h-[2px] w-full bg-[#EFEFEF]' />

            <div className='  px-3 '>
              <TicketsClosedByAgent />
            </div>
          </div>

          {/* Avg. First Response Time  */}
          <div className='  min-h-[480px] rounded-2xl border text-[#163143]   '>
            <div className='flex items-center px-4 py-4 '>
              <h3 className=' text-base font-extrabold'>
                Avg. First Response Time
              </h3>
            </div>
            <div className=' h-[2px] w-full bg-[#EFEFEF]' />

            <div className='  px-3 '>
              <AvgFirstTimeResponse />
            </div>
          </div>
          {/* Avg Resolution Time By Agent  */}
          <div className='  min-h-[480px] rounded-2xl border text-[#163143]   '>
            <div className='flex items-center px-4 py-4 '>
              <h3 className=' text-base font-extrabold'>
                Avg Resolution Time By Agent
              </h3>
            </div>
            <div className=' h-[2px] w-full bg-[#EFEFEF]' />

            <div className='  px-3 '>
              <AvgResolutionTimeByAgent />
            </div>
          </div>
          {/* Messages Sent By Agent  */}
          <div className='  min-h-[480px] rounded-2xl border text-[#163143]   '>
            <div className='flex items-center px-4 py-4 '>
              <h3 className=' text-base font-extrabold'>
                Messages Sent By Agent
              </h3>
            </div>
            <div className=' h-[2px] w-full bg-[#EFEFEF]' />

            <div className='  px-3 '>
              <MessagesSentByAgent />
            </div>
          </div>
          {/*One-Touch Ticket % By Agent  */}
          <div className='  min-h-[480px] rounded-2xl border text-[#163143]   '>
            <div className='flex items-center px-4 py-4 '>
              <h3 className=' text-base font-extrabold'>
                One-Touch Ticket % By Agent
              </h3>
            </div>
            <div className=' h-[2px] w-full bg-[#EFEFEF]' />

            <div className='  px-3 '>
              <OneTouchTicketByAgent />
            </div>
          </div>
          {/*First Response Time By Client  */}
          <div className='  min-h-[480px] rounded-2xl border text-[#163143]   '>
            <div className='flex items-center px-4 py-4 '>
              <h3 className=' text-base font-extrabold'>
                First Response Time By Client
              </h3>
            </div>
            <div className=' h-[2px] w-full bg-[#EFEFEF]' />

            <div className='  px-3 '>
              <FirstResponseTimeByClient />
            </div>
          </div>
          {/*Avg CSAT Score  */}
          <div className='  min-h-[480px] rounded-2xl border text-[#163143]   '>
            <div className='flex items-center px-4 py-4 '>
              <h3 className=' text-base font-extrabold'>Avg CSAT Score</h3>
            </div>
            <div className=' h-[2px] w-full bg-[#EFEFEF]' />

            <div className='  px-3 '>
              <AvgCSATScore />
            </div>
          </div>

          {/* Rolling Avg CSAT Score + Rolling Avg. First Response Time by Client */}
          <div className='grid  grid-cols-2 gap-10  '>
            {/* Rolling Avg CSAT Score  */}
            <div className=' mt-10   min-h-[500px] overflow-y-auto rounded-2xl  border text-[#163143] '>
              <div className='flex items-center px-4 py-4 '>
                <h3 className=' text-base font-extrabold'>
                  Rolling Avg CSAT Score
                </h3>
              </div>
              <div className=' h-[2px] w-full bg-[#EFEFEF]' />

              <div className='max-h-[500px]  w-full overflow-y-auto '>
                <RollingAvgCSATScore />
              </div>
            </div>
            {/* Rolling Avg. First Response Time by Client */}
            <div className=' mt-10   min-h-[500px] overflow-y-auto rounded-2xl  border text-[#163143] '>
              <div className='flex items-center px-4 py-4 '>
                <h3 className=' text-base font-extrabold'>
                  Rolling Avg. First Response Time by Client
                </h3>
              </div>
              <div className=' h-[2px] w-full bg-[#EFEFEF]' />

              <div className='max-h-[500px]  w-full overflow-y-auto '>
                <RollingAvgFirstResponseTimeByClient />
              </div>
            </div>
          </div>

          {/* One-Touch Ticket % By Account + Rolling Avg. Messages Sent By Agent */}
          <div className='grid  grid-cols-2 gap-10  '>
            {/* One-Touch Ticket % By Account  */}
            <div className=' mt-10   min-h-[500px] overflow-y-auto rounded-2xl  border text-[#163143] '>
              <div className='flex items-center px-4 py-4 '>
                <h3 className=' text-base font-extrabold'>
                  One-Touch Ticket % By Account
                </h3>
              </div>
              <div className=' h-[2px] w-full bg-[#EFEFEF]' />

              <div className='max-h-[500px]  w-full overflow-y-auto '>
                <OneTouchTicketByAccount />
              </div>
            </div>
            {/* Rolling Avg. Messages Sent By Agent */}
            <div className=' mt-10   min-h-[500px] overflow-y-auto rounded-2xl  border text-[#163143] '>
              <div className='flex items-center px-4 py-4 '>
                <h3 className=' text-base font-extrabold'>
                  Rolling Avg. Messages Sent By Agent
                </h3>
              </div>
              <div className=' h-[2px] w-full bg-[#EFEFEF]' />

              <div className='max-h-[500px]  w-full overflow-y-auto '>
                <RollingAvgMessagesSentByAgent />
              </div>
            </div>
          </div>

          {/* Rolling Avg. Resolution Time  + Rolling Avg. First Response Time  */}
          <div className='grid  grid-cols-2 gap-10  '>
            {/* Rolling Avg. Resolution Time   */}
            <div className=' mt-10   min-h-[500px] overflow-y-auto rounded-2xl  border text-[#163143] '>
              <div className='flex items-center px-4 py-4 '>
                <h3 className=' text-base font-extrabold'>
                  Rolling Avg. Resolution Time
                </h3>
              </div>
              <div className=' h-[2px] w-full bg-[#EFEFEF]' />

              <div className='max-h-[500px]  w-full overflow-y-auto '>
                <RollingAvgResolutionTime />
              </div>
            </div>
            {/* Rolling Avg. First Response Time  */}
            <div className=' mt-10   min-h-[500px] overflow-y-auto rounded-2xl  border text-[#163143] '>
              <div className='flex items-center px-4 py-4 '>
                <h3 className=' text-base font-extrabold'>
                  Rolling Avg. First Response Time
                </h3>
              </div>
              <div className=' h-[2px] w-full bg-[#EFEFEF]' />

              <div className='max-h-[500px]  w-full overflow-y-auto '>
                <RollingAvgFirstResponseTime />
              </div>
            </div>
          </div>

          {/*Avg. Roling Closed Tickets by Agent */}
          <div className='  min-h-[480px] rounded-2xl border text-[#163143]   '>
            <div className='flex items-center px-4 py-4 '>
              <h3 className=' text-base font-extrabold'>
                Avg. Roling Closed Tickets by Agent
              </h3>
            </div>
            <div className=' h-[2px] w-full bg-[#EFEFEF]' />

            <div className='px-3'>
              <AvgRolingClosedTicketsByAgent />
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default GlobalPerformance
