import React from 'react'
import gavologo from "../../img/gavologo.png";
const Pharmacy = () => {
  return (
    <div className='pharmacy'>
      <div className='pharmCont'>
        <div className='pharmLeft'>
        <div className="topSection">
          <img src={gavologo} alt="gavo official logo" />
          <p>
            <span>Health</span>Line Clinic
          </p>
        </div>
        </div>
        <div className='pharmRight'></div>
      </div>
    </div>
  )
}

export default Pharmacy