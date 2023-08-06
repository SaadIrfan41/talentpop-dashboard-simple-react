import { useAuthStore } from '@/store/useAuthStore'
import { Navigate } from 'react-router-dom'
import jwt_decode from 'jwt-decode'
import { DEV_BASE_URL, Mode, PROD_BASE_URL } from '@/lib/mode'

type Prop = {
  children: JSX.Element
}
type decodedType = {
  sub: string // or email
  exp: number // or timestamp
}

const PublicRoute = ({ children }: Prop) => {
  const { access_token, logout } = useAuthStore()
  if (access_token) {
    const decodedToken = jwt_decode<decodedType>(access_token)
    const currentTime = Math.floor(Date.now() / 1000)
    if (decodedToken.exp < currentTime) {
      logout()
    }
  }
  return !access_token ? (
    children
  ) : (
    <Navigate
      to={Mode === 'development' ? DEV_BASE_URL : PROD_BASE_URL}
      replace
    />
  )
}

export default PublicRoute
