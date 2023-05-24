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
function Management() {
    const baseUrl = "https://gavohms.onrender.com"
    const { currentEmpId, handleGetNurseDetail, nurseObj, consultation, handleGetConsultation, handleGetAllDoctors, doctors } = useContext(HmsContext)
    const [showEdit, setShowEdit] = useState(false)
    const [assignNurse, setAssignNurse] = useState(false)
    const [foundNurse, setFoundNurse] = useState()
    const [patientVitals, setPatientVitals] = useState({
        vitals: {
            blood_pressure: "",
            weight: ""
        }

    })
    const [isLoading, setIsloading] = useState(false);
    const [patientDetails, setPatientDetails] = useState()
    const [editIndex, setEditIndex] = useState()
    const [validate, setValidate] = useState(false)
    const [searchNurseData, setSearchNurse] = useState({
        first_name: ""
    })
    const [assignNurseData, setAssignNurseData] = useState({
        patients_incharge_of: ""
    })

    const handleEditPatientVitals = async (id) => {
        if (!patientVitals.vitals.blood_pressure || !patientVitals.vitals.weight) {
            setValidate(true)
            console.log(patientVitals);
            return
        }
        let response = (await (axios.put(`${baseUrl}/patient/${id}`, patientVitals))).data
        console.log(response);

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
    console.log(nurseObj);

    const handleConsultationStatus = async (id) => {
        let response = (await (axios.put(`${baseUrl}/${id}`, { nurse_seen: true }))).data
        console.log(response);
    }

    const handleAssignNurse = async (nurseId) => {
        let response = (await (axios.post(`${baseUrl}/nurse/${nurseId}`))).data
    }
    const searchNurse = async () => {
        let response = (await (axios.get(`${baseUrl}/employee?role=nurse&first_name=${searchNurseData.first_name}`))).data
        console.log(response?.found_nurse);
        setFoundNurse(response?.found_nurse)
    }



    useEffect(() => {
        // console.log(currentEmpId)
        // console.log(nurseObj)
        handleGetNurseDetail()
        handleGetConsultation()
        handleGetAllDoctors()
    }, [])



    return (
        <>
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

            {assignNurse && (
                <div className="overlay">
                    <div className="container  add-patient-form">

                        <form className=" container  col-lg-8 col-md-10 m-auto mt-5 rounded p-5">
                            <div className="d-flex fs-3 col-12 justify-content-end">
                                <span onClick={() => {
                                    setAssignNurse(false)
                                }}> <TiTimes /> </span>
                            </div>
                            <h3 className='text-center'>Assign Nurse</h3>
                            <div className="row g-3 ">
                                <div className="col-md-6 m-auto">
                                    <label htmlFor="validationDefault01" className="form-label">First name</label>
                                    <input type="text"
                                        name='first_name'
                                        value={assignNurseData.first_name}
                                        onChange={(e) => {
                                            setAssignNurseData({
                                                ...assignNurseData, patients_incharge_of: e.target.value
                                            })
                                        }}

                                        className=
                                        {validate == true && !assignNurseData.first_name ? ("form-control border border-danger") : ("form-control")}
                                        id="validationDefault01" required />
                                </div>

                                <div className="col-md-6 m-auto">
                                    <label htmlFor="validationDefault02" className="form-label">Last name</label>
                                    <input type="text"
                                        name='last_name'

                                        value={assignNurseData.last_name}
                                        className={validate == true && !assignNurseData.last_name ? ("form-control border border-danger") : ("form-control")} id="validationDefault02" required />
                                </div>

                                <div className="col-md-6 m-auto nurse-dropDown">
                                    <label htmlFor="validationDefault02" className="form-label"> Nursee</label>
                                    <input type="text"
                                        name=''
                                        onChange={(e) => {
                                            setAssignNurseData({
                                                ...searchNurseData, first_name: e.target.value
                                            })
                                            searchNurse()
                                        }}
                                        value={assignNurseData.last_name}

                                        className={validate == true && !assignNurseData.last_name ? ("form-control border border-danger") : ("form-control")} id="validationDefault02" required />
                                    {
                                        foundNurse?.length == 0 ? (
                                            <div className="spin-box d-flex justify-content-center bg-white">
                                                <div className="spinner-border " role="status">
                                                    {/* <span className="visually-hidden">Loading...</span> */}
                                                </div></div>
                                        ) : foundNurse?.map((nurse) => (
                                            <ul>
                                                <li className=''>{nurse?.emp_id?.first_name} </li>

                                            </ul>
                                        ))
                                    }







                                </div>

                                <div className="col-md-6 m-auto">
                                    <label htmlFor="validationDefault02" className="form-label">Last name</label>
                                    <input type="text"
                                        name='last_name'

                                        value={assignNurseData.last_name}
                                        className={validate == true && !assignNurseData.last_name ? ("form-control border border-danger") : ("form-control")} id="validationDefault02" required />
                                </div>







                                <div className="col-12 text-center">
                                    {isLoading == true ? (<>
                                        <div className="text-center">
                                            <div className="spinner-border" role="status">
                                                <span className="visually-hidden">Loading...</span>
                                            </div>
                                        </div>
                                    </>) :
                                        (<>
                                            <button type="button" className="btn btn-primary border-0 col-6 mt-3 fs-5" style={{ backgroundColor: "#2B415C" }}


                                            >Submit
                                            </button>

                                        </>)

                                    }

                                </div>
                            </div>
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
                            <h2>Management</h2>
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

                        <div className='appointment_table' >
                            <div className='appointment_list'>
                                <div className='left'>
                                    <p>Patient Mangement</p>
                                </div>
                                <div className='right mt-1'>
                                    <button className='btn btn-secondary' onClick={() => {
                                        setAssignNurse(true)
                                    }
                                    }>
                                        Assign Patient
                                    </button>
                                </div>
                            </div>
                            <div className='appointment_table_holder' style={{ overflowX: "scroll" }}>
                                <table className='table-responsive' >
                                    <thead>
                                        <tr>
                                            <th>S/N</th>
                                            <th>Patient Name</th>
                                            <th>Patient Name</th>
                                            <th>Ward</th>
                                            <th>Assigned Nurse</th>
                                            <th>time</th>
                                            <th>Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {/* 
                                        {
                                            consultation?.length == 0 ? ("no consultation") : nurseObj?.map((nurse, i) => (

                                                <tr>
                                                    <td>{i + 1}</td>
                                                    <td>{nurse?.patient_id
                                                        ?.first_name} {nurse?.patient_id
                                                            ?.last_name}</td>
                                                    <td>#{nurse?.patient_id
                                                        ?.card_no}</td>
                                                    <td>{!nurse?.patient_id
                                                        ?.vitals?.blood_pressure ? ("none") : (
                                                        nurse?.patient_id
                                                            ?.vitals?.blood_pressure
                                                    )} </td>
                                                    <td>{!nurse?.patient_id
                                                        ?.vitals?.weight ? ("none") : (
                                                        nurse?.patient_id
                                                            ?.vitals?.weight
                                                    )} </td>
                                                    <td>{nurse?.payment_status}</td>

                                                    <td>



                                                        <button style={{
                                                            backgoundColor
                                                                : "#2B415C"
                                                        }}
                                                            onClick={() => {
                                                                handleConsultationStatus()
                                                            }}
                                                        >Post</button>

                                                        <button
                                                            onClick={() => {
                                                                setShowEdit(true)
                                                                setPatientDetails(consultation?.patient_id)
                                                                //     setPatientVitals({
                                                                // vitals:{blood_pressure:consultation?.patient_id?vitals?blood_pressure,
                                                                //     weight:consultation?.patient_id?vitals?weight
                                                                // }
                                                                //     })
                                                            }}
                                                        >Edit</button>
                                                    </td>
                                                </tr>
                                            ))
                                        } */}



                                    </tbody>

                                </table>
                            </div>
                        </div>

                        <div className='appointment_table mt-5' >
                            <div className='appointment_list'>
                                <div className='left'>
                                    <p> Ward Management</p>
                                </div>
                                <div className='right mt-1'>
                                    <button className='btn btn-secondary'>
                                        Assign ward
                                    </button>
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
                                            consultation?.length == 0 ? ("no consultation") : consultation?.map((consultation, i) => (

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
                                                            <option selected>  consultant</option>
                                                            {doctors?.length == 0 ? (<option value="">No consultant</option>) : doctors?.map((doctor) => (
                                                                <option value={doctor?.emp_id?._id}>{doctor?.emp_id?.first_name} {doctor?.emp_id?.last_name}</option>
                                                            ))}


                                                        </select>

                                                    </td>
                                                    <td>



                                                        <button style={{
                                                            backgoundColor
                                                                : "#2B415C"
                                                        }}
                                                            onClick={() => {
                                                                handleConsultationStatus()
                                                            }}
                                                        >Post</button>

                                                        <button
                                                            onClick={() => {
                                                                setShowEdit(true)
                                                                setPatientDetails(consultation?.patient_id)
                                                                //     setPatientVitals({
                                                                // vitals:{blood_pressure:consultation?.patient_id?vitals?blood_pressure,
                                                                //     weight:consultation?.patient_id?vitals?weight
                                                                // }
                                                                //     })
                                                            }}
                                                        >Edit</button>
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

export default Management