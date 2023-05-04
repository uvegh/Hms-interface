
import "./css/style.css";
import {BrowserRouter,Routes,Route} from "react-router-dom"
import Login from "./components/StaffLogin";
import Footer from "./components/Footer";
import PatientLogin from "./components/PatientLogin";
import StaffLogin from "./components/StaffLogin";
import LoginNav from "./components/LoginNav";
import ForgotPassword from "./components/ForgotPassword";
import ResetPassword from "./components/ResetPassword";
import HmsProvider from "./context/HmsContext";

import ResetPasswordPatient from "./components/ResetPasswordPatient";
import ForgotPasswordPatient from "./components/ForgotPasswordPatient";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { useEffect } from "react";

export default function App() {


  return (
   <>
   <GoogleOAuthProvider clientId="357757074966-ikdbg0dl0d764pni87ne7u3shvdr7n5s.apps.googleusercontent.com">
   <BrowserRouter>
   <HmsProvider>
   <LoginNav/>
   <Routes>
<Route path='/login' element={<PatientLogin/> } />
<Route path='/staffLogin' element={<StaffLogin/> } />
<Route path='/forgotpassword' element={<ForgotPassword/> } />
<Route path='/forgotpassword-patient' element={<ForgotPasswordPatient/> } />
<Route path='/resetpassword' element={<ResetPassword/> } />
<Route path='/resetpassword-patient' element={<ResetPasswordPatient/> } />
   </Routes>
   <Footer/>
   </HmsProvider>
   </BrowserRouter>
   </GoogleOAuthProvider>
   </>
  );
}
