import React from "react";
import gavologo from "../../img/gavologo.png";
import { Link } from "react-router-dom";
const Pharmacy = () => {
  return (
    <div className="pharmacy">
      <div className="doctor_sidebar">
        <div className="links_display_box">
          <div className="clinic_name">
            <div className="organization_image">
              <img src={gavologo} alt="" className="logo" />
            </div>
            <div className="organization_name">
              <h2>
                <span>Health</span>Line Clinic
              </h2>
            </div>
          </div>
          <div className="loggedIn">
            <div></div>
            <p>Phamacist name</p>
          </div>
          <ul className="sidebar_link_btns">
            <li className="sidebar_btn active">
              <Link to="/doctor/dashboard"> Prescription </Link>
            </li>
            <li className="sidebar_btn">
              <Link to="/doctor/patient"> Patients </Link>
            </li>
            <li className="sidebar_btn">
              <div> Order </div>
            </li>
            <li className="sidebar_btn">
              <div> Drugs </div>
            </li>
            <li className="sidebar_btn">
              <div> Support </div>
            </li>
            <li className="sidebar_btn">
              <div> Logout </div>
            </li>
          </ul>
        </div>
      </div>
      <div className="pharmRight">
        <div className="pharmTops">
          <div>
            <p>Awaiting Collection</p>
            <span>10</span>
            <i>Last Updated</i>
            <p>12 min ago</p>
          </div>
          <div>
          <p>Processing</p>
            <span>3</span>
            <i>Last Updated</i>
            <p>3 min ago</p>
          </div>
          <div>
          <p>Completed</p>
            <span>7</span>
            <i>Last Updated</i>
            <p>Now</p>
          </div>
        </div>
       <div className="pharmMiddle">
       <button type="btn">Filter</button>
       <input type="text" name="" value="" placeholder="search here"/>
       </div>
       <div className="pharmBottom">
        <div className="patients" onClick={()=>{
          alert("View my records")
        }}>
          <div>
            <p>ID 8921</p>
            <i>12 min ago</i>
          </div>
          <div>
            <p>Patients</p>
            <span>Maria Jones</span>
          </div>
          <div>
            <p>Doctor</p>
            <span>Stephen George</span>
          </div>
          <div>
            <p>Prescription</p>
            <span>Paracetamol</span>
          </div>
          <div>
            <p>Dosage</p>
            <span>2-1-2</span>
          </div>
          <div>
            <p>Duration</p>
            <span>3 months</span>
          </div>
        </div>
        <div className="patients">
          <div>
            <p>ID 8921</p>
            <i>12 min ago</i>
          </div>
          <div>
            <p>Patients</p>
            <span>Maria Jones</span>
          </div>
          <div>
            <p>Doctor</p>
            <span>Stephen George</span>
          </div>
          <div>
            <p>Prescription</p>
            <span>Paracetamol</span>
          </div>
          <div>
            <p>Dosage</p>
            <span>2-1-2</span>
          </div>
          <div>
            <p>Duration</p>
            <span>3 months</span>
          </div>
        </div>
        <div className="patients">
          <div>
            <p>ID 8921</p>
            <i>12 min ago</i>
          </div>
          <div>
            <p>Patients</p>
            <span>Maria Jones</span>
          </div>
          <div>
            <p>Doctor</p>
            <span>Stephen George</span>
          </div>
          <div>
            <p>Prescription</p>
            <span>Paracetamol</span>
          </div>
          <div>
            <p>Dosage</p>
            <span>2-1-2</span>
          </div>
          <div>
            <p>Duration</p>
            <span>3 months</span>
          </div>
        </div>
        <div className="patients">
          <div>
            <p>ID 8921</p>
            <i>12 min ago</i>
          </div>
          <div>
            <p>Patients</p>
            <span>Maria Jones</span>
          </div>
          <div>
            <p>Doctor</p>
            <span>Stephen George</span>
          </div>
          <div>
            <p>Prescription</p>
            <span>Paracetamol</span>
          </div>
          <div>
            <p>Dosage</p>
            <span>2-1-2</span>
          </div>
          <div>
            <p>Duration</p>
            <span>3 months</span>
          </div>
        </div>
        <div className="patients">
          <div>
            <p>ID 8921</p>
            <i>12 min ago</i>
          </div>
          <div>
            <p>Patients</p>
            <span>Maria Jones</span>
          </div>
          <div>
            <p>Doctor</p>
            <span>Stephen George</span>
          </div>
          <div>
            <p>Prescription</p>
            <span>Paracetamol</span>
          </div>
          <div>
            <p>Dosage</p>
            <span>2-1-2</span>
          </div>
          <div>
            <p>Duration</p>
            <span>3 months</span>
          </div>
        </div>
        <div className="patients">
          <div>
            <p>ID 8921</p>
            <i>12 min ago</i>
          </div>
          <div>
            <p>Patients</p>
            <span>Maria Jones</span>
          </div>
          <div>
            <p>Doctor</p>
            <span>Stephen George</span>
          </div>
          <div>
            <p>Prescription</p>
            <span>Paracetamol</span>
          </div>
          <div>
            <p>Dosage</p>
            <span>2-1-2</span>
          </div>
          <div>
            <p>Duration</p>
            <span>3 months</span>
          </div>
        </div>
        <div className="patients">
          <div>
            <p>ID 8921</p>
            <i>12 min ago</i>
          </div>
          <div>
            <p>Patients</p>
            <span>Maria Jones</span>
          </div>
          <div>
            <p>Doctor</p>
            <span>Stephen George</span>
          </div>
          <div>
            <p>Prescription</p>
            <span>Paracetamol</span>
          </div>
          <div>
            <p>Dosage</p>
            <span>2-1-2</span>
          </div>
          <div>
            <p>Duration</p>
            <span>3 months</span>
          </div>
        </div>
        <div className="patients">
          <div>
            <p>ID 8921</p>
            <i>12 min ago</i>
          </div>
          <div>
            <p>Patients</p>
            <span>Maria Jones</span>
          </div>
          <div>
            <p>Doctor</p>
            <span>Stephen George</span>
          </div>
          <div>
            <p>Prescription</p>
            <span>Paracetamol</span>
          </div>
          <div>
            <p>Dosage</p>
            <span>2-1-2</span>
          </div>
          <div>
            <p>Duration</p>
            <span>3 months</span>
          </div>
        </div>
       </div>
      </div>
    </div>
  );
};

export default Pharmacy;
