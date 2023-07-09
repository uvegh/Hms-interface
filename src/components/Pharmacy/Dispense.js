import React, { useEffect, useState } from "react";
import drug from "../../img/drug1.jpeg";
import axios from "axios";
import { format } from "date-fns";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
let totalCost;
const Dispense = ({ setDispenser, patientID }) => {
  const baseUrl = "https://gavohms.onrender.com";
  const testUrl = "http://localhost:3001";

  const navigate = useNavigate();
  const [patient, setPatient] = useState();
  const [showCheckOut, setShowCheckOut] = useState(false);
  const [patientMail, setPatientMail] = useState();
  const [checkOuts, setCheckOut] = useState({
    prescription_id: "",
    item_cost: "",
    payment_status: "",
    payment_type: "",
  });
  const [payStackResult, setPayStackResult] = useState();

  const paystackUrl = `${baseUrl}/api/checkout/paystack?email=${patientMail}&amount=${checkOuts.item_cost *100}&prescription_id=${checkOuts.prescription_id}&payment_status=${checkOuts.payment_status = "paid"}&payment_type=${checkOuts.payment_type = "card"}
  `;

  const showCheckoutMessage = () => {
    toast.success("Checked Out Successful !", {
      position: toast.POSITION.TOP_RIGHT,
      className: "toastMessage",
      hideProgressBar: true,
    });
  };
  const getPatients = async () => {
    const response = (await axios.get(`${baseUrl}/prescription/${patientID}`))
      .data;
    setPatient(response);
  };

  const checkOut = async () => {
    checkOuts.payment_status = "paid";
    checkOuts.payment_type = "cash";
    let response = await axios
      .post(`${baseUrl}/api/checkout`, checkOuts)
      .then((res) => {
        console.log(res);
        showCheckoutMessage();

        setTimeout(() => {
          navigate("/pharmacy/dashboard");
          setShowCheckOut(false);
          setDispenser(false);
        }, 2000);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const checkoutPaystack = async () => {
    console.log(patientMail);
    await axios
      .get(paystackUrl, {
        headers: {
          "X-Requested-With": "XMLHttpRequest",
        },
      })
      .then((response) => {
        let data = response?.data?.data?.authorization_url;
        // console.log(data?.data.authorization_url);
        setPayStackResult(data);
        window.location.href = data;
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    getPatients();
  }, [patientID]);

  return (
    <div>
      <div className="dispense">
        {patient ? (
          <div className="dispenseMain">
            <div className="dispenseTop">
              <div className="left">
                <div className="drugImg">
                  <img src={drug} alt="" />
                </div>
                <div className="drugName">
                  <p>{patient?.data?.patient_id?.first_name}</p>
                  <i>Patient</i>
                </div>
              </div>
              <div className="right">
                <div>
                  <p>Prescriber</p>
                  <span>Dr {patient?.data?.doctor_id?.first_name}</span>
                </div>
                <div>
                  <p>Date</p>
                  <span>{format(new Date(Date.now()), "MM/dd/yyyy")} </span>
                </div>
                <div>
                  <p>Payment Status</p>
                  <span>Pending</span>
                </div>
                <div>
                  <p>Total Cost</p>
                  <span>
                    N
                    {patient?.data?.prescription
                      .map((totalCost) => {
                        return parseInt(totalCost.price);
                      })
                      .reduce((a, b) => {
                        totalCost = a + b;
                        return totalCost;
                      })}
                  </span>
                </div>
                <div>
                  <button
                    type="btn"
                    onClick={() => {
                      setShowCheckOut(true);
                      // console.log(patient?.data?._id);
                      checkOuts.prescription_id = patient?.data?._id;
                      checkOuts.item_cost = totalCost;
                      setPatientMail(patient?.data?.patient_id?.email);
                      // console.log(totalCost);
                    }}
                  >
                    Dispense
                  </button>
                  <ToastContainer />
                </div>
              </div>
            </div>
            <div className="bottom">
              <p>Prescription</p>
              <table>
                <thead>
                  <tr>
                    <th>S/N</th>
                    <th>Item</th>
                    <th>Strength</th>
                    <th>Category</th>
                    <th>Frequency</th>
                    <th>Duration</th>
                    <th>Allegies</th>
                    <th>Date</th>
                    <th>Cost</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {!patient?.data?.prescription ? (
                    <p>no prescription found</p>
                  ) : (
                    patient?.data?.prescription.map((pres, i) => (
                      <tr>
                        <td>{i + 1}</td>
                        <td>{pres.name}</td>
                        <td>{pres.strength}</td>
                        <td>Oral not Injectible</td>
                        <td>{pres.frequency}</td>
                        <td>{pres.duration}</td>
                        <td>Penicillin</td>
                        <td>
                          {format(
                            new Date(patient?.data?.date_of_diagnosis),
                            "MM/dd/yyyy"
                          )}
                        </td>
                        <td>N{pres.price}</td>
                        <td>
                          <button
                            type="btn"
                            onClick={() => {
                              alert("Edited");
                            }}
                          >
                            Edit
                          </button>{" "}
                          <button
                            type="btn"
                            onClick={() => {
                              alert("deleted");
                            }}
                          >
                            Delete
                          </button>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
            {/* <div className="pending">
           <p>Pending Prescription</p>
         </div> */}
            {showCheckOut && (
              <div className="checkout">
                <div className="checkoutMain">
                  <div className="topChecks">
                    <h1>Check Out</h1>
                    <div
                      className="closeBtn"
                      onClick={() => {
                        setShowCheckOut(false);
                      }}
                    >
                      <button type="btn">X</button>
                    </div>
                  </div>
                  <div className="bottomChecks">
                    <div>
                      <p>Cash</p>
                      <input
                        type="text"
                        name="cash"
                        value={`N ${totalCost}`}
                        placeholder="cash payment"
                      />
                      <button
                        type="btn"
                        onClick={() => {
                          checkOut();
                        }}
                      >
                        Cash Payment
                      </button>
                    </div>
                    <div>
                      <button
                        type="btn"
                        className="Cp"
                        onClick={() => {
                          checkoutPaystack();
                        }}
                      >
                        Card Payment
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        ) : (
          <span class="loader loadDispense">Loading</span>
        )}
      </div>
    </div>
  );
};

export default Dispense;
