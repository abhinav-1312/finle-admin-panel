/* ----------------------------------------------------------------------------
Information Contained Herein is Proprietary and Confidential. copyright notice in all copies, 
acknowledging that the code is provided without warranties, and strictly prohibiting unauthorized 
sharing or distribution without prior written consent from the copyright holder<DKG Labs Pvt. Ltd>
------------------------------------------------------------------------------ */

import React from "react";
import { Typography, Button } from "@mui/material";
import { DataGrid, GridColDef, GridToolbar } from "@mui/x-data-grid";
import { Card, CardContent, Stack } from "@mui/material";
import { useNavigate } from "react-router-dom";
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

interface LoanTableProps {
  title: string;
  loanList: Loan[];
  showApproveButton: boolean;
  showRejectButton: boolean;
  handleOpen: (
    loanId: string,
    nbfcId: string,
    type: "approve" | "reject"
  ) => void;

  //s
}

const LoanTable: React.FC<LoanTableProps> = ({
  title,
  loanList,
  showApproveButton,
  showRejectButton,
  handleOpen,
}) => {
  const navigate = useNavigate();

  const reversedLoanList = loanList.slice().reverse();

  const handleLoanClick = (loanId: string, userId: string) => {
    navigate(`/loan-details?loanId=${loanId}&userId=${userId}`);
  };

  const columns: GridColDef[] = [
    {
      field: "loanId",
      headerName: "Loan ID",
      width: 150,
      renderCell: (params) => (
        <Button
          variant="text"
          color="inherit"
          sx={{ background: "#dcdcdc" }}
          onClick={() =>
            handleLoanClick(
              params.row.loanId as string,
              params.row.userId as string
            )
          }
        >
          {params.row.loanId}
        </Button>
      ),
    },
    { field: "nbfcId", headerName: "NBFC ID", width: 150 },
    { field: "userId", headerName: "User ID", width: 150 },
    { field: "loanStatus", headerName: "Loan Status", width: 150 },
    { field: "remarks", headerName: "Remarks", width: 150 },
    { field: "createdBy", headerName: "Created By", width: 150 },
    { field: "createdDate", headerName: "Created Date", width: 150 },
    { field: "updatedDate", headerName: "Updated Date", width: 150 },
    {
      field: "action",
      headerName: "Action",
      width: 230,
      renderCell: (params) => (
        <Stack spacing={2} direction="row">
          {showApproveButton && (
            <Button
              variant="contained"
              onClick={() =>
                handleOpen(
                  params.row.loanId as string,
                  params.row.nbfcId as string,
                  "approve"
                )
              }
              color="success"
            >
              Approve
            </Button>
          )}
          {showRejectButton && (
            <Button
              variant="contained"
              onClick={() =>
                handleOpen(
                  params.row.loanId as string,
                  params.row.nbfcId as string,
                  "reject"
                )
              }
              color="warning"
            >
              Reject
            </Button>
          )}
        </Stack>
      ),
    },
  ];

  const rows = reversedLoanList.map((loan) => ({
    id: loan.loanId,
    ...loan,
  }));
  // const rows = loanList.map((loan) => ({
  //   id: loan.loanId,
  //   ...loan,
  // }));

  return (
    <div>
      <Card>
        <CardContent>
          <Typography variant="h5" gutterBottom>
            {title}
          </Typography>
          <div style={{ height: "auto", width: "100%" }}>
            <DataGrid
              rows={rows}
              columns={columns}
              getRowId={(row) => row.id}
              initialState={{
                pagination: {
                  paginationModel: { page: 0, pageSize: 10 },
                },
                columns: {
                  columnVisibilityModel: {
                    nbfcId: false,
                    remarks: false,
                  },
                },
              }}
              pageSizeOptions={[5, 10, 20, 30, 50, 100]}
              autoHeight
              // checkboxSelection
              components={{
                Toolbar: GridToolbar,
              }}
            />
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default LoanTable;
