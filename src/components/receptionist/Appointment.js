import profile from '../../img/pexels-photo-6.jpg'
import greater_than_icon from '../../img/greater-than.svg'
import { Link } from 'react-router-dom'
import Stethoscope from '../../img/stethoscope.svg'
import { useContext, useState } from 'react'
import { HmsContext } from '../../context/HmsContext'
import { TiTimes } from 'react-icons/ti'
import axios from 'axios'
import { AiFillPhone } from 'react-icons/ai'



function Appointment() {
    const baseUrl = "https://gavohms.onrender.com"
    const { currentEmpId } = useContext(HmsContext)
    const [addAppointment, setAddAppointment] = useState(false)
    const [isLoading, setIsloading] = useState(false);
    const [addedPatient, setAddedPatient] = useState({})
    const [foundPatientIsShown, setFoundPatientIsShown] = useState(false)
    const [foundPatient, setFoundPatient] = useState({})
    const [patientCardNo, setPatientCardNo] = useState()
    const [newPatientData, setNewPatientData] = useState({
        first_name: "",
        last_name: "",
        email: "",
        gender: "",
        phone: "",
        d_o_b: "",
        password: "1234",
        address: "",
        occupation: "",
        emergency_contact: {
            first_name: "",
            last_name: "",
            email: "",
            gender: "",
            phone: [
                ""
            ]
        }

    })
    const [validate, setValidate] = useState(false)
    const [phone, setPhone] = useState({

        phone2: ""
    })

    const handleNewPatient = async () => {
        setIsloading(true)

        if (phone.phone2 != "" || phone.phone2 != null) {
            // setIsloading(false)
            newPatientData.emergency_contact.phone.push(phone.phone2)
        }


        if (!newPatientData.first_name || !newPatientData.last_name || !newPatientData.email || !newPatientData.gender || newPatientData.phone?.length == 0 || !newPatientData.d_o_b || !newPatientData.address || !newPatientData.occupation || !newPatientData.emergency_contact.first_name || !newPatientData.emergency_contact.last_name || !newPatientData.emergency_contact.email || newPatientData.emergency_contact.phone?.length == 0) {
            console.log(newPatientData)
            setValidate(true)
            setIsloading(false)
            return
        }

        console.log(newPatientData)
        let response = await (axios.post(`${baseUrl}/register/user`, newPatientData)).catch(err => {
            setIsloading(false)
        })
        console.log(response?.data?.data);


        if (response?.status == "201") {
            setIsloading(false)
            alert("new patient added")
            setValidate(false)
            setAddAppointment(false)
            setAddedPatient(response?.data?.data)
            setPhone([""])
        }
        else {
            alert("failed to add new patient")
            setIsloading(false)
        }

    }




    const toggleaddAppointment = () => {
        setAddAppointment(current => !current)
    }

    const handleChange = (e) => {
        const { name, value } = e.target

        if (name.includes('emergency_contact.')) {
            const emergencyContactField = name.split('.')[1];
            setNewPatientData((prevData) => ({
                ...prevData,
                emergency_contact: {
                    ...prevData.emergency_contact,
                    [emergencyContactField]: value,
                }
            }))
        } else {
            setNewPatientData((prevData) => ({
                ...prevData,
                [name]: value,
            }))
        }
    }
    const handleGetPatient = async () => {
        setIsloading(true)
        console.log(patientCardNo);

        if (!patientCardNo) {
            alert("search box can not be empty")
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


    const handleAddConsultation = async () => {
        console.log(foundPatient?._id);

        if (foundPatient?._id) {
            let response = (await (axios.post(`${baseUrl}/consultation`, {

                patient_id: foundPatient?._id,

                payment_status: "notpaid",



            }))).data
            console.log(response);
        }
    }

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

            {addAppointment && (
                <div className="overlay">
                    <div className="container  add-patient-form">

                        <form className=" container  col-lg-10 col-md-10 m-auto mt-5 rounded p-5">
                            <div className="d-flex fs-3 col-12 justify-content-end">
                                <span onClick={() => {
                                    setAddAppointment(false)
                                }}> <TiTimes /> </span>
                            </div>
                            <h3> Add Appointment</h3>
                            <div className="row g-3 ">
                                <div className="col-md-6">
                                    <label htmlFor="validationDefault01" className="form-label">Appt Date</label>
                                    <input type="date"



                                        className=
                                        {validate == true && !newPatientData.first_name ? ("form-control border border-danger") : ("form-control")}
                                        id="validationDefault01" required />
                                </div>

                                <div className="col-md-6">
                                    <label htmlFor="validationDefault02" className="form-label">Appt Time </label>
                                    <input type="time"

                                        className={validate == true && !newPatientData.last_name ? ("form-control border border-danger") : ("form-control")} id="validationDefault02" required />
                                </div>



                                <div className="col-md-4">
                                    <label htmlFor="validationDefault02" className="form-label">Card no </label>
                                    <input type="number"

                                        className={validate == true && !newPatientData.last_name ? ("form-control border border-danger") : ("form-control")} id="validationDefault02" required />
                                </div>

                                <div className="col-md-4">
                                    <label htmlFor="validationDefault02" className="form-label">Card no </label>
                                    <input type="number"

                                        className={validate == true && !newPatientData.last_name ? ("form-control border border-danger") : ("form-control")} id="validationDefault02" required />
                                </div>

                                <div className="col-md-4">
                                    <label htmlFor="validationDefault02" className="form-label">Card no </label>
                                    <input type="number"

                                        className={validate == true && !newPatientData.last_name ? ("form-control border border-danger") : ("form-control")} id="validationDefault02" required />
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

                                                onClick={handleNewPatient}
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

            {foundPatientIsShown && (<div className="overlay">
                <div className="container  add-patient-form">
                    {
                        foundPatient ? (
                            <div className=" container found-patient-details  col-lg-10 col-md-10 m-auto mt-1 rounded p-5">
                                <div className="d-flex fs-3 col-12 justify-content-end">
                                    <span onClick={() => {
                                        setFoundPatientIsShown(false)
                                    }}> <TiTimes /> </span>
                                </div>
                                <h3 className='text-center'>PATIENT FOUND</h3>
                                <div className="row g-3 ">
                                    <div className="col-md-8">
                                        <label htmlFor='' className="form-label">NAME</label>
                                        <p className='bg-white rounded p-2 ' style={{ textTransform: 'uppercase' }}>{foundPatient?.first_name} {foundPatient?.last_name} </p>
                                    </div>

                                    <div className="col-md-4">
                                        <label htmlFor='' className="form-label">Card_no</label>
                                        <p className='bg-white rounded p-2' style={{ textTransform: 'uppercase' }}>{foundPatient?.card_no}</p>
                                    </div>

                                    <div className="col-md-4">
                                        <label htmlFor='' className="form-label">STATUS</label>
                                        <p className='bg-white rounded p-2 ' style={{ textTransform: 'uppercase' }}>{foundPatient?.status}</p>
                                    </div>

                                    <div className="col-md-4">
                                        <label htmlFor='' className="form-label">GENDER</label>
                                        <p className='bg-white rounded p-2 ' style={{ textTransform: 'uppercase' }}>{foundPatient?.gender}</p>
                                    </div>

                                    <div className="col-md-4">
                                        <label htmlFor='' className="form-label">PHONE</label>
                                        <p className='bg-white rounded p-2 ' style={{ textTransform: 'uppercase' }}>{foundPatient?.phone}</p>
                                    </div>

                                    <div className="col-md-4">
                                        <label htmlFor='' className="form-label">EMAIL</label>
                                        <p className='bg-white rounded p-2 '>{foundPatient?.email}</p>
                                    </div>
                                    {/* if inpatient show ward */}
                                    <div className="col-md-4">
                                        <label htmlFor='' className="form-label">WARD/ROOM</label>
                                        {!foundPatient?.ward ? (<p className='bg-white rounded p-2'> NONE</p>) : (
                                            <p className=' '>{foundPatient?.ward} </p>
                                        )}
                                    </div>


                                    <h3>EMERGENCY CONTACT</h3>

                                    <div className="col-md-4">
                                        <label htmlFor='' className="form-label">NAME</label>
                                        <p className='bg-white rounded p-2 ' style={{ textTransform: 'uppercase' }}>{foundPatient?.emergency_contact?.first_name} {!foundPatient?.emergency_contact?.last_name ? ("NONE") : foundPatient?.emergency_contact?.last_name} </p>
                                    </div>

                                    {foundPatient?.emergency_contact?.phone?.length == "0" ? (<>
                                        <div className="col-md-4">
                                            <label htmlFor='' className="form-label ">PHONE</label>
                                            <p className='bg-white rounded p-2 ' >
                                                NONE
                                            </p>
                                        </div>

                                    </>) : foundPatient?.emergency_contact?.phone.map((phone, i) => (
                                        <div className="col-md-4">
                                            <label htmlFor='' className="form-label ">PHONE{i + 1}</label>
                                            <p className='bg-white rounded p-2 ' >
                                                {phone}
                                            </p>
                                        </div>
                                    ))}


                                    <div className="col-md-4">
                                        <label htmlFor='' className="form-label">EMAIL</label>
                                        <p className='bg-white rounded p-2 '>{foundPatient?.emergency_contact?.email ? (foundPatient?.emergency_contact?.email) : ("NONE")}</p>
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
                                                <button type="button" className="btn btn-primary border-0 col-7 mt-3 fs-5" style={{ backgroundColor: "#2B415C" }}

                                                    onClick={handleAddConsultation}
                                                >Add Consultation
                                                </button>

                                            </>)

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
                                <Link to='/receptionist/dashboard'> Dashboard </Link>
                            </li>



                            <li className='sidebar_btn'>
                                <Link to='/receptionist/profile'> Profile </Link>
                            </li>
                            <li className='sidebar_btn'>
                                <div> Logout </div>
                            </li>
                        </ul>
                    </div>
                </div>
                <div className='doctor_daily_info'>
                    {/* search box to look for patient */}
                    <div className='patient_search_box'>
                        <div>
                            <div className='doctors_header'>
                                <div className='present_section d-block  '>
                                    <h2 className='patient_page'>Appointments</h2>
                                    <button className="btn btn-primary border-0 col-12 mt-2" style={{ backgroundColor: "#2B415C" }}
                                        onClick={toggleaddAppointment}
                                    > + Add Appt</button>
                                </div>

                                <div className='profile_avi_box'>
                                    <div className='profile_avi'>
                                        <img src={`${baseUrl}/${currentEmpId?.avatar}`} alt='' />
                                    </div>
                                    <div className='profile_name'>
                                        <p className='profile_name'>{` ${currentEmpId?.first_name} ${currentEmpId?.last_name}`} </p>
                                        <span className='profile_occupation'>Receptionist</span>
                                    </div>
                                </div>
                            </div>



                            <div className='organization_name text-center fs-1 mt-5 pt-5'>
                                <h1>
                                    <span >Health</span>Line Clinic
                                </h1>
                            </div>
                            {/* Search box for patient */}
                            <div className='search_box position-absolute m-auto ' style={{ left: "44%" }} >

                                <form action=''>
                                    <input type='text'
                                        onChange={(e) => {
                                            setPatientCardNo(e.target.value
                                            )

                                        }}

                                        placeholder='Search Patient by Card No' className='p-3' />
                                    <button type='button'
                                        onClick={handleGetPatient}
                                        className='p-3'>Search</button>
                                </form>
                            </div>


                        </div>


                    </div>

                    <div className='doctors_container_content  mt-5'>

                        <div className='appointment_table patient_appointment_table ht-inherit mt-5'>
                            <div className=' appointment_table_holder patient_appointment_table_holder '>
                                <h5>Recently added</h5>
                                <table>
                                    <thead>
                                        <tr>
                                            <th>Patient name</th>
                                            <th>Card no</th>
                                            <th>Gender</th>
                                            <th>Consultant</th>
                                            <th>Date</th>


                                            <th>Actions</th>

                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td>{addedPatient?.first_name} {addedPatient?.first_name} </td>
                                            <td>
                                                <span>#</span>{addedPatient?.card_no}
                                            </td>
                                            <td>{addedPatient?.d_o_b} </td>
                                            <td>{addedPatient?.gender} </td>
                                            <td>{!addedPatient?.status ? ("outpatient") : (

                                                <p> {!addedPatient?.status}</p>
                                            )} </td>
                                            <td>{addedPatient?.gender} </td>
                                        </tr>


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

export default Appointment