/* ----------------------------------------------------------------------------
Information Contained Herein is Proprietary and Confidential. copyright notice in all copies, 
acknowledging that the code is provided without warranties, and strictly prohibiting unauthorized 
sharing or distribution without prior written consent from the copyright holder<DKG Labs Pvt. Ltd>
------------------------------------------------------------------------------ */

import React from "react";
import { Button, Card, CardContent, Typography } from "@mui/material";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { useSelector } from "react-redux";
import { RootState } from "../../store/store";
import { useNavigate } from "react-router-dom";

interface Activity {
  id: any;
  Name: string;
}

interface RecentActivitiesProps {
  activeSummaryCard: string;
  title: string;
}

const RecentActivities: React.FC<RecentActivitiesProps> = ({
  activeSummaryCard,
  title,
}) => {
  const nbfcs = useSelector((state: RootState) => state.nbfc.nbfcList);
  const dlrs = useSelector((state: RootState) => state.dlr.dealerList);
  const dsas = useSelector((state: RootState) => state.dsa.dsaList);
  const staffs = useSelector((state: RootState) => state.staff.staffList);

  const loanDetailList = useSelector((state: RootState) => state.allLoanDetail.allLoanDetailList)
  let recentActivities: any[] = [];

  switch (activeSummaryCard) {
    case "nbfc":
      recentActivities = nbfcs
        .map((record) => ({
          id: record.nbfcId,
          Name: `${record.firstName}`,
        }))
      break;

    case "dlr":
      recentActivities = dlrs
        .map((record) => ({
          id: record.dealerId,
          Name: ` ${record.firstName}`,
        }))
      break;

    case "dsa":
      recentActivities = dsas
        .map((record) => ({
          id: record.dsaId,
          Name: `${record.firstName}`,
        }))
      break;

    case "staff":
      recentActivities = staffs
        .map((record) => ({
          id: record.staffId,
          Name: `${record.firstName}`,
        }))
      break;
      case "activeCases":
        recentActivities = loanDetailList?.filter((record) => (record.loanStatus === "Active Loan"))?.map((record) => ({id: record.userId, loanId: record.loanId, fullName: record.personalDetails?.name}))
        break;
      
        case "pendingCases" : 
        recentActivities = loanDetailList?.filter((record) => (record.loanStatus === "Pending"))?.map((record) => ({id: record.userId, loanId: record.loanId, fullName: record.personalDetails?.name}))
        break;

        case "rejectedCases" : 
          recentActivities = loanDetailList?.filter((record) => (record.loanStatus === "Rejected"))?.map((record) => ({id: record.userId, loanId: record.loanId, fullName: record.personalDetails?.name}))
          break;
        case "awaitingApprovalFiles":
          recentActivities = loanDetailList?.filter((record) => (record.loanStatus === "Awaiting Approval"))?.map((record) => ({id: record.userId, loanId: record.loanId, fullName: record.personalDetails?.name}))
          break;
        case "totalLoanCases":
          recentActivities = loanDetailList?.filter((record) => (record.loanStatus === "Active Loan" || record.loanStatus === "Closed Loan"))?.map((record) => ({id: record.userId, loanId: record.loanId, fullName: record.personalDetails?.name}))
          break;
        case "closedLoanFiles":
          recentActivities = loanDetailList?.filter((record) => (record.loanStatus === "Closed Loan"))?.map((record) => ({id: record.userId, loanId: record.loanId, fullName: record.personalDetails?.name}))
          break;
          case "incompleteLoanFiles":
            recentActivities = loanDetailList?.filter((record) => (record.loanStatus === "Incomplete"))?.map((record) => ({id: record.userId, loanId: record.loanId, fullName: record.personalDetails?.name}))
            break;

        default:
          break;
  }


  const handleIdClick = (id: any, name: string) => {
    navigate(`/dashboard/${id}`, {state: {dataFor: activeSummaryCard}});
  };

  const columns: GridColDef[] = [
    {
      field: "id",
      headerName: "ID",
      width: 100,
      renderCell: (params) => (
        <button
          style={{
            cursor: "pointer",
            background: "grey",
            border: "none",
            height: "30px",
            color: "#fff",
          }}
          onClick={() => handleIdClick(params.value, params.row.Name)}>
          {params.value}
        </button>
      ),
    },
    { field: "Name", headerName: "Name", width: 200 },
  ];

  const navigate = useNavigate()

  const handleConsumerClick = (id: any) => {
    navigate(`/consumer/${id}`)
  }

  const nbfcLoanTabsCols: GridColDef[] = [
    {field: "id", headerName: "User ID", width: 100,
      renderCell: (params) => (
        <Button
          variant="text"
          color="inherit"
          sx={{ background: "#dcdcdc" }}
          onClick={() =>
            handleConsumerClick(
              params.row.id
            )
          }
        >
          {params.row.id}
        </Button>
      )
    },
    {field: "loanId", headerName: "Loan ID", width: 100},
    {field: "fullName", headerName: "Full Name", width: 400}
  ]

  return (
    <Card>
      <CardContent>
        <Typography variant="h4" gutterBottom>
          {title}
        </Typography>
        <div style={{ height: "auto", width: "100%" }}>
          <DataGrid
            rows={recentActivities}
            columns={(activeSummaryCard === "activeCases" || activeSummaryCard === "pendingCases" || activeSummaryCard === "rejectedCases" || activeSummaryCard === 'awaitingApprovalFiles' || activeSummaryCard === 'totalLoanCases' || activeSummaryCard === 'closedLoanFiles' || activeSummaryCard === 'incompleteLoanFiles' ) ? nbfcLoanTabsCols: columns}
            autoHeight
            initialState={{
              pagination: {
                paginationModel: { page: 0, pageSize: 20 },
              },
            }}
            pageSizeOptions={[5, 10, 20, 30, 50, 100]}
          />
        </div>
      </CardContent>
    </Card>
  );
};

export default RecentActivities;
