import React, { useContext, useEffect, useState } from "react";
import { ToastContainer } from 'react-toastify';
import { BsFileEarmarkMedical, BsFillHouseAddFill } from "react-icons/bs";
import Stethoscope from "../../img/stethoscope.svg";
import { FiUser } from "react-icons/fi";
import { MdMeetingRoom } from 'react-icons/md'
import axios from "axios";
import { HmsContext } from "../../context/HmsContext";
import { TiTimes } from "react-icons/ti";
import { Link, useNavigate } from "react-router-dom";

function BedAllotment() {

    const baseUrl = "https://gavohms.onrender.com";
    const navigate = useNavigate()
    const {
        currentEmpId,
        handleGetNurseDetail,

        wards,
        profileObj,
        setIsLoggedIn,
        reload
        //showLoggedInNotification

    } = useContext(HmsContext);

    // console.log(wards)
    useEffect(() => {
        reload()
    })

    return (
        <>

            <ToastContainer
                className="loggedin-notification"

                autoClose={false}
                theme="colored"
                hideProgressBar={true}
            />
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
                            {
                                currentEmpId?.role == "nurseAdmin" ? (<li className="sidebar_btn">
                                    <Link to="/nurse/management"> Management </Link>
                                </li>) : null
                            }



                            <li className="sidebar_btn">
                                <Link to="/nurse/bedAllotment"> Bed Allotment </Link>
                            </li>

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
                            <h2>Wards</h2>
                        </div>

                    </div>
                    <h5>Total wards :{!wards?.length ? ("0") : wards.length}</h5>
                    <br />
                    <div className=" bed-allotment">
                        <div className="container px-4 ">

                            <div className="row g-5">

                                {
                                    wards?.length == 0 ? ("no wards") :
                                        wards?.map((ward, i) => (

                                            <div className="col-lg-4 " key={i}>

                                                <div className=" ward ward-upt pt-4">
                                                    <h1 className="ward-icon fs-1 rounded-circle border-light bg-white border-1 mt-4 "><MdMeetingRoom /></h1>
                                                    <h5 className="text-light name">{ward?.name}</h5>
                                                    <section className="ward_details   ps-4 fw-lighter fs-5 mt-5 mt-3">

                                                        <p>Type: {ward?.type} </p>
                                                        <p>Bed Count: {ward?.bed?.length} </p>
                                                        <button className="btn btn-primary"
                                                            onClick={() => {
                                                                navigate(`${ward?._id}`)
                                                            }}
                                                        >View</button>
                                                    </section>

                                                </div>
                                            </div>

                                        ))


                                }




                            </div>


                        </div>


                    </div>
                </div>

            </section>
        </>
    )
}

export default BedAllotment