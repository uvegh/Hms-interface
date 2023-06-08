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
function Patient() {
    const baseUrl = "https://gavohms.onrender.com"
    const { currentEmpId,
        nurseObj,
        handleGetNurseDetail,
        handleGetConsultation,
        patientsInChargeOf } = useContext(HmsContext)
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
    const [weight, setWeight] = useState("")
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
            setFoundPatientIsShown(true)
            console.log(foundPatient)
            return
        }



    }



    const handleUpdatePatientvitals = async (id) => {
        if (!patientVitals.blood_pressure || !patientVitals.weight) {
            setValidate(true);
            //console.log(patientVitals);
            console.log(patientVitals);
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
        }
    }

    useEffect(() => {

        handleGetNurseDetail()
        handleGetConsultation()
    }, [foundPatient?.vitals?.weight, patientVitals])
    return (
        <>
            {isLoading && (
                <SpinnerLoader />
            )}
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
                                        {!foundPatient?.ward ? (<p className='bg-white rounded p-2'> none</p>) : (
                                            <p className=' '>{foundPatient?.ward} </p>
                                        )}
                                    </div>


                                    <div className="col-md-4">
                                        <label htmlFor='' className="form-label">Blood Group</label>
                                        <p className='bg-white rounded p-2 '>{!foundPatient?.vitals?.blood_group ? ("none") : foundPatient?.vitals.blood_group}</p>
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
                                                        ? "none"
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
                                                    ? "none"
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
                                                    ? "none"
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
                                                    ? "none"
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
                                                    ? "none"
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
                                                    ? "none"
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

                                                <button type="button" className="btn btn-primary border-0  m-auto col-4 mt-3 fs-5"
                                                    onClick={() => [
                                                        handleUpdatePatientvitals(foundPatient?._id)
                                                    ]}

                                                >Update
                                                </button>
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
            {showEdit && (

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
                                    <p className='bg-white p-2'> {!patientDetails?.first_name && !patientDetails?.last_name ? ("none") : `${patientDetails?.first_name} ${patientDetails?.last_name}`} </p>
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





            {viewPatient && (

                <div className="overlay">
                    <div className="container  add-patient-form">

                        <form className=" container  col-lg-11 col-md-10 m-auto mt-5 rounded  nurse-view ">
                            <div className="d-flex fs-3 col-12 justify-content-end">
                                <span onClick={() => {
                                    setviewPatient(false)
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
                                                <li className='list-group-item'>none</li>
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
                                                <li className='list-group-item'>none</li>
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
                            <h2>Patients</h2>
                        </div>
                        <div className='profile_avi_box'>
                            <div className='profile_avi'>
                                <img src={`${baseUrl}/${currentEmpId?.avatar}`} alt='' />
                            </div>
                            <div className='profile_name'>
                                <p className='profile_name'> {` ${currentEmpId?.first_name} ${currentEmpId?.last_name}`} </p>
                                <span className='profile_occupation'>Nurse</span>
                            </div>
                        </div>
                    </div>
                    <div className='doctors_container_content'>

                        <div className='patient_search_box nurse_search_box'>
                            <div className='search_box  m-auto '  >

                                <form action=''>
                                    <input
                                        className="col-md-5 p-3"
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

                        {/* appointment table */}
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
                                            <th>Name</th>
                                            <th>ID</th>
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
                    </div>
                </div>



            </section>
        </>
    )
}

export default Patient