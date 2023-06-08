import React, { useContext, useEffect, useState } from "react";
import { ToastContainer } from 'react-toastify';
import { BsFileEarmarkMedical, BsFillHouseAddFill } from "react-icons/bs";
import Stethoscope from "../../img/stethoscope.svg";
import bedEmpty from "../../img/bedEmpty.png"
import bedOccupied from "../../img/bedOccupied.png"
import { FiUser } from "react-icons/fi";
import { MdArrowForwardIos, MdMeetingRoom } from 'react-icons/md'
import axios from "axios";

import { HmsContext } from "../../context/HmsContext";
import { TiTimes } from "react-icons/ti";
import { Link, useParams } from "react-router-dom";
import { format } from "date-fns";
import SpinnerLoader from "../SpinnerLoader";

function SingleWard() {

    const { id } = useParams()
    // console.log(id)
    const baseUrl = "https://gavohms.onrender.com";
    const [ward, setWard] = useState()
    const [editMode, setEditMode] = useState(false)
    const [patientCardNo, setPatientCardNo] = useState()
    const [isLoading, setIsloading] = useState(false);
    const [foundPatient, setFoundPatient] = useState({})
    const [editIndex, setEditIndex] = useState()
    const {
        currentEmpId,
        handleGetNurseDetail,
        reload,
        wards,
        bedsInWard,
        profileObj,
        setIsLoggedIn,
        HandleGetAllBeds,
        customAlertNotify,
        customAlertWarning
        //showLoggedInNotification

    } = useContext(HmsContext);


    const date = new Date()
    let assignedDate = (`${format(date, 'dd/MM/yyyy')}`)
    let assignedTime = (`${format(date, 'HH:mm')}`)
    console.log(assignedDate, assignedTime)
    const handleGetSingleWard = async () => {
        let response = (await (axios.get(`${baseUrl}/ward/${id}`))).data
        //console.log(response?.data)
        if (response?.code == 200) {
            setWard(response?.data)
            //console.log(ward)
            return
        }

    }
    //console.log(ward)

    const handleSetAsVacant = async (bedId) => {
        console.log(bedId)
        let response = (await (axios.put(`${baseUrl}/bed/${bedId}`, {
            patient: null, status: "Free"
        })))


        console.log(response);
        if (response?.data?.code == "200") {
            customAlertNotify("Bed updated")
            return
        }
        customAlertWarning("Failed to update")



    }

    const handleGetPatient = async () => {
        setIsloading(true)
        console.log(patientCardNo);

        if (!patientCardNo) {
            // alert("search box can not be empty")
            setIsloading(false)
            return
        }
        let response = (await (axios.get(`${baseUrl}/patient?card_no=${patientCardNo}`))).data
        console.log(response?.data)
        if (response) {
            setIsloading(false)
            setFoundPatient(response?.data[0])

            console.log(foundPatient)
            return
        }



    }


    const handleBedAssignment = async (bedId) => {
        console.log(bedId)
        console.log(foundPatient?._id);
        if (!foundPatient?._id) {
            alert(" Patient is needed")
            return
        }

        console.log(response)

        let responseAllotment = (await (axios.post(`${baseUrl}/bedAllotment`, {
            patient_id: foundPatient?._id,
            bed_id: bedId,
            date_assigned: `${assignedTime} ${assignedDate}`,

            reason_for_admission: "N/A",
        }))).data
        if (responseAllotment?.code == "200") {
            let response = (await (axios.put(`${baseUrl}/bed/${bedId}`, {
                patient: foundPatient?._id, status: "Occupied", responseAllotment: response?.data?._id
            })))
            if (response?.data?.code == "200") {
                setEditMode(false)


                customAlertNotify("patient assigned")
                return
            }

        }
        console.log(responseAllotment);

    }



    useEffect(() => {
        handleGetSingleWard()
        HandleGetAllBeds(id)
        reload()
    }, [ward, bedsInWard])
    return (
        <>

            <ToastContainer
                className="loggedin-notification"

                autoClose={false}
                theme="colored"
                hideProgressBar={true}
            />


            {editMode && (

                <div className="overlay">
                    <div className="container ">

                        <section className=" container single-bed col-lg-6 col-md-10 m-auto mt-5 rounded  nurse-view ">
                            <div className="d-flex fs-3 col-12 justify-content-end">
                                <span onClick={() => {
                                    setEditMode(false)
                                }}> <TiTimes /> </span>
                            </div>


                            <div className=" ward pt-4">
                                <section className="text-center">
                                    {
                                        bedsInWard[editIndex]?.status == "OCCUPIED" ? (
                                            <img className="bed-icon" src={
                                                bedOccupied} alt="" />
                                        ) : (
                                            <img className="bed-icon" src={bedEmpty
                                            } alt="" />
                                        )
                                    }
                                    <h3>Bed {bedsInWard[editIndex]?.bed_no}</h3>
                                </section>






                                <h5 className="text-light name">{bedsInWard[editIndex]?.name}</h5>
                                <section className="ward_details    ps-4 fw-lighter fs-5 mt-5 mt-3">
                                    <p>Status: {bedsInWard[editIndex]?.status}</p>
                                    <p>Bed Number: {bedsInWard[editIndex]?.bed_no} </p>
                                    <p>Bed Type: {bedsInWard[editIndex]?.type} </p>


                                    <p> Patient Name: {patientCardNo == "" || !foundPatient?.last_name && !foundPatient?.first_name ? `
    
    
N/A` : (`${foundPatient?.first_name} ${foundPatient?.last_name}`)
                                    }     </p>
                                    <p className="d-flex "><span>Patient ID</span>

                                        <div className="col-md-5 col-sm-10 ms-1 col-lg-4 "> <input
                                            className="form-control  "
                                            type='text' onSubmit={handleGetPatient}
                                            onChange={(e) => {
                                                setPatientCardNo(e.target.value
                                                )

                                            }}
                                            onKeyUpCapture={() => {
                                                handleGetPatient()
                                            }}
                                            onClick={
                                                () => {
                                                    handleGetPatient()
                                                }
                                            }



                                            placeholder='Search Patient' /></div>




                                    </p>
                                    <p>Date Assigned: {!bedsInWard[editIndex]?.current_allotment?.date_assigned ? ("N/A") : bedsInWard[editIndex]?.current_allotment?.date_assigned} </p>


                                </section>
                                <div className="text-center bed-btns pb-5 col-10  ">

                                    {isLoading == true ? (
                                        <>
                                            <div className="text-center">
                                                <div className="spinner-border" role="status">
                                                    <span className="visually-hidden">Loading...</span>
                                                </div>
                                            </div>
                                        </>
                                    ) : (
                                        <>
                                            <button type="button" className=" btn btn-primary p-2 border-light col-lg-6"
                                                onClick={() => {
                                                    handleBedAssignment(bedsInWard[editIndex]?._id)
                                                }}
                                            > Assign</button>
                                        </>
                                    )}


                                </div>

                            </div>


                        </section>
                    </div>
                </div>
            )
            }
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
                                <Link to="/nurse/management"> Management </Link>
                            </li>


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

                        <div className="present_section current-tab">
                            <h3> <Link to="/nurse/bedAllotment" className="text-decoration-none">

                                Bed Allotment
                            </Link>  <span> <MdArrowForwardIos /> </span> <span>{ward?.name}</span></h3>
                        </div>
                        <div className="profile_avi_box">
                            <div className="profile_avi">
                                <img src={`${baseUrl}/${profileObj?.avatar}`} alt="" />
                            </div>
                            <div className="profile_name">
                                <p className="profile_name">

                                    {` ${currentEmpId?.first_name} ${currentEmpId?.last_name}`}{" "}
                                </p>
                                <span className="profile_occupation">{currentEmpId?.role}</span>
                            </div>
                        </div>
                    </div>
                    <h5>Bed Count :{!bedsInWard?.length ? ("0") : bedsInWard.length}</h5>
                    <br />
                    <div className=" bed-allotment">
                        <div className="container px-4 ">

                            <div className="row g-5">

                                {
                                    bedsInWard?.length == 0 ? (<>
                                        <SpinnerLoader />
                                        {/* <div className="vh-100">
                                            <h3 className="m-auto text-center"> No Beds </h3>
                                        </div> */}

                                    </>) :
                                        bedsInWard?.map((bed, i) => (

                                            <div className="col-lg-4" key={i}>

                                                <div className=" ward pt-4">

                                                    {
                                                        bed?.status == "OCCUPIED" ? (
                                                            <img className="bed-icon" src={
                                                                bedOccupied} alt="" />
                                                        ) : (
                                                            <img className="bed-icon" src={bedEmpty
                                                            } alt="" />
                                                        )
                                                    }
                                                    <h3 className="text-center">Bed {bed?.bed_no}</h3>




                                                    <h5 className="text-light name">{bed?.name}</h5>
                                                    <section className="ward_details    ps-4 fw-lighter fs-5 mt-5 mt-3">
                                                        <p className="text-capitalize">Status: {bed?.status}</p>

                                                        <p>Bed Type: {bed?.type} </p>


                                                        <p> Patient Name: {
                                                            !bed?.patient?.first_name && !bed?.patient?.last_name ? ("N/A") :

                                                                (`${bed?.patient?.first_name} ${bed?.patient?.last_name}`)
                                                        }     </p>
                                                        <p>Patient ID:
                                                            {
                                                                !bed?.patient?.card_no ? ("N/A") : bed?.patient?.card_no
                                                            }

                                                        </p>
                                                        <p>Date Assigned: {bed?.patient?.card_no} </p>


                                                    </section>
                                                    <div className="text-center bed-btns pb-5 col-10  ">
                                                        <button className="  border-light col-lg-6"
                                                            onClick={() => {
                                                                setEditMode(true)

                                                                setEditIndex(i)
                                                            }}

                                                        >Edit</button>
                                                        <button type="button" className=" border-light col-lg-6"
                                                            onClick={() => {
                                                                handleSetAsVacant(bed?._id)
                                                            }}
                                                        > set as Vacant</button>
                                                    </div>

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

export default SingleWard