import { Dispatch } from "redux";
import { BASE_URL, TOKEN } from "../../utils/BaseUrl";
import axios from "axios";
import thunk, { ThunkDispatch } from "redux-thunk";
import { RootState } from "../store";
export const FETCH_REJECTED_LOAN_SUCCESS = 'FETCH_REJECTED_LOAN_SUCCESS'

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



export const fetchRejectedLoanSuccess = (rejectedLoanNbfcWise: any) => ({
    type: FETCH_REJECTED_LOAN_SUCCESS,
    payload: rejectedLoanNbfcWise
})

export const fetchRejectedLoan = () => {
    return async (
      dispatch: ThunkDispatch<RootState, void, any>,
      getState: () => RootState
    ) => {
      const { nbfc } = getState();
      const activeNbfc = nbfc?.nbfcList?.filter(
        (eachNbfc: any) => eachNbfc.isActive === "Y"
      ); // active nbfcs to fetch loan cases from all nbfc

      const token = localStorage.getItem("token");
      if(token){
        const loanDetailsPromises = activeNbfc.map((nbfc: any) =>
          fetchLoanDetails(nbfc.nbfcId, token)
        );
        const loanDetails = await Promise.all(loanDetailsPromises);

        interface RejectedLoanRemark {
          [nbfcId: string]: {
            [loanId: string]: string
          }
        }

        let rejectedLoanRemark: RejectedLoanRemark = {}

        loanDetails?.forEach((responseData: any) => {
            const {
              csrNbfcApprovedRequestList,
              csrNbfcPendingRequestList,
              csrNbfcRejectedRequestList,
            } = responseData;

            csrNbfcRejectedRequestList?.forEach((record: any) => {
              if(!rejectedLoanRemark[record.nbfcId]){
                rejectedLoanRemark[record.nbfcId] = {}
              }
              rejectedLoanRemark[record.nbfcId][record.loanId] = record.remarks
            })
            csrNbfcApprovedRequestList?.forEach((record: any) => {
              if(!rejectedLoanRemark[record.nbfcId]){
                rejectedLoanRemark[record.nbfcId] = {}
              }
              rejectedLoanRemark[record.nbfcId][record.loanId] = record.remarks
            })
            csrNbfcPendingRequestList?.forEach((record: any) => {
              if(!rejectedLoanRemark[record.nbfcId]){
                rejectedLoanRemark[record.nbfcId] = {}
              }
              rejectedLoanRemark[record.nbfcId][record.loanId] = record.remarks
            })
            dispatch(fetchRejectedLoanSuccess(rejectedLoanRemark))
          });
      }

    }
} 