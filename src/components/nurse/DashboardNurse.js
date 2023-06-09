import React, { useContext, useEffect, useState } from "react";
import { BsFileEarmarkMedical, BsFillHouseAddFill } from "react-icons/bs";
import { FiUser } from "react-icons/fi";
import { TbPrescription, TbCalendarEvent } from "react-icons/tb";
import Calender from "react-calendar";
import Stethoscope from "../../img/stethoscope.svg";
import profile from "../../img/pexels-photo-6.jpg";

import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { HmsContext } from "../../context/HmsContext";
import { TiTimes } from "react-icons/ti";
import SpinnerLoader from "../SpinnerLoader";
import { ToastContainer, toast } from "react-toastify";

import 'react-toastify/dist/ReactToastify.css';

import { useNotificationCenter } from 'react-toastify/addons/use-notification-center';
function DashboardNurse() {
    const baseUrl = "https://gavohms.onrender.com";
    const {
        currentEmpId,
        handleGetNurseDetail,
        nurseObj,
        handleGetConsultation,
        handleGetAllDoctors,
        patientsInChargeOf,
        wardsInChargeOf,
        consultationNurse,
        departments,
        getAvaialbelConsultantByDepartment,
        avaialableConsultants,
        isLoggedIn,
        profileObj,
        setIsLoggedIn,
        reload,
        showLoggedInNotification

    } = useContext(HmsContext);
    const { notifications, clear, markAllAsRead, markAsRead } = useNotificationCenter()
    const [viewConsultation, setViewConsultation] = useState(false);

    const [patientVitals, setPatientVitals] = useState({

        blood_pressure: "",
        weight: "",
        height: "",
        temperature: "",
        respiratory_rate: "",
        pulse: "",
        heart_rate: "",

    });
    const [editMode, setEditMode] = useState(false);
    const [patientConsultationDetails, setPatientConsultationDetails] = useState();
    const [isLoading, setIsloading] = useState(false);
    const [validate, setValidate] = useState(false);
    const [consultant, setConsultant] = useState({
        employees_id: "",
    });

    const navigate = useNavigate()

    const handleUpdatePatientvitals = async (id) => {
        if (!patientVitals.blood_pressure || !patientVitals.weight) {
            setValidate(true);
            //console.log(patientVitals);
            return;
        }
        let response = (await axios.put(`${baseUrl}/patient/${id}`, {
            vitals: {

                blood_pressure: patientVitals.blood_pressure,
                weight: patientVitals.weight,
                height: patientVitals.height,
                temperature: patientVitals.temperature,
                respiratory_rate: patientVitals.respiratory_rate,
                pulse: patientVitals.pulse
            }


        }))
            .data;
        console.log(response);

        if (response) {
            setEditMode(false);
        }
    }


    const handleConsultationStatus = async (consultationId) => {
        setIsloading(true);
        console.log(consultant.employees_id);
        if (!consultant.employees_id) {
            alert("add doctor");
            return;
        }

        let response = (await (axios.put(`${baseUrl}/consultation/${consultationId}`, {
            nurse_seen: true, employees_id: consultant.employees_id,
        }))).data;

        console.log(response?.data);
        if (response?.data) {
            alert("patient posted to doctor");
            setViewConsultation(false)
            setIsloading(false);
            return;
        }
        alert("something went wrong")
        setIsloading(false);
    }







    useEffect(() => {
        // console.log(currentEmpId)
        // console.log(nurseObj)
        handleGetNurseDetail();

        handleGetAllDoctors();


    }, [consultationNurse]); //


    useEffect(() => {
        if (isLoggedIn == true) {
            reload()
            showLoggedInNotification()
        }




    }, [])


    return (
        <>
            <ToastContainer />
            {isLoading && (
                <SpinnerLoader />
            )}

            {viewConsultation && (
                <div className="overlay">
                    <div className="container  add-patient-form">
                        <form className=" container  col-lg-10 col-md-10 m-auto mt-5 rounded  consulation-nurseView">
                            <div className="d-flex fs-3 col-12 justify-content-end">
                                <span
                                    onClick={() => {
                                        setViewConsultation(false);
                                    }}
                                >


                                    <TiTimes />
                                </span>
                            </div>



                            <section className="row col-md-10 m-auto">
                                <div className="col-md-6 col-lg-6 col-sm-10 m-auto mb-3">
                                    <label htmlFor="" className="">
                                        {" "}
                                        Patients Name
                                    </label>
                                    <p className=" p-2">
                                        {patientConsultationDetails?.patient_id?.first_name}{" "}
                                        {patientConsultationDetails?.patient_id?.last_name}{" "}
                                    </p>
                                </div>

                                <div className="col-md-6 m-auto mb-3">
                                    <label htmlFor="" className="">
                                        Card no
                                    </label>
                                    <p className=" p-2">#{patientConsultationDetails?.patient_id?.card_no}</p>
                                </div>

                                <h5 className="">Patients Vitals</h5>
                                <div className="col-md-4 col-lg-4 col-sm-10 m-auto mb-3">
                                    <label htmlFor="">Weight(kg)</label>
                                    {editMode == true ? (
                                        <>
                                            <input
                                                // name="vitals.weight"
                                                //value={patientVitals.vitals.weight}
                                                onChange={(e) => {
                                                    setPatientVitals({
                                                        ...patientVitals, weight: e.target.value
                                                    })
                                                }}
                                                type="number"
                                                className={
                                                    validate == true
                                                        ? " form-control border border-danger"
                                                        : "form-control"
                                                }
                                            />
                                        </>
                                    ) : (
                                        <p>
                                            {!patientConsultationDetails?.patient_id?.vitals?.weight
                                                ? "N/A"
                                                : patientConsultationDetails?.patient_id?.vitals?.weight}
                                        </p>
                                    )}
                                </div>
                                <div className="col-md-4 col-lg-4 col-sm-11 m-auto mb-3 ">
                                    <label htmlFor="">Blood Pressure</label>

                                    {editMode == true ? (
                                        <>
                                            <input
                                                type="text"
                                                onChange={(e) => {
                                                    setPatientVitals({
                                                        ...patientVitals, blood_pressure: e.target.value
                                                    })
                                                }}
                                                name="vitals.blood_pressure"
                                                placeholder="110/90"
                                                // value={patientVitals.vitals.blood_pressure}
                                                className={
                                                    validate == true
                                                        ? " form-control border border-danger"
                                                        : "form-control"
                                                }
                                            />
                                        </>
                                    ) : (
                                        <p>
                                            {!patientConsultationDetails?.patient_id?.vitals?.blood_pressure
                                                ? "N/A"
                                                : patientConsultationDetails?.patient_id?.vitals?.blood_pressure}
                                        </p>
                                    )}
                                </div>

                                <div className="col-md-4 col-lg-4 col-sm-11 m-auto mb-3 ">
                                    <label htmlFor="">Temperature</label>

                                    {editMode == true ? (
                                        <>
                                            <input
                                                type="text"
                                                onChange={(e) => {
                                                    setPatientVitals({
                                                        ...patientVitals, temperature: e.target.value
                                                    })
                                                }}
                                                name="vitals.temperature"
                                                placeholder="110/90"
                                                //value={patientVitals.vitals.temperature}
                                                className={
                                                    validate == true
                                                        ? " form-control border border-danger"
                                                        : "form-control"
                                                }
                                            />
                                        </>
                                    ) : (
                                        <p>
                                            {!patientConsultationDetails?.patient_id?.vitals?.temperature
                                                ? "N/A"
                                                : patientConsultationDetails?.patient_id?.vitals?.temperature}
                                        </p>
                                    )}
                                </div>

                                <div className="col-md-4 col-lg-4 col-sm-11 m-auto mb-3 ">
                                    <label htmlFor="">Heart Rate </label>
                                    {editMode == true ? (
                                        <>
                                            <input
                                                type="text"
                                                onChange={(e) => {
                                                    setPatientVitals({
                                                        ...patientVitals, heart_rate: e.target.value
                                                    })
                                                }}
                                                name="vitals.heart_rate"
                                                placeholder="110/90"
                                                //value={patientVitals.vitals.heart_rate}
                                                className={
                                                    validate == true
                                                        ? " form-control border border-danger"
                                                        : "form-control"
                                                }
                                            />
                                        </>
                                    ) : (
                                        <p>
                                            {!patientConsultationDetails?.patient_id?.vitals?.heart_rate
                                                ? "N/A"
                                                : patientConsultationDetails?.patient_id?.vitals?.heart_rate}
                                        </p>
                                    )}
                                </div>

                                <div className="col-md-4 col-lg-4 col-sm-11 m-auto mb-3 ">
                                    <label htmlFor="">Respiratory Rate</label>
                                    {editMode == true ? (
                                        <>
                                            <input
                                                type="text"
                                                onChange={(e) => {
                                                    setPatientVitals({
                                                        ...patientVitals, respiratory_rate: e.target.value
                                                    })
                                                }}
                                                name="vitals.respiratory_rate"
                                                placeholder="110/90"
                                                //value={patientVitals.vitals.respiratory_rate}
                                                className={
                                                    validate == true
                                                        ? " form-control border border-danger"
                                                        : "form-control"
                                                }
                                            />
                                        </>
                                    ) : (
                                        <p>
                                            {!patientConsultationDetails?.patient_id?.vitals?.respiratory_rate
                                                ? "N/A"
                                                : patientConsultationDetails?.patient_id?.vitals?.respiratory_rate}
                                        </p>
                                    )}
                                </div>

                                <div className="col-md-4 col-lg-4 col-sm-11 m-auto mb-3 ">
                                    <label htmlFor="">Height </label>
                                    {editMode == true ? (
                                        <>
                                            <input
                                                type="text"
                                                onChange={(e) => {
                                                    setPatientVitals({
                                                        ...patientVitals, height: e.target.value
                                                    })
                                                }}
                                                name="vitals.height"
                                                placeholder="170cm"
                                                //value={patientVitals.vitals.height}
                                                className={
                                                    validate == true
                                                        ? " form-control border border-danger"
                                                        : "form-control"
                                                }
                                            />
                                        </>
                                    ) : (
                                        <p>
                                            {!patientConsultationDetails?.patient_id?.vitals?.height
                                                ? "N/A"
                                                : patientConsultationDetails?.patient_id?.vitals?.height}
                                        </p>
                                    )}
                                </div>

                                <section className="col-md-4 col-lg-6 col-sm-11 m-auto mb-3 ">
                                    <h5 className="">Consultation Details</h5>
                                </section>

                                <section className="col-md-6 col-lg-6 col-sm-11 m-auto mb-3 consultants-avaialable ">
                                    <select
                                        onChange={(e) => {
                                            getAvaialbelConsultantByDepartment(e.target.value);
                                        }}
                                        className={
                                            validate == true
                                                ? " form-control border border-danger"
                                                : " dept form-control "
                                        }
                                    >
                                        <option value="" className="select-department"> Select Department </option>
                                        {!departments ? (
                                            <option value="">N/A</option>
                                        ) : departments.length == 0 ? (
                                            <option className="text-center" value="">
                                                Not available
                                            </option>
                                        ) : (
                                            departments?.map((department, i) => (
                                                <option key={i} value={department?._id} className="">

                                                    {department?.name}
                                                </option>
                                            ))
                                        )}
                                    </select>
                                </section>
                                <div className="col-md-4 col-lg-6 col-sm-11 m-auto mb-3 ">
                                    <label htmlFor="">Post To</label>
                                    <select
                                        onChange={(e) => {
                                            setConsultant({
                                                employees_id: e.target.value,
                                            });
                                        }}
                                        className={
                                            validate == true
                                                ? " form-control border border-danger"
                                                : "form-control"
                                        }
                                    >
                                        <option value=""> select Doctor </option>
                                        {!avaialableConsultants ? (
                                            <option value="">N/A</option>
                                        ) : avaialableConsultants.length == 0 ? (
                                            <option className="text-center" value="">
                                                Loading...
                                            </option>
                                        ) : (
                                            avaialableConsultants?.map((doctor, i) => (
                                                <option className="consultantNames" value={doctor?._id} key={i}>
                                                    {" "}
                                                    Dr  {doctor?.first_name} {doctor?.last_name}
                                                </option>
                                            ))
                                        )}
                                    </select>
                                </div>

                                <div className="col-md-6 col-lg-6 col-sm-11 m-auto mb-0  ">
                                    <label htmlFor="">Doctor ID</label>
                                    <p>{consultant?.employees_id}</p>
                                </div>

                                <div className=" mb-3 btns col-lg-12 col-sm-12 col-md-12  row">
                                    {editMode == true ? (
                                        <button
                                            type="button"
                                            className="btn btn-danger col-4   m-auto "
                                            onClick={() => {
                                                setEditMode(false)
                                            }}
                                        >
                                            Cancel
                                        </button>


                                    ) : (

                                        <button
                                            type="button"
                                            className="btn btn-danger col-4 m-auto"
                                            onClick={() => {
                                                setPatientVitals();
                                                setEditMode(true);
                                            }}
                                        >
                                            Edit
                                        </button>
                                    )}


                                    {
                                        editMode == false ? (

                                            isLoading == true ? (
                                                <button
                                                    type="button"
                                                    className="btn btn-primary col-4  post m-auto "

                                                    onClick={() => {
                                                        handleConsultationStatus(patientConsultationDetails?._id)
                                                    }}

                                                >
                                                    <div className="spinner-border fs-6" role="status">
                                                        <span className="visually-hidden">Loading...</span>
                                                    </div>
                                                </button>


                                            ) : (
                                                <button
                                                    type="button"
                                                    className="btn btn-primary col-4  post m-auto "

                                                    onClick={() => {
                                                        handleConsultationStatus(patientConsultationDetails?._id)
                                                    }}

                                                >
                                                    Post
                                                </button>

                                            )


                                        ) : (


                                            <button
                                                type="button"
                                                className="btn btn-secondary col-4  post m-auto"
                                                onClick={() => {
                                                    handleUpdatePatientvitals(
                                                        patientConsultationDetails?.patient_id?._id
                                                    );
                                                }}
                                            >
                                                update
                                            </button>




                                        )


                                    }

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
                        <ul className="sidebar_link_btns">
                            <li className="sidebar_btn active">
                                <Link to="/nurse/dashboard"> Dashboard </Link>
                            </li>
                            <li className="sidebar_btn">
                                <Link to="/nurse/patient"> Patients </Link>
                            </li>
                            <li className="sidebar_btn">
                                <Link to="/nurse/bedAllotment"> Wards </Link>
                            </li>

                            {
                                currentEmpId?.role == "nurseAdmin" ? (<li className="sidebar_btn">
                                    <Link to="/nurse/management"> Management </Link>
                                </li>) : null
                            }
                            <li className="sidebar_btn">
                                <Link to="/nurse/profile"> Profile </Link>
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
                    <div className="doctors_header">

                        <div className="present_section">
                            <h2>Dashboard</h2>
                        </div>

                    </div>
                    <div className="doctors_container_content">
                        <div className="doctors_info_wrap">
                            <div className="overview">
                                <div>

                                    <h2>Activity Overview</h2>
                                </div>
                                <div className="week_select">
                                    <p>Today</p>
                                </div>
                            </div>
                            <div className="tab ">
                                <FiUser className="icons" />
                                <p className="counts">

                                    {!patientsInChargeOf?.length ? ("0") : patientsInChargeOf?.length}
                                </p>
                                <p>Patients Assigned</p>
                            </div>
                            <div className="tab">
                                <BsFillHouseAddFill className="icons" />
                                <p className="counts">{!wardsInChargeOf?.length ? ("0") : wardsInChargeOf?.length}</p>
                                <p>Ward Assigned</p>
                            </div>
                            <div className="tab">
                                <FiUser className="icons" />
                                <p className="counts">2</p>
                                <p>Available Consultants</p>
                            </div>
                            <div className="tab">
                                <p className="counts"> </p>
                                <p></p>
                            </div>
                        </div>
                        {/* Calendar setup */}
                        <div className="calender">
                            <Calender />
                        </div>
                        {/* appointment table */}
                        <div className="appointment_table">
                            <div className="appointment_list">
                                <div className="left">
                                    <p>Patient Details</p>
                                </div>
                                <div className="right">
                                    <p></p>
                                </div>
                            </div>
                            <div className="appointment_table_holder">
                                <table className="table-responsive">
                                    <thead>
                                        <tr>
                                            <th>S/N

                                            </th>
                                            <th>Name</th>
                                            <th>ID</th>
                                            <th>BP</th>
                                            <th>Weight</th>

                                            <th>Consultant </th>
                                            <th>Actions</th>

                                        </tr>
                                    </thead>
                                    <tbody>
                                        {consultationNurse?.length == 0
                                            ? "no consultation"
                                            : consultationNurse?.map((consultation, i) => (
                                                <tr key={i}>
                                                    <td>{i + 1}</td>
                                                    <td>
                                                        {consultation?.patient_id?.first_name}{" "}
                                                        {consultation?.patient_id?.last_name}
                                                    </td>
                                                    <td>#{consultation?.patient_id?.card_no}</td>
                                                    <td>
                                                        {!consultation?.patient_id?.vitals?.blood_pressure
                                                            ? "N/A"
                                                            : consultation?.patient_id?.vitals
                                                                ?.blood_pressure}{" "}
                                                    </td>
                                                    <td>
                                                        {!consultation?.patient_id?.vitals?.weight
                                                            ? "N/A"
                                                            : consultation?.patient_id?.vitals?.weight}{" "}
                                                    </td>

                                                    <td>
                                                        {!consultation?.physician?.first_name ||
                                                            !consultation?.physician?.last_name
                                                            ? "N/A"
                                                            : `${consultation?.physician?.first_name} ${consultation?.physician?.last_name} `}

                                                    </td>
                                                    <td
                                                        className="text-decoration-underline"
                                                        onClick={() => {
                                                            setViewConsultation(true);
                                                            setPatientConsultationDetails(consultation);
                                                        }}
                                                    >
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

export default DashboardNurse;
