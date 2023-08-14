import { create } from 'zustand'

interface State {
  isLoading: boolean
  error: any
  reportingMenu: number
}

interface Actions {
  changeReportingMenu: (number: number) => void
}

const INITIAL_STATE: State = {
  isLoading: false,
  error: null,
  reportingMenu: 1,
}

export const useMenuStore = create<State & Actions>((set) => ({
  isLoading: INITIAL_STATE.isLoading,
  error: INITIAL_STATE.error,
  reportingMenu: INITIAL_STATE.reportingMenu,
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
}))
