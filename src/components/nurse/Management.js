import React, { useContext, useEffect, useState } from 'react'
import { BsFileEarmarkMedical, BsFillHouseAddFill, BsFillTrashFill } from 'react-icons/bs'
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
import { ToastContainer } from 'react-toastify'
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
        wards,
        profileObj,
        customAlertNotify,
        setIsLoggedIn } = useContext(HmsContext)
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
    const [isTableLoading, setIsTableLoading] = useState(false);
    const [validate, setValidate] = useState(false)
    const [addPatient, setAddPatient] = useState(false)
    const [addWard, setAddWard] = useState(false)
    const [searchNurseData, setSearchNurseData] = useState({
        first_name: ""

    })
    const [assignNurseData, setAssignNurseData] = useState({
        patients_incharge_of: ""
    })
    const [wardNo, setWardNo] = useState()
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

    const handleAssignNursePatient = async (nurseId, patientId) => {
        setIsloadingForm(true)
        console.log(nurseId, patientId);
        if (!nurseId || !patientId || patientCardNo == "") {
            alert("patient can't be empty")
            setIsloadingForm(false)
            return
        }
        let response = (await (axios.post(`${baseUrl}/nurse/${nurseId}`, {
            "patients_incharge_of": patientId

        }))).data
        console.log(response);

        if (response?.msg == "Patient Assiged") {
            alert(response?.msg)
            customAlertNotify(response?.msg)
            handlegetNurseAddInfo(nurseId)
            setIsloadingForm(false)
        }
        else if (response?.msg == "Already exist") {
            alert("Patient already assigned")
            handlegetNurseAddInfo(nurseId)
            setIsloadingForm(false)
        }
        else {
            alert("Something went wrong !")
            handlegetNurseAddInfo(nurseId)
            setIsloadingForm(false)

        }
    }


    const handleAssignNurseWard = async (nurseId) => {
        setIsloadingForm(true)
        console.log(nurseId, wardNo);
        if (!nurseId || wardNo == "") {
            alert("ward can't be empty")
            setIsloadingForm(false)
            return
        }
        let response = (await (axios.post(`${baseUrl}/nurse/${nurseId}`, {
            "ward_no": wardNo

        }))).data
        console.log(response);

        if (response?.msg == "Ward Assiged") {
            alert(response?.msg)
            handlegetNurseAddInfo(nurseId)
            setIsloadingForm(false)
        }
        else if (response?.msg == "Already exist") {
            alert("Patient already assigned")
            handlegetNurseAddInfo(nurseId)
            setIsloadingForm(false)
        }
        else {
            alert("Something went wrong !")
            handlegetNurseAddInfo(nurseId)
            setIsloadingForm(false)

        }
    }

    const removeAssignedPatient = async (nurseId, patientId) => {
        console.log(nurseId, patientId)
        if (!nurseId || patientId == "") {
            alert("patient can't be empty")
            setIsloadingForm(false)
            return
        }

        let response = (await (axios.post(`${baseUrl}/nurse/${nurseId}/rmv`, {
            "patients_incharge_of": patientId

        }))).data
        if (response?.msg == "Deleted successfully") {
            handlegetNurseAddInfo(nurseId)
            customAlertNotify("patient removed")
            alert("Patient removed")
            return
        }
        handlegetNurseAddInfo(nurseId)
        alert("someting went wrong")
    }

    const removeAssignedWard = async (nurseId, wardId) => {
        console.log(nurseId, wardId)
        if (!nurseId || wardId == "") {
            alert("ward can't be empty")
            setIsloadingForm(false)
            return
        }

        let response = (await (axios.post(`${baseUrl}/nurse/${nurseId}/rmv`, {
            "ward_no": wardId

        }))).data
        if (response?.msg == "Deleted successfully") {
            handlegetNurseAddInfo(nurseId)
            alert("ward removed")
            return
        }
        handlegetNurseAddInfo(nurseId)
        alert("something went wrong")
    }



    const searchNurse = async () => {
        setIsTableLoading(true)
        let response = (await (axios.get(`${baseUrl}/employee?role=nurse&last_name=${searchNurseData.first_name}`))).data
        if (response?.employees?.data?.length > 0) {
            setFoundNurse(response?.employees?.data)
            console.log(response?.employees?.data);
            setIsTableLoading(false)
        }
        else {
            setIsTableLoading(true)
            let response = (await (axios.get(`${baseUrl}/employee?role=nurse&first_name=${searchNurseData.first_name}`))).data

            if (response?.employees?.data?.length > 0) {
                setFoundNurse(response?.employees?.data)
                console.log(response?.employees?.data)
                setIsTableLoading(false)
            }
            else {
                setIsTableLoading(false)
                // alert("not found")
            }
        }








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

                <>
                    <ToastContainer className="alert-management-notification" />
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
                                        <label htmlFor="">No of Wards Assigned</label>
                                        <p className=''>{!additionalNurseDetail ? ("0") : additionalNurseDetail?.ward_no?.length} </p>
                                    </div>

                                    <div className="col-md-4 col-lg-4 col-sm-11 m-auto mb-3">
                                        <label htmlFor="">No of Patients  Assigned</label>
                                        <p className=''>{!additionalNurseDetail ? ("0") : additionalNurseDetail?.patients_incharge_of?.length} </p>
                                    </div>

                                    <section className='d-flex justify-content-between mb-2'>
                                        <h4>Assign Patient</h4>
                                        <button type='button' className='btn btn-primary rounded-0'
                                            onClick={() => {

                                                setAddPatient(true)
                                            }}
                                        >+ Add</button>
                                    </section>


                                    <table className="table container col-lg-10 assign-patient">
                                        <thead className="">
                                            <th>S/N

                                            </th>
                                            <th>Card no</th>
                                            <th>Name</th>

                                            <th>ward</th>
                                            <th>Action</th>



                                        </thead>
                                        <tbody>
                                            {addPatient && (<tr>

                                                <td> </td>
                                                <td> <input className='form-control card_no'
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

                                                    type="text" placeholder='enter card no' /></td>

                                                <td>{!foundPatient?.first_name && !foundPatient?.last_name || patientCardNo == "" ? ("N/A") : `${foundPatient?.first_name} ${foundPatient?.last_name}`}
                                                </td>
                                                <td> </td>
                                                <td> <button className='btn btn-secondary rounded-0 border-1 '
                                                    onClick={(e) => {
                                                        e.preventDefault()
                                                        handleAssignNursePatient(nurses[viewNurseIndex]?._id, foundPatient?._id)
                                                    }}
                                                > Assign</button></td>
                                            </tr>)}

                                            {
                                                additionalNurseDetail?.patients_incharge_of.length == 0 ? ("no patient assigned") :
                                                    additionalNurseDetail?.patients_incharge_of?.map((patient, i) => (
                                                        <tr key={i}>
                                                            <td> {i + 1}</td>
                                                            <td> {patient?.card_no}</td>
                                                            <td>{patient?.first_name} {patient?.last_name}</td>

                                                            <td></td>
                                                            <td className=''> <button

                                                                type='button'
                                                                onClick={() => {
                                                                    removeAssignedPatient(nurses[viewNurseIndex]?._id, patient?._id)
                                                                }}
                                                                className='delete '>
                                                                <BsFillTrashFill />
                                                            </button>

                                                            </td>

                                                        </tr>

                                                    ))
                                            }



                                        </tbody>
                                    </table>

                                    <section className='d-flex justify-content-between mb-2 mt-4'>
                                        <h4>Assign Ward</h4>
                                        <button type='button' className='btn btn-primary rounded-0'
                                            onClick={() => {

                                                setAddWard(true)
                                            }}
                                        >+ Add</button>
                                    </section>

                                    <table className="table container col-lg-10 assign-patient">
                                        <thead className="">
                                            <th>S/N</th>
                                            <th>Ward</th>
                                            <th>Shift</th>
                                            <th>Action</th>
                                        </thead>
                                        <tbody>
                                            {addWard && (<tr>

                                                <td> </td>
                                                <td><select className='form-control assign-ward'
                                                    onChange={(e) => {
                                                        setWardNo(e.target.value)
                                                    }}
                                                >
                                                    <option value="">select ward</option>
                                                    {
                                                        wards?.length == 0 ? ("No ward") : wards?.map((ward) => (
                                                            <option value={ward?._id}>{ward?.name}  ( <span className=''>{ward?.type}</span> )</option>
                                                        ))
                                                    }
                                                </select>
                                                </td>

                                                <td>{!foundPatient?.first_name && !foundPatient?.last_name || patientCardNo == "" ? ("N/A") : `${foundPatient?.first_name} ${foundPatient?.last_name}`}
                                                </td>
                                                <td> </td>
                                                <td> <button className='btn btn-secondary rounded-0 border-1 '
                                                    onClick={(e) => {
                                                        e.preventDefault()
                                                        handleAssignNurseWard(nurses[viewNurseIndex]?._id)
                                                    }}
                                                > Assign</button></td>
                                            </tr>)}

                                            {
                                                additionalNurseDetail?.ward_no.length == 0 ? ("no patient assigned") :
                                                    additionalNurseDetail?.ward_no?.map((ward, i) => (
                                                        <tr key={i}>
                                                            <td> {i + 1}</td>
                                                            <td> {ward?.name}</td>
                                                            <td>11/11/11 day shift </td>


                                                            <td className=''> <button
                                                                onClick={() => {
                                                                    removeAssignedWard(nurses[viewNurseIndex]?._id, ward?._id)
                                                                }}
                                                                className='delete ' type='button'>
                                                                <BsFillTrashFill />
                                                            </button>

                                                            </td>

                                                        </tr>

                                                    ))
                                            }



                                        </tbody>
                                    </table>











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
                </>
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

                            <li className="sidebar_btn">
                                <Link to="/nurse/management"> Management </Link>
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
                <div className='doctor_daily_info'>
                    <div className='doctors_header'>
                        <div className='present_section'>
                            <h2>Management</h2>
                        </div>
                        <div className='profile_avi_box'>
                            <div className='profile_avi'>
                                <img src={`${baseUrl}/${profileObj?.avatar}`} alt='avatar' />
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
                                                    isTableLoading == true ? (
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




                    </div>
                </div>
            </section>
        </>
    )
}

export default Management