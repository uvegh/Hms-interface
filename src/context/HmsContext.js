import axios from "axios";
import React, { createContext, useEffect, useState } from "react";

export const HmsContext = createContext();

function HmsProvider(props) {
  const [currentEmpId, setCurrentEmpId] = useState({});
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentPatientId, setCurrentPatientId] = useState({});
  const [appointments, setAppointments] = useState([]);
  // console.log(currentPatientId + "this is from the context api")
  const [patientGoogleObj, setPatientGoogleObj] = useState({});
  // console.log(patientGoogleObj);
  const [staffGoogleObj, setStaffGoogleObj] = useState({});
  const [prescriptionsDeployed, setPrescriptionsDeployed] = useState([]);
  const [diagnosis, setDiagnosis] = useState([]);
  const [nurseObj, setNurseObj] = useState({});
  const [consultation, setConsultation] = useState([]);
  const [doctors, setDoctors] = useState();
  const [consultationNurse, setConsultationNurse] = useState();
  const [consultationDoctor, setConsultationDoctor] = useState();
  const baseUrl = "https://gavohms.onrender.com";
  const [patientID, setPatientID] = useState({});

  const handleGetDiagnosis = async () => {
    let response = (await axios.get(`${baseUrl}/record`)).data;
    //  console.log("current employee",currentEmpId );
    //  console.log("response",response?.data );
    let filterDiagnosis = response?.data.filter((doctor) => {
      return doctor?.data?.doctor?.emp_id?._id == currentEmpId?._id;
    });

    setDiagnosis(filterDiagnosis);
    console.log(diagnosis);
  };

  const handleGetAppointment = async () => {
    let response = (await axios.get(`${baseUrl}/appointment`)).data;
    //console.log("current employee", currentEmpId);
    //  console.log("appointmnt",response?.appointment );
    let filterAppointment = response?.appointment.filter((doctor) => {
      return doctor?.appointment?.physician?.emp_id?._id == currentEmpId?._id;
    });

    // setDiagnosis(filterDiagnosis)
    // console.log(filterAppointment)
    setAppointments(filterAppointment);
  };

  const getPrescriptionsDeployed = async () => {
    let response = (await axios.get(`${baseUrl}/record`)).data;

    let filter_Prescriptions_Deployed = response?.data.filter(
      (prescription) => {
        return prescription?.data?.doctor?.emp_id?._id == currentEmpId?._id;
      }
    );

    setPrescriptionsDeployed(filter_Prescriptions_Deployed);
    //console.log(prescriptionsDeployed)
  };

  const handleGetNurseDetail = async () => {
    let response = (await axios.get(`${baseUrl}/nurse/${currentEmpId?.id}`))
      .data;
    // console.log(response);
    setNurseObj(response);
  };

  const handleGetConsultation = async () => {
    let response = (await axios.get(`${baseUrl}/consultation`)).data;
    //console.log(response?.data);
    setConsultation(response?.data);

    let nurse_consult = response?.data?.filter((consultation) => {
      return consultation?.nurse_seen == false;
    });

    setConsultationNurse(nurse_consult);
    //console.log(consultationNurse);
    consultation?.filter((consultation) => {
      if (
        consultation?.nurse_seen == true &&
        consultation?.doctor_seen == false
      ) {
        //console.log(consultation);
        setConsultationDoctor(consultation);
      }
    });
  };

  const handleGetAllDoctors = async () => {
    let response = (await axios.get(`${baseUrl}/doctor`)).data;
    //console.log(response?.found_doctors?.data);
    setDoctors(response?.found_doctors?.data);
  };

  return (
    <HmsContext.Provider
      value={{
        currentEmpId,
        setCurrentEmpId,
        patientID,
        setPatientID,
        currentPatientId,
        setCurrentPatientId,
        patientGoogleObj,
        setPatientGoogleObj,
        setStaffGoogleObj,
        handleGetDiagnosis,
        handleGetAppointment,
        setIsLoggedIn,
        isLoggedIn,
        diagnosis,
        setDiagnosis,
        appointments,
        handleGetNurseDetail,
        getPrescriptionsDeployed,
        prescriptionsDeployed,
        nurseObj,
        handleGetConsultation,
        consultation,
        handleGetAllDoctors,
        doctors,
        consultationDoctor,
        consultationNurse,
      }}
    >
      {props.children}
    </HmsContext.Provider>
  );
}

export default HmsProvider;
