/* ----------------------------------------------------------------------------
Information Contained Herein is Proprietary and Confidential. copyright notice in all copies, 
acknowledging that the code is provided without warranties, and strictly prohibiting unauthorized 
sharing or distribution without prior written consent from the copyright holder<DKG Labs Pvt. Ltd>
------------------------------------------------------------------------------ */

import {
  FETCH_DSAS_SUCCESS,
  ADD_DSA_SUCCESS,
  UPDATE_DSA_SUCCESS,
  DELETE_DSA_SUCCESS,
  TOGGLE_DSA_STATUS_SUCCESS,
} from '../actions/dsaActions'
import { DSA } from '../../pages/dsa/DsaInterface';

interface DSAState {
  dsaList: DSA[];
}

const initialState: DSAState = {
  dsaList: [],
};

const dsaReducer = (state = initialState, action: any): DSAState => {
  switch (action.type) {
    case FETCH_DSAS_SUCCESS:
      return {
        ...state,
        dsaList: action.payload,
      };
    case ADD_DSA_SUCCESS:
      return {
        ...state,
        dsaList: [...state.dsaList, action.payload],
      };
    case UPDATE_DSA_SUCCESS:
      return {
        ...state,
        dsaList: state.dsaList.map((dsa) =>
          dsa.dsaId === action.payload.dsaId ? action.payload : dsa
        ),
      };
    case DELETE_DSA_SUCCESS:
      return {
        ...state,
        dsaList: state.dsaList.filter(
          (dsa) => dsa.dsaId !== action.payload.dsaId
        ),
      };
    case TOGGLE_DSA_STATUS_SUCCESS:
      return {
        ...state,
        dsaList: state.dsaList.map((dsa) =>
          dsa.dsaId === action.payload.dsaId ? action.payload : dsa
        ),
      };
    default:
      return state;
  }
};

export default dsaReducer;
