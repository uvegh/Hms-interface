import axios from 'axios'
import React, { useContext, useRef, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { HmsContext } from '../context/HmsContext'


function ForgotPasswordPatient() {

    const baseUrl = "https://gavohms.onrender.com"
    const [isLoading, setIsloading] = useState(false)
    const [validate, setValidate] = useState(false)
    const [errorMessage, setErrorMessage] = useState(false)
    const [showPsswdVerification, setshowPsswdVerification] = useState(false)
    const { currentEmpId, setCurrentEmpId, setCurrentPatientId, currentPatientId } = useContext(HmsContext)
    const [loginData, setLoginData] = useState({
        email: ""

    })
    const [email, setEmail] = useState("")
    const [codeData, setCodeData] = useState({
        code: ""
    })

    const navigate = useNavigate()

    const handleEmailVerification = async (cb) => {

        setIsloading(true)
        if (!loginData.email) {
            setValidate(true)
            console.log(loginData);
            setIsloading(false)
            setErrorMessage("")
            return
        }
        console.log(loginData);
        let response = (await (axios.post(`${baseUrl}/forgotPassword/patient`, loginData)).catch((err) => {
            console.log(err)
            setIsloading(false)
            setshowPsswdVerification(false)
            setErrorMessage("failed to login")
        }))
        console.log(response);
        if (response?.status == "200") {
            setIsloading(false)
            setValidate(false)
            //cb()


            handleEmailHider()

            setshowPsswdVerification(true)
            setLoginData({
                email: "",

            })
            setErrorMessage("")


        }
        if (response?.data?.code == "404") {
            setErrorMessage("This email has no account ")
            setIsloading(false)
            setValidate(false)
            setErrorMessage("Invalid email")
            setshowPsswdVerification(false)
        }




    }

    const handleEmailHider = async () => {
        let visiblept1 = loginData.email.substring(0, 3)
        console.log("visi", visiblept1);
        let re = new RegExp(visiblept1, "g")
        console.log(re);
        console.log((loginData.email).replace(re, "***"))
        setEmail((loginData.email).replace(re, "***"))
    }

    const handleCodeVerification = async () => {



        setIsloading(true)
        if (!codeData || !codeData.length == 6) {
            console.log(codeData);
            setIsloading(false)
            setValidate(true)
            return
        }


        console.log(codeData, "codedata");
        let response = (await (axios.post(`${baseUrl}/forgotPassword/compare/patient`, codeData))).data


        console.log(response);
        if (response?.code == "200") {
            setIsloading(false)
            setCurrentEmpId(response?.id)
            console.log(setCurrentEmpId);
            alert("verification complete")
            navigate("/resetpassword")
            setErrorMessage("")
        }
        if (response?.code == "401") {
            setIsloading(false)
            setErrorMessage("verification failed")
        }
    }

    // const inputRefs=useRef([])
    // const handleKeyPres=(index)=>{
    // const nextIndex=clamp(0,6-1,index+1)
    // inputRefs.current[nextIndex].focus()
    // }

    return (
        <>

            {
                isLoading && (
                    <div className="container-fluid overlay">
                        <div className='loader'>
                            <div className="lds-spinner "><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div>
                        </div>
                    </div>
                )
            }




            <div className="container-fluid position-relative vh-100 forgotPsswd-container " style={{ minHeight: "100%" }}>

                {showPsswdVerification == true ? (
                    <form className=' rounded-5 forgotPsswd-form border border-1  col-4  m-auto mt-5' >
                        <div className='col-10 m-auto mt-5'>
                            <label htmlFor="exampleFormControlInput1" className="form-label fw-bolder fs-2 " style={{
                                color: "#2B415C"
                            }}>Forgot password?</label>
                            <p className=' col-12' style={{
                                color: "#2B415C",
                                fontSize: "0.9rem"
                            }}>Enter the 6-digit verification code sent to  {email}</p>

                            <div className="text-center ">
                                <PinInput length={6} type='numeric' autoSelect={true}
                                    onComplete={(code, index) => {
                                        setCodeData({
                                            code: code
                                        })
                                    }}

                                />
                            </div>
                            <div className='text-center mt-2 container-fluid'>
                                <p className='text-danger ms-auto'>{errorMessage}</p>
                            </div>
                            <p className='text-center mt-2 col-lg-10' style={{ color: "#2B415C" }}> Didn’t get a code? <Link
                                onClick={() => {
                                    handleEmailVerification(handleEmailHider)
                                }}

                            > here</Link> Click  to resend</p>


                        </div>





                        <div className='text-center mt-5 container d-flex justify-content-between col-11 '>
                            <button type='button'
                                onClick={() => {

                                    navigate(-1)
                                }}
                                className="btn btn-cancel btn-primary fs-3 btn-lg border-0 col-lg-5 col-md-5 col-sm-10  p-2" style={{ backgroundColor: " white", padding: " 0.2rem  3.5rem" }} >
                                Cancel
                            </button>

                            <button type='button'
                                onClick={() => {
                                    handleCodeVerification()
                                }}
                                className="btn btn-login btn-primary fs-3 btn-lg border-0 col-lg-5 col-md-5 col-sm-10 p-2" style={{ backgroundColor: " #2B415C", padding: " 0.2rem  3.5rem" }} >
                                Submit
                            </button>


                        </div>

                    </form>) :
                    (<form className=' rounded-5 forgotPsswd-form border border-1  col-4  m-auto mt-5' >
                        <div className='col-10 m-auto mt-5'>
                            <label htmlFor="exampleFormControlInput1" className="form-label fw-bolder fs-2 " style={{
                                color: "#2B415C"
                            }}>Forgot password?</label>
                            <p className=' col-8' style={{
                                color: "#2B415C",
                                fontSize: "0.9rem"
                            }}>Type in the email you signed up with.</p>
                            <div className=" mb-3">
                                <input
                                    onChange={(e) => {
                                        setLoginData({
                                            ...loginData, email: e.target.value

                                        })
                                    }}
                                    type="email" className={validate == true && !loginData.email ? (" form-control border border-danger p-3") : ("form-control p-3")} id="floatingInput" placeholder="Enter email" />
                                {/* <label for="floatingInput">Email address</label> */}
                            </div>


                        </div>





                        <div className='text-center mt-5 '>
                            <button type='button'
                                onClick={() => {
                                    handleEmailVerification(handleEmailHider)
                                    // setshowPsswdVerification(true)
                                }}
                                className="btn btn-login btn-primary fs-3 btn-lg border-0 col-10 p-2" style={{ backgroundColor: " #2B415C", padding: " 0.2rem  3.5rem" }} >
                                Reset Password
                            </button>


                        </div>
                        <div className='text-center mt-2 container-fluid'>
                            <Link style={{
                                color: "#2B415C"
                            }} className='mt-3 fs-4 text-decoration-none'

                                onClick={() => {
                                    navigate(-1)
                                }}

                            >Back</Link>
                        </div>
                        <div className='text-center mt-2 container-fluid'>
                            <p className='text-danger ms-auto'>{errorMessage}</p>
                        </div>
                    </form>)}


            </div>

        </>
    )
}

export default ForgotPasswordPatient