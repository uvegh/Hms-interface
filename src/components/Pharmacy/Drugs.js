import React from "react";
import gavologo from "../../img/gavologo.png";
import { useState, useEffect } from "react";
import { HmsContext } from "../../context/HmsContext";
import { useContext } from "react";
import axios from "axios";
const Drugs = ({ setShowCreateDrug }) => {
  const baseUrl = "https://gavohms.onrender.com";
  const testUrl = "http://localhost:3001";

  const [update, setUpdate] = useState(false);
  const [drugFrom, setDrugFrom] = useState(true);
  const [disable, setDisable] = useState("enableDrug");
  const [drug, setDrug] = useState({
    name: "",
    category: "",
    status: "",
    brand: "",
    strength: "",
    quantity: "",
    expire_date: "",
    batch_no: "",
    item_code: "",
    price: "",
    pharmacy_id: "",
    branch_id: "",
  });
  const { PharmacyAdmin } = useContext(HmsContext);
  const [Pharmacy, setPharmacy] = useState()
  console.log(Pharmacy)
  const getPharmacy = async () => {
    if (PharmacyAdmin.id) {
      let response =( await axios.get(
        `${testUrl}/pharmacy?emp_id=${PharmacyAdmin.id}`
      )).data;
      setPharmacy(response?.data)
    }
  };
  const createDrug = async () => {
    try {
      let response = await axios
        .post(`${testUrl}/drugs`, drug)
        .then((resp) => {
          console.log(resp);
          alert("Drug created successfully");
          setShowCreateDrug(false);
        })
        .catch((err) => console.log(err));
    } catch (err) {
      console.log(err.message);
    }
  };

  useEffect(() => {
    if (
      !drug.category ||
      !drug.name ||
      !drug.status ||
      !drug.brand ||
      !drug.strength ||
      !drug.quantity ||
      !drug.expire_date ||
      !drug.batch_no ||
      !drug.item_code ||
      !drug.price
    ) {
      setDisable("disableDrug");
    } else {
      setDisable("enableDrug");
    }
  }, [drug]);

  useEffect(()=>{
    getPharmacy()
  },[])
  return (
    <div>
      {drugFrom && (
        <div className="drug">
          <div className="section">
            <div className="topSection">
              <img src={gavologo} alt="gavo official logo" />
              <p>
                <span>Health</span>Line Clinic
              </p>
            </div>
            <div className="drugFrom">
              <h3>Drug Form</h3>
              <form>
                <div className="drugFromgroup">
                  <label for="name">Item Name</label>
                  <div>
                    <input
                      type="text"
                      name="name"
                      value={drug.name}
                      placeholder="name"
                      onChange={(e) =>
                        setDrug({ ...drug, name: e.target.value })
                      }
                    />
                    <input
                      type="text"
                      name="category"
                      value={drug.category}
                      placeholder="category"
                      onChange={(e) =>
                        setDrug({ ...drug, category: e.target.value })
                      }
                    />
                  </div>
                </div>
                <div className="drugFromgroup">
                  <label for="status">Status</label>
                  <div>
                    <input
                      type="text"
                      name="status"
                      value={drug.status}
                      placeholder="status"
                      onChange={(e) =>
                        setDrug({ ...drug, status: e.target.value })
                      }
                    />
                    <input
                      type="text"
                      name="brand"
                      value={drug.brand}
                      placeholder="brand"
                      onChange={(e) =>
                        setDrug({ ...drug, brand: e.target.value })
                      }
                    />
                  </div>
                </div>
                <div className="drugFromgroup">
                  <label for="strength">Strength</label>
                  <div>
                    <input
                      type="text"
                      name="strength"
                      value={drug.strength}
                      placeholder="strength"
                      onChange={(e) =>
                        setDrug({ ...drug, strength: e.target.value })
                      }
                    />
                    <input
                      type="text"
                      name="qunatity"
                      value={drug.quantity}
                      placeholder="quantity"
                      onChange={(e) =>
                        setDrug({ ...drug, quantity: e.target.value })
                      }
                    />
                  </div>
                </div>
                <div className="drugFromgroup">
                  <label for="expirydate">Expiry Date</label>
                  <div>
                    <input
                      type="date"
                      name="expirydate"
                      value={drug.expire_date}
                      placeholder="expiry date"
                      onChange={(e) =>
                        setDrug({ ...drug, expire_date: e.target.value })
                      }
                    />
                    <input
                      type="text"
                      name="batch_no"
                      value={drug.batch_no}
                      placeholder="batch no"
                      onChange={(e) =>
                        setDrug({ ...drug, batch_no: e.target.value })
                      }
                    />
                  </div>
                </div>
                <div className="drugFromgroup">
                  <label for="itemcode">Item Code</label>
                  <div>
                    <input
                      type="text"
                      name="itemcode"
                      value={drug.item_code}
                      placeholder="item code"
                      onChange={(e) =>
                        setDrug({ ...drug, item_code: e.target.value })
                      }
                    />
                    <input
                      type="text"
                      name="price"
                      value={drug.price}
                      placeholder="price"
                      onChange={(e) =>
                        setDrug({ ...drug, price: e.target.value })
                      }
                    />
                  </div>
                </div>
              </form>
            </div>
            <div className="drugbtns">
              <button
                type="btn"
                onClick={() => {
                  setShowCreateDrug(false);
                }}
              >
                Discard
              </button>
              <button
                type="btn"
                className={disable}
                onClick={() => {
                  createDrug();
                }}
              >
                Create Drug
              </button>
            </div>
          </div>
        </div>
      )}

      {update && (
        <div className="drug">
          <div className="section">
            <div className="topSection">
              <img src={gavologo} alt="gavo official logo" />
              <p>
                <span>Health</span>Line Clinic
              </p>
            </div>
            <div className="drugFrom">
              <h3>Update Drug Form</h3>
              <form>
                <div className="drugFromgroup">
                  <label for="name">Item Name</label>
                  <div>
                    <input
                      type="text"
                      name="name"
                      value=""
                      placeholder="name"
                    />
                    <input
                      type="text"
                      name="category"
                      value=""
                      placeholder="category"
                    />
                  </div>
                </div>
                <div className="drugFromgroup">
                  <label for="status">Status</label>
                  <div>
                    <input
                      type="text"
                      name="status"
                      value=""
                      placeholder="status"
                    />
                    <input
                      type="text"
                      name="brand"
                      value=""
                      placeholder="brand"
                    />
                  </div>
                </div>
                <div className="drugFromgroup">
                  <label for="strength">Strength</label>
                  <div>
                    <input
                      type="text"
                      name="strength"
                      value=""
                      placeholder="strength"
                    />
                    <input
                      type="text"
                      name="qunatity"
                      value=""
                      placeholder="quantity"
                    />
                  </div>
                </div>
                <div className="drugFromgroup">
                  <label for="strength">Expiry Date</label>
                  <div>
                    <input
                      type="date"
                      name="expirydate"
                      value=""
                      placeholder="expiry date"
                    />
                    <input
                      type="text"
                      name="batch_no"
                      value=""
                      placeholder="batch no"
                    />
                  </div>
                </div>
                <div className="drugFromgroup">
                  <label for="strength">Item Code</label>
                  <div>
                    <input
                      type="text"
                      name="item code"
                      value=""
                      placeholder="item code"
                    />
                    <input
                      type="text"
                      name="price"
                      value=""
                      placeholder="price"
                    />
                  </div>
                </div>
              </form>
            </div>
            <div className="drugbtns">
              <button type="btn">Discard</button>
              <button type="btn" className="">
                Update Drug
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Drugs;
