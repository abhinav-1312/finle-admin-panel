// nbfcReducer.ts
import { FETCH_NBFC_LOANS, APPROVE_NBFC_LOAN_SUCCESS, REJECT_NBFC_LOAN_SUCCESS, NbfcLoans } from '../actions/specificNbfcLoanActions';

interface NBFCState {
  pendingList: NbfcLoans["pendingList"];
  approvedList: NbfcLoans["approvedList"];
  rejectedList: NbfcLoans["rejectedList"];
}

const initialState: NBFCState = {
  pendingList: [],
  approvedList: [],
  rejectedList: [],
};

const specificNbfcLoanReducer = (state = initialState, action: any) => {
  switch (action.type) {
    case FETCH_NBFC_LOANS:
      return {
        ...state,
        pendingList: action.payload.pendingList,
        approvedList: action.payload.approvedList,
        rejectedList: action.payload.rejectedList,
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
