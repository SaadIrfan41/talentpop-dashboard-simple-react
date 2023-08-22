import Logo from '@/assets/logo.png'

import { ChevronDown, Filter, RefreshCw } from 'lucide-react'
import LogoutButton from '@/components/LogoutButton'
import ClientsNameFilter from '@/components/Filters/ClientsNameFilter'
import AgentsNameFilter from '@/components/Filters/AgentsNameFilter'
import TeamLeadsNameFilter from '@/components/Filters/TeamLeadFilter'
import OperationManagerFilter from '@/components/Filters/OperationManagerFilter'
import CSMNameFilter from '@/components/Filters/CSMFilter'
import DateFilter from '@/components/Filters/DateFilter'
import ReportingMenu from './components/ReportingMenu/ReportingMenu'
import { RegisterUserDialogButton } from './components/RegisterUserDialogButton'
import { useFiltersStore } from './store/useFiltersStore'
import { queryClient } from './main'
import { useMenuStore } from './store/useMenuStore'

const HomePage = () => {
  const {
    setResetClientNames,
    setResetresetAgentsNames,
    setResetTeamLeadsNames,
    setResetOMNames,
    setResetCSMNames,
  } = useMenuStore()
  const {
    addClientNames,
    addAgentsNames,
    addCsmsNames,
    addOmsNames,
    addTeamLeadsNames,
    addendingdate,
    addstartingdate,
  } = useFiltersStore()

  const handelRefreshQueries = () => {
    addClientNames([])
    addAgentsNames([])
    addCsmsNames([])
    addOmsNames([])
    addTeamLeadsNames([])
    addendingdate('')
    addstartingdate('')
    setResetClientNames(true)
    setResetresetAgentsNames(true)
    setResetTeamLeadsNames(true)
    setResetOMNames(true)
    setResetCSMNames(true)

    queryClient.invalidateQueries({
      queryKey: [
        'client-names-for-filter',
        'agents-names-for-filter',
        'CSM-names-for-filter',
        'operation-manager-names-for-filter',
        'TeamLeads-names-for-filter',
        'total-active-agents',
        'total-internal-team-members',
        'total-billed-hours-count',
        'low-activity-rate-report-agents-percentage',
        'low-activity-rate-report-internal-team-percentage',
        'high-activity-rate-report-agents-percentage',
        'high-activity-rate-report-internal-team-percentage',
        'clients-with-agents',
        'abandoned-late-ontime-shifts',
        'hours-billed-last-month',
        'internal-team-report-avg',
        'agents-report-avg',
        'internal-team-low-activity-report',
        'agents-low-activity-report',
        'internal-team-high-activity-report',
        'agents-high-activity-report',
        'acceptable-activity-rate-report-agents',
        'internal-team-activity-rate',
      ],
    })
  }

  return (
    // <>
    //   <ClientsWithAgents />
    // </>
    <div className=' bg-[#FAFFFF] px-[5%] pb-20 font-nunito'>
      <header className=' border-b-2 border-[#EBEBEB]'>
        <nav className=' flex items-center gap-16 py-5 pl-6 pr-16'>
          <img src={Logo} alt='TalentPop' className=' ' />
          <div className=' flex items-center text-lg font-bold text-[#163143]'>
            All reports <ChevronDown />
          </div>
          <div className=' flex items-center ml-auto gap-16'>
            <RegisterUserDialogButton />
            <LogoutButton />
          </div>
        </nav>
      </header>
      <section className=' pl-10 pr-16'>
        <div className='flex items-center pt-10'>
          <h1 className='  text-2xl font-extrabold text-[#343434] '>
            Agent workforce report
          </h1>
          <button
            onClick={() => handelRefreshQueries()}
            // onClick={() => {
            //   setRefetchQuery(true)
            //   addClientNames([])
            //   addAgentsNames([])
            //   addCsmsNames([])
            //   addOmsNames([])
            //   addTeamLeadsNames([])
            //   addendingdate('')
            //   addstartingdate('')
            // }}
            className='ml-auto flex items-center rounded-full bg-[#69C920] px-4 py-3 text-white'
          >
            {' '}
            Refresh Report <RefreshCw className='ml-2' />{' '}
          </button>
        </div>
      </section>
      <div className='mt-6 flex items-center gap-5  px-16'>
        <div className='flex'>
          <Filter />
          <span className=' font-bold'>Filters</span>
        </div>
        <DateFilter />
        <ClientsNameFilter />
        <AgentsNameFilter />
        <TeamLeadsNameFilter />
        <OperationManagerFilter />
        <CSMNameFilter />
      </div>
      <section className='ml-10 mr-16  pt-6'>
        <ReportingMenu />
      </section>
    </div>
  )
}

export default HomePage
