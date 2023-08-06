import { useAuthStore } from '@/store/useAuthStore'
import { Navigate, useLocation } from 'react-router-dom'
import jwt_decode from 'jwt-decode'
import { DEV_BASE_URL, Mode, PROD_BASE_URL } from '@/lib/mode'

type Prop = {
  children: JSX.Element
}
type decodedType = {
  sub: string // or email
  exp: number // or timestamp
}

const ProtectedRoute = ({ children }: Prop) => {
  const { access_token, logout } = useAuthStore()
  const location = useLocation().pathname
  if (access_token) {
    const decodedToken = jwt_decode<decodedType>(access_token)
    const currentTime = Math.floor(Date.now() / 1000)
    if (decodedToken.exp < currentTime) {
      logout()
    }
  }

  return access_token ? (
    children
  ) : (
    <Navigate
      to={
        Mode === 'development'
          ? DEV_BASE_URL + '/login'
          : PROD_BASE_URL + '/login'
      }
      replace
      state={{ from: location }}
    />
  )
}

export default ProtectedRoute
