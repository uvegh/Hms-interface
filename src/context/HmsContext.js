import axios from "axios";
import React, { createContext, useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";

import "react-toastify/dist/ReactToastify.css";

export const HmsContext = createContext();

function HmsProvider(props) {
  const [currentEmpId, setCurrentEmpId] = useState({});
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentPatientId, setCurrentPatientId] = useState({});
  const [appointments, setAppointments] = useState([]);
  const [appt, setAppt] = useState();
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
  const [profileObj, setProfileObj] = useState()
  const [bedsInWard, setBedsInWard] = useState()
  const [userNotifications, setUserNotifications] = useState()
  const [viewNotification, setViewNotification] = useState(false)
  const [notificationIsOpen, setNotificationIsOpen] = useState(false);


  const [PharmacistId, setPharmacistID] = useState();
  const [PharmacyAdmin, setPharmacyAdmin] = useState();
  const showLoggedInNotification = () => {
    toast("Logged in!", {
      position: toast.POSITION.TOP_RIGHT,
      className: "loggedIn-notification",
      theme: "colored",
      autoClose: 2000,
      hideProgressBar: true,
    });
  };

  const customAlertNotify = (info) => {
    toast.success(info),
    {
      position: toast.POSITION.TOP_RIGHT,
      theme: "colored",
      autoClose: 2000,
      hideProgressBar: true,
    };
  };

  const customAlertWarning = (info) => {
    toast.warn(info),
    {
      position: toast.POSITION.TOP_RIGHT,
      theme: "colored",
      autoClose: 2000,
      hideProgressBar: true,
    };
  };

  const handleGetDiagnosis = async () => {
    let response = (await axios.get(`${baseUrl}/record`)).data;
    //  console.log("current employee",currentEmpId );
    //  console.log("response",response?.data );
    let filterDiagnosis = response?.data.filter((doctor) => {
      return doctor?.data?.doctor?.emp_id?._id == currentEmpId?._id;
    });

    setDiagnosis(filterDiagnosis);
    //console.log(diagnosis);
  };

  const handleGetAppointment = async () => {
    let response = (await axios.get(`${baseUrl}/appointment`)).data;
    setAppt(response?.appointment);
    //console.log("appointment", response?.appointment);

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
    let response = await axios.get(`${baseUrl}/nurse/${currentEmpId?.id}`);
    //console.log(currentEmpId?.id);
    setPatientsInChargeOf(response?.data?.data?.patients_incharge_of);
    setWardsInChargeOf(response?.data?.data?.ward_no);
    // console.log(response?.data?.data?.patients_incharge_of);
    setNurseObj(response);
  };

  const handleGetConsultation = async () => {
    let response = (await axios.get(`${baseUrl}/consultation`)).data;
    //console.log(response?.data);
    setConsultation(response?.data);

    let nurse_consult = response?.data?.filter((consultation) => {
      return (
        consultation?.nurse_seen == false &&
        consultation?.payment_status == "paid"
      );
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
    setDepartments(response?.department);
  };

  const getAvaialbelConsultantByDepartment = async (deptId) => {
    let response = (
      await axios.get(
        `${baseUrl}/employee?role=doctor&department=${deptId}&status=available`
      )
    ).data;
    //console.log(response.employees?.data);
    setAvaialableConsultants(response?.employees?.data);
  };

  const getAvaialabeGeneralDoctors = async (deptId) => {
    let response = (
      await axios.get(
        `${baseUrl}/employee?role=doctor&department=647213929f4ee94640c242a7&status=available`
      )
    ).data;
    //console.log(response.employees?.data);
    setAvaialabeGeneralDoctors(response?.employees?.data);
  };
  const handleGetAllNurses = async () => {
    let response = (await axios.get(`${baseUrl}/employee?role=nurse`)).data;
    // console.log(response?.employees?.data);
    setNurses(response?.employees?.data);
  };

  const handlegetNurseAddInfo = async (id) => {
    let response = (await axios.get(`${baseUrl}/nurse/${id}`)).data;
    //console.log(response?.data);
    setAdditionalNurseDetail(response?.data);
  };

  const handleGetAllWards = async () => {
    let response = (await axios.get(`${baseUrl}/ward`)).data;
    // console.log(response?.data);
    setWards(response?.data);
  };

  const reload = async () => {
    if (!currentEmpId?.id) {
      //navigate("/staflogin")
      return;
    }
    let response = await axios
      .get(`${baseUrl}/employee/${currentEmpId?.id}`)

      .catch((err) => {
        //console.log(err);
        // alert("failed to reload");
      });

    // console.log(response);
    if (response?.status == "200") {
      setIsLoggedIn(true);
      //console.log(response?.data?.data)
      setProfileObj(response?.data?.data);
      return;
    }
  };
  const removePfp = async () => {
    let response = await (axios.put(`${baseUrl}/employee/${currentEmpId?.id}`, {
      avatar: "https://res.cloudinary.com/df9o0bto4/image/upload/v1686672390/userAvatars/1686672389691.png"
    }))
    //console.log(response);
    if (response?.status == "200") {
      //console.log(response)
      customAlertNotify("profile deleted")
      reload()
      return
    }
    customAlertWarning("failed to remove profile");
  };
  const HandleGetAllBeds = async (wardId) => {
    let response = (await axios.get(`${baseUrl}/bed`)).data;
    //console.log(response?.data);

    let filterByWard = response?.data?.filter((bed) => {
      return bed?.ward_id?._id == wardId;
    });
    // console.log(filterByWard);
    setBedsInWard(filterByWard)
  }

  const handleGetNotifications = async () => {
    //get logged in users notification
    let response = await (await (axios.get(`${baseUrl}/notification?reciever=${currentEmpId?.id}`))).data
    //console.log(response)
    if (response?.code == "200") {
      setUserNotifications(response?.data)
    }


  }
  //remove notification
  const removeNotification = async (id) => {
    let response = (await (axios.put(`${baseUrl}/notification/${id}`, { seen: true }))).data
    console.log(response)
    if (response?.code == "200") {

      handleGetNotifications()
    }
  }



  useEffect(() => {
    handleGetNotifications()
    handleGetDepartments()
    handleGetAllNurses()
    handleGetNurseDetail()
    handleGetAllWards()
    reload()

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

        patientsInChargeOf,
        wardsInChargeOf,
        wards,
        showLoggedInNotification,
        customAlertNotify,
        customAlertWarning,
        reload,
        profileObj,
        removePfp,
        HandleGetAllBeds,
        bedsInWard,
        handleGetNotifications,
        userNotifications,

        viewNotification,
        setViewNotification,
        removeNotification,
        notificationIsOpen,
        setNotificationIsOpen,
        PharmacistId,
        setPharmacistID,
        PharmacyAdmin,
        setPharmacyAdmin,
      }}
    >
      {props.children}
    </HmsContext.Provider>
  );
}

export default HmsProvider;
