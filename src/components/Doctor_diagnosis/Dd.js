import React from 'react';
import gavologo from "../../img/gavologo.png";
import { Link } from 'react-router-dom';
function Dd() {
  return (
    <div className='diagnosis'>
      <div className='topSection'>
        <img src={gavologo} alt="gavo official logo"/>
        <p><span>Health</span>Line Clinic</p>
      </div>
    </div>
  )
}

export default Dd