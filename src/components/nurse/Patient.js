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
function Patient() {
    const { currentEmpId, nurseObj } = useContext(HmsContext)
    useEffect(() => {
        console.log(nurseObj)
    })
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

                        {/* appointment table */}
                        <div className='appointment_table' style={{ overflowX: "scroll" }}>
                            <div className='appointment_list'>
                                <div className='left'>
                                    <p>Assigned Pateints</p>
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
                                            <th>Ward</th>
                                            <th>Medication</th>
                                            <th>Diagnosis</th>
                                            <th>BP </th>
                                            <th>Weight</th>
                                            <th>Action</th>
                                        </tr>
                                    </thead>

                                    <tbody>
                                        <tr>
                                            <td>1</td>
                                            <td>daavid</td>
                                            <td>#123</td>
                                            <td>Ward </td>
                                            <td>medication </td>
                                            <td>diagnosis</td>
                                            <td>120/1</td>
                                            <td> 90</td>
                                            <td>



                                                <button className='bg-primary'
                                                    onClick={() => {

                                                    }}
                                                >Edit</button>
                                            </td>
                                        </tr>
                                    </tbody>

                                    <tbody>
                                        {nurseObj?.data?.patients_incharge_of?.length == 0 ?
                                            (<p> No patient assigned</p>)
                                            : nurseObj?.data?.patients_incharge_of?.map((patient, i) => (


                                                <tr>
                                                    <td>{i + 1}</td>
                                                    <td>{patient?.first_name} {patient?.last_name} </td>
                                                    <td>#{patient?.card_no}</td>
                                                    <td>Ward </td>
                                                    <td>medication </td>
                                                    <td>diagnosis</td>
                                                    <td>{patient?.blood_pressure}</td>
                                                    <td> {patient?.weight}</td>
                                                    <td>



                                                        <button className='bg-primary'
                                                            onClick={() => {

                                                            }}
                                                        >Edit</button>
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
    )
}

export default Patient