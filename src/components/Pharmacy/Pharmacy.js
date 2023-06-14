import React, { useEffect } from "react";
import gavologo from "../../img/gavologo.png";
import { Link } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import { format } from "date-fns";
import Dispense from "./Dispense";
import { TbRuler } from "react-icons/tb";
import { HmsContext } from "../../context/HmsContext";
import { useContext } from "react";
const Pharmacy = () => {
  const baseUrl = "https://gavohms.onrender.com";
  const testUrl = "http://localhost:3001";

  const [Prescription, setPrescription] = useState("");
  const [patientPres, setPatientPres] = useState();
  const [dispenser, setDispenser] = useState(false);
  const [patientID, setPatientID] = useState();
  const {PharmacistId} = useContext(HmsContext);
  console.log(PharmacistId)

  const getPrescription = async () => {
    if (!Prescription) return alert("Enter Patients Card Number");
    let response = (
      await axios.get(`${testUrl}/prescription?card_no=${Prescription}`)
    ).data;
    setPatientPres(response.data);
  };

  
  const handlePrescription = () => {
    console.log("handled");
  };

  
  return (
    <div>
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
             {PharmacistId ? (
               <p>{PharmacistId.first_name} {PharmacistId.last_name}</p>
             ):( <p>Phamacist name</p>)}
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
            <button type="btn" onClick={getPrescription}>
              Filter
            </button>
            <input
              type="text"
              name=""
              value={Prescription}
              placeholder="search here"
              onChange={(e) => setPrescription(e.target.value)}
            />
          </div>
          <div className="pharmBottom">
            {patientPres ? (
              patientPres.map((Prescription) => (
                <div
                  className="patients"
                  key={Prescription._id}
                  onClick={() => {
                    // console.log(Prescription._id)
                    setDispenser(true);
                    setPatientID(Prescription._id);
                  }}
                >
                  <div>
                    <p>ID {Prescription.card_no}</p>
                    <i>
                      {format(
                        new Date(Prescription.date_of_diagnosis),
                        "d 'min' 'ago'"
                      )}
                    </i>
                  </div>
                  <div>
                    <p>Patients</p>
                    <span>{Prescription.patient_id.first_name}</span>
                  </div>
                  <div>
                    <p>Doctor</p>
                    <span>{Prescription.doctor_id.first_name}</span>
                  </div>
                  <div>
                    <p>Prescription</p>
                    <span>{Prescription.prescription[0].name}</span>
                  </div>
                  <div>
                    <p>Dosage</p>
                    <span>{Prescription.prescription[0].frequency}</span>
                  </div>
                  <div>
                    <p>Duration</p>
                    <span>{Prescription.prescription[0].duration}</span>
                  </div>
                </div>
              ))
            ) : !Prescription ? (
              <p class="loaders">Loading</p>
            ) : (
              <p>no prescription found</p>
            )}
          </div>
        </div>
      </div>
      {dispenser && (
        <Dispense setDispenser={setDispenser} patientID={patientID} />
      )}
    </div>
  );
};

export default Pharmacy;
