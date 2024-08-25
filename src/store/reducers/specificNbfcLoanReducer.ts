// nbfcReducer.ts
import { FETCH_NBFC_LOANS, APPROVE_NBFC_LOAN_SUCCESS, REJECT_NBFC_LOAN_SUCCESS, NbfcLoans } from '../actions/specificNbfcLoanActions';

interface NBFCState {
  pendingList: NbfcLoans["pendingList"];
  approvedList: NbfcLoans["approvedList"];
  rejectedList: NbfcLoans["rejectedList"];
  adminList: NbfcLoans['adminList'];
  additionalInfoList: NbfcLoans['additionalInfoList']
}

const initialState: NBFCState = {
  pendingList: [],
  approvedList: [],
  rejectedList: [],
  adminList: [],
  additionalInfoList: []
};

const specificNbfcLoanReducer = (state = initialState, action: any) => {
  switch (action.type) {
    case FETCH_NBFC_LOANS:
      return {
        ...state,
        pendingList: action.payload.pendingList,
        approvedList: action.payload.approvedList,
        rejectedList: action.payload.rejectedList,
        adminList: action.payload.adminList,
        additionalInfoList: action.payload.additionalInfoList
      };
    case APPROVE_NBFC_LOAN_SUCCESS:
      // Handle approve success if needed
      return state;
    case REJECT_NBFC_LOAN_SUCCESS:
      // Handle reject success if needed
      return state;
    default:
      return state;
  }
};

export default specificNbfcLoanReducer;
