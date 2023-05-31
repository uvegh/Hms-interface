import axios from "axios";
import React, { createContext, useEffect, useState } from "react";

export const HmsContext = createContext();

function HmsProvider(props) {
  const [currentEmpId, setCurrentEmpId] = useState({});
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentPatientId, setCurrentPatientId] = useState({});
  const [appointments, setAppointments] = useState([]);
  const [appt, setAppt] = useState()
  // console.log(currentPatientId + "this is from the context api")
  const [patientGoogleObj, setPatientGoogleObj] = useState({});
  // console.log(patientGoogleObj);
  const [staffGoogleObj, setStaffGoogleObj] = useState({})
  const [prescriptionsDeployed, setPrescriptionsDeployed] = useState([])
  const [diagnosis, setDiagnosis] = useState([])
  const [nurseObj, setNurseObj] = useState({})
  const [consultation, setConsultation] = useState([])
  const [doctors, setDoctors] = useState()
  const [consultationNurse, setConsultationNurse] = useState()
  const [consultationDoctor, setConsultationDoctor] = useState()
  const baseUrl = 'https://gavohms.onrender.com'
  const [departments, setDepartments] = useState()
  const [patientID, setPatientID] = useState({})
  const [avaialableConsultants, setAvaialableConsultants] = useState()
  const [avaialabeGeneralDoctors, setAvaialabeGeneralDoctors] = useState()
  const [nurses, setNurses] = useState()
  const [additionalNurseDetail, setAdditionalNurseDetail] = useState()
  const [patientsInChargeOf, setPatientsInChargeOf] = useState()
  const [wardsInChargeOf, setWardsInChargeOf] = useState()
  const [wards, setWards] = useState()


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
    setAppt(response?.appointment)
    console.log("appointment", response?.appointment);

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
    console.log(currentEmpId?.id);
    setPatientsInChargeOf(response?.data?.data?.patients_incharge_of)
    setWardsInChargeOf(response?.data?.data?.ward_no)
    console.log(response?.data?.data?.patients_incharge_of
    );
    setNurseObj(response);
  };



  const handleGetConsultation = async () => {
    let response = (await axios.get(`${baseUrl}/consultation`)).data;
    //console.log(response?.data);
    setConsultation(response?.data);

    let nurse_consult = response?.data?.filter((consultation) => {
      return consultation?.nurse_seen == false && consultation?.payment_status == "paid";
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
  const handleGetDepartments = async () => {
    let response = (await axios.get(`${baseUrl}/department`)).data;
    //console.log(response?.department);
    setDepartments(response?.department)

  }

  const getAvaialbelConsultantByDepartment = async (deptId) => {
    let response = (await axios.get(`${baseUrl}/employee?role=doctor&department=${deptId}&status=available`)).data;
    //console.log(response.employees?.data);
    setAvaialableConsultants(response?.employees?.data)


  }

  const getAvaialabeGeneralDoctors = async (deptId) => {
    let response = (await axios.get(`${baseUrl}/employee?role=doctor&department=647213929f4ee94640c242a7&status=available`)).data;
    //console.log(response.employees?.data);
    setAvaialabeGeneralDoctors(response?.employees?.data)


  }
  const handleGetAllNurses = async () => {
    let response = (await axios.get(`${baseUrl}/employee?role=nurse`)).data;
    // console.log(response?.employees?.data);
    setNurses(response?.employees?.data)
  }

  const handlegetNurseAddInfo = async (id) => {
    let response = (await axios.get(`${baseUrl}/nurse/${id}`))
      .data;
    console.log(response?.data);
    setAdditionalNurseDetail(response?.data);
  }

  const handleGetAllWards = async () => {
    let response = (await axios.get(`${baseUrl}/ward`))
      .data;
    console.log(response?.data);
    setWards(response?.data);

  }

  useEffect(() => {
    handleGetDepartments()
    handleGetAllNurses()
    handleGetNurseDetail()
    handleGetAllWards()
  }, [])



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

        handleGetAllDoctors,

        doctors,

        consultationDoctor,

        consultationNurse,
        departments,
        getAvaialbelConsultantByDepartment,
        avaialableConsultants,
        avaialabeGeneralDoctors,

        getAvaialabeGeneralDoctors,
        appt,
        handleGetConsultation,
        nurses,
        additionalNurseDetail,
        handlegetNurseAddInfo,
        wardsInChargeOf,
        patientsInChargeOf,
        wardsInChargeOf,
        wards
      }}
    >

      {props.children}
    </HmsContext.Provider>
  );
}

export default HmsProvider;
