import React from 'react'
import { useContext, useEffect } from 'react'
import { BsFileEarmarkMedical } from 'react-icons/bs'
import { FiUser } from 'react-icons/fi'
import { TbPrescription, TbCalendarEvent } from 'react-icons/tb'
import Calender from 'react-calendar'
import Stethoscope from '../../img/stethoscope.svg'
import profile from '../../img/pexels-photo-6.jpg'
import { Link } from "react-router-dom";
import axios from 'axios'
import { HmsContext } from '../../context/HmsContext'
function ProfileNurse() {
    const { currentEmpId, nurseObj } = useContext(HmsContext)
    useEffect(() => {
        console.log(nurseObj);
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
                            {/* <li className='sidebar_btn'>
                                <Link to="/doctor/patient"> Patients </Link>
                            </li> */}


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
                            <h2>Profile</h2>
                        </div>
                        <div className='profile_avi_box'>
                            <div className='profile_avi'>
                                <img src={profile} alt='' />
                            </div>
                            <div className='profile_name'>
                                <p className='profile_name'> {` ${currentEmpId?.first_name} ${currentEmpId?.last_name}`} </p>
                                <span className='profile_occupation'>Receptionist</span>
                            </div>
                        </div>
                    </div>



                    <div className=" container-fluid add-patient-form">


                        <div className="  found-patient-details  col-lg-12 col-md-10 m-auto mt-1 rounded p-5">


                            <div className="row g-3 rounded border border-light p-3">
                                <div className="col-md-6">
                                    <label htmlFor='' className="form-label">NAME</label>
                                    <p className='bg-white rounded p-2 ' style={{ textTransform: 'uppercase' }}>{` ${currentEmpId?.first_name} ${currentEmpId?.last_name}`} </p>
                                </div>

                                <div className="col-md-6">
                                    <label htmlFor='' className="form-label">EMAIL</label>
                                    <p className='bg-white rounded p-2' >{nurseObj?.data?.emp_id?.email} </p>
                                </div>

                                <div className="col-md-6">
                                    <label htmlFor='' className="form-label" style={{ textTransform: 'uppercase' }}>PHONE</label>
                                    <p className='bg-white rounded p-2 ' >{nurseObj?.data?.emp_id?.phone}</p>
                                </div>

                                <div className="col-md-6">
                                    <label htmlFor='' className="form-label">GENDER</label>
                                    <p className='bg-white rounded p-2 ' style={{ textTransform: 'uppercase' }}>{nurseObj?.data?.emp_id?.gender}</p>
                                </div>



                                <div className="col-md-6">
                                    <label htmlFor='' className="form-label" style={{ textTransform: 'uppercase' }}>ROLE</label>
                                    <p className='bg-white rounded p-2 '>{nurseObj?.data?.emp_id?.role}</p>
                                </div>

                                <div className="col-md-6" style={{ overflowX: "scroll" }}>
                                    <label htmlFor='' className="form-label">ADDRESS</label>
                                    <p className='bg-white rounded p-2 ' style={{ textTransform: 'uppercase' }}>{nurseObj?.data?.emp_id?.address}</p>
                                </div>
                                <div className="col-md-6">
                                    <label htmlFor='' className="form-label">DEPARTMENT</label>
                                    <p className='bg-white rounded p-2 ' style={{ textTransform: 'uppercase' }}>{nurseObj?.data?.emp_id?.department?.name}</p>
                                </div>

                                <div className="col-md-6">
                                    <label htmlFor='' className="form-label">HEAD_OF_DEPARTMENT</label>
                                    <p className='bg-white rounded p-2 '>{nurseObj?.data?.emp_id?.department?.head_of_dept}</p>
                                </div>




                                {/* <h3>EMERGENCY CONTACT</h3>

                                <div className="col-md-4">
                                    <label htmlFor='' className="form-label">NAME</label>
                                    <p className='bg-white rounded p-2 ' style={{ textTransform: 'uppercase' }}>donald duke</p>
                                </div>
                                <div className="col-md-4">
                                    <label htmlFor='' className="form-label ">PHONE</label>
                                    <p className='bg-white rounded p-2 ' >098283823</p>
                                </div>

                                <div className="col-md-4">
                                    <label htmlFor='' className="form-label">EMAIL</label>
                                    <p className='bg-white rounded p-2 '>uveghobamien@gmail.com</p>
                                </div> */}




                                {/* <div className="col-12 text-center">
                                            {isLoading == true ? (<>
                                                <div className="text-center">
                                                    <div className="spinner-border" role="status">
                                                        <span className="visually-hidden">Loading...</span>
                                                    </div>
                                                </div>
                                            </>) :
                                                (<>
                                                    <button type="button" className="btn btn-primary border-0 col-7 mt-3 fs-5" style={{ backgroundColor: "#2B415C" }}

                                                        onClick={handleAddConsultation}
                                                    >Add Consultation
                                                    </button>

                                                </>)

                                            }

                                        </div> */}
                            </div>
                        </div>


                    </div>


                </div>
            </section>


        </>
    )
}

export default ProfileNurse