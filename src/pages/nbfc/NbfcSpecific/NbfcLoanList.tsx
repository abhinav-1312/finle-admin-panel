/* ----------------------------------------------------------------------------
Information Contained Herein is Proprietary and Confidential. copyright notice in all copies, 
acknowledging that the code is provided without warranties, and strictly prohibiting unauthorized 
sharing or distribution without prior written consent from the copyright holder<DKG Labs Pvt. Ltd>
------------------------------------------------------------------------------ */

import React, { useEffect, useState } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { ThunkDispatch } from "redux-thunk";
import {
  Box,
  Modal,
  Card,
  CardContent,
  TextField,
  Button,
  Tabs,
  Tab,
} from "@mui/material";
import LoanTable from "./LoanTable";
import { RootState } from "../../../store/store";
import {
  fetchSpecificNbfcLoans,
  approveNbfcLoanApi,
  rejectNbfcLoanApi,
} from "../../../store/actions/specificNbfcLoanActions";

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

const NbfcLoanList: React.FC = () => {
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
  const [open, setOpen] = useState(false);
  const [nbfcId, setNbfcId] = useState("");
  const [loanId, setLoanId] = useState("");
  const [remarks, setRemarks] = useState("");
  const [actionType, setActionType] = useState<"approve" | "reject">("approve");
  const [selectedTab, setSelectedTab] = React.useState(0);

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setSelectedTab(newValue);
  };
  const handleOpen = (
    loanId: string,
    nbfcId: string,
    type: "approve" | "reject"
  ) => {
    setLoanId(loanId);
    setNbfcId(nbfcId);
    setActionType(type);
    setOpen(true);
  };

  const handleClose = () => setOpen(false);

  useEffect(() => {
    dispatch(fetchSpecificNbfcLoans());
  }, [dispatch]);

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (actionType === "approve") {
      dispatch(approveNbfcLoanApi(nbfcId, loanId, remarks));
      setOpen(false);
      dispatch(fetchSpecificNbfcLoans());

    } else {
      dispatch(rejectNbfcLoanApi(nbfcId, loanId, remarks));
      setOpen(false);
      dispatch(fetchSpecificNbfcLoans());
    }
  };

  return (
    <div>
      <Tabs value={selectedTab} onChange={handleTabChange}>
        <Tab label="Pending Requests" />
        <Tab label="Approved Requests" />
        <Tab label="Rejected Requests" />
      </Tabs>
      <br />
      {selectedTab === 0 && (
        <LoanTable
          title="Pending Requests"
          loanList={pendingList}
          handleOpen={handleOpen}
          showApproveButton={true}
          showRejectButton={true}
        />
      )}

      {selectedTab === 1 && (
        <LoanTable
          title="Approved Requests"
          loanList={approvedList}
          handleOpen={handleOpen}
          showApproveButton={false}
          showRejectButton={true}
        />
      )}

      {selectedTab === 2 && (
        <LoanTable
          title="Rejected Requests"
          loanList={rejectedList}
          handleOpen={handleOpen}
          showApproveButton={true}
          showRejectButton={false}
        />
      )}

      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
          }}
        >
          <Card>
            <CardContent>
              <form onSubmit={handleFormSubmit}>
                <TextField
                  label="Loan ID"
                  variant="outlined"
                  size="small"
                  disabled
                  value={loanId}
                  className="dsa-form-input"
                />

                <TextField
                  label="NBFC ID"
                  variant="outlined"
                  size="small"
                  value={nbfcId}
                  disabled
                  className="dsa-form-input"
                />

                <TextField
                  label="Remarks"
                  variant="outlined"
                  size="small"
                  value={remarks}
                  multiline
                  onChange={(e) => setRemarks(e.target.value)}
                  className="dsa-form-input"
                />

                <Button variant="contained" type="submit">
                  {actionType === "approve" ? "Approve" : "Reject"}
                </Button>
              </form>
            </CardContent>
          </Card>
        </Box>
      </Modal>
    </div>
  );
};

export default NbfcLoanList;
