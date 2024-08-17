import { FETCH_REJECTED_LOAN_SUCCESS } from "../actions/rejectedLoanNbfcWiseAction"

const initialState: any = {
    rejectedLoanObj: {}
}

const RejectedLoanNbfcWiseReducer = (state=initialState, action: any) : any => {
    switch(action.type){
        case FETCH_REJECTED_LOAN_SUCCESS:
            return {
                rejectedLoanObj: action.payload
            }
        default: return state

    }
}

export default RejectedLoanNbfcWiseReducer