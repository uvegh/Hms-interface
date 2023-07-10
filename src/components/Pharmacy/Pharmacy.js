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
  console.log(Prescription);
  const [patientPres, setPatientPres] = useState();
  const [dispenser, setDispenser] = useState(false);
  const [patientID, setPatientID] = useState();
  const { PharmacistId } = useContext(HmsContext);
  const [drugs, setDrugs] = useState();
  const [showDrug, setShowDrugs] = useState(false);
  const [showPatient, setShowPatient] = useState(true);
  // console.log(PharmacistId);

  const getDrugs = async () => {
    let inInstock = [];
    let outStock = [];
    let response = (await axios.get(`${testUrl}/drugs`)).data;
    setDrugs(response?.data);
    {
      response?.data
        ? response?.data.map((drug) => {
            if (drug.status === "available") {
              inInstock.push(drug);
              setInStock(inInstock);
            } else if (drug.status === "not-available") {
              outStock.push(drug);
              setOutOffStock(outStock);
            } else {
              console.log("no drug found");
            }
          })
        : console.log("no drugs found");
    }
  };

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

  useEffect(() => {
    // getDrugs();
  }, []);
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
                <p>
                  {PharmacistId.first_name} {PharmacistId.last_name}
                </p>
              ) : (
                <p>Phamacist name</p>
              )}
            </div>
            <ul className="sidebar_link_btns">
              <li className="sidebar_btn active">
                <div
                  onClick={() => {
                    setShowDrugs(false);
                    setShowPatient(true);
                  }}
                >
                  {" "}
                  Prescription{" "}
                </div>
              </li>
              <li className="sidebar_btn">
                <Link to="/doctor/patient"> Patients </Link>
              </li>
              <li className="sidebar_btn">
                <div> Order </div>
              </li>
              <li className="sidebar_btn">
                <div
                  onClick={() => {
                    setShowPatient(false);
                    setShowDrugs(true);
                  }}
                >
                  {" "}
                  Drugs{" "}
                </div>
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
          {showPatient && (
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
          )}
          {showPatient && (
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
                      <span>{Prescription?.patient_id?.first_name}</span>
                    </div>
                    <div>
                      <p>Doctor</p>
                      <span>{Prescription?.doctor_id?.first_name}</span>
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
                <span class="loader">Loading</span>
              ) : (
                <p>no prescription found</p>
              )}
            </div>
          )}
          {showDrug && (
            <div className="admin-drug">
              <table>
                <thead>
                  <th>S/N</th>
                  <th>Item Name</th>
                  <th>Item Code</th>
                  <th>Batch No</th>
                  <th>Category</th>
                  <th>Status</th>
                  <th>Actions</th>
                </thead>
                <tbody>
                  {drugs ? (
                    drugs.map((drug, i) => (
                      <tr key={drug._id}>
                        <td>{i + 1}</td>
                        <td>{drug.name} </td>
                        <td>134677</td>
                        <td>#2942</td>
                        <td>{drug.category}</td>
                        <td>{drug.status}</td>
                        <td>
                          <button
                            type="btn"
                            onClick={() => {
                              console.log(drug._id);
                            }}
                          >
                            View Item
                          </button>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <p>no drugs found</p>
                  )}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>

      {dispenser && (
        <Dispense setDispenser={setDispenser} patientID={patientID} />
      )}
    </div>
  );
};

export default Pharmacy;
