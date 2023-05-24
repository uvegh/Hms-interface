import axios from 'axios'
import React, { createContext, useEffect, useState } from 'react'

export const HmsContext = createContext()

function HmsProvider(props) {

  const [currentEmpId, setCurrentEmpId] = useState({})
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [currentPatientId, setCurrentPatientId] = useState({})
  const [appointments, setAppointments] = useState([])
  // console.log(currentPatientId + "this is from the context api")
  const [patientGoogleObj, setPatientGoogleObj] = useState({})
  // console.log(patientGoogleObj);
  const [staffGoogleObj, setStaffGoogleObj] = useState({})
  const [prescriptionsDeployed, setPrescriptionsDeployed] = useState([])
  const [diagnosis, setDiagnosis] = useState([])
  const [nurseObj, setNurseObj] = useState({})
  const baseUrl = 'https://gavohms.onrender.com'
  const [patientID, setPatientID] = useState({})




  const handleGetDiagnosis = async () => {
    let response = (await (axios.get(`${baseUrl}/record`))).data
    //  console.log("current employee",currentEmpId );
    //  console.log("response",response?.data );
    let filterDiagnosis = response?.data.filter((doctor) => {
      return doctor?.data?.doctor?.emp_id?._id == currentEmpId?._id
    })


    setDiagnosis(filterDiagnosis)
    console.log(diagnosis)


  }

  const handleGetAppointment = async () => {
    let response = (await (axios.get(`${baseUrl}/appointment`))).data
    //  console.log("current employee",currentEmpId );
    //  console.log("appointmnt",response?.appointment );
    let filterAppointment = response?.appointment.filter((doctor) => {
      return doctor?.appointment?.physician?.emp_id?._id == currentEmpId?._id
    })


    // setDiagnosis(filterDiagnosis)
    console.log(filterAppointment)
    setAppointments(filterAppointment)


  }

  const getPrescriptionsDeployed = async () => {
    let response = (await (axios.get(`${baseUrl}/record`))).data

    let filter_Prescriptions_Deployed = response?.data.filter((prescription) => {
      return prescription?.data?.doctor?.emp_id?._id == currentEmpId?._id
    })




    setPrescriptionsDeployed(filter_Prescriptions_Deployed)
    console.log(prescriptionsDeployed)


  }

  const handleGetNurseDetail = async () => {

    let response = (await (axios.get(`${baseUrl}/nurse/${currentEmpId?.id}`))).data
    // console.log(response);
    setNurseObj(response)

  }


  return (
    <HmsContext.Provider value={{ currentEmpId, setCurrentEmpId, 
     patientID,setPatientID,currentPatientId, setCurrentPatientId, patientGoogleObj, setPatientGoogleObj, setStaffGoogleObj, handleGetDiagnosis, handleGetAppointment, setIsLoggedIn, isLoggedIn, diagnosis, setDiagnosis, appointments, handleGetNurseDetail, getPrescriptionsDeployed, prescriptionsDeployed, nurseObj }}>
      {props.children}

    </HmsContext.Provider>
  )
}

export default HmsProvider