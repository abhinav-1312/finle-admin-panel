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
          { dataType: "staff1", label: "Total Active Customers", total: totalstaff },
          { dataType: "staff2", label: "Active Loan Cases", total: totalstaff },
          { dataType: "staff3", label: "Rejected Loan Cases", total: totalstaff },
          { dataType: "staff4", label: "Pending Loan Cases", total: totalstaff },
          { dataType: "staff5", label: "Awaiting Approval Files", total: totalstaff },
          { dataType: "staff6", label: "Incomplete Loan File", total: totalstaff },
          { dataType: "staff7", label: "Total Loan Cases Files", total: totalstaff },
          { dataType: "staff8", label: "Closed Loan Files", total: totalstaff },
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
