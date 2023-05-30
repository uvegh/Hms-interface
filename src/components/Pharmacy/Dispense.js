import React from "react";
import drug from "../../img/drug1.jpeg";
const Dispense = () => {
  return (
    <div className="dispense">
      <div className="dispenseMain">
        <div className="dispenseTop">
          <div className="left">
            <div className="drugImg">
              <img src={drug} alt="" />
            </div>
            <div className="drugName">
              <p>Abraham Jude</p>
              <i>Patient</i>
            </div>
          </div>

          <div className="right">
            <div>
              <p>Prescriber</p>
              <span>Dr Theodore Harper</span>
            </div>
            <div>
              <p>Date</p>
              <span>Today 20th, 2023</span>
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
              <span>N4000</span>
            </div>
            <div>
              <button type="btn">Dispense</button>
            </div>
          </div>
        </div>
        <div className="bottom">
          <p>Observations</p>
         <table>
          <thead>
            <tr>
              <th>S/N</th>
              <th>Item</th>
              <th>Dosage</th>
              <th>Route</th>
              <th>Schedule</th>
              <th>Duration</th>
              <th>Department</th>
              <th>Allegies</th>
              <th>Drug Interraction</th>
              <th>Date</th>
              <th>Cost</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>1</td>
              <td>Paracetamol</td>
              <td>2 pills </td>
              <td>Oral not Injectible</td>
              <td>every 4 hours</td>
              <td>4 weeks</td>
              <td>Endocrinology</td>
              <td>Penicillin</td>
              <td>Paracetamol 100 mg</td>
              <td>20/1/2023</td>
              <td>N200</td>
            </tr>
            <tr>
              <td>2</td>
              <td>Paracetamol</td>
              <td>2 pills </td>
              <td>Oral not Injectible</td>
              <td>every 4 hours</td>
              <td>4 weeks</td>
              <td>Endocrinology</td>
              <td>Penicillin</td>
              <td>Paracetamol 100 mg</td>
              <td>20/1/2023</td>
              <td>N200</td>
            </tr>
            <tr>
              <td>3</td>
              <td>Paracetamol</td>
              <td>2 pills </td>
              <td>Oral not Injectible</td>
              <td>every 4 hours</td>
              <td>4 weeks</td>
              <td>Endocrinology</td>
              <td>Penicillin</td>
              <td>Paracetamol 100 mg</td>
              <td>20/1/2023</td>
              <td>N200</td>
            </tr>
            <tr>
              <td>4</td>
              <td>Paracetamol</td>
              <td>2 pills </td>
              <td>Oral not Injectible</td>
              <td>every 4 hours</td>
              <td>4 weeks</td>
              <td>Endocrinology</td>
              <td>Penicillin</td>
              <td>Paracetamol 100 mg</td>
              <td>20/1/2023</td>
              <td>N200</td>
            </tr>
            <tr>
              <td>5</td>
              <td>Paracetamol</td>
              <td>2 pills </td>
              <td>Oral not Injectible</td>
              <td>every 4 hours</td>
              <td>4 weeks</td>
              <td>Endocrinology</td>
              <td>Penicillin</td>
              <td>Paracetamol 100 mg</td>
              <td>20/1/2023</td>
              <td>N200</td>
            </tr>
          </tbody>
         </table>
        </div>
        {/* <div className="pending">
          <p>Pending Prescription</p>
        </div> */}
      </div>
    </div>
  );
};

export default Dispense;
