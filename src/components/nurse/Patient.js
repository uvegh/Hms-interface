import React, { useContext, useEffect, useState } from 'react'
import { BsFileEarmarkMedical, BsFillHouseAddFill } from 'react-icons/bs'
import { FiUser } from 'react-icons/fi'
import { TbPrescription, TbCalendarEvent } from 'react-icons/tb'
import Calender from 'react-calendar'
import Stethoscope from '../../img/stethoscope.svg'
import profile from '../../img/pexels-photo-6.jpg'
import { Link } from "react-router-dom";
import axios from 'axios'
import { HmsContext } from '../../context/HmsContext'
import { TiTimes } from 'react-icons/ti'
import SpinnerLoader from '../SpinnerLoader'
import { AiOutlineEllipsis } from 'react-icons/ai'
import { ToastContainer } from 'react-toastify'
function Patient() {
    const baseUrl = "https://gavohms.onrender.com"
    const { currentEmpId,
        wardsInChargeOf,
        handleGetNurseDetail,
        handleGetConsultation,
        patientsInChargeOf,

        customAlertNotify,
        reload } = useContext(HmsContext)
    console.log(patientsInChargeOf);
    const [patientDetails, setPatientDetails] = useState()

    const [showEdit, setShowEdit] = useState(false)

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
    const [editIndex, setEditIndex] = useState()
    const [viewPatientIndex, setViewPatientIndex] = useState()
    const [validate, setValidate] = useState(false)
    const [foundPatient, setFoundPatient] = useState({})
    const [viewPatient, setViewPatient] = useState(false)
    const [patientCardNo, setPatientCardNo] = useState()
    const [foundPatientIsShown, setFoundPatientIsShown] = useState(false)
    const [isLoading, setIsloading] = useState(false);
    const [vitalsUpdateIsLoading, setVitalsUpdateIsLoading] = useState(false)
    const [viewPatientHistory, setViewPatientHistory] = useState(false)

    const [weight, setWeight] = useState("")
    const [appointmentHistory, setAppointmentHistory] = useState()
    const [consultationHistory, setConsultationHistory] = useState()
    const handleEditPatientVitals = async (id) => {
        console.log(patientVitals);
        if (!patientVitals.vitals.blood_pressure || !patientVitals.vitals.weight) {
            setValidate(true)
            console.log(patientVitals);
            return
        }
        let response = (await (axios.put(`${baseUrl}/patient/${id}`, patientVitals))).data
        console.log(response);

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



    const handleUpdatePatientvitals = async (id) => {
        setVitalsUpdateIsLoading(true)
        if (!patientVitals.blood_pressure || !patientVitals.weight) {
            setValidate(true);
            //console.log(patientVitals);
            console.log(patientVitals);
            setVitalsUpdateIsLoading(false)
            return;
        }
        console.log(patientVitals);
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
            customAlertNotify("vitals updated")
            setVitalsUpdateIsLoading(false)
            setFoundPatientIsShown(false)

        }
        setVitalsUpdateIsLoading(false)
    }

    const handlGetPatientsHistory = async (patientId) => {
        setIsloading(true)
        let response = (await (axios.get(`${baseUrl}/consultation?patient_id=${patientId}&nurse_seen=true`))).data
        let response2 = (await (axios.get(`${baseUrl}/appointment?card_no=${patientId}&nurse_seen=true`))).data
        console.log(response);
        console.log(response2);
        if (response?.code == "200") {
            setConsultationHistory(response?.data)


            setIsloading(false)

        }
        if (response2?.code == "200") {
            setIsloading(false)
            setAppointmentHistory(response2?.appointment)
        }

        setIsloading(false)

        console.log(appointmentHistory)
        console.log(consultationHistory)

    }


    useEffect(() => {

        handleGetNurseDetail()
        handleGetConsultation()
        reload()
    }, [foundPatient?.vitals?.weight, patientVitals])
    return (
        <>
            {/* {isLoading && (
                <SpinnerLoader />
            )} */}
            <ToastContainer />
            {foundPatientIsShown && (<div className="overlay">
                <div className="container  add-patient-form">
                    {
                        foundPatient ? (
                            <div className=" container found-patient-details  col-lg-10 col-md-10 m-auto mt-1 rounded ">
                                <div className="d-flex fs-3 col-12 justify-content-end">
                                    <span onClick={() => {
                                        setFoundPatientIsShown(false)
                                        setEditMode(false)
                                    }}> <TiTimes /> </span>
                                </div>
                                <h3 className='text-center'>PATIENT FOUND</h3>

                                <div className=" text-center mb-3">
                                    <img className='user_view_icon' src={`${baseUrl}/${foundPatient?.avatar}`} alt="" />
                                    <h5> {foundPatient?.first_name} {foundPatient?.last_name}  </h5>
                                    <p>#{foundPatient?.card_no} </p>
                                </div>


                                <div className="row g-3 col-lg-10 col-md-10 col-sm-11 m-auto consulation-nurseView  ">
                                    <div className="col-md-8">
                                        <label htmlFor='' className="form-label">Name</label>
                                        <p className='bg-white rounded p-2 ' >{foundPatient?.first_name} {foundPatient?.last_name} </p>
                                    </div>

                                    <div className="col-md-4">
                                        <label htmlFor='' className="form-label">Card_no</label>
                                        <p className='bg-white rounded p-2' >{foundPatient?.card_no}</p>
                                    </div>

                                    <div className="col-md-4">
                                        <label htmlFor='' className="form-label">Status</label>
                                        <p className='bg-white rounded p-2 ' >{foundPatient?.status}</p>
                                    </div>

                                    <div className="col-md-4">
                                        <label htmlFor='' className="form-label">Gender</label>
                                        <p className='bg-white rounded p-2 ' >{foundPatient?.gender}</p>
                                    </div>

                                    <div className="col-md-4">
                                        <label htmlFor='' className="form-label">Phone</label>
                                        <p className='bg-white rounded p-2 '>{foundPatient?.phone}</p>
                                    </div>

                                    <div className="col-md-4">
                                        <label htmlFor='' className="form-label">Email</label>
                                        <p className='bg-white rounded p-2 m-auto email'>{foundPatient?.email}</p>
                                    </div>
                                    {/* if inpatient show ward */}
                                    <div className="col-md-4">
                                        <label htmlFor='' className="form-label">Ward/Room</label>
                                        {!foundPatient?.ward ? (<p className='bg-white rounded p-2'> N/A</p>) : (
                                            <p className=' '>{foundPatient?.ward} </p>
                                        )}
                                    </div>


                                    <div className="col-md-4">
                                        <label htmlFor='' className="form-label">Blood Group</label>
                                        <p className='bg-white rounded p-2 '>{!foundPatient?.vitals?.blood_group ? ("N/A") : foundPatient?.vitals.blood_group}</p>
                                    </div>
                                    <h5 className="">Patients Vitals</h5>
                                    <div className="col-md-4 col-lg-4 col-sm-10 m-auto mb-3">
                                        <label htmlFor="">Weight</label>
                                        {editMode == true ? (
                                            <>
                                                <input
                                                    // name="vitals.weight"
                                                    value={patientVitals.weight}
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
                                            <div className='d-flex kg_ibs_btn'>
                                                <p className='col-md-8' >
                                                    {!foundPatient?.vitals?.weight
                                                        ? "N/A"
                                                        : foundPatient?.vitals?.weight && weight == "" ? foundPatient?.vitals?.weight : weight}
                                                </p> <select className='form-control'
                                                    onChange={(e) => {
                                                        let fixed_weight = foundPatient.vitals?.weight
                                                        e.target.value == "kg" && foundPatient.vitals?.weight ? foundPatient.vitals.weight =
                                                            Math.floor(parseInt(fixed_weight) * 0.45)
                                                            :
                                                            e.target.value == "lbs" && foundPatient.vitals?.weight ?
                                                                foundPatient.vitals.weight = Math.floor(
                                                                    parseInt(fixed_weight) / 0.45

                                                                ) : !foundPatient?.vitals?.weight ? null : null
                                                        console.log(foundPatient?.vitals?.weight)
                                                        setWeight(foundPatient?.vitals?.weight)
                                                        console.log(weight)
                                                    }
                                                    }

                                                >
                                                    <option value="kg">kg</option>
                                                    <option value="lbs">lbs</option>
                                                </select>
                                            </div>
                                        )}
                                    </div>
                                    <div className="col-md-4 col-lg-4 col-sm-11 m-auto mb-3 ">
                                        <label htmlFor="">Blood Pressure</label>

                                        {editMode == true ? (
                                            <>
                                                <input
                                                    type="text"
                                                    value={patientVitals.blood_pressure}
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
                                                {!foundPatient?.vitals?.blood_pressure
                                                    ? "N/A"
                                                    : foundPatient?.vitals?.blood_pressure}
                                            </p>
                                        )}
                                    </div>

                                    <div className="col-md-4 col-lg-4 col-sm-11 m-auto mb-3 ">
                                        <label htmlFor="">Temperature</label>

                                        {editMode == true ? (
                                            <>
                                                <input
                                                    type="text"
                                                    value={patientVitals.temperature}
                                                    onChange={(e) => {
                                                        setPatientVitals({
                                                            ...patientVitals, temperature: e.target.value
                                                        })
                                                    }}
                                                    name="vitals.temperature"
                                                    placeholder="36C"
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
                                                {!foundPatient?.temperature
                                                    ? "N/A"
                                                    : foundPatient?.temperature}
                                            </p>
                                        )}
                                    </div>

                                    <div className="col-md-4 col-lg-4 col-sm-11 m-auto mb-3 ">
                                        <label htmlFor="">Heart Rate </label>
                                        {editMode == true ? (
                                            <>
                                                <input
                                                    type="text"
                                                    value={patientVitals.heart_rate}
                                                    onChange={(e) => {
                                                        setPatientVitals({
                                                            ...patientVitals, heart_rate: e.target.value
                                                        })
                                                    }}
                                                    name="vitals.heart_rate"
                                                    placeholder="70/min"
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
                                                {!foundPatient?.heart_rate
                                                    ? "N/A"
                                                    : foundPatient?.vitals?.heart_rate}
                                            </p>
                                        )}
                                    </div>

                                    <div className="col-md-4 col-lg-4 col-sm-11 m-auto mb-3 ">
                                        <label htmlFor="">Respiratory Rate</label>
                                        {editMode == true ? (
                                            <>
                                                <input
                                                    type="text"
                                                    value={patientVitals.respiratory_rate}
                                                    onChange={(e) => {
                                                        setPatientVitals({
                                                            ...patientVitals, respiratory_rate: e.target.value
                                                        })
                                                    }}
                                                    name="vitals.respiratory_rate"
                                                    placeholder="15/min"
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
                                                {!foundPatient?.vitals?.respiratory_rate
                                                    ? "N/A"
                                                    : foundPatient?.vitals?.respiratory_rate}
                                            </p>
                                        )}
                                    </div>

                                    <div className="col-md-4 col-lg-4 col-sm-11 m-auto mb-3 ">
                                        <label htmlFor="">Height </label>
                                        {editMode == true ? (
                                            <>
                                                <input
                                                    type="text"
                                                    value={patientVitals.height}
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
                                                {!foundPatient?.vitals?.height
                                                    ? "N/A"
                                                    : foundPatient?.vitals?.height}
                                            </p>
                                        )}
                                    </div>




                                    <div className="col-12 text-center">


                                        {editMode == false ? (<button type="button" className="btn btn-primary border-0 col-4 mt-3 fs-5"
                                            onClick={() => [
                                                setEditMode(true),
                                                setPatientVitals({
                                                    ...patientVitals, blood_pressure: foundPatient?.blood_pressure,
                                                    heart_rate: foundPatient?.heart_rate,
                                                    height: foundPatient?.height,
                                                    pulse: foundPatient?.pulse,
                                                    respiratory_rate: foundPatient?.respiratory_rate,
                                                    weight: foundPatient?.weight,
                                                    temperature: foundPatient?.temperature
                                                }),
                                                console.log(patientVitals)
                                            ]}

                                        >Edit Vitals
                                        </button>) : (


                                            <div className=' row m-auto'>
                                                <button type="button" className="btn btn-danger m-auto border-0 col-4 mt-3 fs-5"
                                                    onClick={() => [
                                                        setEditMode(false)
                                                    ]}

                                                >Cancel
                                                </button>

                                                {vitalsUpdateIsLoading == false ? (<button type="button" className="btn btn-primary border-0  m-auto col-4 mt-3 fs-5"
                                                    onClick={() => [
                                                        handleUpdatePatientvitals(foundPatient?._id)
                                                    ]}

                                                >Update
                                                </button>) : (

                                                    <button type="button" className="btn btn-primary border-0  m-auto col-4 mt-3 fs-5"


                                                    >
                                                        <div className="text-center">
                                                            <div className="spinner-border" role="status">
                                                                <span className="visually-hidden">Loading...</span>
                                                            </div>
                                                        </div>
                                                    </button>
                                                )}
                                            </div>

                                        )

                                        }





                                    </div>
                                </div>
                            </div>) : (


                            <>

                                <div className="overlay container-fluid">
                                    <div className="container  add-patient-form position-absolute" style={{ top: "30%" }} >
                                        <div className=" container found-patient-details  col-lg-7 col-md-8 col-sm-11 col-md-10 m-auto mt-5 rounded " >
                                            <div className="d-flex fs-3 col-12 justify-content-end " >
                                                <span onClick={() => {
                                                    setFoundPatientIsShown(false)
                                                }}> <TiTimes /> </span>
                                            </div>
                                            <h4 className='text-center m-auto p-5'> Card number does not exist</h4>
                                        </div>

                                    </div>
                                </div>
                            </>
                        )
                    }

                </div>
            </div>)

            }
            {
                showEdit && (

                    <div className="overlay">
                        <div className="container  add-patient-form ">

                            <form className=" container  col-lg-6 col-md-10 m-auto  rounded " style={{
                                position: "absolute", left: "25%", top: "30%"
                            }}>
                                <div className="d-flex fs-3 col-12 justify-content-end">
                                    <span onClick={() => {
                                        setShowEdit(false)
                                    }}> <TiTimes /> </span>
                                </div>
                                <section className="row">


                                    <div className="col-md-5 m-auto mb-3">
                                        <label htmlFor="">Card no</label>
                                        <p className='bg-white p-2'>#{patientDetails?.card_no}</p>
                                    </div>
                                    <div className="col-md-5 col-lg-5 col-sm-11 m-auto mb-3">
                                        <label htmlFor="">Name</label>
                                        <p className='bg-white p-2'> {!patientDetails?.first_name && !patientDetails?.last_name ? ("N/A") : `${patientDetails?.first_name} ${patientDetails?.last_name}`} </p>
                                    </div>

                                    <div className="col-md-5 col-lg-5 col-sm-11 m-auto mb-3">
                                        <label htmlFor="">Weight(kg)</label>
                                        <input
                                            name='vitals.weight'
                                            value={patientVitals.vitals.weight}
                                            onChange={handleVitalsChange}
                                            type="number" className='form-control' />
                                    </div>
                                    <div className="col-md-5 col-lg-5 col-sm-11 m-auto mb-3 ">
                                        <label htmlFor="">Blood Pressure</label>
                                        <input type="number"
                                            onChange={handleVitalsChange}
                                            name='vitals.blood_pressure'
                                            value={patientVitals.vitals.blood_pressure}
                                            className='form-control' />
                                    </div>

                                    <div className='text-center mb-3'>
                                        <button type='button' className='btn btn-secondary '
                                            onClick={() => {
                                                handleEditPatientVitals(patientDetails?._id)
                                            }}
                                        >
                                            Update
                                        </button>
                                    </div>
                                </section>


                            </form>
                        </div>
                    </div>
                )
            }


            {
                viewPatient && (

                    <div className="overlay">
                        <div className="container  add-patient-form">

                            <form className=" container  col-lg-11 col-md-10 m-auto mt-5 rounded  nurse-view ">
                                <div className="d-flex fs-3 col-12 justify-content-end">
                                    <span onClick={() => {
                                        setViewPatient(false)
                                    }}> <TiTimes /> </span>
                                </div>

                                <div className=" text-center mb-3">
                                    <img className='user_view_icon' src={` ${baseUrl}/${assignedPatient[viewPatientIndex]?.avatar}`} alt="" />
                                    <h6> {assignedPatient[viewPatientIndex]?.first_name} {assignedPatient[viewPatientIndex]?.last_name}  </h6>
                                    <p>#{assignedPatient[viewPatientIndex]?._id} </p>
                                </div>

                                <section className="row nurse_view_details m-auto col-lg-10 col-sm-12 col-md-10">


                                    <div className="col-md-4 m-auto mb-3">
                                        <label htmlFor="" >Gender</label>
                                        <p className=''>{assignedPatient[viewPatientIndex]?.gender}</p>

                                    </div>
                                    <div className="col-md-4 col-lg-4 col-sm-11 m-auto mb-3">
                                        <label htmlFor="">Department</label>
                                        <p className=''>{assignedPatient[viewPatientIndex]?.department?.name} </p>
                                    </div>

                                    <div className="col-md-4 col-lg-4 col-sm-11 m-auto mb-3">
                                        <label htmlFor="">Phone</label>
                                        <p className=''>{assignedPatient[viewPatientIndex]?.phone} </p>
                                    </div>

                                    <div className="col-md-4 col-lg-4 col-sm-11 m-auto mb-3">
                                        <label htmlFor="">Status</label>
                                        <p className=''>{assignedPatient[viewPatientIndex]?.status} </p>
                                    </div>
                                    <div className="col-md-4 col-lg-4 col-sm-11 m-auto mb-3">
                                        <label htmlFor="">Patients Assigned</label>
                                        <ul className='list-group'>
                                            {
                                                additionalNurseDetail?.patients_incharge_of?.length == 0 || !additionalNurseDetail?.patients_incharge_of ? (<ul>
                                                    <li className='list-group-item'>N/A</li>
                                                </ul>) :
                                                    additionalNurseDetail?.patients_incharge_of.map((patient) => (
                                                        <li className='list-group-item'>#{patient?.card_no} {patient?.first_name} {patient?.last_name}</li>

                                                    ))
                                            }



                                        </ul>
                                    </div>
                                    <div className="col-md-5 col-lg-4 col-sm-11 m-auto mb-3 ">
                                        <label htmlFor="">Ward Assigned</label>
                                        <ul className='list-group'>
                                            {
                                                additionalNurseDetail?.data?.ward_no?.length == 0 || !additionalNurseDetail?.data?.ward_no ? (<ul>
                                                    <li className='list-group-item'>N/A</li>
                                                </ul>) :
                                                    additionalNurseDetail?.data?.ward_no?.map((ward) => (
                                                        <li className='list-group-item'>{ward?.name} {ward?.type} </li>

                                                    ))
                                            }



                                        </ul>
                                    </div>

                                    <div className='text-center mb-5 mt-3'>
                                        <button type='button' className='btn btn-primary col-lg-4 col-md-4 col-sm-10' onClick={() => {
                                            setViewPatient(false)

                                        }


                                        }>
                                            Close
                                        </button>
                                    </div>
                                </section>


                            </form>
                        </div>
                    </div>
                )
            }



            {
                viewPatientHistory && (

                    <div className="overlay patient-history-overlay container-fluid">
                        <div className="  view-patient-history">

                            <section className="  bg-light col-lg-9 col-md-10 m-auto scrollhist rounded mt-5 ">
                                <div className="d-flex fs-3 col-12 justify-content-end">
                                    <span onClick={() => {
                                        setViewPatientHistory(false)
                                    }}> <TiTimes /> </span>
                                </div>
                                <h3 className='text-center'> </h3>

                                <div className=" text-center mb-3 sticky-pfp">
                                    <img className='user_view_icon' src={`${baseUrl}/${foundPatient?.avatar}`} alt="" />
                                    <h5> {foundPatient?.first_name} {foundPatient?.last_name}  </h5>
                                    <p>#{foundPatient?.card_no} </p>
                                </div>
                                {/* {isLoading && (
                                <div className="histLoader">
                                    <div className="lds-spinner fs-6 text-center m-auto bg-dark">
                                        <div></div>
                                        <div></div>
                                        <div></div>
                                        <div></div>
                                        <div></div>
                                        <div></div>
                                        <div></div>
                                        <div></div>
                                        <div></div>
                                        <div></div>
                                        <div></div>
                                        <div></div>
                                    </div>
                                </div>
                            )

                            } */}

                                {
                                    consultationHistory?.length == 0 && appointmentHistory?.length == 0 ? (
                                        <p className='text-center'> No History</p>
                                    ) :
                                        consultationHistory?.length == 0 ? ("") :
                                            consultationHistory?.map((patient) => (
                                                <section className="row  m-auto bg-white mb-3  patient-history col-lg-9 p-2 col-sm-12 col-md-10">

                                                    <h5 className='text-start mt-2 mb-2'>Monday 5th June, 2023</h5>
                                                    <div className="col-md-4  m-auto mb-3">
                                                        <label htmlFor="" > weight(kg)</label>
                                                        <p className=''> {!patient?.patient_id?.vitals?.weight ? ("N/A") : patient?.patient_id?.vitals?.weight}</p>

                                                    </div>
                                                    <div className="col-md-4 col-lg-4 col-sm-11 m-auto mb-3">
                                                        <label htmlFor="">Temperature</label>
                                                        <p className=''> {!patient?.patient_id?.vitals?.temperature ? ("N/A") : patient?.patient_id?.vitals?.temperature}</p>
                                                    </div>

                                                    <div className="col-md-4 col-lg-4 col-sm-11 m-auto mb-3">
                                                        <label htmlFor="">Blood Pressure </label>
                                                        <p className=''>{!patient?.patient_id?.vitals?.blood_pressure ? ("N/A") : patient?.patient_id?.vitals?.blood_pressure} </p>
                                                    </div>

                                                    <div className="col-md-4 col-lg-4 col-sm-11 m-auto mb-3">
                                                        <label htmlFor="">Heart Rate (bpm)</label>
                                                        <p className='border-bottom-0'>{!patient?.patient_id?.vitals?.heart_rate ? ("N/A") : patient?.patient_id?.vitals?.heart_rate} </p>
                                                    </div>


                                                    <div className="col-md-4 col-lg-4 col-sm-11 m-auto mb-3">
                                                        <label htmlFor="">     Respiratory Rate (bpm)</label>
                                                        <p className='border-bottom-0'> {!patient?.patient_id?.vitals?.respiratory_rate ? ("N/A") : patient?.patient_id?.vitals?.respiratory_rate}</p>
                                                    </div>

                                                    <div className="col-md-4 col-lg-4 col-sm-11 m-auto mb-3">
                                                        <label htmlFor="">  Pulse (bpm)</label>
                                                        <p className='border-bottom-0'>{!patient?.patient_id?.vitals?.pulse ? ("N/A") : patient?.patient_id?.vitals?.pulse} </p>
                                                    </div>




                                                </section>
                                            )

                                            )

                                }



                                {
                                    appointmentHistory?.length == 0 ? ("") :
                                        appointmentHistory?.map((patient) => (
                                            <section className="row  m-auto bg-white mb-3  patient-history col-lg-9 p-2 col-sm-12 col-md-10">

                                                <h5 className='text-start mt-2 mb-2'>{patient?.createdAt}Monday 5th June, 2023</h5>
                                                <div className="col-md-4  m-auto mb-3">
                                                    <label htmlFor="" > weight(kg)</label>
                                                    <p className=''> {!patient?.card_no?.vitals?.weight ? ("N/A") : patient?.card_no?.vitals?.weight}</p>

                                                </div>
                                                <div className="col-md-4 col-lg-4 col-sm-11 m-auto mb-3">
                                                    <label htmlFor="">Temperature</label>
                                                    <p className=''> {!patient?.card_no?.vitals?.temperature ? ("N/A") : patient?.card_no?.vitals?.temperature}</p>
                                                </div>

                                                <div className="col-md-4 col-lg-4 col-sm-11 m-auto mb-3">
                                                    <label htmlFor="">Blood Pressure </label>
                                                    <p className=''>{!patient?.card_no?.vitals?.blood_pressure ? ("N/A") : patient?.card_no?.vitals?.blood_pressure} </p>
                                                </div>

                                                <div className="col-md-4 col-lg-4 col-sm-11 m-auto mb-3">
                                                    <label htmlFor="">Heart Rate (bpm)</label>
                                                    <p className='border-bottom-0'>{!patient?.card_no?.vitals?.heart_rate ? ("N/A") : patient?.card_no?.vitals?.heart_rate} </p>
                                                </div>


                                                <div className="col-md-4 col-lg-4 col-sm-11 m-auto mb-3">
                                                    <label htmlFor="">     Respiratory Rate (bpm)</label>
                                                    <p className='border-bottom-0'> {!patient?.card_no?.vitals?.respiratory_rate ? ("N/A") : patient?.card_no?.vitals?.respiratory_rate}</p>
                                                </div>

                                                <div className="col-md-4 col-lg-4 col-sm-11 m-auto mb-3">
                                                    <label htmlFor="">  Pulse (bpm)</label>
                                                    <p className='border-bottom-0'>{!patient?.card_no?.vitals?.pulse ? ("N/A") : patient?.card_no?.vitals?.pulse} </p>
                                                </div>




                                            </section>
                                        )

                                        )
                                }

                                <div className='text-center  mt-3 pb-3'>
                                    <button type='button' className='btn btn-primary col-lg-4 col-md-4 col-sm-10' onClick={() => {

                                        setViewPatientHistory(false)
                                    }


                                    }>
                                        Close
                                    </button>
                                </div>
                            </section>
                        </div>
                    </div>
                )
            }






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

                <div className='doctor_daily_info'>
                    <div className='doctors_header'>
                        <div className='present_section'>
                            <h2>Patients</h2>
                        </div>

                    </div>
                    <div className='doctors_container_content'>

                        <div className='patient_search_box nurse_search_box'>
                            <div className='search_box  m-auto '  >

                                <form >
                                    <input
                                        className="col-md-5 p-3" name='card_no'
                                        type='text' onSubmit={handleGetPatient}
                                        onChange={(e) => {
                                            setPatientCardNo(e.target.value
                                            )

                                        }}
                                        // onKeyUpCapture={() => {
                                        //     handleGetPatient()
                                        // }}
                                        // onClick={
                                        //     () => {
                                        //         handleGetPatient()
                                        //     }
                                        // }

                                        placeholder='Search Patient' />
                                    <button type='button'

                                        onClick={
                                            () => {
                                                handleGetPatient()
                                            }
                                        }
                                        className='p-3'>Search</button>
                                </form>
                            </div>
                        </div>

                        <div className='appointment_table'>
                            <div className='appointment_list'>
                                <div className='left'>
                                    <p>Found Patient</p>
                                </div>
                                <div className='right'>
                                    <p></p>
                                </div>
                            </div>
                            <div className='appointment_table_holder'  >
                                <table className='table-responsive' >
                                    <thead>
                                        <tr>
                                            <th>S/N</th>
                                            <th>Patiennt Name</th>
                                            <th> Pateint ID</th>


                                            <th>BP </th>
                                            <th>Weight</th>
                                            <th>Action</th>
                                        </tr>
                                    </thead>



                                    <tbody>
                                        {!foundPatient ?
                                            (<p className='text-center'> Card number does not exist</p>)
                                            : (


                                                <tr>
                                                    <td>1</td>
                                                    <td> {!foundPatient?.first_name || !foundPatient?.last_name ? ("") : `${foundPatient?.first_name} ${foundPatient?.last_name}`}  </td>
                                                    <td>{!foundPatient?.card_no ? ("") : `# ${foundPatient?.card_no}`}</td>


                                                    <td>{!foundPatient?.vitals?.blood_pressure ? ("N/A") : foundPatient?.vitals?.blood_pressure}</td>
                                                    <td> {!foundPatient?.vitals?.weight ? ("N/A") : foundPatient?.vitals?.weight}</td>
                                                    <td className='text-decoration-underline'

                                                    >



                                                        <div className="dropdown">
                                                            <Link className="btn bg-white border-0 " role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                                                <AiOutlineEllipsis />
                                                            </Link>

                                                            <ul className="dropdown-menu">
                                                                <li
                                                                    onClick={() => {


                                                                        setFoundPatientIsShown(true)
                                                                    }}
                                                                ><Link className="dropdown-item" >View</Link>
                                                                </li>

                                                                <li
                                                                    onClick={() => {


                                                                        setViewPatientHistory(true)
                                                                        handlGetPatientsHistory(foundPatient?._id)
                                                                    }}
                                                                ><Link className="dropdown-item" >View History</Link>
                                                                </li>


                                                            </ul>
                                                        </div>


                                                    </td>
                                                </tr>

                                            )}




                                    </tbody>

                                </table>
                            </div>
                        </div>


                        {/* Assigned patientd table */}
                        <div className='appointment_table'>
                            <div className='appointment_list'>
                                <div className='left'>
                                    <p>Assigned Pateints</p>
                                </div>
                                <div className='right'>
                                    <p></p>
                                </div>
                            </div>
                            <div className='appointment_table_holder' style={{ overflowX: "scroll" }} >
                                <table className='table-responsive' >
                                    <thead>
                                        <tr>
                                            <th>S/N</th>
                                            <th>Pateint Name</th>
                                            <th> Pateint ID</th>
                                            <th>Ward</th>

                                            <th>BP </th>
                                            <th>Weight</th>
                                            <th>Action</th>
                                        </tr>
                                    </thead>



                                    <tbody>
                                        {!patientsInChargeOf ?
                                            (<p> No patient assigned</p>)
                                            : patientsInChargeOf?.map((patient, i) => (


                                                <tr>
                                                    <td>{i + 1}</td>
                                                    <td>{patient?.first_name} {patient?.last_name} </td>
                                                    <td>#{patient?.card_no}</td>
                                                    <td>Ward </td>

                                                    <td>{patient?.blood_pressure}</td>
                                                    <td> {patient?.weight}</td>
                                                    <td
                                                        onClick={() => {
                                                            setViewPatient(true)
                                                            setPatientDetails(patient)
                                                            setViewPatientIndex(i)
                                                        }}
                                                    >




                                                    </td>
                                                </tr>

                                            ))}




                                    </tbody>

                                </table>
                            </div>
                        </div>

                        <div className='appointment_table'>
                            <div className='appointment_list'>
                                <div className='left'>
                                    <p>Assigned Wards</p>
                                </div>
                                <div className='right'>
                                    <p></p>
                                </div>
                            </div>
                            <div className='appointment_table_holder' style={{ overflowX: "scroll" }} >
                                <table className='table-responsive' >
                                    <thead>
                                        <tr>
                                            <th>S/N</th>
                                            <th>Ward Name</th>
                                            <th> Ward Type</th>
                                            <th>Duration</th>


                                            <th>Action</th>
                                        </tr>
                                    </thead>



                                    <tbody>
                                        {!wardsInChargeOf ?
                                            (<p> No Ward assigned</p>)
                                            : wardsInChargeOf?.map((ward, i) => (


                                                <tr>
                                                    <td>{i + 1}</td>
                                                    <td>{ward?.name}  </td>
                                                    <td>{ward?.type}</td>
                                                    <td>Ward </td>

                                                    <td
                                                        onClick={() => {

                                                        }}
                                                    >




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