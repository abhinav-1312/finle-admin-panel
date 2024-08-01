import { FETCH_ACTIVE_CUST_SUCCESS } from "../actions/totActiveCustActions"

export interface ActiveCustomers 
{
  id: string,
  userId: string,
  firstName: string,
  lastName: string,
  userType: string,
  emailId: string,
  mobileNumber: string,
  password: string,
  userMode: string,
  createdBy: string,
  createdDate: string,
  tokenDto: string,
  loanId: string,
  addressLineFirst: string,
  addressLineSecond: string,
  city: string,
  state: string,
  pinCode: string,
  remarks: string,
  active: boolean,
  adminFlag: boolean,
}

interface ActiveCustState {
    activeCustList: ActiveCustomers[]
}

const initialState: ActiveCustState = {
    activeCustList: []
}

const activeCustReducer = (state = initialState, action: any): ActiveCustState => {
    switch (action.type) {
        case FETCH_ACTIVE_CUST_SUCCESS : 
            return {
                ...state,
                activeCustList: action.payload
            }
        default:
            return state
    }
}

export default activeCustReducer