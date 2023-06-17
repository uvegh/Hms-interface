
import { Outlet } from 'react-router-dom'
import LoginNav from "../LoginNav"

function DoctorLayout() {

  return (
    <>
      <>
        <LoginNav />
        <Outlet />
      </>
    </>
  )
}
export default DoctorLayout
