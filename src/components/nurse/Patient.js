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
function Patient() {
    const baseUrl = "https://gavohms.onrender.com"
    const { currentEmpId, nurseObj, handleGetNurseDetail, handleGetConsultation } = useContext(HmsContext)
    console.log(nurseObj);
    const [patientDetails, setPatientDetails] = useState()

    const [showEdit, setShowEdit] = useState(false)

    const [patientVitals, setPatientVitals] = useState({
        vitals: {
            blood_pressure: "",
            weight: ""
        }

    })
    const [editIndex, setEditIndex] = useState()
    const [validate, setValidate] = useState(false)

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
    useEffect(() => {

        handleGetNurseDetail()
        handleGetConsultation()
    }, [])
    return (
        <>
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
                                            <th>Medication</th>
                                            <th>Diagnosis</th>
                                            <th>BP </th>
                                            <th>Weight</th>
                                            <th>Action</th>
                                        </tr>
                                    </thead>



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



                                                        <button className=''
                                                            onClick={() => {
                                                                setShowEdit(true)
                                                                setPatientDetails(patient)
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