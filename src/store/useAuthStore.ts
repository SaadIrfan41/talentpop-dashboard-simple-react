import { create } from 'zustand'
import Cookies from 'universal-cookie'
const cookies = new Cookies()
interface State {
  isLoading: boolean
  error: string | null
  access_token: string | null
}

interface Actions {
  setAccesstoken: (token: string) => void
  logout: () => void
}

const INITIAL_STATE: State = {
  isLoading: false,
  error: null,
  access_token: cookies.get('talentPOP_token') || null,
}

export const useAuthStore = create<State & Actions>((set) => ({
  isLoading: INITIAL_STATE.isLoading,
  error: INITIAL_STATE.error,
  access_token: INITIAL_STATE.access_token,
  setAccesstoken: (token) => {
    cookies.set('talentPOP_token', token)
    try {
      return set(() => ({
        isLoading: false,
        error: null,
        access_token: token,
      }))
    } catch (error) {
      if (error instanceof Error)
        set({ error: error.message, isLoading: false })
    }
  },
  logout: () => {
    cookies.remove('talentPOP_token')
    try {
      return set(() => ({
        isLoading: false,
        error: null,
        access_token: null,
      }))
    } catch (error) {
      if (error instanceof Error)
        set({ error: error.message, isLoading: false })
    }
  },
}))
