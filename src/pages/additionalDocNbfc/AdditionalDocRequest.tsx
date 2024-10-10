import { useEffect, useState } from "react";
import { fetchNBFCs } from "../../store/actions/nbfcActions";
import { fetchRejectedLoan } from "../../store/actions/rejectedLoanNbfcWiseAction";
import { useDispatch, useSelector } from "react-redux";
import { ThunkDispatch } from "@reduxjs/toolkit";
import { RootState } from "../../store/store";
import { fetchLoanDetail } from "../../store/actions/allLoanDetailActions";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import {
  Button,
  Card,
  CardContent,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Typography,
} from "@mui/material";
import axios, { AxiosResponse } from "axios";
import { useNavigate } from "react-router-dom";

const docDtl = [
  { vrfCode: "A6", vrfsCode: "A606", vrfSName: "Additional Document_1" },
  { vrfCode: "A6", vrfsCode: "A607", vrfSName: "Additional Document_2" },
  { vrfCode: "A6", vrfsCode: "A608", vrfSName: "Additional Document_3" },
  { vrfCode: "A6", vrfsCode: "A609", vrfSName: "Additional Document_4" },
  { vrfCode: "A6", vrfsCode: "A610", vrfSName: "Additional Document_5" },
];

const UploadDocument: React.FC<any> = ({ userId }) => {
  const handleChange = (e: any) => {
    console.log(e.target.value);
  };

  const handleFileUpload =
    // (documentType: string, vrfCodeParam: string, vrfsCodeParam: string) =>
    () => (event: React.ChangeEvent<HTMLInputElement>) => {
      // const file = event.target.files?.[0];
      // setUploadedFiles((prevFiles) => {
      //   const updatedFiles = { ...prevFiles };
      //   updatedFiles[documentType] = file
      //     ? { file, vrfCode: vrfCodeParam, vrfsCode: vrfsCodeParam }
      //     : null;
      //   return updatedFiles;
      // });
    };

  return (
    <FormControl fullWidth>
      <InputLabel id="demo-simple-select-label">
        Upload Additional Doc
      </InputLabel>
      <Select
        labelId="demo-simple-select-label"
        id="demo-simple-select"
        label="Age"
        onChange={handleChange}
      >
        {docDtl.map((doc: any) => {
          return (
            <>
              <MenuItem
                onClick={() => document.getElementById("file-input")?.click()}
              >
                {doc.vrfSName}
              </MenuItem>
              <input
                accept=".pdf, image/*"
                id="file-input"
                style={{ display: "none" }} // Hide the input
                onChange={handleFileUpload}
              />
            </>
          );
        })}
      </Select>
    </FormControl>
  );
};

const AdditionalDocRequest = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch<ThunkDispatch<RootState, null, any>>();
  const rejectedRemarkObj = useSelector(
    (state: RootState) => state.rejectedLoanDetail.rejectedLoanObj
  );
  const loanDetailList = useSelector(
    (state: RootState) => state.allLoanDetail.allLoanDetailList
  );

  useEffect(() => {
    const util = async () => {
      await dispatch(fetchNBFCs());
      dispatch(fetchLoanDetail());
      dispatch(fetchRejectedLoan());
    };
    util();
  }, [dispatch]);

  const additionalDocReqLoan: any = [];

  loanDetailList?.forEach((record) => {
    if (record.loanStatus === "Incomplete") {
      if (
        record.nbfcId &&
        record.loanId &&
        rejectedRemarkObj[record.nbfcId] &&
        rejectedRemarkObj[record.nbfcId][record.loanId]
      ) {
        additionalDocReqLoan.push({
          id: record.userId,
          nbfcId: record.nbfcId,
          loanId: record.loanId,
          remark: rejectedRemarkObj[record.nbfcId][record.loanId],
        });
      }
    }
  });

  if (loanDetailList.length === 0) {
    return <h1> Loading...</h1>;
  }

  const columns: GridColDef[] = [
    {
      field: "id",
      headerName: "User ID",
      width: 120,
    },
    {
      field: "nbfcId",
      headerName: "NBFC ID",
      width: 120,
    },
    {
      field: "loanId",
      headerName: "Loan ID",
      width: 150,
    },
    {
      field: "remark",
      headerName: "Remark",
      width: 350,
    },
    {
      field: "action",
      headerName: "Action",
      width: 250,
      renderCell: (params) => (
        <Button variant='outlined' onClick={() => navigate(`/additionalDocReq/${params.row.id}`)}>
          Upload Requested Doc
        </Button>
      ),
    },
  ];

  return (
    <Card>
      <CardContent>
        <Typography variant="h4" gutterBottom>
          Additional Info Requested Loan Applicants
        </Typography>

        <div style={{ height: "auto", width: "100%" }}>
          <DataGrid
            rows={additionalDocReqLoan}
            columns={columns}
            autoHeight
            initialState={{
              pagination: {
                paginationModel: { page: 0, pageSize: 10 },
              },
            }}
            pageSizeOptions={[5, 10, 20, 30, 50, 100]}
          />
        </div>
      </CardContent>
    </Card>
  );
};

export default AdditionalDocRequest;
