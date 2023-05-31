import React, { useContext, useEffect, useState } from 'react'
import { BsFileEarmarkMedical, BsFillHouseAddFill } from 'react-icons/bs'
import { AiOutlineEllipsis } from 'react-icons/ai'
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
function Management() {
    const baseUrl = "https://gavohms.onrender.com"
    const { currentEmpId,
        handleGetNurseDetail,
        nurseObj, consultation,
        handleGetConsultation,
        handleGetAllDoctors,
        doctors,
        nurses,
        additionalNurseDetail,
        handlegetNurseAddInfo,
        wards } = useContext(HmsContext)
    const [showEdit, setShowEdit] = useState(false)
    const [assignNurse, setAssignNurse] = useState(false)
    const [foundNurse, setFoundNurse] = useState()
    const [viewNurse, setViewNurse] = useState(false)
    const [viewNurseIndex, setViewNurseIndex] = useState()
    const [patientVitals, setPatientVitals] = useState({
        vitals: {
            blood_pressure: "",
            weight: ""
        }

    })
    const [viewFoundNurse, setViewFoundNurse] = useState()
    const [viewFoundNurseIndex, setViewFoundNurseIndex] = useState()
    const [foundPatient, setFoundPatient] = useState({})
    const [isLoading, setIsloading] = useState(false);
    const [patientDetails, setPatientDetails] = useState()
    const [editIndex, setEditIndex] = useState()
    const [isLoadingForm, setIsloadingForm] = useState(false);
    const [validate, setValidate] = useState(false)
    const [searchNurseData, setSearchNurseData] = useState({
        first_name: ""

    })
    const [assignNurseData, setAssignNurseData] = useState({
        patients_incharge_of: ""
    })
    const [patientCardNo, setPatientCardNo] = useState()
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
    //console.log(additionalNurseDetail);

    const handleConsultationStatus = async (id) => {
        let response = (await (axios.put(`${baseUrl}/${id}`, { nurse_seen: true }))).data
        // console.log(response);
    }

    const handleAssignNurse = async (nurseId) => {
        let response = (await (axios.post(`${baseUrl}/nurse/${nurseId}`))).data
    }
    const searchNurse = async () => {
        setFoundNurse(response?.employees?.data)
        let response = (await (axios.get(`${baseUrl}/employee?role=nurse&last_name=${searchNurseData.first_name}`))).data
        if (response?.employees?.data?.length > 0) {
            setFoundNurse(response?.employees?.data)
            console.log(response?.employees?.data);
            setIsloading(false)
        }
        else {
            setFoundNurse(response?.employees?.data)
            let response = (await (axios.get(`${baseUrl}/employee?role=nurse&first_name=${searchNurseData.first_name}`))).data

            if (response?.employees?.data?.length > 0) {
                setFoundNurse(response?.employees?.data)
                console.log(response?.employees?.data)

            }
            else {

                // alert("not found")
            }
        }




        // let response = (await (axios.get(`${baseUrl}/employee?role=nurse&last_name=${searchNurseData.first_name}`))).data
        // if (response?.employees?.data?.length == 0) {
        //     let response2 = (await (axios.get(`${baseUrl}/employee?role=nurse&last_name=${searchNurseData.first_name}`))).data
        //     if (response2?.employees?.data?.length == 0) {
        //         console.log(response2);
        //         setFoundNurse(response2?.employees?.data)
        //         return
        //     }
        //     console.log(response?.employees?.data);
        //     setFoundNurse(response2?.employees?.data)
        //     console.log(foundNurse);
        //     //setFoundNurse(response?.employees?.data)
        //     return
        // }



    }

    const handleGetPatient = async () => {
        setIsloadingForm(true)
        console.log(patientCardNo);

        if (!patientCardNo) {
            // alert("search box can not be empty")
            setIsloadingForm(false)
            return
        }
        let response = (await (axios.get(`${baseUrl}/patient?card_no=${patientCardNo}`))).data
        console.log(response?.data)
        if (response) {
            setIsloadingForm(false)
            setFoundPatient(response?.data[0])
            setFoundPatientIsShown(true)
            console.log(foundPatient)
            return
        }



    }

    useEffect(() => {
        // console.log(currentEmpId)
        // console.log(nurseObj)
        handleGetNurseDetail()
        handleGetConsultation()
        handleGetAllDoctors()
    }, [additionalNurseDetail])



    return (
        <>

            {
                isLoading && (<SpinnerLoader />)
            }
            {viewNurse && (

                <div className="overlay">
                    <div className="container  add-patient-form">

                        <form className=" container  col-lg-11 col-md-10 m-auto mt-5 rounded  nurse-view ">
                            <div className="d-flex fs-3 col-12 justify-content-end">
                                <span onClick={() => {
                                    setViewNurse(false)
                                }}> <TiTimes /> </span>
                            </div>

                            <div className=" text-center mb-3">
                                <img className='user_view_icon' src={` ${baseUrl}/${nurses[viewNurseIndex]?.avatar}`} alt="" />
                                <h6> {nurses[viewNurseIndex]?.first_name} {nurses[viewNurseIndex]?.last_name}  </h6>
                                <p>#{nurses[viewNurseIndex]?._id} </p>
                            </div>

                            <section className="row nurse_view_details m-auto col-lg-10 col-sm-12 col-md-10">


                                <div className="col-md-4 m-auto mb-3">
                                    <label htmlFor="" >Gender</label>
                                    <p className=''>{nurses[viewNurseIndex]?.gender}</p>

                                </div>
                                <div className="col-md-4 col-lg-4 col-sm-11 m-auto mb-3">
                                    <label htmlFor="">Department</label>
                                    <p className=''>{nurses[viewNurseIndex]?.department?.name} </p>
                                </div>

                                <div className="col-md-4 col-lg-4 col-sm-11 m-auto mb-3">
                                    <label htmlFor="">Phone</label>
                                    <p className=''>{nurses[viewNurseIndex]?.phone} </p>
                                </div>

                                <div className="col-md-4 col-lg-4 col-sm-11 m-auto mb-3">
                                    <label htmlFor="">Status</label>
                                    <p className=''>{nurses[viewNurseIndex]?.status} </p>
                                </div>
                                <div className="col-md-4 col-lg-4 col-sm-11 m-auto mb-3">
                                    <label htmlFor="">Patients Assigned</label>
                                    <ul className='list-group'>
                                        {
                                            additionalNurseDetail?.patients_incharge_of?.length == 0 || !additionalNurseDetail?.patients_incharge_of ? (<ul>
                                                <li className='list-group-item'>None</li>
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
                                                <li className='list-group-item'>None</li>
                                            </ul>) :
                                                additionalNurseDetail?.data?.ward_no?.map((ward) => (
                                                    <li className='list-group-item'>{ward?.name} {ward?.type} </li>

                                                ))
                                        }



                                    </ul>
                                </div>

                                <div className='text-center mb-5'>
                                    <button type='button' className='btn btn-primary col-4' onClick={() => {
                                        setViewNurseIndex("")
                                        setViewNurse(false)
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







            {viewFoundNurse && (

                <div className="overlay">
                    <div className="container  add-patient-form">

                        <form className=" container  col-lg-11 col-md-10 m-auto mt-5 rounded  nurse-view ">
                            <div className="d-flex fs-3 col-12 justify-content-end">
                                <span onClick={() => {
                                    setViewFoundNurse(false)
                                }}> <TiTimes /> </span>
                            </div>

                            <div className=" text-center mb-3">
                                <img className='user_view_icon' src={` ${baseUrl}/${foundNurse[viewFoundNurseIndex]?.avatar}`} alt="" />
                                <h6> {foundNurse[viewFoundNurseIndex]?.first_name} {foundNurse[viewFoundNurseIndex]?.last_name}  </h6>
                                <p>#{foundNurse[viewFoundNurseIndex]?._id} </p>
                            </div>

                            <section className="row nurse_view_details m-auto col-lg-10 col-sm-12 col-md-10">


                                <div className="col-md-4 m-auto mb-3">
                                    <label htmlFor="" >Gender</label>
                                    <p className=''>{foundNurse[viewFoundNurseIndex]?.gender}</p>

                                </div>
                                <div className="col-md-4 col-lg-4 col-sm-11 m-auto mb-3">
                                    <label htmlFor="">Department</label>
                                    <p className=''>{foundNurse[viewFoundNurseIndex]?.department?.name} </p>
                                </div>

                                <div className="col-md-4 col-lg-4 col-sm-11 m-auto mb-3">
                                    <label htmlFor="">Phone</label>
                                    <p className=''>{foundNurse[viewFoundNurseIndex]?.phone} </p>
                                </div>

                                <div className="col-md-4 col-lg-4 col-sm-11 m-auto mb-3">
                                    <label htmlFor="">Status</label>
                                    <p className=''>{foundNurse[viewFoundNurseIndex]?.status} </p>
                                </div>
                                <div className="col-md-4 col-lg-4 col-sm-11 m-auto mb-3">
                                    <label htmlFor="">Patients Assigned</label>
                                    <ul className='list-group'>
                                        {
                                            additionalNurseDetail?.patients_incharge_of?.length == 0 || !additionalNurseDetail?.patients_incharge_of ? (<ul>
                                                <li className='list-group-item'>None</li>
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
                                                <li className='list-group-item'>None</li>
                                            </ul>) :
                                                additionalNurseDetail?.data?.ward_no?.map((ward) => (
                                                    <li className='list-group-item'>{ward?.name} {ward?.type} </li>

                                                ))
                                        }



                                    </ul>
                                </div>

                                <div className='text-center mb-5 mt-3'>
                                    <button type='button' className='btn btn-primary col-lg-4 col-md-4 col-sm-10' onClick={() => {
                                        setViewFoundNurse("")
                                        setViewFoundNurse(false)
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

            {showEdit && (

                <div className="overlay">
                    <div className="container  add-patient-form">

                        <form className=" container  col-lg-11 col-md-10 m-auto mt-5 rounded  nurse-view ">
                            <div className="d-flex fs-3 col-12 justify-content-end">
                                <span onClick={() => {
                                    setShowEdit(false)
                                }}> <TiTimes /> </span>
                            </div>

                            <div className=" text-center mb-3">
                                <img className='user_view_icon' src={` ${baseUrl}/${nurses[viewNurseIndex]?.avatar}`} alt="avatar" />
                                <h6> {nurses[viewNurseIndex]?.first_name} {nurses[viewNurseIndex]?.last_name}  </h6>
                                <p>#{nurses[viewNurseIndex]?._id} </p>
                            </div>

                            <section className="row nurse_view_details m-auto col-lg-10 col-sm-12 col-md-10">


                                <div className="col-md-4 m-auto mb-3">
                                    <label htmlFor="" >Gender</label>
                                    <p className=''>{nurses[viewNurseIndex]?.gender}</p>

                                </div>
                                <div className="col-md-4 col-lg-4 col-sm-11 m-auto mb-3">
                                    <label htmlFor="">Department</label>
                                    <p className=''>{nurses[viewNurseIndex]?.department?.name} </p>
                                </div>

                                <div className="col-md-4 col-lg-4 col-sm-11 m-auto mb-3">
                                    <label htmlFor="">Phone</label>
                                    <p className=''>{nurses[viewNurseIndex]?.phone} </p>
                                </div>

                                <div className="col-md-4 col-lg-4 col-sm-11 m-auto mb-3">
                                    <label htmlFor="">Status</label>
                                    <p className=''>{nurses[viewNurseIndex]?.status} </p>
                                </div>
                                <div className="col-md-4 col-lg-4 col-sm-11 m-auto mb-3">
                                    <label htmlFor="">No of Patients Assigned</label>
                                    <p className=''>{!additionalNurseDetail ? ("0") : additionalNurseDetail?.ward_no?.length} </p>
                                </div>

                                <div className="col-md-4 col-lg-4 col-sm-11 m-auto mb-3">
                                    <label htmlFor="">No of Ward Assigned</label>
                                    <p className=''>{!additionalNurseDetail ? ("0") : additionalNurseDetail?.patients_incharge_of?.length} </p>
                                </div>


                                <h4>Assign Patient</h4>
                                <div className="col-md-4 col-lg-4 col-sm-11 m-auto mb-3">
                                    <label htmlFor=""> Card_no</label>
                                    <input className='form-control'
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

                                        type="text" placeholder='enter card no' />
                                </div>

                                <div className="col-md-4 col-lg-4 col-sm-11 m-auto mb-3">
                                    <label htmlFor=""> First Name</label>
                                    <p> {!foundPatient?.first_name || patientCardNo == "" ? ("none") : foundPatient?.first_name}</p>
                                </div>

                                <div className="col-md-4 col-lg-4 col-sm-11 m-auto mb-3">
                                    <label htmlFor=""> Last Name</label>
                                    <p>{!foundPatient?.last_name || patientCardNo == "" ? ("none") : foundPatient?.last_name} </p>
                                </div>

                                <div className="col-md-5 col-lg-4 col-sm-11 m-auto mb-3 ">
                                    <label htmlFor="">Ward Assigned</label>
                                    <ul className='list-group'>
                                        {
                                            additionalNurseDetail?.data?.ward_no?.length == 0 || !additionalNurseDetail?.data?.ward_no ? (<ul>
                                                <li className='list-group-item'>None</li>
                                            </ul>) :
                                                additionalNurseDetail?.data?.ward_no?.map((ward) => (
                                                    <li className='list-group-item'>{ward?.name} {ward?.type} </li>

                                                ))
                                        }



                                    </ul>
                                </div>

                                {/* <h4>Assign Ward</h4> */}

                                <div className="col-md-4 col-lg-4 col-sm-11 m-auto mb-3">
                                    <label htmlFor=""> </label>
                                    <select className='form-control ward-select' name="" id="">
                                        <option value="">select ward</option>
                                        {
                                            wards?.length == 0 ? ("No wards") : wards?.map((ward) => (
                                                <option value={ward?._id}>{ward?.name}  ( <span className=''>{ward?.type}</span> )</option>
                                            ))
                                        }
                                    </select>
                                </div>

                                <div className='text-center mb-5 mt-3'>

                                    {isLoadingForm == true ? (
                                        <>
                                            <div className="text-center">
                                                <div className="spinner-border" role="status">
                                                    <span className="visually-hidden">Loading...</span>
                                                </div>
                                            </div>
                                        </>
                                    ) : (
                                        <>
                                            <button type='button' className='btn btn-primary col-lg-4 col-md-4 col-sm-10' onClick={() => {
                                                setViewNurseIndex(false)

                                            }


                                            }>
                                                Close
                                            </button>
                                        </>
                                    )}
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
                                    <label htmlFor="validationDefault02" className="form-label"> Nurse</label>
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
                                <img src={`${baseUrl}/${currentEmpId?.avatar}`} alt='avatar' />
                            </div>
                            <div className='profile_name'>
                                <p className='profile_name'> {` ${currentEmpId?.first_name} ${currentEmpId?.last_name}`} </p>
                                <span className='profile_occupation'>{currentEmpId?.role}</span>
                            </div>
                        </div>
                    </div>
                    <div className='doctors_container_content'>
                        <div className='patient_search_box nurse_search_box'>
                            <div className='search_box  m-auto '  >

                                <form action=''>
                                    <input
                                        className="col-md-5 p-3"
                                        type='text' onSubmit={searchNurse}
                                        onChange={(e) => {
                                            setSearchNurseData({
                                                ...searchNurseData, first_name: e.target.value
                                            })


                                        }}
                                        onKeyUpCapture={() => {
                                            searchNurse()
                                        }}
                                        onClick={
                                            () => {
                                                searchNurse()
                                            }
                                        }

                                        placeholder='Search Nurse' />
                                    <button type='button'

                                        onClick={
                                            () => {
                                                searchNurse()
                                            }
                                        }
                                        className='p-3'>Search</button>
                                </form>
                            </div>
                        </div>
                        <div className='appointment_table nurse_table mt-5' >
                            <div className='appointment_list'>
                                <div className='left'>
                                    <p> Nurse Details</p>
                                </div>
                                {/* <div className='right mt-1'>
                                    <button className='btn btn-secondary'>
                                        Assign ward
                                    </button>
                                </div> */}
                            </div>
                            <div className='appointment_table_holder' >
                                <table className='table-responsive' >
                                    <thead>
                                        <tr>
                                            <th>S/N</th>
                                            <th>Name</th>
                                            <th>ID</th>

                                            <th>Department</th>

                                            <th>Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody>

                                        {
                                            nurses?.length == 0 ? ("loading...") :
                                                searchNurseData?.first_name == "" ?

                                                    (nurses?.map((nurses, i) => (

                                                        <tr key={i}>
                                                            <td>{i + 1}</td>
                                                            <td className='nurse_name'> <img className='user-icon rounded-circle' src={`${baseUrl}/${nurses?.avatar}`} alt="" />  {nurses?.first_name} {nurses?.last_name}</td>
                                                            <td> {nurses?._id}</td>

                                                            <td clas>{nurses?.department?.name}</td>




                                                            <td className='text-decoration-underline'


                                                            >


                                                                <div className="dropdown">
                                                                    <Link className="btn bg-white border-0 dropdown-toggle" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                                                        <AiOutlineEllipsis />
                                                                    </Link>

                                                                    <ul className="dropdown-menu">
                                                                        <li
                                                                            onClick={() => {

                                                                                setViewNurse(true)
                                                                                handlegetNurseAddInfo(nurses?._id)
                                                                                setViewNurseIndex(i)
                                                                                console.log(additionalNurseDetail)


                                                                            }}
                                                                        ><Link className="dropdown-item" >view</Link></li>
                                                                        <li
                                                                            onClick={() => {
                                                                                setShowEdit(true)
                                                                                handlegetNurseAddInfo(nurses?._id)
                                                                                setViewNurseIndex(i)
                                                                                console.log(additionalNurseDetail)
                                                                            }}

                                                                        ><Link className="dropdown-item" >Edit </Link></li>

                                                                    </ul>
                                                                </div>



                                                            </td>
                                                        </tr>
                                                    ))) :

                                                    foundNurse?.length == 0 ? (
                                                        <tr>
                                                            <td>

                                                            </td>
                                                            <td>

                                                            </td>
                                                            <td className='table_loader '>
                                                                <div className="text-center">
                                                                    <div className="spinner-border" role="status">
                                                                        <span className="visually-hidden">Loading...</span>
                                                                    </div>
                                                                </div>
                                                            </td>

                                                        </tr>


                                                    ) : foundNurse?.map((nurses, i) => (

                                                        <tr key={i}>
                                                            <td>{i + 1}</td>
                                                            <td className='nurse_name'> <img className='user-icon rounded-circle' src={`${baseUrl}/${nurses?.avatar}`} alt="" />  {nurses?.first_name} {nurses?.last_name}</td>
                                                            <td> {nurses?._id}</td>

                                                            <td >{nurses?.department?.name}</td>

                                                            <td className='text-decoration-underline'


                                                            >


                                                                <div className="dropdown">
                                                                    <Link className="btn bg-white border-0 dropdown-toggle" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                                                        <AiOutlineEllipsis />
                                                                    </Link>

                                                                    <ul className="dropdown-menu">
                                                                        <li
                                                                            onClick={() => {

                                                                                setViewFoundNurse(true)
                                                                                handlegetNurseAddInfo(nurses?._id)
                                                                                setViewFoundNurseIndex(i)


                                                                            }}
                                                                        ><Link className="dropdown-item" >view</Link></li>
                                                                        <li
                                                                            onClick={() => {
                                                                                handlegetNurseAddInfo(nurses?._id)
                                                                                setShowEdit(true)
                                                                            }}

                                                                        ><Link className="dropdown-item" >Edit </Link></li>

                                                                    </ul>
                                                                </div>



                                                            </td>
                                                        </tr>
                                                    ))
                                        }



                                    </tbody>

                                </table>
                            </div>
                        </div>


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