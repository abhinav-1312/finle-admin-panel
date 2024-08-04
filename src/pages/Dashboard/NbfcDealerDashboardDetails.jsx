import React, { useEffect, useState } from "react";
import { useParams, Link, useLocation } from "react-router-dom";
import { Box, Grid, Typography, Button } from "@mui/material";
import styles from "./Dashboard.module.scss";
import SummaryCard from "./SummaryCard";
import { useDispatch, useSelector } from "react-redux";
import { fetchLoanDetail } from "../../store/actions/allLoanDetailActions";
import NbfcDashboardDetailTable from "./NbfcDealerDashboardDetailTable";

const NbfcDealerDashboardDetails = () => {
    const location = useLocation()
    const {dataFor} = location?.state || ""
  const { id } = useParams();
  const [activeSummaryCard, setActiveSummaryCard] = useState("active");
  const dispatch = useDispatch()


  const loanDetailList = useSelector((state) => state.allLoanDetail.allLoanDetailList)

  const activeLoanCases = []
  const rejectedLoanCases = []
  const pendingLoanCases = []
  const awaitingApprovalFiles = []
  const incompleteLoanFiles = []
  const totalLoanCasesFiles = []
  const closedLoanFiles = []

  loanDetailList?.forEach(record => {
    const {loanStatus, nbfcId, partnerId} = record
    
    if(loanStatus === 'Active Loan' && (dataFor === "nbfc" ? nbfcId === id : partnerId === id))
      activeLoanCases.push({id: record.loanId, ...record})
    else if(loanStatus === "Rejected" && (dataFor === "nbfc" ? nbfcId === id : partnerId === id))
      rejectedLoanCases.push({id: record.loanId, ...record})
    else if(loanStatus === "Pending" && (dataFor === "nbfc" ? nbfcId === id : partnerId === id))
      pendingLoanCases.push({id: record.loanId, ...record})
    else if(loanStatus === "Awaiting Approval" && (dataFor === "nbfc" ? nbfcId === id : partnerId === id))
      awaitingApprovalFiles.push({id: record.loanId, ...record})
    else if(loanStatus === "Incomplete" && (dataFor === "nbfc" ? nbfcId === id : partnerId === id))
      incompleteLoanFiles.push({id: record.loanId, ...record})
    else if(loanStatus === "Closed Loan" && (dataFor === "nbfc" ? nbfcId === id : partnerId === id))
      closedLoanFiles.push({id: record.loanId, ...record})

    if((loanStatus === "Active Loan" || loanStatus === "Closed Loan") && (dataFor === "nbfc" ? nbfcId === id : partnerId === id))
      totalLoanCasesFiles.push({id: record.loanId, ...record})

  })


  useEffect(() => {
    // const fetchData = async () => {
    //   try {
    //     const response = await axios.get(
    //       `https://finle-user-service.azurewebsites.net/user-service/allLoanDetails?id=${id}`,
    //       {
    //         headers: {
    //           Authorization: TOKEN,
    //         },
    //       }
    //     );
    //     const data = response.data.responseData;
    //     setLoanDetails({
    //       active: data?.csrNbfcaApprovedRequestList?.length || 0,
    //       pending: data?.csrNbfcPendingRequestList?.length || 0,
    //       rejected: data?.csrNbfcRejectedRequestList?.length || 0,
    //       approved: data?.csrNbfcApprovedRequestList?.length || 0,
    //       incomplete: data?.csrNbfcIncompleteRequestList?.length || 0,
    //       total: data?.csrNbfcTotalRequestList?.length || 0,
    //       close: data?.csrNbfcCloseRequestList?.length || 0,
    //     });
    //     setApprovedRequest(data?.csrNbfcApprovedRequestList || []);
    //     setPendingRequest(data?.csrNbfcPendingRequestList || []);
    //     setRejectedRequest(data?.csrNbfcRejectedRequestList || []);
    //     setActiveRequest(data?.csrNbfcaApprovedRequestList || []);
    //     setIncompleteRequest(data?.csrNbfcIncompleteRequestList || []);
    //     setTotalRequest(data?.csrNbfcTotalRequestList || []);
    //     setCloseRequest(data?.csrNbfcCloseRequestList || []);
    //     console.log(data);
    //   } catch (error) {
    //     console.error("Error fetching data:", error);
    //   }
    // };

    // fetchData();
    if(!loanDetailList.length)
      dispatch(fetchLoanDetail())
  }, [dispatch, loanDetailList]);

  const handleSummaryCardClick = (dataType) => {
    setActiveSummaryCard(dataType);
  };

  console.log("LOAN DETAIL LISTTTT: ", loanDetailList)

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

  console.log("incomplete: ", incompleteLoanFiles)

  const getActiveRecords = () => {
    switch (activeSummaryCard) {
      case "approved":
        return "";
      case "pending":
        return pendingLoanCases;
      case "rejected":
        return rejectedLoanCases;
      case "active":
        return activeLoanCases;
      case "incomplete":
        return incompleteLoanFiles;
      case "total":
        return totalLoanCasesFiles;
      case "close":
        return closedLoanFiles;
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
      total: activeLoanCases?.length,
    },
    {
      dataType: "pending",
      label: "Pending Loan Cases",
      total: pendingLoanCases?.length,
    },
    {
      dataType: "rejected",
      label: "Rejected Loan Cases",
      total: rejectedLoanCases?.length,
    },
    // {
    //   dataType: "approved",
    //   label: "Approved Loan Cases",
    //   total: loanDetails.approved,
    // },
    {
      dataType: "incomplete",
      label: "Incomplete Loan Cases",
      total: incompleteLoanFiles?.length,
    },
    { dataType: "total", label: "Total Loan Cases", total: totalLoanCasesFiles?.length },
    { dataType: "close", label: "Close Loan Cases", total: closedLoanFiles?.length },
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
        <NbfcDashboardDetailTable
        //   activeSummaryCard={activeSummaryCard}
          title={getDynamicTitle()}
          data = {getActiveRecords()}
          dataFor = {dataFor}
        //   activityList={getActiveRecords()}
        />
      </div>
    </>
  );
};

export default NbfcDealerDashboardDetails;
