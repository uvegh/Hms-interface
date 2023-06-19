import React from 'react'
import { Outlet } from 'react-router'
import LoginNav from '../LoginNav'

function ReceptionistLayout() {
  return (
    <>
      <LoginNav />
      <Outlet />
    </>

  )
}

export default ReceptionistLayout