import { LOAN_STATUS_ACTIVE, LOAN_STATUS_PENDING, LOAN_STATUS_REJECTED  } from "../actions/AdminDashboardAction"

export interface NbfcLoanStatus 
{
    loanId: string,
    nbfcId: string,
    userId: string,
    loanStatus: string,
    remarks: string,
    createdBy: string,
    createdDate: string,
    updatedDate: string
}

interface AdminDashboardState {
    nbfcLActiveLoanList: NbfcLoanStatus[]
    nbfcPendingLoanList: NbfcLoanStatus[]
    nbfcRejectedLoanList: NbfcLoanStatus[]
}

const initialState: AdminDashboardState = {
    nbfcLActiveLoanList: [],
    nbfcPendingLoanList: [],
    nbfcRejectedLoanList: []
}

const AdminDashboardReducer = (state = initialState, action: any) : AdminDashboardState => {
    switch (action.type){
        case LOAN_STATUS_ACTIVE : 
            return {
                ...state,
                nbfcLActiveLoanList: action.payload
            }
        case LOAN_STATUS_PENDING:
          return {
            ...state,
            nbfcPendingLoanList: action.payload
          }
        case LOAN_STATUS_REJECTED:
          return {
            ...state,
            nbfcRejectedLoanList: action.payload
          }
            default:
                return state
    }
}

export default AdminDashboardReducer