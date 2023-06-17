import React from 'react'
import { Outlet } from 'react-router-dom'
import PatientNav from '../PatientNav'

function PatientLayout() {
    return (
        <>

            <PatientNav />
            <Outlet />
        </>
    )
}

export default PatientLayout