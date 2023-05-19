import React from "react";
import gavologo from "../../img/gavologo.png";
import { useState, useEffect } from "react";
import { set } from "mongoose";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { MdDeleteForever } from "react-icons/md";
const Dp = () => {
  const baseUrl = "https://gavohms.onrender.com";
  const testUrl = "http://localhost:3001/prescription"
  const [disabled, setDisabled] = useState("allowInput");
  const [prescription, setPrescription] = useState({
    first_name: "",
    last_name: "",
    patient_age: "",
    date_of_diagnosis: "",
    drug_id: "",
    strength: "",
    frequency: "",
    notes: "",
    doctor_name: "",
    doctor_initials: "",
  });
  const [prescribed, setPrescribed] = useState();
  console.log(prescribed);
  const navigate = useNavigate();

  const submitPrescription = (e) => {
    e.preventDefault();
    axios
      .post("http://localhost:3001/prescription", prescription)
      .then((res) => {
        alert("Prescribed successfully");
        navigate("/doctor/Patient");
      })
      .catch((err) => console.log(err));
    // alert("submitted");
  };

  const handleDelete = async(id) => {
    let response = (await axios.delete(`${testUrl}/${id}`)).data
      if(response?.code =="200"){
        alert("prescription deleted ")
        getPrescription();
        return
      }
      alert("failed to delete ")
  };

  const getPrescription = async () => {
    let response = (await axios.get(testUrl)).data;
    setPrescribed(response);
  };

  useEffect(() => {
    if (
      !prescription.first_name ||
      !prescription.last_name ||
      !prescription.patient_age ||
      !prescription.date_of_diagnosis ||
      !prescription.drug_id ||
      !prescription.strength ||
      !prescription.frequency ||
      !prescription.notes ||
      !prescription.doctor_name ||
      !prescription.doctor_initials
    ) {
      setDisabled("noInput");
    } else {
      setDisabled("allowInput");
    }

    getPrescription();
  }, [prescription]);

  return (
    <div className="prescription">
      <div className="prescrib2">
        <div className="topSection">
          <img src={gavologo} alt="gavo official logo" />
          <p>
            <span>Health</span>Line Clinic
          </p>
        </div>
        <div className="prescribe_form">
          <h3>Prescription Form</h3>
          <form>
            <div className="presFormgroup">
              <label>Patient Name</label> <br />
              <div>
                <input
                  type="text"
                  name="name"
                  value={prescription.first_name}
                  placeholder="First"
                  onChange={(e) =>
                    setPrescription({
                      ...prescription,
                      first_name: e.target.value,
                    })
                  }
                />
                <input
                  type="text"
                  name="last"
                  value={prescription.last_name}
                  placeholder="Last"
                  onChange={(e) =>
                    setPrescription({
                      ...prescription,
                      last_name: e.target.value,
                    })
                  }
                />
              </div>
            </div>
            <div className="presFormgroup2">
              <div>
                <label for="patientDOB">Patient’s Age</label>
                <input
                  className="diagdates"
                  type="text"
                  name=""
                  value={prescription.patient_age}
                  onChange={(e) =>
                    setPrescription({
                      ...prescription,
                      patient_age: e.target.value,
                    })
                  }
                />
              </div>
              <div>
                <label for="date of diagnosis">Date of Diagnosis</label>
                <input
                  type="date"
                  name=""
                  value={prescription.date_of_diagnosis}
                  onChange={(e) =>
                    setPrescription({
                      ...prescription,
                      date_of_diagnosis: e.target.value,
                    })
                  }
                />
              </div>
            </div>

            <div className="presForm4">
              <div>
                <label for="medication">Prescription: Medication</label>
                <input
                  className="medicSelect"
                  type="text"
                  name="medication"
                  value={prescription.drug_id}
                  placeholder="+"
                  onChange={(e) =>
                    setPrescription({
                      ...prescription,
                      drug_id: e.target.value,
                    })
                  }
                />
                {/* <button type="btn" className="getDrugs">Go</button> */}
              </div>
              <div>
                <label for="medication">Strength (mg)</label>
                <input
                  type="text"
                  name="medication"
                  value={prescription.strength}
                  onChange={(e) =>
                    setPrescription({
                      ...prescription,
                      strength: e.target.value,
                    })
                  }
                />
              </div>
              <div>
                <label for="medication">Frequency</label>
                <input
                  type="text"
                  name="medication"
                  value={prescription.frequency}
                  onChange={(e) =>
                    setPrescription({
                      ...prescription,
                      frequency: e.target.value,
                    })
                  }
                />
              </div>
            </div>
            <div className="presForm5">
              {prescribed?.length == 0 ? (
                <h1>no prescription</h1>
              ) : (
                prescribed?.data.map((prescription) => (
                  <div key={prescription._id}>
                    <p>{prescription?.drug_id}</p>
                    <p>{prescription?.strength}</p>
                    <p>{prescription?.frequency}</p>
                    <MdDeleteForever
                      className="deleteIcon"
                      color="red"
                      size={20}
                      onClick={() => handleDelete(prescription?._id)}
                    />
                  </div>
                ))
              )}
            </div>
            <div className="presForm6">
              <label for="notes">Additional Notes</label>
              <input
                type="text"
                name="notes"
                value={prescription.notes}
                onChange={(e) =>
                  setPrescription({ ...prescription, notes: e.target.value })
                }
              />
            </div>
            <div className="diagForm4">
              <div>
                <label for="docname">Doctor’s Name</label>
                <input
                  type="text"
                  name="doctorsname"
                  value={prescription.doctor_name}
                  placeholder="Name"
                  onChange={(e) =>
                    setPrescription({
                      ...prescription,
                      doctor_name: e.target.value,
                    })
                  }
                />
              </div>
              <div>
                <label for="DoctorsSign">Doctor’s Signature</label>
                <input
                  type="text"
                  name=""
                  value={prescription.doctor_initials}
                  placeholder="Ax"
                  onChange={(e) =>
                    setPrescription({
                      ...prescription,
                      doctor_initials: e.target.value,
                    })
                  }
                />
              </div>
            </div>
          </form>
        </div>
          <div className="diagnosbtns">
            <button type="btn">Discard</button>
            <button
              type="btn"
              className={disabled}
              onClick={submitPrescription}
            >
              Post Prescription
            </button>
          </div>
      </div>
    </div>
  );
};

export default Dp;
