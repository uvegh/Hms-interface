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
import Profile from "./components/receptionist/Profile";

import DoctorPrescription from "./components/doctor/Dp";
import DashboardNurse from "./components/nurse/DashboardNurse";
import Patient from "./components/nurse/Patient";
import ProfileNurse from "./components/nurse/ProfileNurse";
import Management from "./components/nurse/Management";
import Appointment from "./components/receptionist/Appointment";
import Pharmacy from "./components/Pharmacy/Pharmacy";
import ViewPatients from "./components/Pharmacy/ViewPatients";
import Dispense from "./components/Pharmacy/Dispense";
import PharmacyAdmin from "./components/Pharmacy/PharmacyAdmin";
import PharmacyLayout from "./components/Pharmacy/PharmacyLayout";
import Drugs from "./components/Pharmacy/Drugs";
import BedAllotment from "./components/nurse/BedAllotment";
import SingleWard from "./components/nurse/SingleWard";
import PatientLayout from "./components/patient/PatientLayout";
import DashboardPatient from "./components/patient/DashboardPatient";
import ProfilePatient from "./components/patient/ProfilePatient";
import LandingPage from "./components/LandingPage";

export default function App() {
  return (
    <>
      <HmsProvider>
        <GoogleOAuthProvider clientId="357757074966-ikdbg0dl0d764pni87ne7u3shvdr7n5s.apps.googleusercontent.com">
          <BrowserRouter>


            <Routes>
              <Route path="*" element={<NotFound />} />
              <Route path="/" element={<LandingPage />} />
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
                <Route path="prescription" element={<DoctorPrescription />} />
              </Route>

              <Route path="/pharmacy" element={<PharmacyLayout />}>
                <Route path="dashboard" element={<Pharmacy />} />
                <Route path="admin" element={<PharmacyAdmin />} />
                <Route path="dispense" element={<Dispense />} />
                <Route path="drugs" element={<Drugs />} />
              </Route>
              <Route path="/viewPatient" element={<ViewPatients />} />
              <Route path="/dispense" element={<Dispense />} />

              <Route path="/receptionist" element={<ReceptionistLayout />}>
                <Route path="dashboard" element={<DashboardRec />} />

                <Route path="profile" element={<Profile />} />
                <Route path="appointment" element={<Appointment />} />
              </Route>

              <Route path="/nurse" element={<NurseLayout />}>
                <Route path="dashboard" element={<DashboardNurse />} />
                <Route path="patient" element={<Patient />} />
                <Route path="profile" element={<ProfileNurse />} />
                <Route path="management" element={<Management />} />
                <Route path="bedAllotment" element={<BedAllotment />} />
                <Route path="bedAllotment/:id" element={<SingleWard />} />
              </Route>

              <Route path="/patient" element={<PatientLayout />}>
                <Route path="dashboard" element=<DashboardPatient /> />
                <Route path="profile" element=<ProfilePatient /> />
              </Route>
              <Route path="/admin" element={<AdminLayout />}></Route>
              <Route path="/super" element={<SuperAdminLayout />}></Route>

              <Route path="/pharmacist" element={<PharmacistLayout />}></Route>

              <Route path="/lab" element={<LabLayout />}></Route>
            </Routes>
            <Footer />
          </BrowserRouter>
        </GoogleOAuthProvider>
      </HmsProvider>
    </>
  );
}
