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
import { Line } from "react-chartjs-2"
import { chart as chartjs } from "chart.js/auto"
function DashboardPatient() {
    const baseUrl = "https://gavohms.onrender.com";
    const {
        currentEmpId,
        showLoggedInNotification,
        customAlertNotify,
        customAlertWarning,

        setIsLoggedIn,
    } = useContext(HmsContext);
    const navigate = useNavigate();
    const [pendingAppts, setPendingAppts] = useState()
    const [apptStatus, setApptStatus] = useState()
    const [apptLoadiing, setApptLoading] = useState(false)
    const [consultationsLoading, setConsultationsLoading] = useState()
    const [consultations, setConsultations] = useState()
    //console.log(consultations)
    const [graphData, setGraphData] = useState({
        labels: consultations?.map((data, i) => data?.createdAt),
        datasets: [{
            label: "number of visits",
            lineTension: 0.5,
            backgroundColor: 'rgba(75,192,192,1)',
            borderColor: 'rgba(0,0,0,1)',
            borderWidth: 2,
            data: consultations?.map((data, i) => i)
        }]
    })

    const [updateObj, setUpdateObj] = useState({
        patient_status: "",
        patient_rescheduled_date: "",
        patient_note: "",
    });

    const getPendingAppts = async () => {
        setApptLoading(true)
        let response = (
            await axios.get(`${baseUrl}/appointment?card_no=645432c8500df06aa8ca6327&doctor_seen=false`)).data;
        console.log(response);
        if (response?.code == "200") {
            setApptLoading(false)
            setPendingAppts(response?.appointment);
            return;
        }
        setApptLoading(false)
        setPendingAppts(response?.appointment);
    };

    const getConsultations = async () => {
        setConsultationsLoading(true)
        let response = (
            await axios.get(`${baseUrl}/consultation/?patient_id=64654f87fcb6f247f781e164`)).data;
        console.log(response);
        if (response?.code == "200") {
            setConsultationsLoading(false)
            setConsultations(response?.data);
            return;
        }
        setConsultationsLoading(false)
        setConsultations(response?.data);

    }


    const updateApptStatus = async (id) => {
        console.log(id);
        if (apptStatus == "" || !id) {
            customAlertWarning("Failed to reschedule");
            return;
        }
        let response = await axios.put(`${baseUrl}/appointment/${id}`, updateObj)
            .data;
        console.log(response, updateObj);
        if (response?.code == "200") {
            customAlertNotify("Appointment reschedule");
            return;
        }
        customAlertWarning("Failed to reschedule");
    };

    const state = {
        labels: ['January', 'February', 'March',
            'April', 'May'],
        datasets: [
            {
                label: 'Rainfall',
                fill: false,
                lineTension: 0.5,
                backgroundColor: 'rgba(75,192,192,1)',
                borderColor: 'rgba(0,0,0,1)',
                borderWidth: 2,
                data: [65, 59, 80, 81, 56]
            }
        ]
    }


    useEffect(() => {
        getPendingAppts();
        getConsultations()
    }, []);
    return (
        <>
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
                <div className="doctor_daily_info patient_daily_info">
                    {/* search box to look for patient */}
                    <div className="patient_search_box"></div>
                    <div>
                        <div className=" patient_header container">
                            <div className="present_section d-block  ">
                                <p className="fs-3">
                                    Welcome back,{" "}
                                    <name className="text-capitalize">
                                        {currentEmpId?.first_name ? currentEmpId?.first_name : ""}{" "}
                                    </name>{" "}
                                </p>
                                <p className="fs-5">
                                    Status: <span>{currentEmpId?.status}</span>
                                </p>
                                <div className=" container ">
                                    <section className="row  ">
                                        <div className="col-lg-3 p-2 m-auto  ">
                                            <div className="task d-flex">
                                                <img src={taskbar1} alt="" />
                                                <section className="d-block">
                                                    <p>
                                                        {" "}
                                                        Pending Appointments <br />{pendingAppts?.length}
                                                    </p>
                                                </section>
                                            </div>
                                        </div>
                                        <div className="col-lg-3  m-auto p-2">
                                            <div className="task d-flex">
                                                <img src={taskbar2} alt="" />
                                                <section>
                                                    <p>
                                                        {" "}
                                                        Days till next Appointment <br /> 5
                                                    </p>
                                                </section>
                                            </div>
                                        </div>

                                        <div className="col-lg-3  m-auto">
                                            <div className="task d-flex">
                                                <img src={taskbar3} alt="" />
                                                <section>
                                                    <p>
                                                        {" "}
                                                        Pending Payments <br /> 0
                                                    </p>
                                                </section>
                                            </div>
                                        </div>
                                    </section>
                                </div>
                            </div>
                        </div>

                        <section className="analytics mt-3">
                            <div className="row  container">
                                <div className="col-lg-4">


                                </div>

                                <div className="col-lg-7">

                                    <div>
                                        <Line data={graphData} />
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

                                                <td>No pending appointment</td>
                                                <td></td>
                                                <td></td>
                                            </tr>
                                        ) : (
                                            pendingAppts?.map((appt) => (
                                                <tr>
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
                                                                    patient_status: "rescheduled",
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
                                                                    patient_status: "confirmed",
                                                                });

                                                                updateApptStatus(appt?._id);
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
                                <h5>Consultation History</h5>
                                <table>
                                    <thead>
                                        <tr>
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

                                                <td>No  previous consultation</td>
                                                <td></td>
                                                <td></td>
                                            </tr>
                                        ) : (
                                            consultations?.splice(0, 2)?.map((consultation) => (
                                                <tr>
                                                    <td>{consultation?.createdAt}</td>

                                                    <td>{consultation?.createdAt}</td>

                                                    <td>
                                                        Dr   {consultation?.employees_id?.first_name} {consultation?.employees_id?.last_name}

                                                    </td>
                                                    <td>{consultation?.employees_id?.department?.name}</td>


                                                    <td>
                                                        <button
                                                            className="btn btn-secondary"

                                                        >
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
