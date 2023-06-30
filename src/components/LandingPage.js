import { Link, useNavigate } from "react-router-dom"
import Stethoscope from '../img/stethoscope.svg'

function LandingPage() {
    const navigate = useNavigate()

    return (<>


        <div className="containerbg  container-fluid vh-100 landingPage" >
            <div className="">
                <main className='container-fluid rounded-5 border border-1  bg-white col-lg-6 col-md-6 col-sm-12 p-5  m-auto home ' >


                    <div className='clinic_name d-flex justify-content-center'>
                        <div className='organization_image '>
                            <img className="img-fluid" src={Stethoscope} alt='' /></div>
                        <div className='organization_name'>
                            <h2>
                                <span>Health</span>Line Clinic
                            </h2>
                        </div>
                    </div>



                    <div className='text-center mt-3 m-auto '>
                        <button type='button'

                            className="btn btn-login btn-primary mt-3 fs-3 btn-lg border-0 col-lg-8 col-md-8 col-sm-6 p-2" style={{ backgroundColor: " #2B415C", padding: " 0.2rem  3.5rem" }}
                            onClick={() => {
                                navigate("/stafflogin")
                            }}
                        >
                            Staff Login
                        </button>


                        <button type='button'

                            className="btn btn-login btn-primary mt-5 fs-3 btn-lg border-0 col-lg-8 col-md-8 col-sm-6 p-2" style={{ backgroundColor: " #2B415C", padding: " 0.2rem  3.5rem" }}
                            onClick={() => {
                                navigate("/login")
                            }} >
                            Patient Login
                        </button>
                    </div>


                </main>
            </div>
        </div>
    </>
    )
}
export default LandingPage