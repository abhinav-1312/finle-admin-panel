import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, Link } from "react-router-dom";
import { TOKEN } from "../../utils/BaseUrl";
import { Box, Grid, Typography, Button } from "@mui/material";
import styles from "./Dashboard.module.scss";
import SummaryCard from "./SummaryCard";
import RecentActivities from "./RecentActivities";

const NbfcDashboardDetails = () => {
  const { id } = useParams();
  const [loanDetails, setLoanDetails] = useState({
    active: 0,
    pending: 0,
    rejected: 0,
    approved: 0,
    incomplete: 0,
    total: 0,
    close: 0,
  });
  const [approvedRequest, setApprovedRequest] = useState([]);
  const [pendingRequest, setPendingRequest] = useState([]);
  const [rejectedRequest, setRejectedRequest] = useState([]);
  const [activeRequest, setActiveRequest] = useState([]);
  const [incompleteRequest, setIncompleteRequest] = useState([]);
  const [totalRequest, setTotalRequest] = useState([]);
  const [closeRequest, setCloseRequest] = useState([]);
  const [activeSummaryCard, setActiveSummaryCard] = useState("active");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `https://finle-user-service.azurewebsites.net/user-service/allLoanDetails?id=${id}`,
          {
            headers: {
              Authorization: TOKEN,
            },
          }
        );
        const data = response.data.responseData;
        setLoanDetails({
          active: data?.csrNbfcaApprovedRequestList?.length || 0,
          pending: data?.csrNbfcPendingRequestList?.length || 0,
          rejected: data?.csrNbfcRejectedRequestList?.length || 0,
          approved: data?.csrNbfcApprovedRequestList?.length || 0,
          incomplete: data?.csrNbfcIncompleteRequestList?.length || 0,
          total: data?.csrNbfcTotalRequestList?.length || 0,
          close: data?.csrNbfcCloseRequestList?.length || 0,
        });
        setApprovedRequest(data?.csrNbfcApprovedRequestList || []);
        setPendingRequest(data?.csrNbfcPendingRequestList || []);
        setRejectedRequest(data?.csrNbfcRejectedRequestList || []);
        setActiveRequest(data?.csrNbfcaApprovedRequestList || []);
        setIncompleteRequest(data?.csrNbfcIncompleteRequestList || []);
        setTotalRequest(data?.csrNbfcTotalRequestList || []);
        setCloseRequest(data?.csrNbfcCloseRequestList || []);
        console.log(data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [id]);

  const handleSummaryCardClick = (dataType) => {
    setActiveSummaryCard(dataType);
  };

  const getDynamicTitle = () => {
    switch (activeSummaryCard) {
      case "active":
        return "Active Loan Cases";
      case "pending":
        return "Pending Loan Cases";
      case "rejected":
        return "Rejected Loan Cases";
      case "approved":
        return "Approved Loan Cases";
      case "incomplete":
        return "Incomplete Loan Cases";
      case "total":
        return "Total Loan Cases";
      case "close":
        return "Close Loan Cases";
      default:
        return "";
    }
  };

  const getActiveRecords = () => {
    switch (activeSummaryCard) {
      case "approved":
        return approvedRequest;
      case "pending":
        return pendingRequest;
      case "rejected":
        return rejectedRequest;
      case "active":
        return activeRequest;
      case "incomplete":
        return incompleteRequest;
      case "total":
        return totalRequest;
      case "close":
        return closeRequest;
      default:
        return [];
    }
  };

  const tileColors = [
    "#1ABC9C", // Turquoise
    "#2ECC71", // Emerald
    "#3498DB", // Peter River
    "#FF7F50", // Coral
    "#FFDB58", // Mustard
    "#808000", // Olive
    "#4682B4", // Steel blue
  ];

  const summaryData = [
    {
      dataType: "active",
      label: "Active Loan Cases",
      total: loanDetails.active,
    },
    {
      dataType: "pending",
      label: "Pending Loan Cases",
      total: loanDetails.pending,
    },
    {
      dataType: "rejected",
      label: "Rejected Loan Cases",
      total: loanDetails.rejected,
    },
    {
      dataType: "approved",
      label: "Approved Loan Cases",
      total: loanDetails.approved,
    },
    {
      dataType: "incomplete",
      label: "Incomplete Loan Cases",
      total: loanDetails.incomplete,
    },
    { dataType: "total", label: "Total Loan Cases", total: loanDetails.total },
    { dataType: "close", label: "Close Loan Cases", total: loanDetails.close },
  ];

  return (
    <>
      <div>
        <Button
          className="back-btn"
          variant="outlined"
          color="warning"
          sx={{ width: 100 }}
          component={Link}
          to="/dashboard">
          Go back
        </Button>
      </div>
      <div className={styles.dashboard}>
        <Box mb={3}>
          <Typography variant="h4" className="dashboard-title" gutterBottom>
            Loan Details
          </Typography>
        </Box>
        <Grid container spacing={3}>
          {summaryData.map((data, key) => (
            <Grid item xs={12} sm={6} md={3} key={data.dataType}>
              <SummaryCard
                title={data.label}
                value={data.total}
                onClick={() => handleSummaryCardClick(data.dataType)}
                isActive={data.dataType === activeSummaryCard}
                tileColor={tileColors[key % tileColors.length]}
              />
            </Grid>
          ))}
        </Grid>
        <br />
        <RecentActivities
          activeSummaryCard={activeSummaryCard}
          title={getDynamicTitle()}
          activityList={getActiveRecords()}
        />
      </div>
    </>
  );
};

export default NbfcDashboardDetails;
