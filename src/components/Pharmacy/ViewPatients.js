import React from "react";
import { BiDotsVerticalRounded } from "react-icons/bi";
import { RiUser5Fill } from "react-icons/ri";
const ViewPatients = () => {
  return (
    <div className="viewPatient">
      <div className="viewPBox">
        <div className="tops">
          <div className="first">
            <div>
              <RiUser5Fill size={30} />
            </div>
            <div>
              <p>Sandra Cook</p>
              <span>32 sep 2023</span>
            </div>
          </div>
          <div className="second">
            <div>
              <p>Patient ID</p>
              <span>409-342</span>
            </div>
            <div>
              <p>Phone</p>
              <span>09055047774</span>
            </div>
            <div>
              <p>Address</p>
              <span>FCT Abuja</span>
            </div>
          </div>
          <div className="third">
            <BiDotsVerticalRounded size={20} />
          </div>
        </div>
        <div className="records">
          <p>Medical Details</p>
          <div className="records1">
            <div>
              <p>Allegies</p>
              <span>Peniceline</span>
            </div>
            <div>
              <p>FmHx</p>
              <span>DM</span>
            </div>
            <div>
              <p>Active Issues</p>
              <span>None</span>
            </div>
          </div>
          <div className="records2">
            <div>
              <p>Medical Problems</p>
              <span>Ashma</span>
            </div>
            <div>
              <p>Diag Code</p>
              <span>250 Ashma/ Diabeticsmeliticus</span>
            </div>
          </div>
        </div>
        <div className="records">
          <p>Medical Insurance</p>
          <div className="records1">
            <div>
              <p>Insurance Provider</p>
              <span>Irish HealthCare</span>
            </div>
            <div>
              <p>Member ID</p>
              <span>783421</span>
            </div>
            <div>
              <p>Health Plan</p>
              <span>911-02-23</span>
            </div>
          </div>
          <div className="records2">
            <div>
              <p>Major Medical</p>
              <span>Yes</span>
            </div>
            <div>
              <p>Dental</p>
              <span>Yes</span>
            </div>
            <div>
              <p>Prescription</p>
              <span>Yes</span>
            </div>
            <div>
              <p>Point of Service</p>
              <span>No</span>
            </div>
            <div>
              <p> Mertanity</p>
              <span>Yes</span>
            </div>
          </div>
        </div>
        <div className="records">
          <p>Prescription History</p>
          <div className="records1 zsel">
            <div>
              <i>12 min ago</i>
              <p>Pending Prescription</p>
              <span>Triulicity</span>
            </div>
            <div>
              <p>Prescriber</p>
              <span>Dr Stephen George</span>
            </div>
            <div>
              <p>Dosage</p>
              <span>8 prefilled pen</span>
            </div>
            <div>
              <p>Duration</p>
              <span>4 Weeks</span>
            </div>
            <div>
              <p>Rate</p>
              <span>N4,000</span>
            </div>
            <div>
              <button
                onClick={() => {
                  alert("clicked me !");
                }}
              >
                View Details
              </button>
            </div>
          </div>

          <div className="records1">
            <div>
              <i>1 month ago</i>
              <p>Current Prescription</p>
              <span>Amoxicillin</span>
            </div>
            <div>
              <p>Prescriber</p>
              <span>Dr Edward George</span>
            </div>
            <div>
              <p>Dosage</p>
              <span>28 Tablets</span>
            </div>
            <div>
              <p>Duration</p>
              <span>3 Weeks</span>
            </div>
            <div>
              <p>Rate</p>
              <span>N10,000</span>
            </div>
            <div>
              <button className="dispensed"
                onClick={() => {
                  alert("clicked me !");
                }}
              >
                Dispensed 
                {/* <span>1 jan 2023</span> */}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewPatients;
