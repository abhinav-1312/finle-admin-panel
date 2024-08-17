/* ----------------------------------------------------------------------------
Information Contained Herein is Proprietary and Confidential. copyright notice in all copies, 
acknowledging that the code is provided without warranties, and strictly prohibiting unauthorized 
sharing or distribution without prior written consent from the copyright holder<DKG Labs Pvt. Ltd>
------------------------------------------------------------------------------ */


import React, { useEffect, useState } from "react";
import { Box, Grid, Typography } from "@mui/material";
import styles from "./Dashboard.module.scss";
import { useSelector, useDispatch } from "react-redux";
import { fetchNBFCs } from "../../store/actions/nbfcActions";
import { fetchDealers } from "../../store/actions/dealerActions";
import { fetchDSAs } from "../../store/actions/dsaActions";
import { fetchStaffs } from "../../store/actions/staffActions";
import { fetchGPs } from "../../store/actions/gpActions";
import RecentActivities from "./RecentActivities";
import { RootState } from "../../store/store";
import { ThunkDispatch } from "redux-thunk";
import SummaryCard from "./SummaryCard";
import axios from "axios";
import { BASE_URL, TOKEN } from "../../utils/BaseUrl";
import { fetchActiveCustomers } from "../../store/actions/totActiveCustActions";
import { fetchAllNbfcLoanStatus } from "../../store/actions/AdminDashboardAction";
import { fetchLoanDetail } from "../../store/actions/allLoanDetailActions";
import { fetchRejectedLoan } from "../../store/actions/rejectedLoanNbfcWiseAction";

interface ActiveCustomers 
{
  id: string,
  userId: string,
  firstName: string,
  lastName: string,
  userType: string,
  emailId: string,
  mobileNumber: string,
  password: string,
  userMode: string,
  createdBy: string,
  createdDate: string,
  tokenDto: string,
  loanId: string,
  addressLineFirst: string,
  addressLineSecond: string,
  city: string,
  state: string,
  pinCode: string,
  remarks: string,
  active: boolean,
  adminFlag: boolean,
}

