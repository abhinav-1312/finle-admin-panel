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
  pendingList: NbfcLoan[];
  approvedList: NbfcLoan[];
  rejectedList: NbfcLoan[];
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

export const fetchSpecificNbfcLoans = () => {
  const userId = localStorage.getItem("userId")
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
  };
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
        alert("Loan request rejected successfully");

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
