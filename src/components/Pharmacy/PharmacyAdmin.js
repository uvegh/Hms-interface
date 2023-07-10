import React from "react";
import gavologo from "../../img/gavologo.png";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import { format } from "date-fns";
import Drugs from "./Drugs";
import { HmsContext } from "../../context/HmsContext";
import { useContext } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { GrFormClose } from "react-icons/gr";

const PharmacyAdmin = () => {
  const baseUrl = "https://gavohms.onrender.com";
  const testUrl = "http://localhost:3001";

  const [drugs, setDrugs] = useState();
  const [prescriptions, setPrescriptions] = useState();
  const [outOffStock, setOutOffStock] = useState([]);
  const [inStock, setInStock] = useState([]);
  // console.log(outOffStock);
  const [showDrugs, setShowDrugs] = useState(true);
  const [showPrescription, setShowPrescription] = useState(false);
  const [showCreateDrug, setShowCreateDrug] = useState(false);
  const { PharmacyAdmin, checkLogedIn } = useContext(HmsContext);
  const [Pharmacy, setPharmacy] = useState();
  const [drugTrue, setDrugTrue] = useState(false);
  const [showView, setShowView] = useState(false);
  const [drugID, setDrugID] = useState();
  const [singleDrug, setSingleDrug] = useState();
  const [deleted, setDeleted] = useState(false);
  const [modal, setModal] = useState(false);
  const [prescribID, setPrescribID] = useState();
  const [singlePres, setSinglePress] = useState();
  console.log(singlePres);

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

  const showToastMessage = (msg) => {
    toast.success("Logged Inn Successful !", {
      position: toast.POSITION.TOP_RIGHT,
      className: "toastMessage",
      hideProgressBar: true,
    });
  };

  const getPrescriptions = async () => {
    const response = (await axios.get(`${testUrl}/prescription`)).data;
    setPrescriptions(response?.data);
  };

  const getSinglePrescription = async () => {
    if (prescribID) {
      let response = (await axios.get(`${testUrl}/prescription/${prescribID}`))
        .data;
      setSinglePress(response?.data);
    }
  };

  const getPharmacy = async () => {
    if (PharmacyAdmin.id) {
      let response = (
        await axios.get(`${testUrl}/pharmacy?emp_id=${PharmacyAdmin.id}`)
      ).data;
      setPharmacy(response?.data);
    }
  };

  const getSingleDrug = async () => {
    if (drugID) {
      let response = (await axios.get(`${testUrl}/drugs/${drugID}`)).data;
      setSingleDrug(response?.data);
    }
  };

  useEffect(() => {
    if (checkLogedIn === true) {
      showToastMessage();
    }
  }, []);

  useEffect(() => {
    if (drugTrue === true) {
      getDrugs();
    }

    getDrugs();
    getPrescriptions();
    getPharmacy();
    getSingleDrug();
    getSinglePrescription();
  }, [drugTrue, drugID, singleDrug, prescribID]);

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
              {PharmacyAdmin ? (
                <p>
                  {PharmacyAdmin.first_name} {PharmacyAdmin.last_name}
                </p>
              ) : (
                <p>Admin</p>
              )}
            </div>
            <ul className="sidebar_link_btns">
              <li className="sidebar_btn active">
                <div
                  type="btn"
                  onClick={() => {
                    setShowPrescription(false);
                    setShowDrugs(true);
                  }}
                >
                  {" "}
                  Drugs{" "}
                </div>
              </li>
              <li className="sidebar_btn">
                <Link to="/doctor/patient"> Patients </Link>
              </li>
              <li className="sidebar_btn">
                <div> Inventory </div>
              </li>
              <li className="sidebar_btn">
                <div
                  type="btn"
                  onClick={() => {
                    setShowDrugs(false);
                    setShowPrescription(true);
                  }}
                >
                  {" "}
                  Prescription{" "}
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
            <button
              type="btn"
              onClick={() => {
                setShowCreateDrug(true);
              }}
            >
              Create Drug
            </button>
            {/* <button type="btn" onClick={()=>{
              showToastMessage()
            }}>Notify</button> */}
            <ToastContainer />
          </div>
          {showDrugs && (
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
                              setDrugID(drug._id);
                              setShowView(true);
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
          {showPrescription && (
            <div className="admin-drug">
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
                    prescriptions.map((prescription, i) => (
                      <tr key={prescription._id}>
                        <td>{i + 1}</td>
                        <td>{prescription.patient_id.first_name}</td>
                        <td>Dr {prescription.doctor_id.first_name}</td>
                        <td>
                          blood presure{" "}
                          {prescription.patient_id.vitals.blood_pressure}
                        </td>
                        <td>
                          {format(
                            new Date(prescription.date_of_diagnosis),
                            "MM/dd/yyyy"
                          )}
                        </td>
                        <td>
                          <button
                            type="btn"
                            onClick={() => {
                              setPrescribID(prescription._id);
                              setModal(true);
                            }}
                          >
                            View Prescription
                          </button>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <p>no prescription found</p>
                  )}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
      {showCreateDrug && (
        <Drugs
          setShowCreateDrug={setShowCreateDrug}
          setDrugTrue={setDrugTrue}
        />
      )}
      {showView && (
        <div className="viewDrugs">
          {singleDrug ? (
            <div className="innerDrug" key={singleDrug._id}>
              <div className="itemDetails">
                <h1>Item Details</h1>
                <GrFormClose
                  size={30}
                  className="itemClose"
                  onClick={() => {
                    setShowView(false);
                  }}
                />
              </div>
              <div className="firstDetails">
                <div>
                  <span>Name</span>
                  <p>{singleDrug.name}</p>
                </div>
                <div>
                  <span>Brand</span>
                  <p>{singleDrug.brand}</p>
                </div>
                <div>
                  <span>Category</span>
                  <p>{singleDrug.category}</p>
                </div>
              </div>
              <div className="secondDetails">
                <div>
                  <span>Price</span>
                  <p>{singleDrug.price}</p>
                </div>
                <div>
                  <span>Quantity</span>
                  <p>{singleDrug.quantity}</p>
                </div>
                <div>
                  <span>Strength</span>
                  <p>{singleDrug.strength}</p>
                </div>
                <div>
                  <span>Status</span>
                  <p>{singleDrug.status}</p>
                </div>
              </div>
              <button
                onClick={() => {
                  console.log(singleDrug._id);
                  try {
                    if (singleDrug._id) {
                      axios
                        .delete(`${baseUrl}/drugs/${singleDrug._id}`)
                        .then((res) => {
                          console.log(res);
                          alert("Drug Deleted Successfully");
                          setShowView(false);
                          setDrugTrue(true);
                        })
                        .catch((err) => console.log(err));
                    }
                    getDrugs();
                  } catch (error) {
                    console.log(error);
                  }
                }}
              >
                Delete
              </button>
              <button
                type="btn"
                onClick={() => {
                  setShowView(false);
                }}
              >
                Edit
              </button>
            </div>
          ) : (
            <h1 className="loaders Loadam">Loading Please Wait...</h1>
          )}
        </div>
      )}

      {modal && (
        <div className="viewDrugs">
          {singlePres ? (
            <div className="innerDrug">
              <h1>Patient Details</h1>
              <div className="firstDetails">
                <div>
                  <span>Patient Name</span>
                  <p>
                    {singlePres?.patient_id?.first_name}{" "}
                    <i>{singlePres?.patient_id?.last_name}</i>
                  </p>
                </div>
                <div>
                  <span>Card No</span>
                  <p>{singlePres.card_no}</p>
                </div>
                <div>
                  <span>Date of Diagnosis</span>
                  <p>
                    {" "}
                    {format(
                      new Date(singlePres.date_of_diagnosis),
                      "MM/dd/yyyy"
                    )}
                  </p>
                </div>
                <div>
                  <span>Vitals</span>
                  <p>{singlePres?.patient_id?.vitals?.blood_pressure}</p>
                </div>
                <div>
                  <span>Doctor</span>

                  <p>
                    <i>Dr</i> {singlePres?.doctor_id?.first_name}{" "}
                    <i>{singlePres?.doctor_id?.last_name}</i>
                  </p>
                </div>
              </div>
              <div className="secondDetails">
                {singlePres?.prescription ? (
                  <table>
                    <thead>
                      <th>Frequency</th>
                      <th>Name</th>
                      <th>Strength</th>
                      <th>Duration</th>
                      <th>Price</th>
                    </thead>
                    {singlePres?.prescription.map((preps) => (
                      <tbody>
                        <tr>
                          <td>{preps.frequency}</td>
                          <td>{preps.name}</td>
                          <td>{preps.strength}</td>
                          <td>{preps.duration}</td>
                          <td>{preps.price}</td>
                        </tr>
                      </tbody>
                    ))}
                  </table>
                ) : (
                  <p>No Prescription Found</p>
                )}
              </div>
              <button>Delete</button>
              <button
                type="btn"
                onClick={() => {
                  setModal(false);
                }}
              >
                Edit
              </button>
            </div>
          ) : (
            <h1 className="Loadam">Loading Please Wait...</h1>
          )}
        </div>
      )}
    </div>
  );
};

export default PharmacyAdmin;
