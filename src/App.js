
import "./css/style.css";
import {BrowserRouter,Routes,Route} from "react-router-dom"
import Login from "./components/StaffLogin";
import Footer from "./components/Footer";
import PatientLogin from "./components/PatientLogin";
import StaffLogin from "./components/StaffLogin";
import LoginNav from "./components/LoginNav";
import ForgotPassword from "./components/ForgotPassword";
export default function App() {
  return (
   <>
   <BrowserRouter>
   <LoginNav/>
   <Routes>
<Route path='/login' element={<PatientLogin/> } />
<Route path='/staffLogin' element={<StaffLogin/> } />
<Route path='/forgotpassword' element={<ForgotPassword/> } />
   </Routes>
   <Footer/>
   </BrowserRouter>
   
   
   </>
  );
}
