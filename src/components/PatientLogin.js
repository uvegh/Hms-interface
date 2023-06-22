import React, { useContext, useEffect, useState } from 'react'
import logo from '../img/ORBIS.png'
import { Link, useNavigate } from 'react-router-dom'
import bgImg1 from '../img/Rectangle 5.png'
import appleLogo from '../img/apple-logo 1.png'
import googleIcon from '../img/google-icon-logo-png-transparent 1.png'
import jwt_decode from 'jwt-decode'
import axios from 'axios'
import { HmsContext } from '../context/HmsContext'
import SpinnerLoader from './SpinnerLoader'
function PatientLogin() {
  const baseUrl = 'https://gavohms.onrender.com'
  const [isLoading, setIsloading] = useState(false)
  const [validate, setValidate] = useState(false)
  const [errorMessage, setErrorMessage] = useState(false)
  const [loginData, setLoginData] = useState({
    emailOrPhone: '',
    password: ''
  })

  const { patientGoogleObj, setPatientGoogleObj,
    setCurrentEmpId,
    setIsLoggedIn } = useContext(HmsContext)
  const navigate = useNavigate()
  const handleLogin = async () => {
    setIsloading(true)
    if (!loginData.emailOrPhone || !loginData.password) {
      setValidate(true)
      console.log(loginData)
      setIsloading(false)
      setErrorMessage('')
      return
    }
    console.log(loginData)
    let response = await axios
      .post(`${baseUrl}/auth/user`, loginData)
      .catch(err => {
        console.log(err)
        setIsloading(false)
        setErrorMessage('failed to login')
      })
    console.log(response)
    if (response?.status == '200') {
      setIsloading(false)
      setValidate(false)
      setCurrentEmpId(response?.data?.data)
      setIsLoggedIn(true)
      navigate("/patient/dashboard", { replace: true })
      //console.log(response?.data?.data)
      alert('logged in')
      setLoginData({
        emailOrPhone: '',
        password: ''
      })
      setErrorMessage('')
    } else {
      setIsloading(false)
      setValidate(false)
      setErrorMessage('Invalid email or password')
    }
  }

  let userDets = {}
  async function handleCallbackResponse(response) {
    setIsloading(true)
    console.log('encoded response', response.credential)
    userDets = jwt_decode(response.credential)
    setPatientGoogleObj(userDets)
    console.log(userDets)

    verifyGoogleLogin()
  }

  const verifyGoogleLogin = async () => {
    if (userDets?.email_verified == true) {
      let findUser = await axios
        .get(`${baseUrl}/patient?email=${userDets?.email}`)
        .catch(err => {
          setIsloading(false)
          console.log(err)
        })
      console.log(findUser)

      if (findUser?.data?.patients?.data?.length == 0) {
        setIsloading(false)
        alert('failed to login ')
        return
      }

      alert('login successful')
      setIsLoggedIn(true)
      setIsloading(false)
      setCurrentEmpId(findUser?.data?.patients?.data)
    } else {
      setIsloading(false)
      setErrorMessage('invalid email')
    }
  }

  useEffect(() => {
    google.accounts.id.initialize({
      client_id:
        '357757074966-ikdbg0dl0d764pni87ne7u3shvdr7n5s.apps.googleusercontent.com',
      callback: handleCallbackResponse
    })
  }, [])
  google.accounts.id.renderButton(document.getElementById('signInGoogle'), {
    size: 'large'
  })

  return (
    <>
      {isLoading && (
        <SpinnerLoader />
      )}

      <div className='containerbg pb-5 container-fluid'>
        <main className='login-banner m-auto    '>
          <div className='row' style={{ height: '100%' }}>
            <section
              className='col-lg-6 col-md-6 col-sm-12 join-us-banner'
              style={{
                background: 'rgba(255, 255, 255, 0.23)'
              }}
            >
              <section className=''>
                <p
                  className='fw-bolder mt-5 pt-5 ps-5'
                  style={{ color: '#E9E9E9', fontSize: '5rem' }}
                >
                  join us
                </p>

                <p
                  className='ps-5'
                  style={{ color: '#FFFFFF', fontWeight: '600' }}
                >
                  Let Orbis help streamline your hospital operations <br /> with
                  ease
                </p>
              </section>
            </section>

            <section className='bg-white col-lg-6 col-md-6 col-sm-12    login-area '>
              <header style={{ color: ' #2B415C' }}>
                <h3 className='pt-5 text-center'>
                  Login to your patient account
                </h3>
              </header>
              <form className=' rounded-1 border border-1 p-3 col-9 m-auto mt-5'>
                <div className='col-9 m-auto'>
                  <label
                    htmlFor='exampleFormControlInput1'
                    className='form-label fw-bolder '
                    style={{
                      color: '#000000'
                    }}
                  >
                    Email
                  </label>
                  <div className='form-floating mb-3'>
                    <input
                      onChange={e => {
                        setLoginData({
                          ...loginData,
                          emailOrPhone: e.target.value
                        })
                      }}
                      type='email'
                      value={loginData.emailOrPhone}
                      className={
                        validate == true && !loginData.emailOrPhone
                          ? ' form-control border border-danger '
                          : 'form-control'
                      }
                      id='floatingInput'
                      placeholder='name@example.com'
                    />
                    <label htmlFor='floatingInput'>Email address</label>
                  </div>
                  {/* {validate == true && !loginData.email ? (<p className='text-danger'>*empty</p>) : (null)} */}
                </div>

                <div className='col-9 m-auto'>
                  <label
                    htmlFor='exampleFormControlInput1'
                    className='form-label fw-bolder '
                    style={{
                      color: '#000000'
                    }}
                  >
                    Password
                  </label>
                  <div className='form-floating mb-3'>
                    <input
                      type='password'
                      onChange={e => {
                        setLoginData({
                          ...loginData,
                          password: e.target.value
                        })
                      }}
                      value={loginData.password}
                      className={
                        validate == true && !loginData.password
                          ? ' form-control border border-danger '
                          : 'form-control'
                      }
                      id='floatingInput'
                      placeholder='****'
                    />
                    <label htmlFor='floatingInput'>Password</label>
                  </div>
                  <Link
                    to='/forgotpassword-patient'
                    className='d-flex justify-content-end forgot-psswd text-decoration-none '
                  >
                    forgot password?
                  </Link>
                  {/* {validate == true && !loginData.password ? (<p className='text-danger'></p>) : (null)} <br/> */}
                  <p className='text-danger'> {errorMessage}</p>
                </div>

                <div className='text-end'>
                  <Link></Link>
                </div>
                <div className='text-center'>
                  <button
                    type='button'
                    onClick={() => {
                      handleLogin()
                    }}
                    className='btn btn-login btn-primary btn-lg border-0 col-9 p-2'
                    style={{
                      backgroundColor: ' #2B415C',
                      padding: ' 0.2rem  3.5rem'
                    }}
                  >
                    Login
                  </button>
                </div>
              </form>
              <div className='optional-login col-9  text-center  m-auto mt-5'>
                <div>
                  <div className='col-12'>
                    <div
                      className='rounded-3 google-signIn p-2 btn-primary  col-12 text-decoration-none text-center'
                      id='signInGoogle'
                    ></div>
                  </div>
                </div>
                <br />

                <div className='mt-3 mb-5'>
                  <button className='rounded-3 google-signIn p-2 btn-primary  col-12 text-decoration-none text-center'>
                    <img src={appleLogo} className='img-fluid' /> Login with
                    Apple
                  </button>
                </div>
              </div>
            </section>
          </div>
        </main>
      </div>
    </>
  )
}

export default PatientLogin
