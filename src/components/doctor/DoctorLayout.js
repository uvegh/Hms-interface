import { useContext } from 'react'
import { HmsContext } from '../../context/HmsContext'
import { Outlet } from 'react-router-dom'

function DoctorLayout () {
  const { currentEmpId } = useContext(HmsContext)
  return (
    <>
      <Outlet />
    </>
  )
}
export default DoctorLayout
