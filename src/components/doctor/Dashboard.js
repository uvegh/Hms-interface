import React, { useContext, useEffect } from 'react'
import { BsFileEarmarkMedical } from 'react-icons/bs'
import { FiUser } from 'react-icons/fi'
import { TbPrescription, TbCalendarEvent } from 'react-icons/tb'
import Calender from 'react-calendar'
import Stethoscope from '../../img/stethoscope.svg'
import profile from '../../img/pexels-photo-6.jpg'
import { Link } from "react-router-dom";
import axios from 'axios'
import { HmsContext } from '../../context/HmsContext'

function Dashboard() {
  const { currentEmpId, handleGetDiagnosis, diagnosis, setDiagnosis, handleGetAppointment, appointments, prescriptionsDeployed, getPrescriptionsDeployed, isLoggedIn } = useContext(HmsContext)
  const baseUrl = 'https://gavohms.onrender.com'


  useEffect(() => {
    handleGetDiagnosis()
    handleGetAppointment()
    getPrescriptionsDeployed()
  }, [])


  const handleRescheduleAppointment = async (appointment) => {
    if (appointment?.status != "rescheduled") {
      let response = (await axios.put(`${baseUrl}/appointment/${appointment?._id}`, { status: "rescheduled" })).data
      console.log(response);
      if (response.code == "200") {
        alert('appointment rescheduled');
        handleGetAppointment()
        return
      }
      alert("failed to reschedule")
    }
  }
  const handleDeleteAppointment = async (id) => {
    let response = (await axios.delete(`${baseUrl}/appointment/${id}`)).data
    console.log(response);
    if (response.code == "200") {
      alert("appointment deleted")
      handleGetAppointment()
      return
    }
    alert("failed to delete")
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

                <Link to="/doctor/dashboard"> Dashboard </Link>

              </li>
              <li className='sidebar_btn'>
                <Link to="/doctor/patient"> Patients </Link>
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
                <span className='profile_occupation'>Doctor</span>
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
                  <p>This week</p>
                </div>
              </div>
              <div className='tab '>
                <BsFileEarmarkMedical className='icons' />
                <p className='counts'>{diagnosis?.length}</p>
                <p>Diagnosis given</p>
              </div>
              <div className='tab'>
                <FiUser className='icons' />
                <p className='counts'>3</p>
                <p>Consultation completed</p>
              </div>
              <div className='tab'>
                <TbCalendarEvent className='icons' />
                <p className='counts'>{appointments?.length}</p>
                <p>Appointments</p>
              </div>
              <div className='tab'>
                <TbPrescription className='icons' />
                <p className='counts'>{prescriptionsDeployed?.length}</p>
                <p>Prescriptions deployed</p>
              </div>
            </div>
            {/* Calendar setup */}
            <div className='calender'>
              <Calender />
            </div>
            {/* appointment table */}
            <div className='appointment_table'>
              <div className='appointment_list'>
                <div className='left'>
                  <p>Appointment List</p>
                </div>
                <div className='right'>
                  <p>See more</p>
                </div>
              </div>
              <div className='appointment_table_holder'>
                <table>
                  <thead>
                    <tr>
                      <th>S/N</th>
                      <th>time</th>
                      <th>date</th>
                      <th>name</th>
                      <th>patient ID</th>
                      <th>actions</th>
                    </tr>
                  </thead>
                  <tbody>

                    {appointments?.length === 0 ? (<p>no appointment</p>) : (
                      appointments.map((appointment, i) => (
                        <tr>
                          <td>{i + 1}</td>
                          <td>9:30Am</td>
                          <td>11/05/2023</td>
                          <td>{appointment?.first_name} {appointment?.last_name} </td>
                          <td>{appointment?.card_no}</td>
                          <td>

                            {
                              appointment?.status == "rescheduled" ? (
                                <button
                                  onClick={() => { handleRescheduleAppointment(appointment?._id) }}
                                >Reschedule</button>
                              ) : (
                                <button className="bg-danger"
                                  onClick={() => { handleRescheduleAppointment(appointment?._id) }}
                                >Rescheduled</button>
                              )
  
                    <tr>
                       <td>{i+1}</td>
                      <td>9:30Am</td>
                      <td>11/05/2023</td>
                      <td>{appointment?.first_name} {appointment?.last_name} </td>
                      <td>{appointment?.card_no}</td>
                      <td>
                        
                        {
                          appointments?.status=="rescheduled"?(
                            <button
                        onClick={()=>{handleRescheduleAppointment(appointment?._id)}}
                        >Reschedule</button>
                          ):(
                            <button className="bg-danger"
                        onClick={()=>{handleRescheduleAppointment(appointment?._id)}}
                        >Rescheduled</button>
                          )
                        }
                       
                        <button
                        onClick={()=>{
                          handleDeleteAppointment(appointment?._id)
                        }}
                        >Delete</button>
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

export default Dashboard
