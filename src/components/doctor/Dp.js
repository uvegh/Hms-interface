import React from "react";
import gavologo from "../../img/gavologo.png";
import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { MdDeleteForever } from "react-icons/md";
import { useContext } from "react";
import { HmsContext } from "../../context/HmsContext";

const Dp = (setShowPrescription) => {
  const baseUrl = "https://gavohms.onrender.com";
  const testUrl = "http://localhost:3001";
  const {patientID} = useContext(HmsContext)
  console.log(patientID);
  const [disabled, setDisabled] = useState("allowInput");
  const [prescription, setPrescription] = useState({
    patient_id: "",
    date_of_diagnosis: "",
    prescription: [],
    notes: "",
    doctor_name: "",
    doctor_initials: "",
  });

  const [allDrugs, setAllDrugs] = useState();
  const navigate = useNavigate();

  const [prescribedDrugs, setPrescribedDrugs] = useState([]);

  const [filteredDrugs, setFilteredDrugs] = useState([]);
  // console.log(filteredDrugs)
  const [searchDrug, setSearchDrug] = useState(false);

  const [drug, setDrug] = useState("");
  const [frequency, setFrequency] = useState("");
  const [selectedDrug, setSelectedDrug] = useState({});
  // console.log(selectedDrug)

  const getFilteredDrug = async (e) => {
    let response = (await axios.get(`${testUrl}/drugs?name=${drug}`)).data;
    console.log(response);
    let filterList = [];
    response.data.map((drug) =>
      filterList.push({
        id: drug?._id,
        drugName: drug?.name,
        strength: drug?.strength,
      })
    );
    setFilteredDrugs(filterList);
  };

  // const getAllDrugs = async () => {
  //   let response = (await axios.get(`${testUrl}/drugs`)).data;
  //   // console.log(response)
  //   if (response?.code === 200) {
  //     setAllDrugs(response?.data);
  //   }
  //   return "no drug found";
  // };

  const addPrescribedDrugs = (e) => {
    e.preventDefault();
    const tempPrescribed = [...prescribedDrugs];

    if (tempPrescribed.filter((item) => item.id === selectedDrug?.id).length) {
      alert("drug already exists in prescription");
    } else {
      tempPrescribed.push({
        id: selectedDrug?.id,
        name: selectedDrug?.drugName,
        strength: selectedDrug?.strength,
        frequency: frequency,
      });
      setPrescribedDrugs(tempPrescribed);
    }
    setFrequency("");
    setSelectedDrug("");
  };

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

  const handleDelete = async (id) => {
    let response = (await axios.delete(`${testUrl}/prescription/${id}`)).data;
    if (response?.code == "200") {
      alert("prescription deleted ");
      getPrescription();
      return;
    }
    alert("failed to delete ");
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
    getFilteredDrug();
  }, [prescription, drug, prescribedDrugs]);

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
                {/* <input
                  className="medicSelect"
                  type="text"
                  name="medication"
                  value={drug}
                  placeholder="+"
                  onChange={(e) =>
                    setDrug(
                      e.target.value
                    )
                  }
                /> */}

                <div className="search-container">
                  <input
                    className="medicSelect"
                    id="browser"
                    value={selectedDrug?.drugName || drug}
                    onChange={(e) => setDrug(e.target.value)}
                    // onFocus={() => setSearchDrug(true)}
                    onMouseEnter={() => setSearchDrug(true)}
                    onBlur={() => setSearchDrug(false)}
                  />
                  {/* <div className="search-results">
                      {filteredDrugs.length !== 0 ? (
                        filteredDrugs.map((drug) => (
                          <div
                            key={drug.id}
                            className="search-result"
                            onClick={() => {
                              setSelectedDrug(drug);
                              console.log("hello")
                            }}
                          >
                            {drug.drugName}
                          </div>
                        ))
                      ) : (
                        <div className="search-result">No results found</div>
                      )}
                    </div> */}
                  {searchDrug && (
                    <div className="search-results" onMouseLeave={()=> setSearchDrug(false)}>
                      {filteredDrugs ? (
                        filteredDrugs.map((drug)=>(
                          <div className="search-result" key={drug.id}>
                          <button type="button" onClick={(e)=>{
                            e.preventDefault()
                            setSelectedDrug(drug)
                            setSearchDrug(false)
                          }}>{drug.drugName}</button>
                        </div>
                        ))
                      ):(<p>no drug found</p>)}
                     
                    </div>
                  )}
                </div>

                {/* <button type="btn" className="getDrugs">Go</button> */}
              </div>
              <div>
                <label for="medication">Strength (mg)</label>
                <input
                  type="text"
                  name="medication"
                  value={selectedDrug?.strength || ""}
                  disabled
                />
              </div>

              <div>
                <label for="medication">Frequency</label>
                <input
                  type="text"
                  name="medication"
                  value={frequency}
                  onChange={(e) => setFrequency(e.target.value)}
                />
              </div>
              <div className="addDrug">
                <button type="btn" onClick={addPrescribedDrugs}>
                  add
                </button>
              </div>
            </div>
            <div className="presForm5">
              {prescribedDrugs.length == 0 ? (
                <p>no prescription</p>
              ) : (
                prescribedDrugs.map((prescription) => (
                  <div key={prescription?.id}>
                    <p>{prescription?.name}</p>
                    <p>{prescription?.strength}</p>
                    <p>{prescription?.frequency}</p>
                    <MdDeleteForever
                      className="deleteIcon"
                      color="red"
                      size={20}
                      onClick={() => handleDelete(prescription?.id)}
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
          <button type="btn" onClick={()=>{
            setShowPrescription(false)
          }}>Discard</button>
          <button type="btn" className={disabled} onClick={submitPrescription}>
            Post Prescription
          </button>
        </div>
      </div>
    </div>
  );
};

export default Dp;
