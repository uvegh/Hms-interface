import { useContext } from 'react'
import { HmsContext } from '../../context/HmsContext'
import { Navigate } from 'react-router-dom'

const ReceptionistProtected = ({ children }) => {
  const { currentEmpId } = useContext(HmsContext)

  if (currentEmpId?.data?.role == 'receptionist') {
    return children
  }
  return <Navigate to='/stafflogin' replace />
}
export default ReceptionistProtected
