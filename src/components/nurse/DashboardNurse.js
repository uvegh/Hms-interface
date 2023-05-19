import React, { useContext, useEffect } from 'react'
import { BsFileEarmarkMedical, BsFillHouseAddFill } from 'react-icons/bs'
import { FiUser } from 'react-icons/fi'
import { TbPrescription, TbCalendarEvent } from 'react-icons/tb'
import Calender from 'react-calendar'
import Stethoscope from '../../img/stethoscope.svg'
import profile from '../../img/pexels-photo-6.jpg'
import { Link } from "react-router-dom";
import axios from 'axios'
import { HmsContext } from '../../context/HmsContext'
function DashboardNurse() {
    const { currentEmpId, handleGetNurseDetail, nurseObj } = useContext(HmsContext)

    useEffect(() => {
        // console.log(currentEmpId)
        // console.log(nurseObj)
        handleGetNurseDetail()
    }, [nurseObj])
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

                                <Link to="/nurse/dashboard"> Dashboard </Link>

                            </li>
                            <li className='sidebar_btn'>
                                <Link to="/nurse/patient"> Patients </Link>
                            </li>

                            <li className='sidebar_btn'>
                                <Link to="/nurse/profile"> Profile </Link>
                            </li>
                            <li className='sidebar_btn'>
                                <div> Logout </div>
                            </li>
                        </ul>
                    </div>
                </div>
                <div className='doctor_daily_info'>
                    <div className='doctors_header'>
                        <div className='present_section'>
                            <h2>Dashboard</h2>
                        </div>
                        <div className='profile_avi_box'>
                            <div className='profile_avi'>
                                <img src={profile} alt='' />
                            </div>
                            <div className='profile_name'>
                                <p className='profile_name'> {` ${currentEmpId?.first_name} ${currentEmpId?.last_name}`} </p>
                                <span className='profile_occupation'>Nurse</span>
                            </div>
                        </div>
                    </div>
                    <div className='doctors_container_content'>
                        <div className='doctors_info_wrap'>
                            <div className='overview'>
                                <div>
                                    <h2>Activity Overview</h2>
                                </div>
                                <div className='week_select'>
                                    <p>This week</p>
                                </div>
                            </div>
                            <div className='tab '>
                                <FiUser className='icons' />
                                <p className='counts'> {nurseObj?.data?.patients_incharge_of?.length}</p>
                                <p>Patients Assigned</p>
                            </div>
                            <div className='tab'>
                                <BsFillHouseAddFill className='icons' />
                                <p className='counts'>{nurseObj?.data?.ward_no?.length}</p>
                                <p>Ward Assigned</p>
                            </div>
                            <div className='tab'>
                                <FiUser className='icons' />
                                <p className='counts'>2</p>
                                <p>Available Consultants</p>
                            </div>
                            <div className='tab'>

                                <p className='counts'> </p>
                                <p></p>
                            </div>
                        </div>
                        {/* Calendar setup */}
                        <div className='calender'>
                            <Calender />
                        </div>
                        {/* appointment table */}
                        <div className='appointment_table' style={{ overflowX: "scroll" }}>
                            <div className='appointment_list'>
                                <div className='left'>
                                    <p>Patient Details</p>
                                </div>
                                <div className='right'>
                                    <p></p>
                                </div>
                            </div>
                            <div className='appointment_table_holder' >
                                <table className='table-responsive' >
                                    <thead>
                                        <tr>
                                            <th>S/N</th>
                                            <th>Name</th>
                                            <th>ID</th>
                                            <th>BP</th>
                                            <th>Weight</th>
                                            <th>Payment</th>
                                            <th>Consultant Dr</th>
                                            <th>Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody>


                                        <tr>
                                            <td>1</td>
                                            <td>vincent</td>
                                            <td>#123</td>
                                            <td>120/90 </td>
                                            <td>102</td>
                                            <td>pending</td>
                                            <td></td>
                                            <td>



                                                <button
                                                    onClick={() => {

                                                    }}
                                                >Post</button>
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

export default DashboardNurse