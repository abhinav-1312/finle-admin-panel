/* ----------------------------------------------------------------------------
Information Contained Herein is Proprietary and Confidential. copyright notice in all copies, 
acknowledging that the code is provided without warranties, and strictly prohibiting unauthorized 
sharing or distribution without prior written consent from the copyright holder<DKG Labs Pvt. Ltd>
------------------------------------------------------------------------------ */

import React, { useEffect, useState } from "react";
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
  // const dispatch = useDispatch();
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
  const adminList = useSelector<RootState, Loan[]>(
    (state) => state.specificNbfcLoan.adminList
  );
  const additionalInfoList = useSelector<RootState, Loan[]>(
    (state) => state.specificNbfcLoan.additionalInfoList
  );
  const [open, setOpen] = useState(false);
  const [nbfcId, setNbfcId] = useState("");
  const [loanId, setLoanId] = useState("");
  const [remarks, setRemarks] = useState("");
  const [actionType, setActionType] = useState<"approve" | "reject" | "additionalInfoReq">("approve");
  const [selectedTab, setSelectedTab] = React.useState(0);


  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setSelectedTab(newValue);
  };
  const handleOpen = (
    loanId: string,
    nbfcId: string,
    type: "approve" | "reject" | "additionalInfoReq"
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

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (actionType === "approve") {
      await dispatch(approveNbfcLoanApi(nbfcId, loanId, remarks));
      setOpen(false);
      dispatch(fetchSpecificNbfcLoans());

    } else if(actionType === "reject") {
      await dispatch(rejectNbfcLoanApi(nbfcId, loanId, null));
      setOpen(false);
      dispatch(fetchSpecificNbfcLoans());
      
    }
    else{
      if(remarks === "" || remarks === null){
        alert("Enter remarks.")
      }
      else{
        await dispatch(rejectNbfcLoanApi(nbfcId, loanId, remarks));
        setOpen(false);
        dispatch(fetchSpecificNbfcLoans());
      }
    }
  };

  if(adminList){
    return (
      <div>

      <Tabs value={selectedTab} onChange={handleTabChange}>
        <Tab label="Loan Queue" />
      </Tabs>

      <LoanTable
          title="Loan Queue"
          loanList={adminList}
          handleOpen={handleOpen}
          showApproveButton={false}
          showRejectButton={false}
          showAdditionalInfoBtn={false}
        />


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
    )
  }

  return (
    <div>
      <Tabs value={selectedTab} onChange={handleTabChange}>
        <Tab label="Pending Requests" />
        <Tab label="Approved Requests" />
        <Tab label="Rejected Requests" />
        <Tab label="Additional Info Requested List" />
      </Tabs>
      <br />
      {selectedTab === 0 && (
        <LoanTable
          title="Pending Requests"
          loanList={pendingList}
          handleOpen={handleOpen}
          showApproveButton={true}
          showRejectButton={true}
          showAdditionalInfoBtn={true}
        />
      )}

      {selectedTab === 1 && (
        <LoanTable
          title="Approved Requests"
          loanList={approvedList}
          handleOpen={handleOpen}
          showApproveButton={false}
          showRejectButton={true}
          showAdditionalInfoBtn = {false}
        />
      )}

      {selectedTab === 2 && (
        <LoanTable
          title="Rejected Requests"
          loanList={rejectedList}
          handleOpen={handleOpen}
          showApproveButton={true}
          showRejectButton={false}
          showAdditionalInfoBtn={true}
        />
      )}
      {selectedTab === 3 && (
        <LoanTable
          title="Additional Info Request List "
          loanList={additionalInfoList}
          handleOpen={handleOpen}
          showApproveButton={true}
          showRejectButton={true}
          showAdditionalInfoBtn={true}

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
                {
                  actionType !== "reject" &&
                  <TextField
                  label="Remarks"
                  variant="outlined"
                  size="small"
                  value={remarks}
                  multiline
                  onChange={(e) => setRemarks(e.target.value)}
                  className="dsa-form-input"
                  />
                }

                <Button variant="contained" type="submit">
                  {actionType === "approve" ? "Approve" :(actionType === "reject" ? "Reject" : "Submit")}
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
