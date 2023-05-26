import React from "react";
import { useState } from "react";
import gavologo from "../../img/gavologo.png";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { useEffect } from "react";
function Dd({setShowDiagnosis}) {
  const baseUrl = "https://gavohms.onrender.com";
  const formData = new FormData();
  const navigate = useNavigate();

  const [diagnosis, setDiagnosis] = useState({
    first_name: "",
    last_name: "",
    patient_dob: "",
    date_of_diagnosis: "",
    symptoms: "",
    diagnosis: "",
    doctor_name: "",
    doctor_initials: "",
  });
  const [disabled, setDisabled] = useState("allowInput");
  const saveDiagnosis = (e) => {
    axios.post("http://localhost:3001/diagnosis", diagnosis).then((res) => {
      alert("diagnosis created");
      // navigate("/doctor/Patient");
      setShowDiagnosis(false)
    });
  };

  console.log(diagnosis);
  useEffect(() => {
    if (
      !diagnosis.first_name ||
      !diagnosis.last_name ||
      !diagnosis.patient_dob ||
      !diagnosis.date_of_diagnosis ||
      !diagnosis.symptoms ||
      !diagnosis.diagnosis ||
      !diagnosis.doctor_name ||
      !diagnosis.doctor_initials
    ) {
      setDisabled("noInput");
    } else {
      setDisabled("allowInput");
    }
  }, [diagnosis]);

  return (
    <div className="diagnosis">
      <div className="diagnos2">
        <div className="topSection">
          <img src={gavologo} alt="gavo official logo" />
          <p>
            <span>Health</span>Line Clinic
          </p>
        </div>
        <div className="mainDiagnos_form">
          <h3>Diagnosis Form</h3>
          <form>
            <div className="diagFormgroup">
              <label>Patient Name</label> <br />
              <div>
                <input
                  type="text"
                  name="name"
                  value={diagnosis.first_name}
                  placeholder="First"
                  onChange={(e) =>
                    setDiagnosis({ ...diagnosis, first_name: e.target.value })
                  }
                />
                <input
                  type="text"
                  name="last"
                  value={diagnosis.last_name}
                  placeholder="Last"
                  onChange={(e) =>
                    setDiagnosis({ ...diagnosis, last_name: e.target.value })
                  }
                />
              </div>
            </div>
            <div className="diagFormgroup2">
              <div>
                <label for="patientDOB">Patient’s Date of Birth</label>
                <input
                  className="diagdates"
                  type="date"
                  name=""
                  value={diagnosis.patient_dob}
                  onChange={(e) =>
                    setDiagnosis({ ...diagnosis, patient_dob: e.target.value })
                  }
                />
              </div>
              <div>
                <label for="date of diagnosis">Date of Diagnosis</label>
                <input
                  type="date"
                  name=""
                  value={diagnosis.date_of_diagnosis}
                  onChange={(e) =>
                    setDiagnosis({
                      ...diagnosis,
                      date_of_diagnosis: e.target.value,
                    })
                  }
                />
              </div>
            </div>
            <div className="diagForm3">
              <label for="symptoms">symptoms</label>
              <textarea
                className="textarea"
                rows="2"
                cols="40"
                value={diagnosis.symptoms}
                onChange={(e) =>
                  setDiagnosis({ ...diagnosis, symptoms: e.target.value })
                }
              ></textarea>
            </div>
            <div className="diagForm3">
              <label for="symptoms">Diagnosis</label>
              <textarea
                className="textarea"
                rows="2"
                cols="40"
                value={diagnosis.diagnosis}
                onChange={(e) =>
                  setDiagnosis({ ...diagnosis, diagnosis: e.target.value })
                }
              ></textarea>
            </div>
            <div className="diagForm4">
              <div>
                <label for="docname">Doctor’s Name</label>
                <input
                  type="text"
                  name="doctorsname"
                  value={diagnosis.doctor_name}
                  placeholder="Name"
                  onChange={(e) =>
                    setDiagnosis({ ...diagnosis, doctor_name: e.target.value })
                  }
                />
              </div>
              <div>
                <label for="DoctorsSign">Doctor’s Signature</label>
                <input
                  type=""
                  name=""
                  value={diagnosis.doctor_initials}
                  onChange={(e) =>
                    setDiagnosis({
                      ...diagnosis,
                      doctor_initials: e.target.value,
                    })
                  }
                />
              </div>
            </div>
          </form>
          <div className="diagnosbtn">
            <button type="btn" onClick={()=>{
              setShowDiagnosis(false)
            }}>Discard</button>
            <button type="btn" className={disabled} onClick={saveDiagnosis}>
              Save Diagnosis
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dd;
