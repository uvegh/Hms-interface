import React from 'react'
import logo from "../img/ORBIS.png"
import { Link } from 'react-router-dom'
function LoginNav() {
   
  return (
    
    <>
    
  
        <nav className='p-2 fixed-top mb-5'>
          <main className='navbar container p-3 '>
            <img className='logo ms-2' src={logo} alt="" />
          </main>
          <div className="nav-links">
            <Link className='me-2 text-decoration-none btn-home rounded fs-4 fw-bolder' >
              Home
            </Link>

            <button className="btn btn-login btn-primary btn-lg border-0 " >
              Login
            </button>
          </div>



        </nav>

      

    
    </>
  )
}

export default LoginNav