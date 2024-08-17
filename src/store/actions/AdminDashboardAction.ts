import { Dispatch } from "redux";
import { NbfcLoanStatus } from "../reducers/AdminDashboardReducer";
import thunk, { ThunkDispatch } from "redux-thunk";
import { RootState } from "../store";
import axios from "axios";

export const LOAN_STATUS_ACTIVE = "LOAN_STATUS_ACTIVE";
export const LOAN_STATUS_PENDING = "LOAN_STATUS_PENDING";
export const LOAN_STATUS_REJECTED = "LOAN_STATUS_REJECTED";

export const fetchActiveLoanStatus = (loanStatusList: NbfcLoanStatus[]) => ({
  type: LOAN_STATUS_ACTIVE,
  payload: loanStatusList,
});
export const fetchPendingLoanStatus = (loanStatusList: NbfcLoanStatus[]) => ({
  type: LOAN_STATUS_PENDING,
  payload: loanStatusList,
});
export const fetchRejectedLoanStatus = (loanStatusList: NbfcLoanStatus[]) => ({
  type: LOAN_STATUS_REJECTED,
  payload: loanStatusList,
});

// Define a function to fetch loan details for a single NBFC
const fetchLoanDetails = async (nbfcId: number, token: string) => {
  const response = await axios.get(
    `https://finle-api-gateway.azurewebsites.net/admin-service/getLoanRequestDetail?nbfcId=${nbfcId}`,
    {
      headers: {
        Authorization: token,
      },
    }
  );
  return response.data.responseData;
};

export const fetchAllNbfcLoanStatus = () => {
  return async (
    dispatch: ThunkDispatch<RootState, void, any>,
    getState: () => RootState
  ) => {
    const { nbfc } = getState();
    const activeNbfc = nbfc?.nbfcList?.filter(
      (eachNbfc: any) => eachNbfc.isActive === "Y"
    ); // active nbfcs to fetch loan cases from all nbfc
    const token = localStorage.getItem("token");
    if (token) {
      try {
        // Use Promise.all to concurrently fetch loan details for all active NBFCs
        const loanDetailsPromises = activeNbfc?.map((nbfc: any) =>
          fetchLoanDetails(nbfc.nbfcId, token)
        );
        const loanDetails = await Promise.all(loanDetailsPromises);

        // Process the fetched data as needed
        let activeLoan: any[] = [];
        let pendingLoan: any[] = [];
        let rejectedLoan: any[] = [];

        loanDetails.forEach((responseData: any) => {
          const {
            csrNbfcApprovedRequestList,
            csrNbfcPendingRequestList,
            csrNbfcRejectedRequestList,
          } = responseData;
          activeLoan = [...activeLoan, ...csrNbfcApprovedRequestList];
          pendingLoan = [...pendingLoan, ...csrNbfcPendingRequestList];
          rejectedLoan = [...rejectedLoan, ...csrNbfcRejectedRequestList];
        });

        // dipsatch the data after it is fully loaded
        dispatch(fetchActiveLoanStatus(activeLoan));
        dispatch(fetchPendingLoanStatus(pendingLoan));
        dispatch(fetchRejectedLoanStatus(rejectedLoan));
      } catch (error) {
        console.log("Error fetching loan status.", error);
        alert("Error fetching loan status.");
      }
    }
  };
};
