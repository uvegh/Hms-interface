import { useState } from 'react'
import profile from '../../img/pexels-photo-6.jpg'
import greater_than_icon from '../../img/greater-than.svg'
import { Link } from 'react-router-dom'
import Stethoscope from '../../img/stethoscope.svg'
import axios from 'axios'
import { differenceInYears, intlFormat } from 'date-fns'

function PatientDashboard () {
  // const baseUrl = 'https://gavohms.onrender.com'
  const [hideDisplay, setHideDisplay] = useState('patient_search_box')
  const [cardId, setCardId] = useState('')
  const [patientFound, setPatientFound] = useState('')
  const [errMsg, setErrMsg] = useState('Nothing to display')
  const handleSearch = async e => {
    e.preventDefault()

    if (!cardId) {
      setErrMsg('Wrong Input')
      return
    }
    try {
      const result = await axios.get(
        `http://localhost:3001/patient?card_no=${cardId}`
      )
      // .get(`${baseUrl}/patient?card_no=${cardId}`)
      if (result.data.data.length !== 0) {
        setErrMsg('Records found')
        setPatientFound(result.data)
        setCardId('')
        setHideDisplay('patient_search_box hidden')
      } else {
        setErrMsg('No records found')
      }
    } catch (err) {
      setErrMsg('No records found')
      setCardId('')
    }
  }

  return (
    <>
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
                <Link to='/doctor/dashboard'> Dashboard </Link>
              </li>
              <li className='sidebar_btn'>
                <Link to='/doctor/patient'> Patients </Link>
              </li>
              <li className='sidebar_btn'>
                <div> Prescriptions </div>
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
          <div className={hideDisplay}>
            <div>
              <div className='doctors_header'>
                <div className='present_section '>
                  <h2 className='patient_page'>Patient list</h2>
                </div>
                <div className='profile_avi_box'>
                  <div className='profile_avi'>
                    <img src={profile} alt='' />
                  </div>
                  <div className='profile_name'>
                    <p className='profile_name'>John Ahmed</p>
                    <span className='profile_occupation'>Doctor</span>
                  </div>
                </div>
              </div>
              {/* Search box for patient */}
              <div className='search_box'>
                <form>
                  <input
                    type='text'
                    placeholder='Search Patient by Card No'
                    value={cardId}
                    onChange={e => {
                      setCardId(e.target.value)
                    }}
                  />
                  <button type='submit' onClick={handleSearch}>
                    Search
                  </button>
                </form>
              </div>

              {/* tabble with all patient */}
              <div className='doctors_container_content ht-100'>
                <div className='d-flex align-items-center justify-content-center'>
                  <p>{errMsg}</p>
                </div>
                {/* <div className='appointment_table patient_appointment_table ht-inherit'>
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
                          <td>Precious Adah</td>
                          <td>
                            <span>#</span>2332
                          </td>
                          <td>Gynaecology</td>
                          <td>female </td>
                          <td>outpatient </td>
                        </tr>
                        <tr>
                          <td>Precious Adah</td>
                          <td>
                            <span>#</span>2332
                          </td>
                          <td>Gynaecology</td>
                          <td>female </td>
                          <td>outpatient </td>
                        </tr>
                        <tr>
                          <td>Precious Adah</td>
                          <td>
                            <span>#</span>2332
                          </td>
                          <td>Gynaecology</td>
                          <td>female </td>
                          <td>outpatient </td>
                        </tr>
                        <tr>
                          <td>Precious Adah</td>
                          <td>
                            <span>#</span>2332
                          </td>
                          <td>Gynaecology</td>
                          <td>female </td>
                          <td>outpatient </td>
                        </tr>
                        <tr>
                          <td>Precious Adah</td>
                          <td>
                            <span>#</span>2332
                          </td>
                          <td>Gynaecology</td>
                          <td>female </td>
                          <td>outpatient </td>
                        </tr>
                        <tr>
                          <td>Precious Adah</td>
                          <td>
                            <span>#</span>2332
                          </td>
                          <td>Gynaecology</td>
                          <td>female </td>
                          <td>outpatient </td>
                        </tr>
                        <tr>
                          <td>Precious Adah</td>
                          <td>
                            <span>#</span>2332
                          </td>
                          <td>Gynaecology</td>
                          <td>female </td>
                          <td>outpatient </td>
                        </tr>
                        <tr>
                          <td>Precious Adah</td>
                          <td>
                            <span>#</span>2332
                          </td>
                          <td>Gynaecology</td>
                          <td>female </td>
                          <td>outpatient </td>
                        </tr>
                        <tr>
                          <td>Precious Adah</td>
                          <td>
                            <span>#</span>2332
                          </td>
                          <td>Gynaecology</td>
                          <td>female </td>
                          <td>outpatient </td>
                        </tr>
                        <tr>
                          <td>Precious Adah</td>
                          <td>
                            <span>#</span>2332
                          </td>
                          <td>Gynaecology</td>
                          <td>female </td>
                          <td>outpatient </td>
                        </tr>
                        <tr>
                          <td>Precious Adah</td>
                          <td>
                            <span>#</span>2332
                          </td>
                          <td>Gynaecology</td>
                          <td>female </td>
                          <td>outpatient </td>
                        </tr>
                        <tr>
                          <td>Precious Adah</td>
                          <td>
                            <span>#</span>2332
                          </td>
                          <td>Gynaecology</td>
                          <td>female </td>
                          <td>outpatient </td>
                        </tr>
                        <tr>
                          <td>Precious Adah</td>
                          <td>
                            <span>#</span>2332
                          </td>
                          <td>Gynaecology</td>
                          <td>female </td>
                          <td>outpatient </td>
                        </tr>
                        <tr>
                          <td>Precious Adah</td>
                          <td>
                            <span>#</span>2332
                          </td>
                          <td>Gynaecology</td>
                          <td>female </td>
                          <td>outpatient </td>
                        </tr>
                        <tr>
                          <td>Precious Adah</td>
                          <td>
                            <span>#</span>2332
                          </td>
                          <td>Gynaecology</td>
                          <td>female </td>
                          <td>outpatient </td>
                        </tr>
                        <tr>
                          <td>Precious Adah</td>
                          <td>
                            <span>#</span>2332
                          </td>
                          <td>Gynaecology</td>
                          <td>female </td>
                          <td>outpatient </td>
                        </tr>
                        <tr>
                          <td>Precious Adah</td>
                          <td>
                            <span>#</span>2332
                          </td>
                          <td>Gynaecology</td>
                          <td>female </td>
                          <td>outpatient </td>
                        </tr>
                        <tr>
                          <td>Precious Adah</td>
                          <td>
                            <span>#</span>2332
                          </td>
                          <td>Gynaecology</td>
                          <td>female </td>
                          <td>outpatient </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div> */}
              </div>
            </div>
          </div>

          {/* to show if patient is found */}
          {patientFound.data &&
            patientFound.data.map(patient => {
              return (
                <div key={patient._id}>
                  <div className='doctors_header'>
                    <div className='present_section '>
                      <h2 className='patient_page'>Patient list</h2>
                      <img
                        src={greater_than_icon}
                        alt='icon'
                        className='patient_page'
                      />
                      <h2 className='patient_page'>
                        {patient.first_name}
                        <span> </span>
                        {patient.last_name}
                      </h2>
                    </div>
                    <div className='profile_avi_box'>
                      <div className='profile_avi'>
                        <img src={profile} alt='' />
                      </div>
                      <div className='profile_name'>
                        <p className='profile_name'>John Ahmed</p>
                        <span className='profile_occupation'>Doctor</span>
                      </div>
                    </div>
                  </div>
                  <div className='doctors_container_content patient_container_content'>
                    <div className='patient_info_wrap'>
                      <div className='patient_detail_summary'>
                        <div className='patient_image'>
                          <img src={profile} alt='' />
                        </div>
                        <div className='patient_name'>
                          <h1>
                            <span>{patient.first_name} </span>
                            <span>{patient.last_name}</span>
                          </h1>
                        </div>
                        <div className='card_no'>#{patient.card_no}</div>
                      </div>
                      <div className='patient_detail_summary_contd'>
                        <div className='info'>
                          <h3>Age</h3>
                          <p>
                            {differenceInYears(
                              new Date(),
                              new Date(patient.d_o_b)
                            )}
                          </p>
                        </div>
                        <div className='info'>
                          <h3>weight</h3>
                          {!patient.vitals ? (
                            <p>N/A</p>
                          ) : (
                            <p>{patient.vitals.weight}</p>
                          )}
                        </div>
                        <div className='info'>
                          <h3>B.P</h3>
                          {patient.vitals ? (
                            <p>{patient.vitals.blood_pressure}</p>
                          ) : (
                            <p>N/A</p>
                          )}
                        </div>
                      </div>
                      <div className='btns'>
                        <button className='add_diagnosis'>add diagnosis</button>
                        <button className='add_presc'>add prescription</button>
                      </div>
                    </div>
                    {/* Calendar setup */}
                    <div className='patient_details'>
                      <div className='patient_detail_summary_contd1'>
                        <div className='info'>
                          <h3>Gender</h3>
                          <p>{patient.gender}</p>
                        </div>
                        <div className='info'>
                          <h3>
                            <abbr title='Date Of Birth'>DOB</abbr>
                          </h3>
                          <p>
                            {intlFormat(new Date(patient.d_o_b), {
                              year: 'numeric',
                              month: 'short',
                              day: '2-digit'
                            })}
                          </p>
                        </div>
                        <div className='info'>
                          <h3>phone number</h3>
                          <p>{patient.phone}</p>
                        </div>
                      </div>
                      <div className='patient_detail_summary_contd1'>
                        <address className='info'>
                          <h3>house address</h3>
                          <p>{patient.address}</p>
                        </address>
                        <address className='info'>
                          <h3>city, state</h3>
                          <p>
                            {patient.city},
                            <span className='state'>{patient.state}</span>
                          </p>
                        </address>
                        <div className='info'>
                          <h3>blood pressure</h3>
                          {patient.vitals ? (
                            <p>{patient.vitals.blood_pressure}</p>
                          ) : (
                            <p>N/A</p>
                          )}
                        </div>
                      </div>
                      <div className='patient_detail_summary_contd1'>
                        <div className='info  border-bottom-0 pb-0'>
                          <h3>patient_status</h3>
                          <p>{patient.status}</p>
                        </div>
                        <div className='info  border-bottom-0 pb-0'>
                          <h3>last consultation date</h3>
                          <p>16th mar, 2023</p>
                        </div>
                        <div className='info  border-bottom-0 pb-0'>
                          <h3>bood group</h3>
                          {patient.vitals ? (
                            <p>{patient.vitals.blood_group}</p>
                          ) : (
                            <p>N/A</p>
                          )}
                        </div>
                      </div>
                    </div>
                    {/* appointment table */}
                    <div className='appointment_table patient_appointment_table'>
                      <div className='appointment_list'>
                        <div className='left'>
                          <p>Consultation History</p>
                        </div>
                        <div className='right'>
                          <p>View Medical History</p>
                        </div>
                      </div>
                      <div className='appointment_table_holder patient_appointment_table_holder'>
                        <table>
                          <thead>
                            <tr>
                              <th>date</th>
                              <th>consulting doctor</th>
                              <th>facility</th>
                              <th>actions</th>
                            </tr>
                          </thead>
                          <tbody>
                            <tr>
                              <td>16th Mar, 2023</td>
                              <td>Dr Vincent Egbobamien</td>
                              <td>Prime Time Hospital, Gwarinpa, Abuja</td>
                              <td>
                                <button>View Report</button>
                              </td>
                            </tr>
                            <tr>
                              <td>16th Mar, 2023</td>
                              <td>Dr Vincent Egbobamien</td>
                              <td>Cedarcrest Hospital,Apo roundabout, Abuja</td>
                              <td>
                                <button>View Report</button>
                              </td>
                            </tr>
                            <tr>
                              <td>16th Mar, 2023</td>
                              <td>Dr Vincent Egbobamien</td>
                              <td>Prime Time Hospital, Gwarinpa, Abuja</td>
                              <td>
                                <button>View Report</button>
                              </td>
                            </tr>
                            <tr>
                              <td>16th Mar, 2023</td>
                              <td>Dr Vincent Egbobamien</td>
                              <td>Prime Time Hospital, Gwarinpa, Abuja</td>
                              <td>
                                <button>View Report</button>
                              </td>
                            </tr>
                            <tr>
                              <td>16th Mar, 2023</td>
                              <td>Dr Vincent Egbobamien</td>
                              <td>Prime Time Hospital, Gwarinpa, Abuja</td>
                              <td>
                                <button>View Report</button>
                              </td>
                            </tr>
                            <tr>
                              <td>16th Mar, 2023</td>
                              <td>Dr Vincent Egbobamien</td>
                              <td>Prime Time Hospital, Gwarinpa, Abuja</td>
                              <td>
                                <button>View Report</button>
                              </td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </div>
                </div>
              )
            })}
        </div>
      </section>
    </>
  )
}

export default PatientDashboard
