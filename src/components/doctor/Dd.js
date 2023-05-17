import React from "react";
import gavologo from "../../img/gavologo.png";
import { Link } from "react-router-dom";
function Dd() {
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
              <div><input type="text" name="name" value="" placeholder="First" />
              <input type="text" name="last" value="" placeholder="Last" /></div>
            </div>
            <div className="diagFormgroup2">
              <div>
                <label for="patientDOB">Patient’s Date of Birth</label>
                <input className="diagdates" type="date" name="" value="" />
              </div>
              <div>
                <label for="date of diagnosis">Date of Diagnosis</label>
                <input type="date" name="" value="" />
              </div>
            </div>
          </form>
          <div className="diagnosbtn">
            <button type="btn">Discard</button>
            <button type="btn">Save Diagnosis</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dd;
