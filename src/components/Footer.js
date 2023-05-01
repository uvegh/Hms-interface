

import React from 'react'
import copyright from "../img/Vector.png"
function Footer() {
  return (
   <> 
   <footer className='p-3  d-flex justify-content-center container-fluid'>
   <h2 className=''> <img className='img-fluid' src={copyright} alt="copyright" /> <span className="fs-4">GAVO</span>
   </h2>
   </footer>
   
   </>
  )
}

export default Footer