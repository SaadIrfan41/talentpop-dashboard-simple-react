import { create } from 'zustand'

interface State {
  isLoading: boolean
  error: any
  Abandoned_Late_Ontime_Shift_Setting_Option: string
  Rolling_AVG_Activity_Report_Setting_Option: string
  Low_Activity_Report_Setting_Option: string
  High_Activity_Report_Setting_Option: string
}

interface Actions {
  set_Abandoned_Late_Ontime_Shift_Setting_Option: (option: string) => void
  set_Rolling_AVG_Activity_Report_Setting_Option: (option: string) => void
  set_Low_Activity_Report_Setting_Option: (option: string) => void
  set_High_Activity_Report_Setting_Option: (option: string) => void
}

const INITIAL_STATE: State = {
  isLoading: false,
  error: null,
  Abandoned_Late_Ontime_Shift_Setting_Option: 'count',
  Rolling_AVG_Activity_Report_Setting_Option: 'internal_team',
  Low_Activity_Report_Setting_Option: 'internal_team',
  High_Activity_Report_Setting_Option: 'internal_team',
}

export const useReportingMenuStore = create<State & Actions>((set) => ({
  isLoading: INITIAL_STATE.isLoading,
  error: INITIAL_STATE.error,
  Abandoned_Late_Ontime_Shift_Setting_Option:
    INITIAL_STATE.Abandoned_Late_Ontime_Shift_Setting_Option,
  Rolling_AVG_Activity_Report_Setting_Option:
    INITIAL_STATE.Rolling_AVG_Activity_Report_Setting_Option,
  Low_Activity_Report_Setting_Option:
    INITIAL_STATE.Low_Activity_Report_Setting_Option,
  High_Activity_Report_Setting_Option:
    INITIAL_STATE.High_Activity_Report_Setting_Option,

  set_Abandoned_Late_Ontime_Shift_Setting_Option: (option) => {
    try {
      return set(() => ({
        isLoading: false,
        error: null,
        Abandoned_Late_Ontime_Shift_Setting_Option: option,
      }))
    } catch (error) {
      set({ error, isLoading: false })
    }
  },
  set_Rolling_AVG_Activity_Report_Setting_Option: (option) => {
    try {
      return set(() => ({
        isLoading: false,
        error: null,
        Rolling_AVG_Activity_Report_Setting_Option: option,
      }))
    } catch (error) {
      set({ error, isLoading: false })
    }
  },
  set_Low_Activity_Report_Setting_Option: (option) => {
    try {
      return set(() => ({
        isLoading: false,
        error: null,
        Low_Activity_Report_Setting_Option: option,
      }))
    } catch (error) {
      set({ error, isLoading: false })
    }
  },
  set_High_Activity_Report_Setting_Option: (option) => {
    try {
      return set(() => ({
        isLoading: false,
        error: null,
        High_Activity_Report_Setting_Option: option,
      }))
    } catch (error) {
      set({ error, isLoading: false })
    }
  },
}))
