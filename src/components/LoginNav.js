import React, { useContext, useEffect, useState } from "react";
import logo from "../img/ORBIS.png";
import bell from "../img/bell.png";
import closeBtn from "../img/closeBtn.png";
import notificationBar from "../img/notificationBar.png";
import profile from "../img/pexels-photo-6.jpg";
import { Link, useNavigate } from "react-router-dom";
import { HmsContext } from "../context/HmsContext";
function LoginNav(props) {
  const {
    isLoggedIn,
    setIsLoggedIn,
    profileObj,
    reload,
    currentEmpId,
    userNotifications,
    setViewNotification,
    handleGetNotifications,
    removeNotification,
    setNotificationIsOpen,
    notificationIsOpen
  } = useContext(HmsContext);

  const baseUrl = "https://gavohms.onrender.com";
  const navigate = useNavigate();






  useEffect(() => {
    if (notificationIsOpen) {
      setTimeout(() => {
        setNotificationIsOpen(true);
      }, 1000);
    }
  }, [notificationIsOpen]);

  const handleClick = () => {
    setNotificationIsOpen(current => !current);
  };

  const divStyle = {
    transition: 'transform 0.3s ease',
    transform: notificationIsOpen ? 'translateX(0)' : 'translateX(100%)',
    overflow: 'hidden'
  };

  useEffect(() => {
    reload();
    handleGetNotifications();
  }, [userNotifications]);
  return (
    <>



      <div className="notifications-bar col-lg-3" style={divStyle}>
        <ul className="notification-body container-fluid ">
          <li>
            <header className="notifications-header d-flex justify-content-between">
              <img src={notificationBar} alt="bar" />
              <h5>Notifications</h5>
              <img
                onClick={() => {

                  setViewNotification(false)
                  setNotificationIsOpen(false)
                }}
                src={closeBtn} alt="close" />
            </header>
          </li>
          {userNotifications?.length == 0 ? (
            <li className="border-bottom bg-white">
              <section className="   text-center container   ">
                <p>No new notifications</p>
              </section>
            </li>
          ) : (
            userNotifications?.map((notification, i) => (
              <li className="border-bottom bg-white" key={i}>
                <section className=" d-flex justify-content-between  align-content-center pt-4 flex-wrap container   ">
                  <img className="user-icon" src={profile} alt="bar" />
                  <p>{notification?.info}</p>

                  <img
                    onClick={() => {
                      removeNotification(notification?._id);
                    }}
                    className="closeBtn"
                    src={closeBtn}
                    alt="close"
                  />
                </section>
              </li>
            ))
          )}
        </ul>
      </div>


      <nav className="fixed-top container-fluid ">
        <main className="navbar container ">
          <img className="logo ms-2" src={logo} alt="" />

          <div className="nav-links">
            {isLoggedIn == true ? (
              <>
                <section className="d-flex  logged-in-profile">
                  <div className="position-relative">
                    <Link className="me-4 text-decoration-none nav-item fs-4 fw-bolder"
                      onClick={() => {
                        handleClick()
                      }}
                    >
                      <img src={bell} alt="alert" />
                    </Link>

                    <span className="position-absolute top-0 start-50 mt-1 translate-middle badge rounded-pill bg-danger">
                      {userNotifications?.length}
                      <span className="visually-hidden">unread messages</span>
                    </span>
                  </div>

                  <div className="d-flex">
                    <div className="position-relative">
                      <img
                        className="profile_avi"
                        src={profileObj?.avatar}
                        alt=""
                      />

                    </div>
                    <div className="d-block logged-in-profile-details">
                      <p>

                        {` ${currentEmpId?.first_name} ${currentEmpId?.last_name}`}
                      </p>
                      <span className="">{currentEmpId?.role}</span>
                    </div>
                  </div>
                </section>
              </>
            ) : (
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
