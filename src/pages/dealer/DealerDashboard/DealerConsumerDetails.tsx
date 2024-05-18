/* ----------------------------------------------------------------------------
Information Contained Herein is Proprietary and Confidential. copyright notice in all copies, 
acknowledging that the code is provided without warranties, and strictly prohibiting unauthorized 
sharing or distribution without prior written consent from the copyright holder<DKG Labs Pvt. Ltd>
------------------------------------------------------------------------------ */

import React, { useState, useEffect } from "react";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { CardContent, Card, Typography } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { ThunkDispatch } from "redux-thunk";
import { RootState } from "../../../store/store";
import { fetchspecificDlrDtls } from "../../../store/actions/specificDlrDtlsActions";

const DealerConsumerTable: React.FC = () => {
  const [consumerData, setConsumerData] = useState<any[]>([]);
  const dispatch = useDispatch<ThunkDispatch<RootState, null, any>>();
  const specificDlrDtls = useSelector<RootState, any>(
    (state) => state.specificDlrDtls.dlrDtls
  );

  useEffect(() => {
    dispatch(fetchspecificDlrDtls("10000003"));
  }, [dispatch]);

  useEffect(() => {
    if (specificDlrDtls && specificDlrDtls.responseData) {
      setConsumerData(specificDlrDtls.collectionDetailsDtoList);
    }
    setConsumerData(specificDlrDtls.collectionDetailsDtoList);
  }, [specificDlrDtls]);

  const columns = [
    { field: "loanId", headerName: "Loan ID", width: 200 },
    { field: "name", headerName: "Customer Name", width: 200 },
    { field: "email", headerName: "Email", width: 200 },
    { field: "loanAmount", headerName: "Loan Amount", width: 200 },
    { field: "status", headerName: "Status", width: 150 },
    { field: "lastPaidAmount", headerName: "Last Paid Amount", width: 150 },
    {
      field: "currentEmiPaymentDate",
      headerName: "Current EMI Payment Date",
      width: 200,
    },
  ];

  return (
    <Card>
      <CardContent>
        <Typography variant="h6" component="h1">
          New Consumer Details
        </Typography>
        <br />
        {consumerData ? (
        <div style={{ height: 400, width: "100%" }}>
          <DataGrid
            rows={consumerData}
            columns={columns}
            getRowId={(row) => Math.random() * (consumerData?.length || 0)}
            components={{
              Toolbar: GridToolbar,
            }}
            // onRowClick={(row) => {
            //   window.location.href = `/edit/${row.loanId}`;
            // }}
          />
        </div>
      ) : (
        <Typography variant="body1">Consumer data not assigned yet</Typography>
      )}
      </CardContent>
    </Card>
  );
};

export default DealerConsumerTable;
