import React, { useEffect, useState } from 'react'
import logo from "../img/ORBIS.png"
import { Link } from 'react-router-dom'
import bgImg1 from "../img/Rectangle 5.png"
import appleLogo from "../img/apple-logo 1.png"
import googleIcon from "../img/google-icon-logo-png-transparent 1.png"
import axios from 'axios'
function PatientLogin() {
  const baseUrl = "https://gavohms.onrender.com"
  const [isLoading, setIsloading] = useState(false)
  const [validate, setValidate] = useState(false)
  const [errorMessage,setErrorMessage]=useState(false)
  const [loginData, setLoginData] = useState({
    email: "",
    password: ""
  })




  const handleLogin = async () => {

    setIsloading(true)
    if (!loginData.email || !loginData.password) {
      setValidate(true)
      console.log(loginData);
      setIsloading(false)
      setErrorMessage("")
      return
    }
    console.log(loginData);
    let response = (await (axios.post(`${baseUrl}/auth/user`, loginData)).catch((err) => {
      console.log(err)
      setIsloading(false)
      setErrorMessage("failed to login")
    }))
    console.log(response);
    if (response?.status == "200") {
      setIsloading(false)
      setValidate(false)
      alert("logged in")
      setLoginData({
        email: "",
        password: ""
      })
      setErrorMessage("")
    }
    else {
      setIsloading(false)
      setValidate(false)
      setErrorMessage("Invalid credentials")
    }
  }


  useEffect(() => {

  }, [])


  return (
    <>

      {
        isLoading && (
          <div className="container-fluid overlay">
            <div className='loader m-auto'>
              <div className="lds-spinner text-center m-auto"><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div>
            </div>
          </div>
        )
      }


      <div className='' >
       

        <div className="containerbg pt-5 pb-5 container-fluid">
          <main className="login-banner m-auto vh-100  d-block justify-content-between " >
            <div className="row ">
              <div className="col-4 me-5 mt-5">
                <section className=''>
                  <p className='fw-bolder mt-5 pt-5 ps-5' style={{ color: "#E9E9E9", fontSize: "5rem" }}>join us</p>

                  <p className='ps-5' style={{ color: "#FFFFFF", fontWeight: "600" }}>Let Orbis help streamline your hospital operations <br /> with ease</p>
                </section>
              </div>




              <div className=" col m-auto" style={{ width: "97% !important" }}>
                <section className='bg-white vh-100 m-auto ' style={{ height: "100%", borderRadius: "0rem 2rem 2rem 0rem" }}>
                  <header style={{ color: " #2B415C" }}>
                    <h3 className='pt-5 text-center'>Login to your patient account</h3>
                  </header>
                  <form className=' rounded-1 border border-1 p-3 col-9 m-auto mt-5' >
                    <div className='col-9 m-auto'>
                      <label for="exampleFormControlInput1" className="form-label fw-bolder " style={{
                        color: "#000000"
                      }}>Email</label>
                      <div className="form-floating mb-3">
                        <input
                          onChange={(e) => {
                            setLoginData({
                              ...loginData, email: e.target.value

                            })
                          }}
                          type="email"   className=  {validate==true&&!loginData.email?(" form-control border border-danger "):("form-control")}  id="floatingInput" placeholder="name@example.com" />
                        <label for="floatingInput">Email address</label>
                      </div>
                      {/* {validate == true && !loginData.email ? (<p className='text-danger'>*empty</p>) : (null)} */}
                    
                    </div>


                    <div className='col-9 m-auto'>
                      <label for="exampleFormControlInput1" className="form-label fw-bolder " style={{
                        color: "#000000"
                      }}>Password</label>
                      <div className="form-floating mb-3">
                        <input type="password"
                          onChange={(e) => {
                            setLoginData({
                              ...loginData, password: e.target.value
                            })

                          }}
                          className=  {validate==true&&!loginData.password?(" form-control border border-danger "):("form-control")}  id="floatingInput" placeholder="****" />
                        <label for="floatingInput">Password</label>
                      </div>
                     <Link className='d-flex justify-content-end forgot-psswd text-decoration-none '>forgot password?</Link>
                   {/* {validate == true && !loginData.password ? (<p className='text-danger'></p>) : (null)} <br/> */}
                   <p className='text-danger'> {errorMessage}</p>
                    </div>

                    <div className='text-end'>
                      <Link></Link>
                    </div>
                    <div className='text-center'>
                      <button type='button'
                        onClick={() => {
                          handleLogin()
                        }}
                        className="btn btn-login btn-primary btn-lg border-0 col-9 p-2" style={{ backgroundColor: " #2B415C", padding: " 0.2rem  3.5rem" }} >
                        Login
                      </button>
                    </div>

                  </form>
                  <div className="optional-login col-9  text-center d-block m-auto mt-2">
                    <div>
                      <button className='rounded-3 btn btn-primary p-2   google-signIn col-12 p-2  text-decoration-none text-center'>
                        <img src={
                          googleIcon} alt="" /> Login with Google
                      </button>
                    </div>
                    <br />

                    <div className=''>
                      <button className='rounded-3 google-signIn p-2 btn-primary  col-12 text-decoration-none text-center'>
                        <img src={
                          appleLogo} className='img-fluid' /> Login with Apple
                      </button>
                    </div>
                  </div>

                </section>
              </div>
            </div>



          </main>
        </div>

      </div>


    </>
  )
}

export default PatientLogin