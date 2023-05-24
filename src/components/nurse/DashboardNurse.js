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
function DashboardNurse() {
    const baseUrl = "https://gavohms.onrender.com"
    const { currentEmpId, handleGetNurseDetail, nurseObj, handleGetConsultation, handleGetAllDoctors, doctors, consultationNurse } = useContext(HmsContext)
    const [showEdit, setShowEdit] = useState(false)

    const [patientVitals, setPatientVitals] = useState({
        vitals: {
            blood_pressure: "",
            weight: ""
        }

    })
    const [patientDetails, setPatientDetails] = useState()
    const [isLoading, setIsloading] = useState(false);
    const [validate, setValidate] = useState(false)
    const [consultant, setConsultant] = useState({
        employees_id: ""
    })
    const handleEditPatientVitals = async (id) => {
        if (!patientVitals.vitals.blood_pressure || !patientVitals.vitals.weight) {
            setValidate(true)
            //console.log(patientVitals);
            return
        }
        let response = (await (axios.put(`${baseUrl}/patient/${id}`, patientVitals))).data
        //console.log(response);

    }
    const handleVitalsChange = (e) => {
        const { name, value } = e.target
        if (name.includes('vitals')) {
            const field = name.split('.')[1]
            setPatientVitals((prev) => ({
                ...prev, vitals: {
                    ...prev.vitals, [field]: value
                }
            }))
        }

    }
    //console.log(consultationNurse);

    const handleConsultationStatus = async (id) => {
        setIsloading(true)
        alert(consultant.employees_id);
        if (!consultant.employees_id) {
            alert("add doctor")
            return
        }
        let response = (await (axios.put(`${baseUrl}/consultation/${id}`, {
            nurse_seen: true,
            employees_id: consultant.employees_id
        }))).data
        console.log(response);
        if (response?.code == "200") {
            alert("pateint posted to doctor")
            setIsloading(false)
            return
        }
        setIsloading(false)

    }

    useEffect(() => {
        // console.log(currentEmpId)
        // console.log(nurseObj)
        handleGetNurseDetail()
        handleGetConsultation()
        handleGetAllDoctors()
    }, [consultationNurse])



    return (
        <>

            {isLoading && (
                <div className="container-fluid overlay">
                    <div className="loader m-auto">
                        <div className="lds-spinner text-center m-auto">
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
                </div>
            )}

            {showEdit && (

                <div className="overlay">
                    <div className="container  add-patient-form">

                        <form className=" container  col-lg-6 col-md-10 m-auto mt-5 rounded ">
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
                                    <p className='bg-white p-2'>{patientDetails?.first_name} {patientDetails?.first_name} </p>
                                </div>

                                <div className="col-md-5 col-lg-5 col-sm-11 m-auto mb-3">
                                    <label htmlFor="">Weight(kg)</label>
                                    <input
                                        name='vitals.weight'
                                        value={patientVitals.vitals.weight}
                                        onChange={handleVitalsChange}
                                        type="number" className={!patientVitals.vitals.weight && validate == true ? (" form-control border border-danger") : ("form-control")} />
                                </div>
                                <div className="col-md-5 col-lg-5 col-sm-11 m-auto mb-3 ">
                                    <label htmlFor="">Blood Pressure</label>
                                    <input type="text"
                                        onChange={handleVitalsChange}
                                        name='vitals.blood_pressure'
                                        placeholder='110/90'
                                        value={patientVitals.vitals.blood_pressure}
                                        className={!patientVitals.vitals.blood_pressure && validate == true ? (" form-control border border-danger") : ("form-control")} />
                                </div>

                                <div className='text-center mb-3'>
                                    <button type='button' className='btn btn-secondary ' onClick={() => {
                                        handleEditPatientVitals(patientDetails?._id)
                                    }


                                    }>
                                        Update
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
                                <Link to="/nurse/management"> Management </Link>
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
                                <span className='profile_occupation'>{currentEmpId?.role}</span>
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
                                    <p>Today</p>
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
                        <div className='appointment_table' >
                            <div className='appointment_list'>
                                <div className='left'>
                                    <p>Patient Details</p>
                                </div>
                                <div className='right'>
                                    <p></p>
                                </div>
                            </div>
                            <div className='appointment_table_holder' style={{ overflowX: "scroll" }}>
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

                                        {
                                            consultationNurse?.length == 0 ? ("no consultation") : consultationNurse?.map((consultation, i) => (

                                                <tr>
                                                    <td>{i + 1}</td>
                                                    <td>{consultation?.patient_id
                                                        ?.first_name} {consultation?.patient_id
                                                            ?.last_name}</td>
                                                    <td>#{consultation?.patient_id
                                                        ?.card_no}</td>
                                                    <td>{!consultation?.patient_id
                                                        ?.vitals?.blood_pressure ? ("none") : (
                                                        consultation?.patient_id
                                                            ?.vitals?.blood_pressure
                                                    )} </td>
                                                    <td>{!consultation?.patient_id
                                                        ?.vitals?.weight ? ("none") : (
                                                        consultation?.patient_id
                                                            ?.vitals?.weight
                                                    )} </td>
                                                    <td>{consultation?.payment_status}</td>
                                                    <td>

                                                        <select className="form-select form-select-sm col-12"  >

                                                            <option value=""
                                                                onChange={(e) => {
                                                                    setConsultant({
                                                                        ...consultant, employees_id: e.target.value
                                                                    })
                                                                }}
                                                            >  consultant</option>
                                                            {doctors?.length == 0 ? (<option value="">No consultant</option>) : doctors?.map((doctor) => (
                                                                <option
                                                                    onChange={(e) => {
                                                                        setConsultant({
                                                                            ...consultant, employees_id: e.target.value
                                                                        })
                                                                    }}
                                                                    value={doctor?.emp_id?._id}>{doctor?.emp_id?.first_name} {doctor?.emp_id?.last_name}</option>
                                                            ))}


                                                        </select>

                                                    </td>
                                                    <td>

                                                        {
                                                            consultation?.payment_status == "notpaid" ? (
                                                                <button style={{
                                                                    backgoundColor
                                                                        : "#2B415C"
                                                                }}
                                                                    onClick={() => {
                                                                        alert("cannot edit or post patient without payment")
                                                                    }}
                                                                >Post</button>
                                                            ) : (

                                                                <button style={{
                                                                    backgoundColor
                                                                        : "#2B415C"
                                                                }}
                                                                    onClick={() => {
                                                                        handleConsultationStatus(consultation?._id)
                                                                    }}
                                                                >Post</button>
                                                            )
                                                        }




                                                        {
                                                            consultation?.payment_status == "notpaid" ? (
                                                                <button
                                                                    onClick={() => {
                                                                        // setShowEdit(true)
                                                                        // setPatientDetails(consultation?.patient_id)
                                                                        alert("cannot edit or post patient without payment")
                                                                    }}
                                                                >Edit</button>

                                                            ) : (
                                                                <button
                                                                    onClick={() => {
                                                                        setShowEdit(true)
                                                                        setPatientDetails(consultation?.patient_id)

                                                                    }}
                                                                >Edit</button>
                                                            )
                                                        }

                                                    </td>
                                                </tr>
                                            ))
                                        }



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