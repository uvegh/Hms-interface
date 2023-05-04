import React, { createContext, useEffect, useState } from 'react'

export const HmsContext=createContext()

function HmsProvider(props) {
    const [currentEmpId,setCurrentEmpId]=useState({})

    const [currentPatientId,setCurrentPatientId]=useState({})
    console.log(currentPatientId + "this is from the context api")
    const[patientGoogleObj,setPatientGoogleObj]=useState({})
    console.log(patientGoogleObj);
    // setCurrentEmpId("empId")
    // setCurrentPatientId("patientId")
const testing=()=>{
  console.log(currentEmpId + "this is from the context api")
  console.log(patientGoogleObj);
}

useEffect(()=>{
  testing()
},[])


  return (
   <HmsContext.Provider value={{currentEmpId,setCurrentEmpId,currentPatientId,setCurrentPatientId,patientGoogleObj,setPatientGoogleObj}}>
{props.children}

   </HmsContext.Provider>
  )
}

export default HmsProvider