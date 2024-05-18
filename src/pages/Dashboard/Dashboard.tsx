/* ----------------------------------------------------------------------------
Information Contained Herein is Proprietary and Confidential. copyright notice in all copies, 
acknowledging that the code is provided without warranties, and strictly prohibiting unauthorized 
sharing or distribution without prior written consent from the copyright holder<DKG Labs Pvt. Ltd>
------------------------------------------------------------------------------ */


import React, { useEffect, useState } from "react";
import { Box, Card, CardContent, Grid, Typography } from "@mui/material";
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

const Dashboard: React.FC = () => {
  const dispatch = useDispatch<ThunkDispatch<RootState, null, any>>();

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
  const totalstaff = useSelector((state: RootState) => state.staff.staffList.length);
  const [activeSummaryCard, setActiveSummaryCard] = useState<string>("nbfc");

  useEffect(() => {
    dispatch(fetchNBFCs());
    dispatch(fetchDealers());
    dispatch(fetchDSAs());
    dispatch(fetchStaffs());
    dispatch(fetchGPs());
  }, [dispatch]);

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
      <Grid container spacing={3}>
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
        ].map((data) => (
          <Grid item xs={12} sm={6} md={3} key={data.dataType}>
            <SummaryCard
              title={data.label}
              value={data.total}
              onClick={() => handleSummaryCardClick(data.dataType)}
              isActive={data.dataType === activeSummaryCard}
            />
          </Grid>
        ))}
      </Grid>
      <br />
      <RecentActivities
        activeSummaryCard={activeSummaryCard} // Pass the activeSummaryCard as a prop
        title={getDynamicTitle()}
      />
    </div>
  );
};

export default Dashboard;
