import React, { useContext, useEffect, useState } from "react";
import logo from "../img/ORBIS.png";
import bell from "../img/bell.png";
import closeBtn from "../img/closeBtn.png";
import notificationBar from "../img/notificationBar.png";
import profile from "../img/pexels-photo-6.jpg";
import { Link, useNavigate } from "react-router-dom";
import { HmsContext } from "../context/HmsContext";
import { format, parseISO } from "date-fns";
import TimeAgo from "../TimeAgo";
function PatientNav(props) {
    const {
        isLoggedIn,

        profileObj,
        reloadPatient,
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





    const handleClick = () => {
        setNotificationIsOpen(current => !current);
    };

    const divStyle = {
        transition: 'transform 0.3s ease',
        transform: notificationIsOpen ? 'translateX(0)' : 'translateX(100%)',
        overflow: 'hidden'
    };

    useEffect(() => {
        if (notificationIsOpen) {
            setTimeout(() => {
                setNotificationIsOpen(true);
            }, 1000);
        }
    }, [notificationIsOpen]);






    useEffect(() => {
        reloadPatient();
        handleGetNotifications();
    }, [userNotifications]);
    return (
        <>



            {isLoggedIn == true ? (<div className="notifications-bar col-lg-3 col-md-4 col-sm-11" style={divStyle}>
                <ul className="notification-body container-fluid ">
                    <li>
                        <header className="notifications-header d-flex justify-content-between">
                            <img src={notificationBar} alt="bar" />
                            <h5>Notifications</h5>
                            <img className="closeBtn-header"
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
                                <section className=" d-flex justify-content-between   pt-4 flex-wrap container   ">
                                    <img className="user-icon" src={profile} alt="bar" />
                                    <p className="notification-text">{notification?.info}</p>

                                    <img
                                        onClick={() => {
                                            removeNotification(notification?._id);
                                        }}
                                        className="closeBtn"
                                        src={closeBtn}
                                        alt="close"
                                    />
                                </section>
                                <div className="col-8 ms-auto d-flex justify-content-between time">
                                    <span className="fst-italic fw-lighter ">
                                        <TimeAgo timestamp={notification?.createdAt} />
                                    </span>
                                    <span className=" fw-lighter ">
                                        {notification?.createdAt.substring(11, 16)}
                                    </span>
                                </div>
                            </li>
                        ))
                    )}
                </ul>
            </div>) : null}


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
                                    className="btn btn-home btn-primary btn-lg border-0 me-3 "
                                    onClick={() => {
                                        navigate("/login");
                                    }}
                                >
                                    Home
                                </button>

                                <button
                                    className="btn btn-login btn-primary btn-lg border-0 "
                                    onClick={() => {
                                        navigate("/login");
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

export default PatientNav;
