/* ----------------------------------------------------------------------------
Information Contained Herein is Proprietary and Confidential. copyright notice in all copies, 
acknowledging that the code is provided without warranties, and strictly prohibiting unauthorized 
sharing or distribution without prior written consent from the copyright holder<DKG Labs Pvt. Ltd>
------------------------------------------------------------------------------ */

import React, { useEffect, useState } from "react";
import { Route, Routes, Navigate, useLocation } from "react-router-dom";
import Dashboard from "../pages/Dashboard/Dashboard";
import Product from "../pages/manageProducts/Product";
import ManageNbfc from "../pages/nbfc/Nbfc";
import ManageDealer from "../pages/dealer/Dealer";
import ManageDSA from "../pages/dsa/Dsa";
import GP from "../pages/growthpartner/GP";
import Staff from "../pages/staff/Staff";
import Ragt from "../pages/recoveryagent/Ragt";
import Login from "../auth/Login";
import Cagt from "../pages/collectionagent/Cagt";
import UserRoleManagementPage from "../pages/userRole/UserRoleManagement";
import PrivatePage from "../components/PrivatePage";
import NbfcLoanDetails from "../pages/nbfc/NbfcSpecific/NbfcLoanList";
import LoanDetails from "../pages/nbfc/NbfcSpecific/LoanPreview";
import DealerConsumerDetails from "../pages/dealer/DealerDashboard/DealerConsumerDetails";
import UserDetailsEditPage from "../pages/dealer/DealerDashboard/UserDetailsEdit";
import DsaDasboard from "../pages/dsa/DsaDasboard";
import DealerDashboard from "../pages/dealer/DealerDashboard";
import NbfcDashboard from "../pages/nbfc/NbfcSpecific/NbfcDashboard";
import ConsumerTable from "../pages/consumer/ConsumerTable";
import QueUser from "../pages/consumer/QueUser";
import DealerDocUpload from "../pages/dealer/DealerDashboard/DelearStepperForm/DealerDocUpload";
import Collection from "../pages/collectionDashboard/collection";
import QueUserDetails from "../components/common/QueUserDetails";
import ConsumerDetail from "../pages/consumer/ConsumerDetail";
import NbfcDetail from "../pages/nbfc/NbfcDetail";
import DealerDetail from "../pages/dealer/DealerDetail";
import NbfcDashboardDetails from "../pages/Dashboard/NbfcDealerDashboardDetails";
// import { RouteComponentProps } from 'react-router-dom';

interface LocationState {
  dataFor: any; // Adjust this type based on your data
}


const ConsumerDetailPage: React.FC = () => {
  const location = useLocation();
  const state = location.state as LocationState | null; // Cast state to expected type

  // Extract the dataFor from state
  const dataFor = state?.dataFor || {}; // Provide a default value or handle null case

  return (
    <ConsumerDetail dataFor={dataFor} />
  );
};



