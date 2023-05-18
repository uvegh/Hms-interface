import React from "react";
import gavologo from "../../img/gavologo.png";
const Dp = () => {
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
                <input type="text" name="name" value="" placeholder="First" />
                <input type="text" name="last" value="" placeholder="Last" />
              </div>
            </div>
            <div className="presFormgroup2">
              <div>
                <label for="patientDOB">Patient’s Age</label>
                <input className="diagdates" type="text" name="" value="" />
              </div>
              <div>
                <label for="date of diagnosis">Date of Diagnosis</label>
                <input type="date" name="" value="" />
              </div>
            </div>

            <div className="presForm4">
              <div>
                <label for="medication">Prescription: Medication</label>
                <input
                  className="medicSelect"
                  type="text"
                  name="medication"
                  value=""
                  placeholder="+"
                />
              </div>
              <div>
                <label for="medication">Strength (mg)</label>
                <input type="text" name="medication" value="" />
              </div>
              <div>
                <label for="medication">Frequency</label>
                <input type="text" name="medication" value="" />
              </div>
            </div>
            <div className="presForm5">
              <div>
                <p>Paracetamol Emzor</p>
                <p>200mg</p>
                <p>2-2-1</p>
              </div>
              <div>
                <p>Amulsupiride May & Baker</p>
                <p>200mg</p>
                <p>2-2-1</p>
              </div>
            </div>
            <div className="presForm6">
              <label for="notes">Additional Notes</label>
              <input type="text" name="notes" value=""/>
            </div>
            <div className="diagForm4">
              <div>
                <label for="docname">Doctor’s Name</label>
                <input
                  type="text"
                  name="doctorsname"
                  value=""
                  placeholder="Name"
                />
              </div>
              <div>
                <label for="DoctorsSign">Doctor’s Signature</label>
                <input
                  className="docSign"
                  type="file"
                  name="signature"
                  value=""
                />
              </div>
            </div>
          </form>
        <div className="diagnosbtn">
          <button type="btn">Discard</button>
          <button type="btn">Post Prescription</button>
        </div>
        </div>
      </div>
    </div>
  );
};

export default Dp;
