/* ----------------------------------------------------------------------------
Information Contained Herein is Proprietary and Confidential. copyright notice in all copies, 
acknowledging that the code is provided without warranties, and strictly prohibiting unauthorized 
sharing or distribution without prior written consent from the copyright holder<DKG Labs Pvt. Ltd>
------------------------------------------------------------------------------ */

import { FETCH_Dlr_Dtls } from '../actions/specificDlrDtlsActions'; 

interface DealersState {
  dlrDtls: any[]; 
}

const initialState: DealersState = {
  dlrDtls: [],
};

const specificDlrDtlsReducer = (state = initialState, action: any) => {
  switch (action.type) {
    case FETCH_Dlr_Dtls:
      return {
        ...state,
        dlrDtls: action.payload,
      };
    default:
      return state;
  }
};

export default specificDlrDtlsReducer;
