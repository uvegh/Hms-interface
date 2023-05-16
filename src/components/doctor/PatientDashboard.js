import profile from "../../img/pexels-photo-6.jpg";
import greater_than_icon from "../../img/greater-than.svg";
import { Link } from "react-router-dom";
import Stethoscope from "../../img/stethoscope.svg";
function PatientDashboard() {
  return (
    <>
      <section className="doctor__dashboard">
        <div className="doctor_sidebar">
          <div className="links_display_box">
            <div className="clinic_name">
              <div className="organization_image">
                <img src={Stethoscope} alt="" className="logo" />
              </div>
              <div className="organization_name">
                <h2>
                  <span>Health</span>Line Clinic
                </h2>
              </div>
            </div>
            <ul className="sidebar_link_btns">
              <li className="sidebar_btn active">
                <Link to="/doctor/dashboard"> Dashboard </Link>
              </li>
              <li className="sidebar_btn">
                <Link to="/doctor/patient"> Patients </Link>
              </li>
              <li className="sidebar_btn">
                <div> Prescriptions </div>
              </li>
              <li className="sidebar_btn">
                <div> Appointments </div>
              </li>
              <li className="sidebar_btn">
                <div> Profile </div>
              </li>
              <li className="sidebar_btn">
                <div> Logout </div>
              </li>
            </ul>
          </div>
        </div>
        <div className="doctor_daily_info">
          {/* search box to look for patient */}

          {/* to show if patient is found */}
          <div className="doctors_header">
            <div className="present_section ">
              <h2 className="patient_page">Patient list</h2>
              <img
                src={greater_than_icon}
                alt="icon"
                className="patient_page"
              />
              <h2 className="patient_page">Precious Adah</h2>
            </div>
            <div className="profile_avi_box">
              <div className="profile_avi">
                <img src={profile} alt="" />
              </div>
              <div className="profile_name">
                <p className="profile_name">John Ahmed</p>
                <span className="profile_occupation">Doctor</span>
              </div>
            </div>
          </div>
          <div className="doctors_container_content patient_container_content">
            {/* <div className="patient_info_wrap">
              <div className="patient_detail_summary">
                <div className="patient_image">
                  <img src={profile} alt="" />
                </div>
                <div className="patient_name">
                  <h1>Precious Adah</h1>
                </div>
                <div className="card_no">#2332</div>
              </div>
              <div className="patient_detail_summary_contd">
                <div className="info">
                  <h3>Age</h3>
                  <p>23</p>
                </div>
                <div className="info">
                  <h3>weight</h3>
                  <p>73kg</p>
                </div>
                <div className="info">
                  <h3>B.P</h3>
                  <p>120/80</p>
                </div>
              </div>
              <div className="btns">
                <button className="add_diagnosis">add diagnosis</button>
                <button className="add_presc">add prescription</button>
              </div>
            </div> */}
            {/* Calendar setup */}
            {/* <div className="patient_details">
              <div className="patient_detail_summary_contd1">
                <div className="info">
                  <h3>Gender</h3>
                  <p>Female</p>
                </div>
                <div className="info">
                  <h3>
                    <abbr title="Date Of Birth">DOB</abbr>
                  </h3>
                  <p>10th May, 2000</p>
                </div>
                <div className="info">
                  <h3>phone number</h3>
                  <p>
                    <span>+234</span>(0)99999999
                  </p>
                </div>
              </div>
              <div className="patient_detail_summary_contd1">
                <address className="info">
                  <h3>house address</h3>
                  <p>27 American Lane, Miracle Estate, Maitama</p>
                </address>
                <address className="info">
                  <h3>city, state</h3>
                  <p>
                    Abuja,{" "}
                    <span className="state">Federal capital territory</span>
                  </p>
                </address>
                <div className="info">
                  <h3>genotype</h3>
                  <p>AA</p>
                </div>
              </div>
              <div className="patient_detail_summary_contd1">
                <div className="info  border-bottom-0 pb-0">
                  <h3>patient_status</h3>
                  <p>inpatient</p>
                </div>
                <div className="info  border-bottom-0 pb-0">
                  <h3>last consultation date</h3>
                  <p>16th mar, 2023</p>
                </div>
                <div className="info  border-bottom-0 pb-0">
                  <h3>bood group</h3>
                  <p>O+</p>
                </div>
              </div>
            </div> */}
            {/* appointment table */}
            <div className="appointment_table patient_appointment_table">
              <div className="appointment_list">
                <div className="left">
                  <p>Consultation History</p>
                </div>
                <div className="right">
                  <p>View Medical History</p>
                </div>
              </div>
              <div className="appointment_table_holder patient_appointment_table_holder">
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
      </section>
    </>
  );
}

export default PatientDashboard;
