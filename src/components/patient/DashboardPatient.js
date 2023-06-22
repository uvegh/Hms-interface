import React from "react";
import { Link, useNavigate } from "react-router-dom";
import Stethoscope from "../../img/stethoscope.svg";
import taskbar1 from "../../img/taskbar1.png";
import taskbar2 from "../../img/taskbar2.png";
import taskbar3 from "../../img/taskbar3.png";
import { useContext, useEffect, useState } from "react";
import { HmsContext } from "../../context/HmsContext";
import { TiTimes } from "react-icons/ti";
import axios from "axios";
import { AiFillPhone } from "react-icons/ai";
import { ToastContainer } from "react-toastify";
import { Line } from "react-chartjs-2";
import { chart as chartjs } from "chart.js/auto";
function DashboardPatient() {
    const baseUrl = "https://gavohms.onrender.com";
    const {
        currentEmpId,
        showLoggedInNotification,
        customAlertNotify,
        customAlertWarning,

        setIsLoggedIn,
        isLoggedIn,
        pendingApptPayment,
        pendingConsultationPayment,
        getPendingApptPayment,
        getPendingConsultationPayment,
    } = useContext(HmsContext);
    const navigate = useNavigate();
    const [pendingAppts, setPendingAppts] = useState();
    const [apptStatus, setApptStatus] = useState();
    const [apptLoadiing, setApptLoading] = useState(false);
    const [consultationsLoading, setConsultationsLoading] = useState();
    const [rescheduleLoading, setRescheduleLoading] = useState(false);
    const [consultations, setConsultations] = useState();
    const [apptIndex, setApptIndex] = useState();
    const [showRescheduleForm, setShowRescheduleForm] = useState(false);
    const [rescheduleFormValidate, setRescheduleFormValidate] = useState(false);
    const fns = require("date-fns");
    //console.log(consultations)
    const [graphData, setGraphData] = useState({
        labels: consultations?.map((data, i) => data?.address),
        datasets: [
            {
                label: "number of visits",
                lineTension: 0.5,
                backgroundColor: "rgba(75,192,192,1)",
                borderColor: "rgba(0,0,0,1)",
                borderWidth: 2,
                data: consultations?.map((data, i) => data?.address),
            },
        ],
    });

    const [updateObj, setUpdateObj] = useState({
        patient_status: "",
        patient_rescheduled_date: "",
        patient_note: "",
        patient_rescheduled_time: ""
    });

    const getPendingAppts = async () => {
        setApptLoading(true);

        let response = (await axios.get(`${baseUrl}/appointment?card_no=${currentEmpId?.id}&doctor_seen=false`)).data;
        // console.log(response);
        if (response?.code == "200") {
            setApptLoading(false);
            setPendingAppts(response?.appointment);
            return;
        }
        setApptLoading(false);
        setPendingAppts(response?.appointment);
    };

    const getConsultations = async () => {

        setConsultationsLoading(true);
        let response = await axios.get(
            `${baseUrl}/consultation?patient_id=${currentEmpId?.id}`
        );
        //console.log(response?.data?.data);
        if (response?.data?.code == "200") {
            setConsultationsLoading(false);
            setConsultations(response?.data?.data);
            return;
        }
        setConsultationsLoading(false);
        setConsultations(response?.data?.data);
    };

    const updateApptStatus = async (id) => {
        setRescheduleLoading(true)
        console.log(id);
        console.log(updateObj)
        if (!updateObj.patient_status || !id) {
            setRescheduleLoading(false)
            customAlertWarning("Failed to reschedule");
            setRescheduleFormValidate(false)

        } else if (updateObj.patient_rescheduled_date == "" || updateObj.patient_rescheduled_time == "") {
            setRescheduleFormValidate(true)
            setRescheduleLoading(false)


        }
        else {
            setRescheduleFormValidate(false)
            let response = (await (axios.put(`${baseUrl}/appointment/${id}`, updateObj))).data;
            console.log(response);
            if (response?.code == "200") {
                setRescheduleLoading(false)
                setShowRescheduleForm(false)
                setRescheduleFormValidate(false)
                setTimeout(() => {
                    customAlertNotify("Appointment rescheduled");
                }, 2000);
                setUpdateObj({
                    patient_note: "",
                    patient_rescheduled_date: "",
                    patient_rescheduled_time: ""
                })
                return;
            }
            setRescheduleLoading(false)
            setRescheduleFormValidate(false)
            customAlertWarning("Failed to reschedule");
        }


    };

    const visitsNo = consultations?.map((_, index) => (index + 1).toString());

    const state = {
        labels: [
            "JAN",
            "FEB",
            "MAR",
            "APR",
            "MAY",
            "JUN",
            "JUL",
            "AUG",
            "SEP",
            "OCT",
            "NOV",
            "DEC",
        ],
        datasets: [
            {
                label: "Visits",
                fill: false,
                lineTension: 0.1,
                labelBackgroundColor: "#2B415C",
                backgroundColor: "rgba(75,192,192,1)",
                borderColor: "rgba(173,216,220,1)",
                pointBackgroundColor: "#2B415C",
                pointBorderColor: "#2B415C",
                borderWidth: 2,
                data: visitsNo,
            },
        ],
    };

    let currentDate, date2;

    currentDate = fns.format(new Date(), " YYY- MM-dd");
    //console.log(currentDate)
    date2 = new Date("2023-06-28");
    let date1 = new Date(currentDate);
    //calculate time difference
    let time_difference = date2.getTime() - date1.getTime();

    //calculate days difference by dividing total milliseconds in a day
    let days_difference = time_difference / (1000 * 60 * 60 * 24);
    const dates = pendingAppts?.map((data) => {
        let apptDate = fns.format(new Date(data?.date), "YYY-MM-dd");
        let currentDate = fns.format(new Date(data?.date), "YYY-MM-dd");
        let diff = (apptDate - currentDate) / (1000 * 60 * 60 * 24);
        //console.log(diff)
    });
    let days_till_appointment = Math.min.apply(null, dates);
    let pending_payments =
        parseInt(pendingApptPayment?.length) +
        parseInt(pendingConsultationPayment?.length);

    useEffect(() => {
        getPendingAppts();
        getConsultations();
        getPendingApptPayment();
        getPendingConsultationPayment();

        if (isLoggedIn == true) {
            setTimeout(() => {
                showLoggedInNotification();
            }, 5000);
        }
    }, []);
    const divStyle = {
        transition: 'transform 0.7s ease',
        transform: showRescheduleForm ? 'translate(-50%,-50%)' : 'translateX(100%)',
        overflow: 'hidden'
    };



    return (
        <>
            {showRescheduleForm && (

                <div className={showRescheduleForm ? 'container-fluid overlay' : 'hideOverlay'} >

                    <section className="rescheduleForm col-lg-6  bg-light  p-2 rounded"
                        style={divStyle}
                    // onTransitionEnd={() => {
                    //     setShowRescheduleForm(false)
                    // }}
                    >

                        <div className="">
                            <div className="d-flex fs-3 col-12 justify-content-end">
                                <span
                                    onClick={() => {
                                        setShowRescheduleForm(false);
                                    }}
                                >


                                    <TiTimes />
                                </span>
                            </div>

                            <section className="row g-3 container col-lg-8 m-auto ">

                                <div className="col-lg-6">
                                    <label >Date</label>
                                    <input

                                        type="date" className={rescheduleFormValidate == true && !updateObj.patient_rescheduled_date ? 'form-control border-danger' : 'form-control'} placeholder="" aria-label="date"
                                        onChange={(e) => {
                                            setUpdateObj({
                                                ...updateObj, patient_rescheduled_date: e.target.value
                                            })
                                        }}

                                    />
                                </div>
                                <div className="col-lg-6">
                                    <label >Time</label>
                                    <input type="time" className={rescheduleFormValidate == true && !updateObj.patient_rescheduled_time ? 'form-control border-danger' : 'form-control'} aria-label="Last name"
                                        onChange={(e) => {
                                            setUpdateObj({
                                                ...updateObj, patient_rescheduled_time: e.target.value
                                            })
                                        }}
                                    />
                                </div>
                                <div className="col-lg-12 m-auto mt-3">

                                    <div class="form-floating">
                                        <textarea class="form-control" placeholder="Leave a comment here" id="floatingTextarea2"
                                            onChange={(e) => {
                                                setUpdateObj({
                                                    ...updateObj, patient_note: e.target.value
                                                })
                                            }}
                                        ></textarea>
                                        <label for="floatingTextarea2">Leave any additional information here</label>
                                    </div>
                                </div>
                                <div className="text-center">

                                    {
                                        rescheduleLoading == true ? (

                                            <button type="button" className="btn btn-primary border-0 col-lg-6"

                                            >
                                                <div className="text-center">
                                                    <div className="spinner-border" role="status">
                                                        <span className="visually-hidden">Loading...</span>
                                                    </div>
                                                </div>
                                            </button>
                                        ) : (
                                            <button type="button" className="btn btn-primary border-0 col-lg-6"
                                                onClick={() => [
                                                    updateApptStatus(pendingAppts[apptIndex]?._id)
                                                ]}
                                            >
                                                Reschedule
                                            </button>
                                        )
                                    }

                                </div>
                            </section>
                        </div>
                    </section>
                </div>
            )}


            <ToastContainer />
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
                                <Link to="/patient/dashboard"> Dashboard </Link>
                            </li>
                            <li className="sidebar_btn active">
                                <Link to="/patient/dashboard"> Consultations </Link>
                            </li>

                            <li className="sidebar_btn active">
                                <Link to="/patient/dashboard"> Medical History </Link>
                            </li>

                            <li className="sidebar_btn">
                                <Link to="/patient/dashboard"> Appointments </Link>
                            </li>

                            <li className="sidebar_btn">
                                <Link to="/patient/dashboard"> Finance </Link>
                            </li>
                            <li className="sidebar_btn">
                                <Link to="/patient/dashboard"> Profile </Link>
                            </li>

                            <li
                                className="sidebar_btn"
                                onClick={() => {
                                    navigate("/login");
                                    setIsLoggedIn(false);
                                }}
                            >
                                <div> Logout </div>
                            </li>
                        </ul>
                    </div>
                </div>




                <div className="doctor_daily_info  patient_daily_info">
                    {/* search box to look for patient */}
                    <div className="patient_search_box"></div>
                    <div>
                        <div className=" patient_header container">
                            <div className="present_section d-block  ">
                                <p className="fs-3">
                                    Welcome back,
                                    <name className="text-capitalize">
                                        {currentEmpId?.first_name ? currentEmpId?.first_name : ""}
                                    </name>
                                </p>
                                <p className="fs-5">
                                    Status: <span>{currentEmpId?.status}</span>
                                </p>




                            </div>
                        </div>

                        <div className="row g-5">
                            <div className="col">
                                <div className="task d-flex">
                                    <img src={taskbar1} alt="" />
                                    <section className="d-block">
                                        <p>
                                            Pending Appointments <br />
                                            {pendingAppts?.length}
                                        </p>
                                    </section>
                                </div>
                            </div>
                            <div className="col">
                                <div className="task d-flex">
                                    <img src={taskbar2} alt="" />
                                    <section>
                                        <p>
                                            Days till next Appointment <br />{" "}
                                            {days_till_appointment}
                                        </p>
                                    </section>
                                </div>
                            </div>

                            <div className="col">
                                <div className="task d-flex">
                                    <img src={taskbar3} alt="" />
                                    <section>
                                        <p>

                                            Pending Payments <br /> {pending_payments}
                                        </p>
                                    </section>
                                </div>
                            </div>
                        </div>

                        <section className="analytics mt-3">
                            <div className="row gx-2  container">
                                <div className="col-lg-4 col-md-4 col-sm-12 pt-1 ps-2">
                                    <div className="consultation_chart ">

                                    </div>
                                </div>

                                <div className="col-lg-8  col-md-8 col-sm-12 pt-1 ps-2">
                                    <div className="consultation_chart ms-2">
                                        <h5 className="border-bottom pt-1 ps-4 ms-2">
                                            Patient Consultation Tracker
                                        </h5>
                                        <div className="pt-1 ps-4 pb-2">
                                            <Line data={state} />
                                        </div>
                                    </div>

                                </div>
                            </div>
                        </section>
                    </div>

                    <div className="doctors_container_content patient_container-content mt-5 col-lg-12">
                        <div className="appointment_table patient_appointment_table ht-inherit mt-5">
                            <div className=" appointment_table_holder patient_appointment_table_holder ">
                                <h5>Pending Appointments</h5>
                                <table>
                                    <thead>
                                        <tr>
                                            <th>S/N</th>
                                            <th>Date</th>
                                            <th>Time</th>
                                            <th>Consultant</th>
                                            <th>Department</th>

                                            <th>Action</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {pendingAppts?.length == 0 ? (
                                            <tr>
                                                <td></td>
                                                <td></td>
                                                <td></td>

                                                <td>No pending appointment</td>
                                                <td></td>
                                                <td></td>
                                            </tr>
                                        ) : (
                                            pendingAppts?.map((appt, i) => (
                                                <tr>
                                                    <td>{i + 1}</td>
                                                    <td>{appt?.date}</td>

                                                    <td>{appt?.time}</td>

                                                    <td>
                                                        {appt?.physician?.first_name}{" "}
                                                        {appt?.physician?.last_name}
                                                    </td>
                                                    <td>{appt?.physician?.department?.name}</td>

                                                    <td>
                                                        <button
                                                            className="btn btn-secondary"
                                                            onClick={() => {
                                                                setUpdateObj({
                                                                    ...updateObj,
                                                                    patient_status: "confirmed",
                                                                });
                                                                updateApptStatus(appt?._id);
                                                            }}
                                                        >
                                                            Confirm
                                                        </button>
                                                        <button
                                                            className="btn btn-primary"
                                                            onClick={() => {
                                                                setUpdateObj({
                                                                    ...updateObj,
                                                                    patient_status: "rescheduled",
                                                                });

                                                                setApptIndex(i)
                                                                setShowRescheduleForm(true)
                                                            }}
                                                        >
                                                            Reschedule
                                                        </button>
                                                    </td>
                                                </tr>
                                            ))
                                        )}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>

                    <div className="doctors_container_content  mt-5 ">
                        <div className="appointment_table patient_appointment_table ht-inherit mt-5 ">
                            <div className=" appointment_table_holder patient_appointment_table_holder ">
                                <section className="d-flex justify-content-between">
                                    <h5>Consultation History</h5>
                                    <p className="text-decoration-underline">See more</p>
                                </section>
                                <table>
                                    <thead>
                                        <tr>
                                            <th>S/N</th>
                                            <th>Date</th>
                                            <th>Time</th>
                                            <th>Consultant</th>
                                            <th>Department</th>

                                            <th>Action</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {consultations?.length == 0 ? (
                                            <tr>
                                                <td></td>
                                                <td></td>
                                                <td></td>

                                                <td>No previous consultation</td>
                                                <td></td>
                                                <td></td>
                                            </tr>
                                        ) : (
                                            consultations?.slice(0, 1)?.map((consultation, i) => (
                                                <tr>
                                                    <td>{i + 1}</td>
                                                    <td>{consultation?.createdAt}</td>

                                                    <td>{consultation?.createdAt}</td>

                                                    <td>
                                                        Dr {consultation?.employees_id?.first_name}{" "}
                                                        {consultation?.employees_id?.last_name}
                                                    </td>
                                                    <td>
                                                        {consultation?.employees_id?.department?.name}
                                                    </td>

                                                    <td>
                                                        <button className="btn btn-secondary">
                                                            View Report
                                                        </button>
                                                    </td>
                                                </tr>
                                            ))
                                        )}
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

export default DashboardPatient;
