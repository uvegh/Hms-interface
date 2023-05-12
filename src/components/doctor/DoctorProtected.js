import { useContext } from 'react'
import { HmsContext } from '../../context/HmsContext'
import { Navigate } from 'react-router-dom'

const DoctorProtected = ({ children }) => {
  const { currentEmpId } = useContext(HmsContext)

  if (currentEmpId?.data?.role == 'doctor') {
    return children
  }
  return <Navigate to='/stafflogin' replace />
}
export default DoctorProtected
