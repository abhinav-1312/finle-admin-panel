/* ----------------------------------------------------------------------------
Information Contained Herein is Proprietary and Confidential. copyright notice in all copies, 
acknowledging that the code is provided without warranties, and strictly prohibiting unauthorized 
sharing or distribution without prior written consent from the copyright holder<DKG Labs Pvt. Ltd>
------------------------------------------------------------------------------ */

import {
  FETCH_DealerS_SUCCESS,
  ADD_Dealer_SUCCESS,
  UPDATE_Dealer_SUCCESS,
  DELETE_Dealer_SUCCESS,
  TOGGLE_Dealer_STATUS_SUCCESS,
} from '../actions/dealerActions'; 
import { Dealer } from '../../pages/dealer/DealerInterface';

interface DealerState {
  dealerList: Dealer[];
}

const initialState: DealerState = {
  dealerList: [],
};

const dealerReducer = (state = initialState, action: any): DealerState => {
  switch (action.type) {
    case FETCH_DealerS_SUCCESS:
      return {
        ...state,
        dealerList: action.payload,
      };
    case ADD_Dealer_SUCCESS:
      return {
        ...state,
        dealerList: [...state.dealerList, action.payload],
      };
    case UPDATE_Dealer_SUCCESS:
      return {
        ...state,
        dealerList: state.dealerList.map((dealer) =>
          dealer.dealerId === action.payload.dealerId ? action.payload : dealer
        ),
      };
    case DELETE_Dealer_SUCCESS:
      return {
        ...state,
        dealerList: state.dealerList.filter(
          (dealer) => dealer.dealerId !== action.payload.dealerId
        ),
      };
    case TOGGLE_Dealer_STATUS_SUCCESS:
      return {
        ...state,
        dealerList: state.dealerList.map((dealer) =>
          dealer.dealerId === action.payload.dealerId ? action.payload : dealer
        ),
      };
    default:
      return state;
  }
};

export default dealerReducer;
