import React, { useContext } from 'react'
import logo from '../img/ORBIS.png'
import { Link } from 'react-router-dom'
import { HmsContext } from '../context/HmsContext'
function LoginNav() {
  const { isLoggedIn } = useContext(HmsContext)
  return (
    <>
      <nav className='fixed-top container-fluid '>
        <main className='navbar container '>
          <img className='logo ms-2' src={logo} alt='' />
        </main>
        <div className='nav-links'>
          <Link className='me-2 text-decoration-none btn-home rounded fs-4 fw-bolder'>
            Home
          </Link>

          {isLoggedIn == true ? (null)
            : (<button className='btn btn-login btn-primary btn-lg border-0 '
              onClick={() => {
                navigate("/stafflogin")
              }}
            >
              Login
            </button>)

          }

        </div>
      </nav>
    </>
  )
}

export default LoginNav
