import React, { useEffect, useState } from "react";
import drug from "../../img/drug1.jpeg";
import axios from "axios";
import { format } from "date-fns";

const Dispense = ({ setDispenser, patientID }) => {
  const baseUrl = "https://gavohms.onrender.com";
  const testUrl = "http://localhost:3001";
  console.log(patientID);

  const [patient, setPatient] = useState();

  console.log(patient);

  const getPatients = async () => {
    const response = (await axios.get(`${testUrl}/prescription/${patientID}`))
      .data;
    setTimeout(() => {setPatient(response)}, 10000);
    setPatient(response);
  };

  useEffect(() => {
    getPatients();
  }, []);

  return (
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
              {/* <div>
             <p>Schedule</p>
             <span>every 2 hours</span>
           </div>
           <div>
             <p>Duration</p>
             <span>4 weeks</span>
           </div> */}
              <div>
                <p>Total Cost</p>
                {patient?.data?.prescription.map((totalCost)=>(
                  <span>N{totalCost.price}</span>
                ))}
              </div>
              <div>
                <button
                  type="btn"
                  onClick={() => {
                    setDispenser(false);
                  }}
                >
                  Dispense
                </button>
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
                    </tr>
                  ))
                )}
              </tbody>
              
            </table>
          </div>
          {/* <div className="pending">
         <p>Pending Prescription</p>
       </div> */}
        </div>
      ) : (
        <span class="loaderDispense">Loading</span>
      )}
    </div>
  );
};

export default Dispense;
