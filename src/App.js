import "./css/style.css";
// import './css/'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./components/StaffLogin";
import Footer from "./components/Footer";
import PatientLogin from "./components/PatientLogin";
import StaffLogin from "./components/StaffLogin";
import LoginNav from "./components/LoginNav";
import ForgotPassword from "./components/ForgotPassword";
import ResetPassword from "./components/ResetPassword";
import HmsProvider, { HmsContext } from "./context/HmsContext";

import ResetPasswordPatient from "./components/ResetPasswordPatient";
import ForgotPasswordPatient from "./components/ForgotPasswordPatient";
import { GoogleOAuthProvider } from "@react-oauth/google";

import DoctorLayout from "./components/doctor/DoctorLayout";
import DoctorProtected from "./components/doctor/DoctorProtected";
import DoctorDashboard from "./components/doctor/Dashboard";
import PatientDashboard from "./components/doctor/PatientDashboard";
import NotFound from "./components/NotFound";
import AdminLayout from "./components/admin/AdminLayout";
import SuperAdminLayout from "./components/superAdmin/SuperAdminLayout";
import PharmacistLayout from "./components/pharmacist/PharmacistLayout";
import NurseLayout from "./components/nurse/NurseLayout";
import LabLayout from "./components/lab/LabLayout";
import DoctorDiagnosis from "./components/doctor/Dd";
import ReceptionistLayout from "./components/receptionist/ReceptionistLayout";
import DashboardRec from "./components/receptionist/Dashboardrec";


export default function App() {
  return (
    <>
      <HmsProvider>
        <GoogleOAuthProvider clientId="357757074966-ikdbg0dl0d764pni87ne7u3shvdr7n5s.apps.googleusercontent.com">
          <BrowserRouter>
            <LoginNav />

            <Routes>
              <Route path="*" element={<NotFound />} />
              <Route path="/login" element={<PatientLogin />} />
              <Route path="/staffLogin" element={<StaffLogin />} />
              <Route path="/forgotpassword" element={<ForgotPassword />} />
              <Route
                path="/forgotpassword-patient"
                element={<ForgotPasswordPatient />}
              />
              <Route path="/resetpassword" element={<ResetPassword />} />
              <Route
                path="/resetpassword-patient"
                element={<ResetPasswordPatient />}
              />

              <Route path="/doctor" element={<DoctorLayout />}>
                <Route path="dashboard" element={
                    // <DoctorProtected>
                    <DoctorDashboard />
                    // </DoctorProtected>
                  }
                />
                <Route
                  path="patient"
                  element={
                    // <DoctorProtected>
                    <PatientDashboard />
                    // </DoctorProtected>
                  }
                />
                  <Route path="diagnosis" element={<DoctorDiagnosis />} />
              </Route>
              {/* doctor disgnosis route here */}
            
              <Route path="/receptionist" element={<ReceptionistLayout />}>
                <Route path="dashboard" element={ <DashboardRec /> }/>
               
                
              </Route>

              <Route path="/admin" element={<AdminLayout />}></Route>
              <Route path="/super" element={<SuperAdminLayout />}></Route>

              <Route path="/pharmacist" element={<PharmacistLayout />}></Route>

              <Route path="/nurse" element={<NurseLayout />}></Route>

              <Route path="/lab" element={<LabLayout />}></Route>
            </Routes>
            <Footer />
          </BrowserRouter>
        </GoogleOAuthProvider>
      </HmsProvider>
    </>
  );
}
