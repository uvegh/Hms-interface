import React from "react";
import gavologo from "../../img/gavologo.png";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import { format } from "date-fns";
import Drugs from "./Drugs";

const PharmacyAdmin = () => {
  const baseUrl = "https://gavohms.onrender.com";
  const testUrl = "http://localhost:3001";

  const [drugs, setDrugs] = useState();
  const [prescriptions, setPrescriptions] = useState();
  const [outOffStock, setOutOffStock] = useState([]);
  const [inStock, setInStock] = useState([]);
  console.log(outOffStock);
  const [showDrugs, setShowDrugs] = useState(true)
  const [showPrescription, setShowPrescription] = useState(false)
  const [showCreateDrug, setShowCreateDrug] = useState(false)

  const getDrugs = async () => {
    let inInstock = [];
    let outStock = [];
    let response = (await axios.get(`${baseUrl}/drugs`)).data;
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

  const getPrescriptions = async () => {
    const response = (await axios.get(`${baseUrl}/prescription`)).data;
    setPrescriptions(response?.data);
  };

  useEffect(() => {
    getDrugs();
    getPrescriptions();
  }, []);

  return (
    <div>
      <div className="pharmAdmin">
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
              <p>Admin</p>
            </div>
            <ul className="sidebar_link_btns">
              <li className="sidebar_btn active">
                <div type="btn" onClick={()=>{
                  setShowPrescription(false)
                  setShowDrugs(true)
                }}> Drugs </div>
              </li>
              <li className="sidebar_btn">
                <Link to="/doctor/patient"> Patients </Link>
              </li>
              <li className="sidebar_btn">
                <div> Inventory </div>
              </li>
              <li className="sidebar_btn">
                <div type="btn" onClick={()=>{
                  setShowDrugs(false);
                  setShowPrescription(true)
                }}> Prescription </div>
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
        <div className="rightSide">
          <div className="pharmTops">
            <div>
              <p>TOTAL DRUGS</p>
              {inStock ? <i>{inStock.length}</i> : "no drugs available"}
            </div>
            <div>
              <p>TOTAL PRESCRIPTION</p>
              {prescriptions ? <i> {prescriptions.length}</i> : <i> 0</i>}
            </div>
            <div>
              <p>OUT OF STOCK</p>
              {outOffStock ? <i>{outOffStock.length}</i> : "0"}
            </div>
            <div>
              <p>EXPIRE SOON</p>
              <i>2</i>
            </div>
          </div>
          <div className="createDrug">
            <button type="btn" onClick={()=>{
              setShowCreateDrug(true)
              console.log("create")
            }}>Create Drug</button>
          </div>
          { showDrugs && <div className="admin-drug">
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
                  drugs.map((drug, i)=>(
                    <tr>
                    <td>{i+1}</td>
                    <td>{drug.name} </td>
                    <td>134677</td>
                    <td>#2942</td>
                    <td>{drug.category}</td>
                    <td>{drug.status}</td>
                    <td>
                      <button
                        type="btn"
                        onClick={() => {
                          alert("view this item");
                        }}
                      >
                        View Item
                      </button>
                    </td>
                  </tr>
                  ))
                ):(<p>no drugs found</p>)}
      
      
              </tbody>
            </table>
          </div>}
         { showPrescription && <div className="admin-drug">
            <table>
              <thead>
                <th>S/N</th>
                <th>Patient Name</th>
                <th>Prescriber</th>
                <th>Vitals</th>
                <th>Diagnosis Date</th>
                <th>Actions</th>
              </thead>
              <tbody>
                {prescriptions ? (
                  prescriptions.map((prescription, i)=>(
                    <tr>
                    <td>{i + 1}</td>
                    <td>{prescription.patient_id.first_name}</td>
                    <td>Dr {prescription.doctor_id.first_name}</td>
                    <td>blood presure {prescription.patient_id.vitals.blood_pressure}</td>
                    <td>{format(new Date(prescription.date_of_diagnosis), "MM/dd/yyyy")}</td>
                    <td>
                      <button
                        type="btn"
                        onClick={() => {
                          alert("view this item");
                        }}
                      >
                        View Prescription
                      </button>
                    </td>
                  </tr>
                  ))
                ):(<p>no prescription found</p>)}
      
              </tbody>
            </table>
          </div>}
        </div>
      </div>
     {showCreateDrug && <Drugs setShowCreateDrug = {setShowCreateDrug}/>}
    </div>
  );
};

export default PharmacyAdmin;
