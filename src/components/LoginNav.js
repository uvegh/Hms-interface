import React, { useContext, useEffect } from "react";
import logo from "../img/ORBIS.png";
import bell from "../img/bell.png";
import { Link, useNavigate } from "react-router-dom";
import { HmsContext } from "../context/HmsContext";
function LoginNav(props) {
  const { isLoggedIn, setIsLoggedIn, profileObj, reload, currentEmpId } = useContext(HmsContext);
  const baseUrl = "https://gavohms.onrender.com";
  const navigate = useNavigate();

  useEffect(() => {
    reload()
  }, [])
  return (
    <>
      <nav className="fixed-top container-fluid ">
        <main className="navbar container ">
          <img className="logo ms-2" src={logo} alt="" />

          <div className="nav-links">


            {isLoggedIn == true ? (<>
              <section className="d-flex  logged-in-profile">
                <Link className="me-4 text-decoration-none nav-item fs-4 fw-bolder">
                  <img src={bell} alt="alert" />
                </Link>

                <div className="d-flex">

                  <img className="profile_avi" src={`${baseUrl}/${profileObj?.avatar}`} alt="" />

                  <div className="d-block logged-in-profile-details">


                    <p> {` ${currentEmpId?.first_name} ${currentEmpId?.last_name}`}</p>
                    <span className="">{currentEmpId?.role}</span>


                  </div>
                </div>
              </section>
            </>) : (

              <>

                <button
                  className="btn btn-home btn-primary btn-lg border-0 "
                  onClick={() => {
                    navigate("/stafflogin");

                  }}
                >
                  Home
                </button>

                <button
                  className="btn btn-login btn-primary btn-lg border-0 "
                  onClick={() => {
                    navigate("/stafflogin");

                  }}
                >
                  Login
                </button>
              </>
            )}
          </div>
        </main>
      </nav>
    </>
  );
}

export default LoginNav;
