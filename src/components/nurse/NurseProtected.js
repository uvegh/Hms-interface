import { useContext } from 'react'
import { HmsContext } from '../../context/HmsContext'
import { Navigate } from 'react-router-dom'

const NurseProtected = ({ children }) => {
    const { currentEmpId } = useContext(HmsContext)

    if (currentEmpId?.data?.role == 'nurse') {
        return children
    }
    return <Navigate to='/stafflogin' replace />
}
export default NurseProtected
