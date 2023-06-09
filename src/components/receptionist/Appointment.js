import profile from "../../img/pexels-photo-6.jpg";
import greater_than_icon from "../../img/greater-than.svg";
import { Link, useNavigate } from "react-router-dom";
import Stethoscope from "../../img/stethoscope.svg";
import { useContext, useEffect, useState } from "react";
import { HmsContext } from "../../context/HmsContext";
import { TiTimes } from "react-icons/ti";
import axios from "axios";
import { AiFillPhone, AiOutlineRight } from "react-icons/ai";
import SpinnerLoader from "../SpinnerLoader";

function Appointment() {
    const baseUrl = "https://gavohms.onrender.com";
    const {
        currentEmpId,
        setIsLoggedIn,
        departments,
        getAvaialbelConsultantByDepartment,
        customAlertNotify,
        customAlertWarning,
        avaialableConsultants,
        avaialabeGeneralDoctors,
        getAvaialabeGeneralDoctors,
        appt,
        handleGetAppointment
    } = useContext(HmsContext);
    const [addAppointment, setAddAppointment] = useState(false);
    const [isLoading, setIsloading] = useState(false);
    const [isLoadingForm, setIsloadingForm] = useState(false);
    const [addedAppointment, setAddedAppointment] = useState({});
    const [foundPatientIsShown, setFoundPatientIsShown] = useState(false);
    const [foundPatient, setFoundPatient] = useState({});
    const [patientCardNo, setPatientCardNo] = useState();
    const [showDoctors, setShowDoctors] = useState(false);
    const [foundAppt, setFoundAppt] = useState()
    const [foundIndex, setFoundIndex] = useState()
    const [viewAppt, setViewAppt] = useState(false)
    const [viewIndex, setViewIndex] = useState(null)
    const navigate = useNavigate()
    const [newAppointmentData, setNewAppointmentData] = useState({
        card_no: foundPatient?._id,
        physician: "",
        status: "booking",
        date: "",
        time: "",
        notes: "N/A"
    });
    const [doctorDetails, setDoctorDetails] = useState({
        first_name: "",
        last_name: "",
        id: "",
        department: ""

    });
    const [validate, setValidate] = useState(false);
    const [phone, setPhone] = useState({
        phone2: "",
    });

    const handleNewAppointment = async (e) => {
        e.preventDefault()
        console.log(newAppointmentData)

        if (
            !foundPatient?._id ||
            !newAppointmentData.physician ||
            !newAppointmentData.status ||
            !newAppointmentData.date ||
            !newAppointmentData.time
        ) {
            console.log(newAppointmentData);
            setValidate(true);
            setIsloadingForm(false);
            return;
        }
        let response = await (axios.post(`${baseUrl}/appointment`,
            {
                card_no: foundPatient?._id,
                physician: newAppointmentData.physician,
                notes: "N/A",
                status: "booking",
                date: newAppointmentData.date,
                time: newAppointmentData.time
            }
        )).catch(err => {
            console.log(err);
            customAlertWarning("Failed to add appointment,try again later")
            setIsloadingForm(false);
        })

        console.log(response?.data?.new_appointment);
        setIsloadingForm(false);



        console.log(newAppointmentData);




        if (response?.data?.code == "200") {
            setIsloadingForm(false);
            setTimeout(() => {
                customAlertNotify("new appointment created")
            }, 2000);


            setValidate(false);
            setAddAppointment(false);
            let getDetails = (await (axios.get(`${baseUrl}/appointment/${response?.data?.new_appointment?._id}`))).data

            console.log(getDetails?.appointment);
            setAddedAppointment(getDetails?.appointment);
            // setPhone([""]);
            return
        }
        // alert("failed to add new patient");
        customAlertWarning("Failed to add appointment")
        setIsloadingForm(false);

    };

    const toggleaddAppointment = () => {
        setAddAppointment((current) => !current);
    };

    const handleGetPatientAppointment = async () => {
        setIsloading(true)
        let response = (
            await axios.get(`${baseUrl}/patient?card_no=${patientCardNo}`)
        ).data;
        console.log(response?.data);

        if (response) {
            let findAppt = (
                await axios.get(`${baseUrl}/appointment?card_no=${response?.data[0]?._id}`)).data
            console.log(findAppt?.appointment);

            if (findAppt?.code == 200) {
                setFoundAppt(findAppt?.appointment)

                console.log(foundAppt);
                setIsloading(false)

            }
            else {

                setIsloading(false)
                alert("appointment does not exist")
                // setFoundPatientIsShown(true)



            }

            return
        }
        setIsloading(false)

    };
    console.log(doctorDetails)

    const handleGetPatient = async () => {
        // setIsloading(true);
        setIsloadingForm(true)
        console.log(patientCardNo);

        if (!patientCardNo || patientCardNo == "" || patientCardNo == 0) {
            //alert("search box can not be empty")
            //setIsloading(false);
            setFoundPatient("");
            return;
        }
        let response = (
            await axios.get(`${baseUrl}/patient?card_no=${patientCardNo}`)
        ).data;
        console.log(response?.data);
        if (response) {
            //setIsloading(false);
            setIsloadingForm(false)
            setFoundPatient(response?.data[0]);
            // setFoundPatientIsShown(true)
            console.log(foundPatient);
            return;
        }
    };

    console.log(departments);

    useEffect(() => {
        getAvaialabeGeneralDoctors()
        handleGetAppointment()
    }, []);
    return (
        <>
            {isLoading && (
                <SpinnerLoader />
            )}

            {addAppointment && (
                <div className="overlay">
                    <div className="container  add-patient-form">
                        <form className=" container  col-lg-10 col-md-10 m-auto mt-5 rounded p-5 new-appointment">
                            <div className="d-flex fs-3 col-12 justify-content-end">
                                <span
                                    onClick={() => {
                                        setAddAppointment(false);
                                    }}
                                >

                                    <TiTimes />
                                </span>
                            </div>
                            <h3> Add Appointment</h3>
                            <div className="row g-3 ">
                                <div className="col-md-4">
                                    <label htmlFor="validationDefault01" className="form-label">
                                        Appt Date
                                    </label>
                                    <input
                                        type="date"
                                        className={
                                            validate == true && !newAppointmentData.date
                                                ? "form-control border border-danger"
                                                : "form-control"
                                        }
                                        onChange={(e) => {
                                            setNewAppointmentData({
                                                ...newAppointmentData,
                                                date: e.target.value
                                            });
                                        }}
                                        id="validationDefault01"
                                        required
                                    />
                                </div>

                                <div className="col-md-4">
                                    <label htmlFor="validationDefault02" className="form-label">
                                        Appt Time
                                    </label>
                                    <input
                                        type="time"
                                        onChange={(e) => {
                                            setNewAppointmentData({
                                                ...newAppointmentData,
                                                time: e.target.value
                                            });
                                        }}
                                        className={
                                            validate == true && !newAppointmentData.time
                                                ? "form-control border border-danger"
                                                : "form-control"
                                        }
                                        id="validationDefault02"
                                        required
                                    />
                                </div>

                                <div className="col-md-4">
                                    <label htmlFor="validationDefault02" className="form-label">
                                        Card no
                                    </label>
                                    <input
                                        placeholder="enter patient card no"
                                        type="number"
                                        onChange={(e) => {
                                            setPatientCardNo(e.target.value);

                                        }}
                                        onKeyUpCapture={() => {
                                            handleGetPatient();
                                        }}
                                        className={
                                            validate == true && !newAppointmentData.card_no
                                                ? "form-control border border-danger"
                                                : "form-control"
                                        }
                                        id="validationDefault02"
                                        required
                                    />
                                </div>

                                <div className="col-md-4">
                                    <label htmlFor="validationDefault02" className="form-label">
                                        First Name{" "}
                                    </label>
                                    <p className="bg-white ">

                                        {foundPatient?.first_name
                                            ? foundPatient?.first_name
                                            : "N/A"}
                                    </p>
                                </div>

                                <div className="col-md-4 ">
                                    <label htmlFor="validationDefault02" className="form-label">
                                        Last Name{" "}
                                    </label>
                                    <p className="bg-white ">

                                        {foundPatient?.last_name ? foundPatient?.last_name : "N/A"}
                                    </p>
                                </div>

                                <div className="col-md-4 ">
                                    <label htmlFor="validationDefault02" className="form-label">
                                        Gender{" "}
                                    </label>
                                    <p className="bg-white ">
                                        {" "}
                                        {foundPatient?.gender ? foundPatient?.gender : "N/A"}
                                    </p>
                                </div>

                                <div className="col-md-4 ">
                                    <section>
                                        <label htmlFor="validationDefault02" className="form-label">
                                            Doctor
                                        </label>



                                        <select
                                            className="form-control "
                                            onChange={(e) => {
                                                setNewAppointmentData({
                                                    ...newAppointmentData,
                                                    physician: avaialabeGeneralDoctors[e.target.value]?._id
                                                });
                                                console.log(newAppointmentData)

                                                setDoctorDetails({
                                                    ...doctorDetails,
                                                    first_name: avaialabeGeneralDoctors[e.target.value]?.first_name,
                                                    last_name: avaialabeGeneralDoctors[e.target.value]?.last_name,
                                                    id: avaialabeGeneralDoctors[e.target.value]?._id,
                                                    department: avaialabeGeneralDoctors[e.target.value]?.department?.name
                                                });

                                            }}
                                        >
                                            <option value="N/A"> select Doctor</option>
                                            {avaialabeGeneralDoctors?.length == 0
                                                ? "loading.." : !avaialabeGeneralDoctors ? ("unavailable")
                                                    : avaialabeGeneralDoctors?.map((doctor, i) => (

                                                        <option
                                                            value={i}


                                                            className="dropdown-item d-flex justify-content-between"
                                                        >

                                                            Dr {doctor?.first_name} {doctor?.last_name}<AiOutlineRight />
                                                        </option>
                                                    ))}
                                        </select>

                                    </section>

                                </div>

                                <div className="col-md-4 ">
                                    <label htmlFor="validationDefault02" className="form-label">
                                        Department
                                    </label>
                                    <p className="bg-white "> {doctorDetails?.department}  </p>
                                </div>

                                <div className="col-md-4 ">
                                    <label htmlFor="validationDefault02" className="form-label">
                                        ID
                                    </label>
                                    <p className="bg-white "> {doctorDetails?.id?.substring(16, 24)}/DR</p>
                                </div>

                                <div className="col-12 text-center">
                                    {isLoadingForm == true ? (
                                        <>
                                            <div className="text-center">
                                                <div className="spinner-border" role="status">
                                                    <span className="visually-hidden">Loading...</span>
                                                </div>
                                            </div>
                                        </>
                                    ) : (
                                        <>
                                            <button
                                                // type="button"
                                                className="btn btn-primary border-0 col-4 mt-3 fs-5"
                                                style={{ backgroundColor: "#2B415C" }}
                                                onClick={handleNewAppointment}
                                            >
                                                Submit
                                            </button>
                                        </>
                                    )}
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            )}
            {viewAppt && (
                <div className="overlay">
                    <div className="container  add-patient-form">
                        <form className=" container  col-lg-10 col-md-10 m-auto mt-5 rounded p-5 new-appointment">
                            <div className="d-flex fs-3 col-12 justify-content-end">
                                <span
                                    onClick={() => {
                                        setViewAppt(false);
                                    }}
                                >

                                    <TiTimes />
                                </span>
                            </div>
                            <h3> Appointment</h3>
                            <div className="row g-3 ">
                                <div className="col-md-4">
                                    <label htmlFor="validationDefault01" className="form-label">
                                        Appt Date
                                    </label>
                                    <p>{appt[viewIndex]?.date}</p>
                                </div>

                                <div className="col-md-4">
                                    <label htmlFor="validationDefault02" className="form-label">
                                        Appt Time
                                    </label>
                                    <p>{appt[viewIndex]?.time}</p>
                                </div>

                                <div className="col-md-4">
                                    <label htmlFor="validationDefault02" className="form-label">
                                        Card no
                                    </label>
                                    <p>{appt[viewIndex]?.card_no?.card_no}</p>
                                </div>

                                <div className="col-md-4">
                                    <label htmlFor="validationDefault02" className="form-label">
                                        First Name{" "}
                                    </label>
                                    <p className=" ">

                                        {appt[viewIndex]?.card_no?.first_name
                                            ? appt[viewIndex]?.card_no?.first_name
                                            : "N/A"}
                                    </p>
                                </div>

                                <div className="col-md-4 ">
                                    <label htmlFor="validationDefault02" className="form-label">
                                        Last Name{" "}
                                    </label>
                                    <p className=" ">

                                        {appt[viewIndex]?.card_no?.last_name
                                            ? appt[viewIndex]?.card_no?.last_name
                                            : "N/A"}
                                    </p>
                                </div>

                                <div className="col-md-4 ">
                                    <label htmlFor="validationDefault02" className="form-label">
                                        Gender{" "}
                                    </label>
                                    <p className=" ">

                                        {appt[viewIndex]?.card_no?.gender
                                            ? appt[viewIndex]?.card_no?.gender
                                            : "N/A"}
                                    </p>
                                </div>

                                <div className="col-md-4 ">
                                    <section>
                                        <label htmlFor="validationDefault02" className="form-label">
                                            Consultant
                                        </label>


                                        <p className="text-capitalize "> <img className="rounded-circle fs-6" src={appt[viewIndex]?.physician?.first_name} alt="" />
                                            Dr {appt[viewIndex]?.physician?.first_name
                                                ? appt[viewIndex]?.physician?.first_name
                                                : "N/A"} {appt[viewIndex]?.physician?.last_name ? appt[viewIndex]?.physician?.last_name : "N/A"}
                                        </p>


                                    </section>

                                </div>

                                <div className="col-md-4 ">
                                    <label htmlFor="validationDefault02" className="form-label">
                                        Department
                                    </label>
                                    <p className="bg-white ">  {appt[viewIndex]?.physician?.department?.name}</p>
                                </div>

                                <div className="col-md-4 ">
                                    <label htmlFor="validationDefault02" className="form-label">
                                        ID
                                    </label>
                                    <p className="bg-white "> {appt[viewIndex]?.physician?._id?.substring(18, 24)}/DR</p>
                                </div>

                                <div className="col-12 text-center">

                                    <>
                                        <button
                                            type="button"
                                            className="btn btn-primary border-0 col-4 mt-3 fs-5"
                                            onClick={() => {
                                                setViewAppt(false)
                                            }}
                                        >
                                            Close
                                        </button>
                                    </>

                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            )}


            {foundPatientIsShown && (
                <div className="overlay">
                    <div className="container  add-patient-form">
                        <form className=" container  col-lg-10 col-md-10 m-auto mt-5 rounded p-5 new-appointment">
                            <div className="d-flex fs-3 col-12 justify-content-between">
                                <h3>Appointment Details</h3>
                                <span
                                    onClick={() => {
                                        setFoundPatientIsShown(false);
                                    }}
                                >
                                    <TiTimes />
                                </span>
                            </div>
                            <section>

                                <div className="row g-3 ">
                                    <div className="col-md-4">
                                        <label htmlFor="validationDefault01" className="form-label">
                                            Card no
                                        </label>
                                        <p> {foundAppt[foundIndex]?.card_no?.card_no} </p>
                                    </div>

                                    <div className="col-md-4">
                                        <label htmlFor="validationDefault01" className="form-label">
                                            First Name
                                        </label>
                                        <p> {foundAppt[foundIndex]?.card_no?.first_name} </p>
                                    </div>
                                    <div className="col-md-4">
                                        <label htmlFor="validationDefault01" className="form-label">
                                            Last Name
                                        </label>
                                        <p> {foundAppt[foundIndex]?.card_no?.last_name} </p>
                                    </div>
                                    <div className="col-md-4">
                                        <label htmlFor="validationDefault01" className="form-label">
                                            Consultant
                                        </label>
                                        <p className="text-capitalize"> Dr {foundAppt[foundIndex]?.physician?.first_name} </p>
                                    </div>
                                    <div className="col-md-4">
                                        <label htmlFor="validationDefault01" className="form-label">
                                            Department
                                        </label>
                                        <p>  {foundAppt[foundIndex]?.physician?.department?.name} </p>
                                    </div>
                                    <div className="col-md-4">
                                        <label htmlFor="validationDefault01" className="form-label">
                                            ID
                                        </label>
                                        <p> {foundAppt[foundIndex]?.physician?._id} </p>
                                    </div>
                                    <div className="col-md-4">
                                        <label htmlFor="validationDefault01" className="form-label">
                                            Appt Date
                                        </label>
                                        <p> {foundAppt[foundIndex]?.date} </p>
                                    </div>

                                    <div className="col-md-4">
                                        <label htmlFor="validationDefault01" className="form-label">
                                            Time
                                        </label>
                                        <p> {foundAppt[foundIndex]?.time} </p>
                                    </div>
                                </div>
                            </section>
                        </form>
                    </div>
                </div>
            )}
            <section className="doctor__dashboard">
                <div className="doctor_sidebar">
                    <div className="links_display_box">
                        <div className="clinic_name">
                            <div className="organization_image">
                                <img src={Stethoscope} alt="" className="logo" />
                            </div>
                            <div className="organization_name">
                                <h2>
                                    <span>Health</span>Line Clinic
                                </h2>
                            </div>
                        </div>
                        <ul className='sidebar_link_btns'>
                            <li className='sidebar_btn active'>
                                <Link to='/receptionist/dashboard'> Dashboard </Link>
                            </li>



                            <li className="sidebar_btn">
                                <Link to="/receptionist/appointment"> Appointment </Link>
                            </li>
                            <li className='sidebar_btn'>
                                <Link to='/receptionist/profile'> Profile </Link>
                            </li>
                            <li className='sidebar_btn'
                                onClick={() => {
                                    navigate("/stafflogin");
                                    setIsLoggedIn(false)
                                }}
                            >
                                <div> Logout </div>
                            </li>
                        </ul>
                    </div>
                </div>
                <div className="doctor_daily_info">
                    {/* search box to look for patient */}
                    <div className="patient_search_box">
                        <div>
                            <div className="doctors_header">
                                <div className="present_section d-block  ">
                                    <h2 className="patient_page">Appointment</h2>
                                    <button
                                        className="btn btn-primary border-0 col-12 mt-2"
                                        style={{ backgroundColor: "#2B415C" }}
                                        onClick={toggleaddAppointment}
                                    >
                                        {" "}
                                        + Add Appt
                                    </button>
                                </div>


                            </div>

                            <div className="organization_name text-center fs-1 mt-5 pt-5">
                                <h1>
                                    <span>Health</span>Line Clinic
                                </h1>
                            </div>
                            {/* Search box for patient */}
                            <div
                                className="search_box position-absolute m-auto "
                                style={{ left: "44%" }}
                            >
                                <form action="">
                                    <input
                                        type="text"
                                        onChange={(e) => {
                                            setPatientCardNo(e.target.value);
                                        }}
                                        placeholder="Search  patient appointment by card_no"
                                        className="p-3"
                                    />
                                    <button
                                        type="button"
                                        onClick={handleGetPatientAppointment}
                                        className="p-3"
                                    >
                                        Search
                                    </button>
                                </form>
                            </div>
                        </div>
                    </div>

                    <div className="doctors_container_content  mt-5">
                        <div className="appointment_table patient_appointment_table ht-inherit mt-5">
                            <div className=" appointment_table_holder patient_appointment_table_holder ">
                                <h5>Found Appointments</h5>
                                <table>
                                    <thead>
                                        <tr>
                                            <th>Patient name</th>
                                            <th>Card no</th>
                                            <th>Gender</th>
                                            <th>Consultant</th>
                                            <th>Date</th>

                                            <th>Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody>

                                        {foundAppt?.length == 0 ? ("not found") : !foundAppt ? ("") : foundAppt?.map((patient, i) => (
                                            <tr key={i}>
                                                <td>
                                                    {patient?.card_no?.first_name} {patient?.card_no?.last_name}
                                                </td>

                                                <td>
                                                    {patient?.card_no?.card_no}

                                                </td>

                                                <td>
                                                    {patient?.card_no?.gender}

                                                </td>
                                                <td>
                                                    {patient?.physician?.first_name}    {patient?.physician?.first_name}

                                                </td>
                                                <td>
                                                    {patient?.date}

                                                </td>
                                                <td className="text-decoration-underline close-btn" onClick={() => {
                                                    setFoundPatientIsShown(true)
                                                    setFoundIndex(i)
                                                }}>
                                                    view

                                                </td>
                                            </tr>
                                        ))}



                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>

                    <div className="doctors_container_content  mt-5">
                        <div className="appointment_table patient_appointment_table ht-inherit mt-5">
                            <div className=" appointment_table_holder patient_appointment_table_holder ">
                                <h5>Recently Booked</h5>
                                <table>
                                    <thead>
                                        <tr>
                                            <th>Patient name</th>
                                            <th>Card no</th>
                                            <th>Gender</th>
                                            <th>Consultant</th>
                                            <th>Date</th>

                                            <th>Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {appt?.length == 0 ? ("loading...") : appt?.slice(0, 3)?.map((appt, i) => (
                                            <tr key={i}>
                                                <td>
                                                    {appt?.card_no?.first_name} {appt?.card_no?.last_name}

                                                </td>

                                                <td>
                                                    {appt?.card_no?.card_no}

                                                </td>
                                                <td>
                                                    {appt?.card_no?.gender}

                                                </td>

                                                <td className="text-capitalize">
                                                    Dr {appt?.physician?.first_name} {appt?.physician?.last_name}

                                                </td>

                                                <td>
                                                    {appt?.date}

                                                </td>
                                                <td className="text-decoration-underline close-btn"
                                                    onClick={() => {
                                                        setViewIndex(i)
                                                        setViewAppt(true)
                                                    }}>
                                                    view

                                                </td>

                                            </tr>
                                        ))}


                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}

export default Appointment;
