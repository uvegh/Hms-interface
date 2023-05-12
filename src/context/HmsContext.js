import axios from 'axios'
import React, { createContext, useEffect, useState } from 'react'

export const HmsContext=createContext()

function HmsProvider(props) {
  
    const [currentEmpId,setCurrentEmpId]=useState({})
const[isLoggedIn,setIsloggedIn]=useState(false)
    const [currentPatientId,setCurrentPatientId]=useState({})
    const[appointments,setAppointments]=useState([])
    // console.log(currentPatientId + "this is from the context api")
    const[patientGoogleObj,setPatientGoogleObj]=useState({})
    // console.log(patientGoogleObj);
    const[staffGoogleObj,setStaffGoogleObj]=useState({})
    const [diagnosis,setDiagnosis]=useState([])
    const baseUrl = 'https://gavohms.onrender.com'

    
const testing=()=>{
  console.log(currentEmpId + "this is from the context api")
  console.log(patientGoogleObj);
}


  const handleGetDiagnosis=async()=>{
    let response= (await (axios.get(`${baseUrl}/record`))).data
  //  console.log("current employee",currentEmpId );
  //  console.log("response",response?.data );
    let filterDiagnosis= response?.data.filter((doctor)=>{
      return  doctor?.data?.doctor?.emp_id?._id==currentEmpId?._id
    } )
    
   
    setDiagnosis(filterDiagnosis)
    console.log(diagnosis)
    
    
  }

  const handleGetAppointment=async()=>{
    let response= (await (axios.get(`${baseUrl}/appointment`))).data
  //  console.log("current employee",currentEmpId );
  //  console.log("appointmnt",response?.appointment );
    let filterAppointment= response?.appointment.filter((doctor)=>{
      return  doctor?.appointment?.physician?.emp_id?._id==currentEmpId?._id
    } )
    
   
    // setDiagnosis(filterDiagnosis)
    console.log(filterAppointment)
    setAppointments(filterAppointment)
    
    
  }

// useEffect(()=>{
//   testing()
// },[])


  return (
   <HmsContext.Provider value={{currentEmpId,setCurrentEmpId,currentPatientId,setCurrentPatientId,patientGoogleObj,setPatientGoogleObj,setStaffGoogleObj,handleGetDiagnosis,handleGetAppointment,setIsloggedIn,isLoggedIn,diagnosis,setDiagnosis,appointments}}>
{props.children}

   </HmsContext.Provider>
  )
}

export default HmsProvider