const AppRoutes: React.FC = () => {
  const [userRole, setUserRole] = useState<number[]>([]);
  const [userType, setUserType] = useState<string | null>(null);
  const [active, setActive] = useState<boolean | null>(null);

  useEffect(() => {
    const rolarr = localStorage.getItem("userRole");
    if (rolarr !== null) {
      const parsedRolarr = JSON.parse(rolarr);
      setUserRole(parsedRolarr);
    }
    const testuserType = localStorage.getItem("userType");
    setUserType(testuserType);

    const activeValue = localStorage.getItem("active");
    setActive(activeValue === "true");
  }, []);

  function getDashboardComponent() {
    if (userType === "superAdmin" || userType === "admin") {
      return <Dashboard />;
    } else if (userType === "Delear") {
      return <DealerDashboard />;
    } else if (userType === "DSA") {
      return <DsaDasboard />;
    } else if (userType === "Nbfc") {
      return <NbfcDashboard />;
    } else {
      return <PrivatePage />;
    }
  }
  const renderComponent = (component: React.ReactElement) => {
    return active ? component : <PrivatePage />;
  };

  return (
    <>
      <Routes>
        <Route
          path="/"
          element={
            userRole.length === 0 || !localStorage.getItem("userRole") ? (
              <Login />
            ) : (
              getDashboardComponent()
            )
          }
        />
        <Route path="/login" element={<Login />} />
        <Route
          path="/dashboard"
          element={renderComponent(
            userRole.includes(1) ? getDashboardComponent() : <PrivatePage />
          )}
        />

        <Route
          path="/dashboard/:id"
          element={userRole.includes(1) ? <NbfcDashboardDetails /> : <PrivatePage />}
        />

        <Route
          path="/product"
          element={userRole.includes(2) ? <Product /> : <PrivatePage />}
        />
        <Route
          path="/collection"
          element={(userRole.includes(2) || userType==="Nbfc") ? <Collection /> : <PrivatePage />}
        />
        <Route
          path="/queUser"
          element={userRole.includes(2) ? <QueUser /> : <PrivatePage />}
        />
        <Route
          path="/nbfc"
          element={userRole.includes(4) ? <ManageNbfc /> : <PrivatePage />}
        />
        <Route
          path="/nbfc/:nbfcId"
          element={userRole.includes(4) ? <NbfcDetail /> : <PrivatePage />}
        />
        <Route
          path="/dealer"
          element={userRole.includes(4) ? <ManageDealer /> : <PrivatePage />}
        />
        <Route
          path="/dsa"
          element={userRole.includes(5) ? <ManageDSA /> : <PrivatePage />}
        />
        <Route
          path="/consumer"
          element={(userRole.includes(6) || userRole.includes(17))  ? <ConsumerTable /> : <PrivatePage />}
        />
        <Route path = "/consumer/:userId" element={userRole.includes(17) ? <ConsumerDetailPage /> : <PrivatePage />} />
        <Route
          path="/gp"
          element={userRole.includes(7) ? <GP /> : <Navigate to="/" />}
        />
        <Route
          path="/staff"
          element={userRole.includes(8) ? <Staff /> : <Navigate to="/" />}
        />
        <Route
          path="/ragt"
          element={userRole.includes(9) ? <Ragt /> : <PrivatePage />}
        />{" "}
        <Route
          path="/cagt"
          element={userRole.includes(10) ? <Cagt /> : <PrivatePage />}
        />
        <Route
          path="/role"
          element={
            userRole.includes(11) ? (
              <UserRoleManagementPage />
            ) : (
              <Navigate to="/" />
            )
          }
        />
        <Route
          path="/NbfcLoanDetails"
          element={
            userRole.includes(12) ? <NbfcLoanDetails /> : <PrivatePage />
          }
        />
        <Route
          path="/loan-details"
          element={userRole.includes(13) ? <LoanDetails /> : <PrivatePage />}
        />
        <Route
          path="/delear-cosumer-deatils"
          element={renderComponent(
            userRole.includes(14) ? <DealerConsumerDetails /> : <PrivatePage />
          )}
        />
        <Route
          path="/dlr-doc-upload"
          element={
            userRole.includes(15) ? <DealerDocUpload /> : <PrivatePage />
          }
        />
        <Route
          path="/nbfc-doc-upload"
          element={
            userRole.includes(15) ? <DealerDocUpload /> : <PrivatePage />
          }
        />
        <Route
          path="/edit/:userId"
          element={
            userRole.includes(15) ? <UserDetailsEditPage /> : <PrivatePage />
          }
        />
        <Route
          path="/userDetails/:mobileNo"
          element={userRole.includes(1) ? <QueUserDetails /> : <PrivatePage />}
        />
        <Route
          path="/dealer/:dealerId"
          element={userRole.includes(4) ? <DealerDetail /> : <PrivatePage />}
        />
      </Routes>
    </>
  );
};

export default AppRoutes;
