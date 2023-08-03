import { useAuthStore } from '@/store/useAuthStore'
import { useNavigate } from 'react-router-dom'
const LogoutButton = () => {
  const { logout } = useAuthStore()
  const navigate = useNavigate()
  const handleLogout = () => {
    logout()
    navigate('/login')
  }
  return (
    <div
      onClick={() => handleLogout()}
      className=' ml-auto cursor-pointer text-base font-normal hover:underline'
    >
      Sign out
    </div>
  )
}

export default LogoutButton
