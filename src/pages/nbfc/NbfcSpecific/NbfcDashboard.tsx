// src/pages/nbfc/NbfcSpecific/NbfcDashboard.tsx
import React, { useEffect } from "react";
import SummaryCard1 from "../../../components/SummaryCard1";
import { useDispatch, useSelector } from "react-redux";
import { ThunkDispatch } from "redux-thunk";
import { Grid } from "@mui/material";
import { RootState } from "../../../store/store";
import { fetchSpecificNbfcLoans } from "../../../store/actions/specificNbfcLoanActions";

interface Loan {
  loanId: string;
  nbfcId: string;
  userId: string;
  loanStatus: string;
  remarks: string | null;
  createdBy: string;
  createdDate: string;
  updatedDate: string;
}

interface DynamicSummaryCardData {
  title: string;
  value: number;
  color: string;
}

const NbfcDashboard: React.FC = () => {
  const dispatch = useDispatch<ThunkDispatch<RootState, null, any>>();
  const pendingList = useSelector<RootState, Loan[]>(
    (state) => state.specificNbfcLoan.pendingList
  );
  const approvedList = useSelector<RootState, Loan[]>(
    (state) => state.specificNbfcLoan.approvedList
  );
  const rejectedList = useSelector<RootState, Loan[]>(
    (state) => state.specificNbfcLoan.rejectedList
  );

  useEffect(() => {
    dispatch(fetchSpecificNbfcLoans());
  }, [dispatch]);

  // Calculate dynamic values based on API response
  const totalApplications =
    pendingList.length + approvedList.length + rejectedList.length;
  const pendingApplications = pendingList.length;
  const approvedApplications = approvedList.length;
  const rejectedApplications = rejectedList.length;

  // Define your dynamic summaryCardData
  // Add 4 Hard-Coded Tiles for NBFC Dashboard
  const dynamicSummaryCardData: DynamicSummaryCardData[] = [
    { title: "Total Applications", value: totalApplications, color: "#66BB6A" },
    {
      title: "Pending Applications",
      value: pendingApplications,
      color: "#FFCA28",
    },
    {
      title: "Approved Applications",
      value: approvedApplications,
      color: "#EF5350",
    },
    {
      title: "Rejected Applications",
      value: rejectedApplications,
      color: "#FF5733",
    },
    {
      title: "Total Loan Dues",
      value: 100000,
      color: "#a2d2ff",
    },
    {
      title: "Total Collections",
      value: 1000000,
      color: "#FFCA28",
    },
    {
      title: "Non-Performing Loans(%)",
      value: 12,
      color: "#EF5350",
    },
    {
      title: "Delinquency Rate(%)",
      value: 8,
      color: "#a2d2ff",
    },
    // Add other dynamic values as needed
  ];

  return (
    <div>
      <br />
      <Grid container spacing={3}>
        {dynamicSummaryCardData.map((item) => (
          <Grid item xs={12} sm={6} md={3} key={item.title}>
            <SummaryCard1
              title={item.title}
              value={item.value}
              color={item.color}
            />
          </Grid>
        ))}
      </Grid>
    </div>
  );
};

export default NbfcDashboard;
