import { create } from 'zustand'
// import { useFiltersStore } from './useFiltersStore'

interface State {
  isLoading: boolean
  error: any
  reportingMenu: number
  resetClientNames: boolean
  resetAgentsNames: boolean
  resetTeamLeadsNames: boolean
  resetOMNames: boolean
  resetCSMNames: boolean
}

interface Actions {
  changeReportingMenu: (number: number) => void
  setResetClientNames: (reset: boolean) => void
  setResetresetAgentsNames: (reset: boolean) => void
  setResetTeamLeadsNames: (reset: boolean) => void
  setResetOMNames: (reset: boolean) => void
  setResetCSMNames: (reset: boolean) => void
}

const INITIAL_STATE: State = {
  isLoading: false,
  error: null,
  reportingMenu: 1,
  resetClientNames: false,
  resetAgentsNames: false,
  resetTeamLeadsNames: false,
  resetOMNames: false,
  resetCSMNames: false,
}

export const useMenuStore = create<State & Actions>((set) => {
  return {
    isLoading: INITIAL_STATE.isLoading,
    error: INITIAL_STATE.error,
    reportingMenu: INITIAL_STATE.reportingMenu,
    resetClientNames: INITIAL_STATE.resetClientNames,
    resetAgentsNames: INITIAL_STATE.resetAgentsNames,
    resetTeamLeadsNames: INITIAL_STATE.resetTeamLeadsNames,
    resetOMNames: INITIAL_STATE.resetOMNames,
    resetCSMNames: INITIAL_STATE.resetCSMNames,

    changeReportingMenu: (number) => {
      try {
        return set(() => ({
          isLoading: false,
          error: null,
          reportingMenu: number,
        }))
      } catch (error) {
        set({ error, isLoading: false })
      }
    },
    setResetClientNames: (refetch) => {
      try {
        return set(() => ({
          isLoading: false,
          error: null,
          resetClientNames: refetch,
        }))
      } catch (error) {
        set({ error, isLoading: false })
      }
    },
    setResetresetAgentsNames: (refetch) => {
      try {
        return set(() => ({
          isLoading: false,
          error: null,
          resetAgentsNames: refetch,
        }))
      } catch (error) {
        set({ error, isLoading: false })
      }
    },
    setResetTeamLeadsNames: (refetch) => {
      try {
        return set(() => ({
          isLoading: false,
          error: null,
          resetTeamLeadsNames: refetch,
        }))
      } catch (error) {
        set({ error, isLoading: false })
      }
    },
    setResetOMNames: (refetch) => {
      try {
        return set(() => ({
          isLoading: false,
          error: null,
          resetOMNames: refetch,
        }))
      } catch (error) {
        set({ error, isLoading: false })
      }
    },
    setResetCSMNames: (refetch) => {
      try {
        return set(() => ({
          isLoading: false,
          error: null,
          resetCSMNames: refetch,
        }))
      } catch (error) {
        set({ error, isLoading: false })
      }
    },
  }
})
