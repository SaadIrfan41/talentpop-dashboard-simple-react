import Overview from './Overview'
import AgentsWorkforceReport from './AgentsWorkforceReport/index'
// import GlobalPerformance from './GlobalPerformance'
import { useMenuStore } from '@/store/useMenuStore'
import { OverviewMenuIcon } from '../Icons'
import GlobalPerformance from './GlobalPerformance'

const ReportingMenu = () => {
  const { changeReportingMenu, reportingMenu } = useMenuStore()
  //

  return (
    <section className='   '>
      <nav className=' nav relative z-[1]  flex pl-[18px] text-base font-medium text-[#163143]'>
        <button
          onClick={() => changeReportingMenu(0)}
          className={`relative   flex items-center gap-3 pb-3 pl-4 pr-16 pt-5 before:absolute before:inset-0   before:z-[-1]  before:origin-bottom before:rounded-t-2xl before:border before:border-[#EBEBEB] before:bg-white before:content-[''] before:border-b-0${
            reportingMenu === 0 ? ' z-[2] before:-mb-[1px] ' : ''
          }`}
        >
          <OverviewMenuIcon />
          <span className='  '>Overview</span>
        </button>

        <button
          onClick={() => changeReportingMenu(1)}
          className={`relative  pb-3 pl-4 pr-16 pt-5 before:absolute before:bottom-0 before:left-0 before:right-0 before:top-0 before:z-[-1]  before:origin-bottom before:rounded-t-2xl before:border before:border-b-0 before:border-[#EBEBEB] before:bg-white before:content-[''] ${
            reportingMenu === 1 ? ' z-[2] before:-mb-[1px] ' : ' '
          } `}
        >
          <span className=''> Agent workforce report</span>
        </button>

        <button
          onClick={() => changeReportingMenu(2)}
          className={`relative   flex items-center gap-3 pb-3 pl-4 pr-16 pt-5 before:absolute before:inset-0  before:z-[-1]  before:origin-bottom before:rounded-t-2xl before:border before:border-b-0 before:border-[#EBEBEB] before:bg-white before:content-[''] ${
            reportingMenu === 2 ? ' z-[2] before:-mb-[1px] ' : 'before:z-[-2]  '
          }`}
        >
          <span className=''> Global Performance</span>
        </button>
      </nav>

      <Overview />

      <AgentsWorkforceReport />

      <GlobalPerformance />
    </section>
  )
}

export default ReportingMenu
