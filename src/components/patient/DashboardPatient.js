import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Stethoscope from '../../img/stethoscope.svg'
import taskbar1 from '../../img/taskbar1.png'
import taskbar2 from '../../img/taskbar2.png'
import taskbar3 from '../../img/taskbar3.png'
import { useContext, useEffect, useState } from 'react'
import { HmsContext } from '../../context/HmsContext'
import { TiTimes } from 'react-icons/ti'
import axios from 'axios'
import { AiFillPhone } from 'react-icons/ai'
import { ToastContainer } from 'react-toastify'
function DashboardPatient() {
    const baseUrl = "https://gavohms.onrender.com"
    const { currentEmpId, showLoggedInNotification,
        customAlertNotify,
        customAlertWarning,
        setIsLoggedIn } = useContext(HmsContext)
    return (
        <>
            <section className='doctor__dashboard'>
                <div className='doctor_sidebar'>
                    <div className='links_display_box'>
                        <div className='clinic_name'>
                            <div className='organization_image'>
                                <img src={Stethoscope} alt='' className='logo' />
                            </div>
                            <div className='organization_name'>
                                <h2>
                                    <span>Health</span>Line Clinic
                                </h2>
                            </div>
                        </div>
                        <ul className='sidebar_link_btns'>
                            <li className='sidebar_btn active'>
                                <Link to='/receptionist/dashboard'> Dashboard </Link>
                            </li>



                            <li className='sidebar_btn'>
                                <Link to='/receptionist/profile'> Profile </Link>
                            </li>
                            <li className="sidebar_btn">
                                <Link to="/receptionist/appointment"> Appointment </Link>
                            </li>
                            <li className='sidebar_btn'
                                onClick={() => {
                                    navigate("/login");
                                    setIsLoggedIn(false)
                                }}
                            >
                                <div> Logout </div>
                            </li>
                        </ul>
                    </div>
                </div>
                <div className='doctor_daily_info patient_daily_info'>
                    {/* search box to look for patient */}
                    <div className='patient_search_box'></div>
                    <div>
                        <div className=' patient_header'>
                            <div className='present_section d-block  '>
                                <p className='fs-3'>Welcome back {currentEmpId?.first_name ? currentEmpId?.first_name : ("")}</p>
                                <p className='fs-5'>Status: <span></span></p>
                                <div className=" container ">
                                    <section className="row align-items-center">
                                        <div className="col  ">
                                            <div className="task d-flex">
                                                <img src={taskbar1} alt="" />
                                                <section className='d-block'>
                                                    <p> Pending Appointments <br />
                                                        2</p>
                                                </section>
                                            </div>
                                        </div>
                                        <div className="col m-auto">
                                            <div className="task d-flex">
                                                <img src={taskbar2} alt="" />
                                                <section>
                                                    <p> Days till next Appointment <br /> 5</p>
                                                </section>
                                            </div>
                                        </div>

                                        <div className="col m-auto">
                                            <div className="task d-flex">
                                                <img src={taskbar3} alt="" />
                                                <section>
                                                    <p> Pending Payments <br /> 0</p>
                                                </section>
                                            </div>
                                        </div>
                                    </section>
                                </div>


                            </div>
                        </div>





                    </div>




                    <div className='doctors_container_content  mt-5'>

                        <div className='appointment_table patient_appointment_table ht-inherit mt-5'>
                            <div className=' appointment_table_holder patient_appointment_table_holder '>
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
                                        <tr>
                                            <td>
                                                25/06/2023
                                            </td>

                                            <td>
                                                12:30pm
                                            </td>

                                            <td>
                                                Dr john
                                            </td>
                                            <td>
                                                Gynecology
                                            </td>
                                            <td>
                                                <button className='btn btn-primary'>
                                                    Confirm
                                                </button>
                                                <button className='btn btn-primary'>
                                                    Reschedule
                                                </button>
                                            </td>
                                        </tr>


                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>

                    <div className='doctors_container_content  mt-5'>

                        <div className='appointment_table patient_appointment_table ht-inherit mt-5'>
                            <div className=' appointment_table_holder patient_appointment_table_holder '>
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
                                        <tr>
                                            <td>
                                                25/06/2023
                                            </td>

                                            <td>
                                                12:30pm
                                            </td>

                                            <td>
                                                Dr john
                                            </td>
                                            <td>
                                                Gynecology
                                            </td>
                                            <td>
                                                <button className='btn btn-primary'>
                                                    Confirm
                                                </button>
                                                <button className='btn btn-primary'>
                                                    Reschedule
                                                </button>
                                            </td>
                                        </tr>


                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

        </>
    )
}

export default DashboardPatient