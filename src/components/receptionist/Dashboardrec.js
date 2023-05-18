import profile from '../../img/pexels-photo-6.jpg'
import greater_than_icon from '../../img/greater-than.svg'
import { Link } from 'react-router-dom'
import Stethoscope from '../../img/stethoscope.svg'
import { useContext, useState } from 'react'
import { HmsContext } from '../../context/HmsContext'
import { TiTimes } from 'react-icons/ti'
import axios from 'axios'

function DashboardRec() {
  const baseUrl = "https://gavohms.onrender.com"
  const { currentEmpId } = useContext(HmsContext)
  const [addPatient, setAddPatient] = useState(false)
  const [isLoading, setIsloading] = useState(false);
  const [addedPatient, setAddedPatient] = useState({})
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

  return (
    <>



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
                  <label for="validationDefault01" className="form-label">First name</label>
                  <input type="text"
                    name='first_name'
                    value={newPatientData.first_name}
                    onChange={handleChange}

                    className=
                    {validate == true && !newPatientData.first_name ? ("form-control border border-danger") : ("form-control")}
                    id="validationDefault01" required />
                </div>

                <div className="col-md-4">
                  <label for="validationDefault02" className="form-label">Last name</label>
                  <input type="text"
                    name='last_name'
                    onChange={handleChange}
                    value={newPatientData.last_name}
                    className={validate == true && !newPatientData.last_name ? ("form-control border border-danger") : ("form-control")} id="validationDefault02" required />
                </div>

                <div className="col-md-4">
                  <label for="validationDefaultUsername" className="form-label">Email</label>
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
                  <label for="validationDefault03" className="form-label">Address</label>
                  <input type="text"
                    name='address'
                    onChange={handleChange}
                    className={validate == true && !newPatientData.address ? ("form-control border border-danger") : ("form-control")}
                    value={newPatientData.address}
                    id="validationDefault03" required />
                </div>

                <div className="col-md-3">
                  <label for="validationDefault04" className="form-label">Gender</label>
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
                  <label for="validationDefault05" className="form-label">Phone</label>
                  <input type="tel"
                    onChange={handleChange}
                    name='phone'
                    value={newPatientData.phone}
                    className={validate == true && !newPatientData.phone ? ("form-control border border-danger") : ("form-control")} id="validationDefault05" placeholder='000-000-000' required />
                </div>

                <div className="col-md-3">
                  <label for="validationDefault05" className="form-label">Occupation</label>
                  <input type="text"
                    onChange={handleChange}
                    name='occupation'
                    value={newPatientData.occupation}
                    className={validate == true && !newPatientData.occupation ? ("form-control border border-danger") : ("form-control")} id="validationDefault05" placeholder='' required />
                </div>

                <div className="col-md-3">
                  <label for="validationDefault05" className="form-label">Date of Birth</label>
                  <input type="date"
                    onChange={handleChange}
                    name='d_o_b'
                    value={newPatientData.d_o_b}
                    className={validate == true && !newPatientData.d_o_b ? ("form-control border border-danger") : ("form-control")} id="validationDefault05" placeholder='d_o_b' required />
                </div>

                <h3>EMERGENCY CONTACT</h3>

                <div className="col-md-3">
                  <label for="validationDefault01"

                    className="form-label">First name</label>
                  <input type="text"

                    onChange={handleChange}
                    value={newPatientData.emergency_contact.first_name}
                    name='emergency_contact.first_name'
                    className="form-control" id="validationDefault01" required />
                </div>

                <div className="col-md-3">
                  <label for="validationDefault02" className="form-label">Last name</label>
                  <input type="text"
                    value={newPatientData.emergency_contact.last_name}
                    name='emergency_contact.last_name'
                    onChange={handleChange}
                    className="form-control" id="validationDefault02" required />
                </div>


                <div className="col-md-3">
                  <label for="validationDefaultUsername" className="form-label">Email</label>


                  <input type="email"
                    onChange={handleChange}
                    className="form-control"
                    value={newPatientData.emergency_contact.email}
                    name='emergency_contact.email'

                    aria-describedby="inputGroupPrepend2" required />

                </div>

                <div className="col-md-3">
                  <label for="validationDefault05" className="form-label">Phone</label>
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
                      <button type="button" className="btn btn-primary border-0 col-7 mt-3 fs-5" style={{ backgroundColor: "#2B415C" }}

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
                <Link to='/receptionist/patient'> Patients </Link>
              </li>

              <li className='sidebar_btn'>
                <div> Appointments </div>
              </li>
              <li className='sidebar_btn'>
                <div> Profile </div>
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
                  <h2 className='patient_page'>Dashboard</h2>
                  <button className="btn btn-primary border-0 col-12 mt-2" style={{ backgroundColor: "#2B415C" }}
                    onClick={toggleAddPatient}
                  > + Add</button>
                </div>

                <div className='profile_avi_box'>
                  <div className='profile_avi'>
                    <img src={profile} alt='' />
                  </div>
                  <div className='profile_name'>
                    <p className='profile_name'>{` ${currentEmpId?.first_name} ${currentEmpId?.last_name}`} </p>
                    <span className='profile_occupation'>Receptionist</span>
                  </div>
                </div>
              </div>
              {/* Search box for patient */}
              <div className='organization_name text-center fs-1 mt-5 pt-5'>
                <h1>
                  <span >Health</span>Line Clinic
                </h1>
              </div>

              <div className='search_box position-absolute m-auto ' style={{ left: "50%" }} >

                <form action=''>
                  <input type='text' placeholder='Search Patient by Card No' className='p-3' />
                  <button type='submit' className='p-3'>Search</button>
                </form>
              </div>

              {/* tabble with all patient */}

            </div>


          </div>

          <div className='doctors_container_content  mt-5'>
            <div className='appointment_table patient_appointment_table ht-inherit mt-5'>
              <div className=' appointment_table_holder patient_appointment_table_holder '>
                <table>
                  <thead>
                    <tr>
                      <th>Patient name</th>
                      <th>card no</th>
                      <th>unit</th>
                      <th>gender</th>
                      <th>status</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>{addedPatient?.first_name} {addedPatient?.first_name} </td>
                      <td>
                        <span>#</span>{addedPatient?.card_no}
                      </td>
                      <td>Gynaecology</td>
                      <td>{addedPatient?.gender} </td>
                      <td>{!addedPatient?.status ? ("outpatient") : (

                        <p> {!addedPatient?.status}</p>
                      )} </td>
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