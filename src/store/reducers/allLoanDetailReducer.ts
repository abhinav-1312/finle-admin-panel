import { FETCH_LOAN_DETAIL_SUCCESS } from "../actions/allLoanDetailActions"

export interface AllLoanDetails {

}

interface AllLoanDetailState {
    allLoanDetailList: any[]
}

const initialState: AllLoanDetailState = {
    allLoanDetailList: []
}

const allLoanDetailReducer = (state = initialState, action: any) : AllLoanDetailState => {
    switch (action.type) {
        case FETCH_LOAN_DETAIL_SUCCESS: {
            return {
                ...state,
                allLoanDetailList: action.payload
            }
        }
        default:
            return state
    }
}

export default allLoanDetailReducer