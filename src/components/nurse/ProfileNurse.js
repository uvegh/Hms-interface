import React, { useCallback } from 'react'
import { useContext, useEffect, useState, useRef } from 'react'
import { BsFileEarmarkMedical } from 'react-icons/bs'
import { FiCamera, FiEdit3, FiUser } from 'react-icons/fi'
import { TbPrescription, TbCalendarEvent } from 'react-icons/tb'
import Calender from 'react-calendar'
import Stethoscope from '../../img/stethoscope.svg'
import profile from '../../img/pexels-photo-6.jpg'
import camera from '../../img/camera.png'
import photoIcon from '../../img/photoIcon.png'
import removePhoto from '../../img/removePhoto.png'
import { Link, useNavigate } from "react-router-dom";
import axios from 'axios'
import { HmsContext } from '../../context/HmsContext'
import { ToastContainer } from 'react-toastify'
import { TiTimes } from 'react-icons/ti'
import Webcam from 'react-webcam'
function ProfileNurse() {
    const { currentEmpId,
        nurseObj,
        setIsLoggedIn,
        customAlertNotify,
        customAlertWarning,
        setCurrentEmpId,
        reload,
        profileObj,
        removePfp } = useContext(HmsContext)
    const baseUrl = "https://gavohms.onrender.com"

    const [isLoading, setIsloading] = useState(false);
    const [validate, setValidate] = useState(false);
    const [errorMessage, setErrorMessage] = useState(false);
    const [match, setMatch] = useState(true)
    const [viewFullPfp, setViewFullPfp] = useState(false)
    const [liveSelfie, setLiveSelfie] = useState(false)
    const [viewphoto, setViewPhoto] = useState(false)

    const navigate = useNavigate()
    const [loginData, setLoginData] = useState({
        emailOrPhone: currentEmpId?.email,
        password: "",
        newPassword: "",
        confirmNewPassword: ""
    })

    const inputRef = useRef(null)
    const webcamRef = useRef(null)
    const [pfp, setPfp] = useState()

    const vidRef = useRef(null)
    const photoRef = useRef(null)
    const handleAddPfp = () => {

        inputRef.current.click()
    }
    const [imageSrc, setImageSrc] = useState(null);
    const fileReader = new FileReader()
    const capture = () => {
        const imageSrc = webcamRef.current.getScreenshot();
        setImageSrc(imageSrc);
        console.log(imageSrc);
    };

    const handleImgChange = (e) => {
        const fileObj = e.target.files && e.target.files[0]
        if (!fileObj) {
            return
        }
        console.log(fileObj);
    }


    const updatepsswd = async () => {
        setIsloading(true);
        if (!loginData.emailOrPhone || !loginData.password || !loginData.newPassword || !loginData.password) {
            setValidate(true);
            console.log(loginData);
            setIsloading(false);
            setErrorMessage("");
            return;
        }
        console.log("this is", loginData);
        let response = await axios
            .post(`${baseUrl}/auth/employee`, loginData)

            .catch((err) => {
                setErrorMessage("failed to login");
                console.log(err);
                alert("failed to login");
                setIsloading(false);
            });

        console.log(response);
        if (response?.status == "200") {
            setIsloading(false);
            setValidate(false);

            if (loginData.newPassword === loginData.confirmNewPassword) {
                setMatch(true)
                let updateResponse = await (axios.put(`${baseUrl}/employee/${currentEmpId?.id}/pwd`, {
                    password: loginData.newPassword
                })).catch((err) => {
                    console.log(err);
                })

                console.log(updateResponse);
                if (updateResponse?.status == "200") {
                    setIsloading(false)
                    setValidate(false)

                    //alert("password updated")
                    customAlertNotify("password has been reset")
                    setLoginData({
                        confirmNewPassword: "",
                        password: "",
                        newPassword: ""

                    })
                    setErrorMessage("")
                    return
                }

                setIsloading(false)
                setValidate(false)
                setErrorMessage("failed to reset password")
                customAlertWarning("failed to reset password")
                return
            }
            customAlertWarning("Passwords do not match ")
            // alert("failed to reset")
            setMatch(false)

        } else {
            setIsloading(false)
            setValidate(false)
            setMatch(true)
            customAlertWarning("Invalid Password")
            alert("invalid password")
            setErrorMessage("invalid credentials");
        }
    }


    const getLiveVideo = () => {
        //get access to camera of any user
        navigator.mediaDevices.getUserMedia({
            video: true
        }).then((stream) => {
            //attach stream to video ref and tag
            let video = vidRef.current
            video.srcObject = stream
            video.play()//make video play
        }).catch((err) => console.log(err))
    }

    const takePicture = () => {
        let width = 100
        let height = 50

        let photo = photoRef.current
        let video = vidRef.current

        photo.width = width
        photo.height = height

        //get contex of image
        let ctx = photo.getContext('2d')
        //draw image
        ctx.drawImage(video, 0, 0, photo.width, photo.height)//pass  video tag through ref and x,y height and width coordinates

    }

    const cancelImg = () => {
        let photo = photoRef.current
        let ctx = photo.getContext('2d')
        ctx.clearRect(0, 0, photo.width, photo.height)//clear current photo
    }




    useEffect(() => {

        reload()
        //console.log(baseUrl);
    }, [profileObj])



    const webcamStyle = {
        width: '100%',
        maxWidth: '500px',
        borderRadius: '46%',
        height: '100%',

        boxShadow: '0 2px 4px rgba(0, 0, 0, 0.2)',
        marginLeft: '35%',
        textAlign: 'center'
    };

    return (
        <>
            {liveSelfie && (
                <div className="overlay">
                    <div className="live-video">

                        <div className="d-flex fs-3 text-white col-12 justify-content-end">
                            <span onClick={() => {
                                setLiveSelfie(false)
                            }}> <TiTimes /> </span>
                        </div>
                        {/* <div className="text-center d-block">

                            {
                                viewphoto == false ? (
                                    <>
                                        <video className='container' ref={vidRef}></video> <br />
                                        <button className='btn btn-primary fs-2  rounded-circle border-0 ' onClick={
                                            () => {
                                                setViewPhoto(true)
                                                takePicture()

                                            }

                                        }>
                                            <FiCamera />

                                        </button>
                                    </>

                                ) : (
                                    <>
                                        <canvas ref={photoRef}>

                                        </canvas>
                                        <button className='btn btn-danger'
                                            onClick={cancelImg}
                                        > cancel</button>
                                    </>

                                )
                            }


                        </div> */}
                        <div>
                            {
                                imageSrc == null ? (
                                    <>
                                        <section className='live-video'>
                                            <Webcam className=''
                                                audio={false}
                                                ref={webcamRef}
                                                style={webcamStyle}

                                            /> <br />
                                            <div className='text-center'>
                                                <button className='rounded btn btn-primary border-0 p-3' onClick={capture}><FiCamera /></button>
                                            </div>
                                        </section>
                                    </>
                                ) : (null)
                            }


                            {imageSrc && (<>
                                <div className="m-auto text-center mt-2">
                                    <img src={imageSrc} alt="Captured" /> <br />
                                    <div className="m-auto text-center mt-2">
                                        <button className='col-1 btn btn-primary bg-white border-2 text-dark '
                                            onClick={() => {
                                                setImageSrc(null)
                                            }}
                                        >Retake </button>
                                        <button className='btn btn-primary border-0 col-1'>Use </button>
                                    </div>
                                </div>
                            </>

                            )}
                        </div>
                    </div>
                </div>

            )


            }

            {viewFullPfp && (
                <div className="overlay">
                    <div className="container  add-patient-form">

                        <div className="d-flex fs-3 text-white col-12 justify-content-end">
                            <span onClick={() => {
                                setViewFullPfp(false)
                            }}> <TiTimes /> </span>
                        </div>
                        <div className="text-center">
                            <img className='img-fluid' src={`${baseUrl}/${currentEmpId?.avatar}`} alt="" />
                        </div>

                    </div>
                </div>

            )


            }
            <section className='doctor__dashboard'>
                <div className='doctor_sidebar'>
                    <div className='links_display_box'>
                        <div className='clinic_name'>
                            <div className='organization_image'>
                                <img src={Stethoscope} alt='' className='logo' />
                            </div>
                            <div className='organization_name'>
                                <h2>
                                    <span>Health</span>Line Clinic
                                </h2>
                            </div>
                        </div>
                        <ul className="sidebar_link_btns">
                            <li className="sidebar_btn active">
                                <Link to="/nurse/dashboard"> Dashboard </Link>
                            </li>
                            <li className="sidebar_btn">
                                <Link to="/nurse/patient"> Patients </Link>
                            </li>
                            <li className="sidebar_btn">
                                <Link to="/nurse/bedAllotment"> Wards </Link>
                            </li>

                            <li className="sidebar_btn">
                                <Link to="/nurse/management"> Management </Link>
                            </li>
                            <li className="sidebar_btn">
                                <Link to="/nurse/profile"> Profile </Link>
                            </li>
                            <li className='sidebar_btn'
                                onClick={() => {
                                    navigate("/stafflogin");
                                    setIsLoggedIn(false)
                                }}
                            >
                                <div> Logout </div>
                            </li>
                        </ul>
                    </div>
                </div>
                <div className='doctor_daily_info'>
                    <div className='doctors_header'>
                        <div className='present_section'>
                            <h2>Profile</h2>
                        </div>
                        
                    </div>



                    <div className=" container-fluid add-patient-form ">
                        <ToastContainer />

                        <div className="  found-patient-details  col-lg-12 col-md-10 m-auto mt-1 rounded p-5 profile-nurse bg-white">
                            <div className=" text-center mb-3">
                                <section className='d-flex justify-content-center'>

                                    <img
                                        onClick={() => {
                                            setViewFullPfp(true)
                                        }}

                                        className='user_view_icon border-1' src={`${baseUrl}/${profileObj?.avatar}`} alt="avatar" />

                                    <div className="dropdown align-bottom pt-5">
                                        <Link className="btn bg-white border-0   fs-4 text-dark" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                            <FiEdit3 />
                                        </Link>

                                        <ul className="dropdown-menu edit-profile-dropdown">
                                            <li
                                                onClick={() => {
                                                    handleAddPfp()
                                                }}
                                            >
                                                <input type="file" hidden
                                                    ref={inputRef}
                                                    onChange={handleImgChange}
                                                />
                                                <Link className="dropdown-item" >
                                                    <img className='me-2' src={photoIcon} alt="" />
                                                    Choose from gallery</Link>
                                            </li>
                                            <li
                                                onClick={() => {
                                                    setLiveSelfie(true)
                                                    getLiveVideo()
                                                }}
                                            ><Link className="dropdown-item new-photo " >
                                                    <img className='me-2' src={camera} alt="" />
                                                    Take new photo</Link></li>

                                            <li
                                                onClick={() => { }}
                                            ><Link className="dropdown-item"
                                                onClick={removePfp}
                                            >
                                                    <img className='me-2' src={removePhoto} alt="" />
                                                    Remove picture</Link></li>
                                        </ul>

                                    </div>
                                </section>


                                <p className='text-uppercase'>#{currentEmpId?.id?.substring(18, 24)}/Nr </p>
                            </div>


                            <div className="row g-3 rounded border border-light p-3 ">
                                <div className="col-md-6">
                                    <label htmlFor='' className="form-label">NAME</label>
                                    <p className='   ' >{` ${currentEmpId?.first_name} ${currentEmpId?.last_name}`} </p>
                                </div>

                                <div className="col-md-6">
                                    <label htmlFor='' className="form-label ">EMAIL</label>
                                    <p className='   email' >{currentEmpId?.email} </p>
                                </div>

                                <div className="col-md-6">
                                    <label htmlFor='' className="form-label" >PHONE</label>
                                    <p className='   ' >{currentEmpId?.phone}</p>
                                </div>

                                <div className="col-md-6">
                                    <label htmlFor='' className="form-label">GENDER</label>
                                    <p className='  ' >{currentEmpId?.gender}</p>
                                </div>



                                <div className="col-md-6">
                                    <label htmlFor='' className="form-label" >ROLE</label>
                                    <p className=' rounded p-2 '>{currentEmpId?.role}</p>
                                </div>

                                <div className="col-md-6" style={{ overflowX: "scroll" }}>
                                    <label htmlFor='' className="form-label">ADDRESS</label>
                                    <p className=''>{currentEmpId?.address}</p>
                                </div>
                                <div className="col-md-6">
                                    <label htmlFor='' className="form-label">DEPARTMENT</label>
                                    <p className='  ' >{currentEmpId?.department?.name}</p>
                                </div>

                                <div className="col-md-6">
                                    <label htmlFor='' className="form-label">HEAD_OF_DEPARTMENT</label>
                                    <p className='   '>{currentEmpId?.department?.head_of_dept}</p>
                                </div>






                            </div>
                        </div>
                        <h4 className='mt-5'>Edit Password</h4>
                        <div className="  found-patient-details  col-lg-12 col-md-10 m-auto mrounded p-2 profile-nurse bg-white mt-1 ">


                            <div className="row g-3 rounded border border-light p-3 ">
                                <div className="col-md-4">
                                    <label htmlFor='' className="form-label">Current Password</label>
                                    <input
                                        value={loginData.password}
                                        onChange={(e) => {
                                            setLoginData({
                                                ...loginData, password: e.target.value
                                            })
                                        }}
                                        className={validate == true && !loginData.password ?
                                            'form-control border-danger' : 'form-control'} />

                                    {validate == true && !loginData.password ? (<span className='text-danger'>*empty field</span>) : (null)}
                                </div>

                                <div className="col-md-4">
                                    <label htmlFor='' className="form-label"> New Password</label>
                                    <input className={match == false || !loginData.newPassword && validate == true ? ("form-control border-danger") : ("form-control")}
                                        value={loginData.newPassword}
                                        onChange={(e) => {
                                            setLoginData({
                                                ...loginData, newPassword: e.target.value
                                            })
                                        }}

                                    />
                                </div>

                                <div className="col-md-4">
                                    <label htmlFor='' className="form-label">Confirm New Password</label>
                                    <input className={match == false || !loginData.confirmNewPassword && validate == true ? ("form-control border-danger") : ("form-control")}
                                        value={loginData.confirmNewPassword}
                                        onChange={(e) => {
                                            setLoginData({
                                                ...loginData, confirmNewPassword: e.target.value
                                            })
                                        }}


                                    />
                                </div>
                                <span>{errorMessage}</span>


                                {isLoading == true ? (
                                    <>
                                        <div className="text-center mt-5 fw-bold">
                                            <div className="spinner-border" role="status">
                                                <span className="visually-hidden">Loading...</span>
                                            </div>
                                        </div>
                                    </>
                                ) : (
                                    <>
                                        <div className="text-center mt-5 fw-bold">
                                            <button
                                                onClick={() => {
                                                    updatepsswd()
                                                }}
                                                className='btn btn-primary border-0 col-6 fs-4'>
                                                Change Password
                                            </button>
                                        </div>
                                    </>
                                )}






                            </div>

                        </div>

                    </div>


                </div>
            </section>


        </>
    )
}

export default ProfileNurse