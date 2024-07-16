// import { ThunkAction } from "@reduxjs/toolkit";
import { ThunkAction } from 'redux-thunk';
import { RootState } from '../store';
import { AnyAction } from 'redux';

import axios from "axios";
import { Dispatch } from "redux";

export const FETCH_NBFC_LOANS = "FETCH_NBFC_LOANS";
export const APPROVE_NBFC_LOAN_SUCCESS = "APPROVE_NBFC_LOAN_SUCCESS";
export const REJECT_NBFC_LOAN_SUCCESS = "REJECT_NBFC_LOAN_SUCCESS";

interface NbfcLoan {
  loanId: string;
  nbfcId: string;
  userId: string;
  loanStatus: string;
  remarks: string | null;
  createdBy: string;
  createdDate: string;
  updatedDate: string;
}

export interface NbfcLoans {
  pendingList?: NbfcLoan[];
  approvedList?: NbfcLoan[];
  rejectedList?: NbfcLoan[];
  adminList?: NbfcLoan[];
}

export const fetchNbfcLoans = (nbfcLoans: NbfcLoans) => ({
  type: FETCH_NBFC_LOANS,
  payload: nbfcLoans,
});

export const approveNbfcLoanSuccess = () => ({
  type: APPROVE_NBFC_LOAN_SUCCESS,
});

export const rejectNbfcLoanSuccess = () => ({
  type: REJECT_NBFC_LOAN_SUCCESS,
});

const userType = localStorage.getItem("userType")
const firstName = localStorage.getItem('firstName')
const lastName = localStorage.getItem('lastName')

export const fetchSpecificNbfcLoans = () => {
  // return async (dispatch: Dispatch) => {  
    const userId = localStorage.getItem("userId")
  const userIdSubsStr = userId?.substring(0, 4);
  if(userIdSubsStr === "5000"){
    return async (dispatch: Dispatch) => {
      try {
        const token = localStorage.getItem("token");
        if (token) {
          const response = await axios.get(
            `https://finle-api-gateway.azurewebsites.net/admin-service/getLoanRequestDetail?nbfcId=${userId}`,
            {
              headers: {
                Authorization: token,
              },
            }
          );
          const responseData = response.data.responseData;
  
          const nbfcLoans: NbfcLoans = {
            pendingList: responseData.csrNbfcPendingRequestList,
            approvedList: responseData.csrNbfcApprovedRequestList,
            rejectedList: responseData.csrNbfcRejectedRequestList,
          };
  
          dispatch(fetchNbfcLoans(nbfcLoans));
        }
      } catch (error) {
        console.error(error);
      }
  }
  }
  else if(userIdSubsStr === "6000" || userType === "admin"){
    return async (dispatch: Dispatch) => {
      try {
        const token = localStorage.getItem("token");
        if (token) {
          const response = await axios.get(
            `https://finle-api-gateway.azurewebsites.net/user-service/allLoanDetails`,
            {
              headers: {
                Authorization: token,
              },
            }
          );
          const responseData = response.data.responseData;

          const modResData : any = responseData.map((res:any)=> {
            return {
              userId: res.userId,
              loanId: res.loanId,
              loanStatus: res.applicationCompletionStatus === "Y" ? "Completed" : "Pending",
              nbfcId: res.nbfcId,
              custName: res.personalDetails.name,
              adhaarNo: res.documentDetails.aadhaarNo,
              panNo: res.documentDetails.panNo,
              annualIncome: res.incomeDetails.annualIncome || "No data available",
              accHolderName: res.bankDetails.accHolderName,
              loanReqAmt: res.loanDetail.loanRequestAmt
            }
          })
  
          const nbfcLoans: NbfcLoans = {
            adminList: modResData,
            // pendingList: modResData,
            // approvedList: modResData,
            // rejectedList: modResData,
          };
  
          dispatch(fetchNbfcLoans(nbfcLoans));
        }
      } catch (error) {
        console.error(error);
      }
  }
  // }
}

};
// ... (other imports)

export const approveNbfcLoanApi = (nbfcId: string, loanId: string, remarks: string) => {
  return async (dispatch: Dispatch) => {
    try {
      const token = localStorage.getItem("token");
      if (token) {
        const headers = {
          Authorization: token,
        };

        const params = {
          nbfcId: nbfcId,
          loanId: loanId,
          remarks: remarks,
        };

        await axios.post(
          "https://finle-api-gateway.azurewebsites.net/admin-service/approveLoanRequest",
          {},
          {
            headers: headers,
            params: params,
          }
        );

        // Dispatch action for success
        dispatch(approveNbfcLoanSuccess());

        // Display alert message
        alert("Loan request approved successfully");

        // Fetch updated data
        // dispatch(fetchSpecificNbfcLoans());
      }
    } catch (error) {
      console.error(error);
      // Display error message if needed
      alert("Error approving loan request");
    }
  };
};

export const rejectNbfcLoanApi = (nbfcId: string, loanId: string, remarks: string) => {
  return async (dispatch: Dispatch) => {
    try {
      const token = localStorage.getItem("token");
      if (token) {
        const headers = {
          Authorization: token,
        };

        const params = {
          nbfcId: nbfcId,
          loanId: loanId,
          remarks: remarks,
        };

        await axios.post(
          "https://finle-api-gateway.azurewebsites.net/admin-service/rejectLoanRequest",
          {},
          {
            headers: headers,
            params: params,
          }
        );

        // Dispatch action for success
        dispatch(rejectNbfcLoanSuccess());

        // Display alert message
        alert(`Loan request rejected successfully by ${firstName} ${lastName}`);

        // Fetch updated data
        // dispatch(fetchSpecificNbfcLoans());
      }
    } catch (error) {
      console.error(error);
      // Display error message if needed
      alert("Error rejecting loan request");
    }
  };
};
