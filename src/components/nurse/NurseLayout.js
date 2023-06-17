import React from 'react'
import { Outlet } from 'react-router'
import LoginNav from "../LoginNav"
function NurseLayout() {
  return (
    <>
      <LoginNav />
      <Outlet />
    </>
  )
}

export default NurseLayout