const Dashboard: React.FC = () => {
  const dispatch = useDispatch<ThunkDispatch<RootState, null, any>>();

  const tileColor = [
    "#1ABC9C",  // Turquoise
    "#2ECC71",  // Emerald
    "#3498DB",  // Peter River
    "#9B59B6",  // Amethyst
    "#F1C40F",  // Sunflower
    "#E67E22",  // Carrot
    "#E74C3C",  // Alizarin
    "#ECF0F1",  // Clouds
    "#95A5A6",  // Concrete
    "#8E44AD",  // Wisteria
    "#00B894",  // Mint
    "#6C5B7B",  // Lavender
    "#008080",  // Teal
    "#FF7F50",  // Coral
    "#FFDB58",  // Mustard
    "#808000",  // Olive
    "#4682B4",  // Steel Blue
    "#FA8072",  // Salmon
    "#87CEEB",  // Sky Blue
    "#D2691E"   // Chocolate
  ]

  // Define types for your Redux state
  const totalnbfc = useSelector(
    (state: RootState) => state.nbfc.nbfcList.length
  );
  const totalDealer = useSelector(
    (state: RootState) => state.dlr.dealerList.length
  );
  const totalDsa = useSelector(
    (state: RootState) => state.dsa.dsaList.length
  );

  // const totActiveCust = useSelector((state: RootState) => state.totActiveCust.activeCustList.length)

  // const {nbfcLActiveLoanList, nbfcPendingLoanList, nbfcRejectedLoanList} = useSelector((state: RootState) => state.adminDashboard)

  const totalstaff = useSelector((state: RootState) => state.staff.staffList.length);
  const [activeSummaryCard, setActiveSummaryCard] = useState<string>("nbfc");

  const loanDetailList = useSelector((state: RootState) => state.allLoanDetail.allLoanDetailList)
  // const rejectedLoanDetail = useSelector((state: RootState) => state.rejectedLoanDetail.rejectedLoanObj)
  // console.log("REJECTED LOAN DETAIL: ", rejectedLoanDetail)

  const activeLoanCases = []
  const rejectedLoanCases = []
  const pendingLoanCases = []
  const awaitingApprovalFiles = []
  const incompleteLoanFiles = []
  const totalLoanCasesFiles = []
  const closedLoanFiles = []

  loanDetailList?.forEach(record => {
    const {loanStatus} = record
    
    if(loanStatus === 'Active Loan')
      activeLoanCases.push(record)
    else if(loanStatus === "Rejected")
      rejectedLoanCases.push(record)
    else if(loanStatus === "Pending")
      pendingLoanCases.push(record)
    else if(loanStatus === "Awaiting Approval")
      awaitingApprovalFiles.push(record)
    else if(loanStatus === "Incomplete")
      incompleteLoanFiles.push(record)
    else if(loanStatus === "Closed Loan")
      closedLoanFiles.push(record)

    if(loanStatus === "Active Loan" || loanStatus === "Closed Loan")
      totalLoanCasesFiles.push(record)

  })


  const fetchData = async () => {
    await dispatch(fetchNBFCs());
    await dispatch(fetchDealers());
    await dispatch(fetchDSAs());
    await dispatch(fetchStaffs());
    await dispatch(fetchGPs());
    // await dispatch(fetchActiveCustomers())
    // await dispatch(fetchAllNbfcLoanStatus())
    await dispatch(fetchLoanDetail())
    await dispatch(fetchRejectedLoan())
  }

  useEffect(() => {
    fetchData()
  }, []);

  const handleSummaryCardClick = (dataType: string) => {
    setActiveSummaryCard(dataType);
  };
  const getDynamicTitle = () => {
    switch (activeSummaryCard) {
      case "nbfc":
        return "Recent NBFC";
      case "dlr":
        return "Recent Dealer";
      case "dsa":
        return "Recent DSA";
      case "staff":
        return "Recent Staff";
      case "totActiveCust":
        return "Total Active Customers"
      case "activeCases":
        return "Active Loan Cases"
      case "rejectedCases":
        return "Rejected Loan Cases"
      case "pendingCases":
        return "Pending Loan Cases"
      default:
        return "";
    }
  };
  return (
    <div className={styles.dashboard}>
      <Box mb={3}>
        <Typography variant="h4" className="dashboard-title" gutterBottom>
          Dashboard
        </Typography>
      </Box>
      <div className="dashboard-grid">
        {[
          { dataType: "nbfc", label: "Total NBFC", total: totalnbfc },
          {
            dataType: "dlr",
            label: "Total Dealer",
            total: totalDealer,
          },
          {
            dataType: "dsa",
            label: "Total DSA",
            total: totalDsa,
          },
          { dataType: "staff", label: "Total Staff", total: totalstaff },
          // { dataType: "totActiveCust", label: "Total Active Customers", total: totActiveCust },
          { dataType: "activeCases", label: "Active Loan Cases", total: activeLoanCases?.length },
          { dataType: "rejectedCases", label: "Rejected Loan Cases", total: rejectedLoanCases?.length },
          { dataType: "pendingCases", label: "Pending Loan Cases", total: pendingLoanCases?.length },
          { dataType: "awaitingApprovalFiles", label: "Awaiting Approval Files", total: awaitingApprovalFiles?.length },
          { dataType: "incompleteLoanFiles", label: "Incomplete Loan File", total: incompleteLoanFiles?.length },
          { dataType: "totalLoanCases", label: "Total Loan Cases Files", total: totalLoanCasesFiles?.length },
          { dataType: "closedLoanFiles", label: "Closed Loan Files", total: closedLoanFiles?.length },
          { dataType: "staff9", label: "Total Collection Agencies", total: totalstaff },
        ].map((data, key) => (
          <Grid item xs={12} sm={6} md={3} key={data.dataType}>
            <SummaryCard 
              title={data.label}
              value={data.total}
              onClick={() => handleSummaryCardClick(data.dataType)}
              isActive={data.dataType === activeSummaryCard}
              tileColor = {tileColor[key]}
            />
          </Grid>
        ))}
      </div>
      <br />
      <RecentActivities
        activeSummaryCard={activeSummaryCard} // Pass the activeSummaryCard as a prop
        title={getDynamicTitle()}
      />
    </div>
  );
};

export default Dashboard;
