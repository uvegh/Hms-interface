import React from 'react'
import { Outlet } from 'react-router-dom'
import LoginNav from "../LoginNav"
const PharmacyLayout = () => {
  return (
    <>
      <>
        <LoginNav />
        <Outlet />
      </>
    </>
  )
}

export default PharmacyLayout