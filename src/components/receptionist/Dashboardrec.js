import profile from '../../img/pexels-photo-6.jpg'
import greater_than_icon from '../../img/greater-than.svg'
import { Link, useNavigate } from 'react-router-dom'
import Stethoscope from '../../img/stethoscope.svg'
import { useContext, useEffect, useState } from 'react'
import { HmsContext } from '../../context/HmsContext'
import { TiTimes } from 'react-icons/ti'
import axios from 'axios'
import { AiFillPhone } from 'react-icons/ai'
import { ToastContainer } from 'react-toastify'





function DashboardRec() {
  const baseUrl = "https://gavohms.onrender.com"
  const { currentEmpId, showLoggedInNotification, customAlertNotify, customAlertWarning, setIsLoggedIn } = useContext(HmsContext)
  const [addPatient, setAddPatient] = useState(false)
  const [isLoading, setIsloading] = useState(false);
  const [addedPatient, setAddedPatient] = useState({})
  const [foundPatientIsShown, setFoundPatientIsShown] = useState(false)
  const [viewAddedPatient, setViewAddedPatient] = useState(false)
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
    vitals: {
      blood_group: ""

    },
    emergency_contact: {
      first_name: "",
      last_name: "",
      email: "",
      gender: "",
      phone: [
        ""
      ]
    },

  })
  const [validate, setValidate] = useState(false)
  const navigate = useNavigate()
  const [phone, setPhone] = useState({

    phone2: ""
  })

  const handleNewPatient = async () => {
    setIsloading(true)

    if (phone.phone2 != "" || phone.phone2 != null) {
      // setIsloading(false)
      newPatientData.emergency_contact.phone.push(phone.phone2)
    }


    if (!newPatientData.first_name || !newPatientData.last_name || !newPatientData.email || !newPatientData.gender || newPatientData.phone?.length == 0 || !newPatientData.d_o_b || !newPatientData.address || !newPatientData.occupation || !newPatientData.vitals.blood_group || !newPatientData.emergency_contact.first_name || !newPatientData.emergency_contact.last_name || !newPatientData.emergency_contact.email || newPatientData.emergency_contact.phone?.length == 0) {
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
      setAddPatient(false)
      setAddedPatient(response?.data?.data)
      setPhone([""])
    }
    else {
      alert("failed to add new patient")
      setIsloading(false)
    }

  }




  const toggleAddPatient = () => {
    setAddPatient(current => !current)
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    if (name.includes('vitals.')) {
      const vitalsField = name.split('.')[1];
      setNewPatientData((prevData) => ({
        ...prevData,
        vitals: {
          ...prevData.vitals,
          [vitalsField]: value,
        }
      }))

    } else


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
      if (response?.code == "200") {
        setFoundPatientIsShown(false)

        setTimeout(() => {
          customAlertNotify("Consultation added")
        }, 1000)
        customAlertNotify("Consultation added")
        return
      }
      setFoundPatientIsShown(false)
      setTimeout(() => {
        customAlertWarning("failed to add consultation")
      }, 1000)

    }
  }

  useEffect(() => {
    showLoggedInNotification()
  }, [])
  return (
    <>
      <ToastContainer />

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

      {addPatient && (
        <div className="overlay">
          <div className="container  add-patient-form">

            <form className=" container  col-lg-10 col-md-10 m-auto mt-5 rounded p-5">
              <div className="d-flex fs-3 col-12 justify-content-end">
                <span onClick={() => {
                  setAddPatient(false)
                }}> <TiTimes /> </span>
              </div>
              <h3>PATIENT FORM</h3>
              <div className="row g-3 ">
                <div className="col-md-4">
                  <label htmlFor="validationDefault01" className="form-label">First name</label>
                  <input type="text"
                    name='first_name'
                    value={newPatientData.first_name}
                    onChange={handleChange}

                    className=
                    {validate == true && !newPatientData.first_name ? ("form-control border border-danger") : ("form-control")}
                    id="validationDefault01" required />
                </div>

                <div className="col-md-4">
                  <label htmlFor="validationDefault02" className="form-label">Last name</label>
                  <input type="text"
                    name='last_name'
                    onChange={handleChange}
                    value={newPatientData.last_name}
                    className={validate == true && !newPatientData.last_name ? ("form-control border border-danger") : ("form-control")} id="validationDefault02" required />
                </div>

                <div className="col-md-4">
                  <label htmlFor="validationDefaultUsername" className="form-label">Email</label>
                  <div className="input-group">

                    <input type="email"
                      onChange={handleChange}
                      className={validate == true && !newPatientData.email ? ("form-control border border-danger") : ("form-control")}
                      name='email'
                      value={newPatientData.email}
                      aria-describedby="inputGroupPrepend2" required />
                  </div>
                </div>

                <div className="col-md-6">
                  <label htmlFor="validationDefault03" className="form-label">Address</label>
                  <input type="text"
                    name='address'
                    onChange={handleChange}
                    className={validate == true && !newPatientData.address ? ("form-control border border-danger") : ("form-control")}
                    value={newPatientData.address}
                    id="validationDefault03" required />
                </div>

                <div className="col-md-3">
                  <label htmlFor="validationDefault04" className="form-label">Gender</label>
                  <select className={validate == true && !newPatientData.gender ? ("form-control border border-danger") : ("form-control")}
                    onChange={handleChange}
                    name='gender'
                    value={newPatientData.gender}
                    id="validationDefault04" required>
                    <option selected disabled value="">Choose...</option>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                  </select>
                </div>
                <div className="col-md-3">
                  <label htmlFor="validationDefault05" className="form-label">Phone</label>
                  <input type="tel"
                    onChange={handleChange}
                    name='phone'
                    value={newPatientData.phone}
                    className={validate == true && !newPatientData.phone ? ("form-control border border-danger") : ("form-control")} id="validationDefault05" placeholder='000-000-000' required />
                </div>

                <div className="col-md-3">
                  <label htmlFor="validationDefault05" className="form-label">Occupation</label>
                  <input type="text"
                    onChange={handleChange}
                    name='occupation'
                    value={newPatientData.occupation}
                    className={validate == true && !newPatientData.occupation ? ("form-control border border-danger") : ("form-control")} id="validationDefault05" placeholder='' required />
                </div>

                <div className="col-md-3">
                  <label htmlFor="validationDefault05" className="form-label">Date of Birth</label>
                  <input type="date"
                    onChange={handleChange}
                    name='d_o_b'
                    value={newPatientData.d_o_b}
                    className={validate == true && !newPatientData.d_o_b ? ("form-control border border-danger") : ("form-control")} id="validationDefault05" placeholder='d_o_b' required />
                </div>
                <div className="col-md-2">
                  <label htmlFor="validationDefault05" className="form-label">Blood Group</label>

                  <select

                    name='vitals.blood_group'
                    value={newPatientData.vitals.blood_group}
                    onChange={handleChange}
                    className={validate == true && !newPatientData.vitals.blood_group ? ("form-control border border-danger") : ("form-control")} id="validationDefault05" placeholder='d_o_b' required >
                    <option value="A+"> A+ </option>
                    <option value="A-"> A- </option>
                    <option value="B+"> B+ </option>
                    <option value="B-"> B- </option>
                    <option value="AB+"> AB+ </option>
                    <option value="AB-"> AB- </option>
                    <option value="O+"> O+ </option>
                    <option value="O-"> O- </option>

                  </select>
                </div>


                <h3>EMERGENCY CONTACT</h3>

                <div className="col-md-3">
                  <label htmlFor="validationDefault01"

                    className="form-label">First name</label>
                  <input type="text"

                    onChange={handleChange}
                    value={newPatientData.emergency_contact.first_name}
                    name='emergency_contact.first_name'
                    className="form-control" id="validationDefault01" required />
                </div>

                <div className="col-md-3">
                  <label htmlFor="validationDefault02" className="form-label">Last name</label>
                  <input type="text"
                    value={newPatientData.emergency_contact.last_name}
                    name='emergency_contact.last_name'
                    onChange={handleChange}
                    className="form-control" id="validationDefault02" required />
                </div>


                <div className="col-md-3">
                  <label htmlFor="validationDefaultUsername" className="form-label">Email</label>


                  <input type="email"
                    onChange={handleChange}
                    className="form-control"
                    value={newPatientData.emergency_contact.email}
                    name='emergency_contact.email'

                    aria-describedby="inputGroupPrepend2" required />

                </div>

                <div className="col-md-3">
                  <label htmlFor="validationDefault05" className="form-label">Phone</label>
                  <input type="tel"

                    className="form-control"
                    onChange={(e) => {
                      setPhone({ ...phone, phone2: e.target.value })
                    }}
                    value={phone.phone2}
                    name='emergency_contact.phone'
                    placeholder='000-000-000' id="validationDefault05" required />
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

      {viewAddedPatient && (
        <div className="overlay">
          <div className="container  add-patient-form">

            <form className=" container  col-lg-10 col-md-10 m-auto mt-5 rounded p-5 recently-added-receptionist-view">
              <div className="d-flex fs-3 col-12 justify-content-end">
                <span onClick={() => {
                  setViewAddedPatient(false)
                }}> <TiTimes /> </span>
              </div>
              <h3>PATIENT FORM</h3>
              <div className="row g-3 ">
                <div className="col-md-4">
                  <label htmlFor="validationDefault01" className="form-label">First name</label>
                  <p>{addedPatient?.first_name}</p>
                </div>

                <div className="col-md-4">
                  <label htmlFor="validationDefault02" className="form-label">Last name</label>
                  <p>{addedPatient?.last_name}</p>
                </div>

                <div className="col-md-4">
                  <label htmlFor="validationDefaultUsername" className="form-label">Email</label>
                  <div className="input-group">

                    <p>{addedPatient?.email}</p>
                  </div>
                </div>

                <div className="col-md-6">
                  <label htmlFor="validationDefault03" className="form-label">Address</label>
                  <p><p>{addedPatient?.address}</p></p>
                </div>

                <div className="col-md-3">
                  <label htmlFor="validationDefault04" className="form-label">Gender</label>
                  <p>{addedPatient?.gender}</p>
                </div>
                <div className="col-md-3">
                  <label htmlFor="validationDefault05" className="form-label">Phone</label>
                  <p>{addedPatient?.phone}</p>
                </div>

                <div className="col-md-3">
                  <label htmlFor="validationDefault05" className="form-label">Occupation</label>
                  <p>{addedPatient?.occupation}</p>
                </div>

                <div className="col-md-3">
                  <label htmlFor="validationDefault05" className="form-label">Date of Birth</label>
                  <p>{addedPatient?.d_o_b?.substring(0, 10)}</p>
                </div>
                <div className="col-md-2">
                  <label htmlFor="validationDefault05" className="form-label">Blood Group</label>
                  <p>{addedPatient?.vitals?.blood_group}</p>
                </div>


                <h3>EMERGENCY CONTACT</h3>

                <div className="col-md-3">
                  <p>{addedPatient?.emergency_contact?.first_name}</p>
                </div>

                <div className="col-md-3">
                  <p>{addedPatient?.emergency_contact?.last_name}</p>
                </div>


                <div className="col-md-3">
                  <label htmlFor="validationDefaultUsername" className="form-label">Email</label>


                  <p>{addedPatient?.emergency_contact?.email}</p>

                </div>




                {addedPatient?.emergency_contact?.phone.map((phone, i) => (
                  <div className="col-md-3" key={i}>
                    <label htmlFor="validationDefault05" className="form-label">{phone}</label>
                    <p>phone</p>
                  </div>
                ))}


                {/* <div className="col-12 text-center">
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

                </div> */}
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
              <div className=" container found-patient-details  col-lg-10 col-md-10 m-auto mt-1 rounded ">
                <div className="d-flex fs-3 col-12 justify-content-end">
                  <span onClick={() => {
                    setFoundPatientIsShown(false)
                  }}> <TiTimes /> </span>
                </div>
                <h3 className='text-center'>PATIENT FOUND</h3>
                <div className="row g-3 col-lg-10 col-md-10 col-sm-11 m-auto  ">
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
                    {!foundPatient?.ward ? (<p className='bg-white rounded p-2'> N/A</p>) : (
                      <p className=' '>{foundPatient?.ward} </p>
                    )}
                  </div>


                  <h3>EMERGENCY CONTACT</h3>

                  <div className="col-md-4">
                    <label htmlFor='' className="form-label">NAME</label>
                    <p className='bg-white rounded p-2 ' style={{ textTransform: 'uppercase' }}>{foundPatient?.emergency_contact?.first_name} {!foundPatient?.emergency_contact?.last_name ? ("N/A") : foundPatient?.emergency_contact?.last_name} </p>
                  </div>

                  {foundPatient?.emergency_contact?.phone?.length == "0" ? (<>
                    <div className="col-md-4">
                      <label htmlFor='' className="form-label ">PHONE</label>
                      <p className='bg-white rounded p-2 ' >
                        N/A
                      </p>
                    </div>

                  </>) : foundPatient?.emergency_contact?.phone.map((phone, i) => (
                    <div className="col-md-4">
                      <label htmlFor='' className="form-label ">PHONE{i + 1}</label>
                      <p className='bg-white rounded p-2 ' >
                        {!phone ? ("N/A") : phone}
                      </p>
                    </div>
                  ))}


                  <div className="col-md-4">
                    <label htmlFor='' className="form-label">EMAIL</label>
                    <p className='bg-white rounded p-2 '>{foundPatient?.emergency_contact?.email ? (foundPatient?.emergency_contact?.email) : ("N/A")}</p>
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
              <li className="sidebar_btn">
                <Link to="/receptionist/appointment"> Appointment </Link>
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
          {/* search box to look for patient */}
          <div className='patient_search_box'>
            <div>
              <div className='doctors_header'>
                <div className='present_section d-block  '>
                  <h2 className='patient_page'>Dashboard</h2>
                  <button className="btn btn-primary border-0 col-12 mt-2" style={{ backgroundColor: "#2B415C" }}
                    onClick={toggleAddPatient}
                  > + Add</button>
                </div>


              </div>



              <div className='organization_name text-center fs-1 mt-5 pt-5'>
                <h1>
                  <span >Health</span>Line Clinic
                </h1>
              </div>
              {/* Search box for patient */}
              <div className='search_box position-absolute m-auto ' style={{ left: "44%" }} >

                <form onSubmit={handleGetPatient} >
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
                      <th>card no</th>
                      <th>Date of Birth</th>
                      <th>gender</th>
                      <th>status</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td><img className='rounded-circle user-icon' src={`${baseUrl}/${addedPatient?.avatar}`} alt="" />  {addedPatient?.first_name} {addedPatient?.last_name} </td>
                      <td>
                        {addedPatient?.card_no ? `#${addedPatient?.card_no}` : addedPatient?.card_no}
                      </td>
                      <td>{addedPatient?.d_o_b?.substring(0, 10)} </td>
                      <td>{addedPatient?.gender} </td>
                      <td>{!addedPatient?.status ? ("") :

                        addedPatient?.status
                      } </td>
                      {
                        addedPatient?.first_name ? (<td className='text-decoration-underline'
                          onClick={() => {
                            setViewAddedPatient(true)
                          }}
                        > view</td>) : (
                          <td className='text-decoration-underline'

                          > </td>

                        )
                      }

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

export default DashboardRec