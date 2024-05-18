/* ----------------------------------------------------------------------------
Information Contained Herein is Proprietary and Confidential. copyright notice in all copies, 
acknowledging that the code is provided without warranties, and strictly prohibiting unauthorized 
sharing or distribution without prior written consent from the copyright holder<DKG Labs Pvt. Ltd>
------------------------------------------------------------------------------ */

import {
  FETCH_NBFC_SUCCESS,
  ADD_NBFC_SUCCESS,
  UPDATE_NBFC_SUCCESS,
  DELETE_NBFC_SUCCESS,
  TOGGLE_NBFC_STATUS_SUCCESS,
} from '../actions/nbfcActions';
import { NBFC } from '../../pages/nbfc/NbfcInterface';

interface NBFCState {
  nbfcList: NBFC[];
}

const initialState: NBFCState = {
  nbfcList: [],
};

const nbfcReducer = (state = initialState, action: any): NBFCState => {
  switch (action.type) {
    case FETCH_NBFC_SUCCESS:
      return {
        ...state,
        nbfcList: action.payload,
      };
    case ADD_NBFC_SUCCESS:
      return {
        ...state,
        nbfcList: [...state.nbfcList, action.payload],
      };
    case UPDATE_NBFC_SUCCESS:
      return {
        ...state,
        nbfcList: state.nbfcList.map((nbfc) =>
          nbfc.nbfcId === action.payload.nbfcId ? action.payload : nbfc
        ),
      };
    case DELETE_NBFC_SUCCESS:
      return {
        ...state,
        nbfcList: state.nbfcList.filter(
          (nbfc) => nbfc.nbfcId !== action.payload.nbfcId
        ),
      };
    case TOGGLE_NBFC_STATUS_SUCCESS:
      return {
        ...state,
        nbfcList: state.nbfcList.map((nbfc) =>
          nbfc.nbfcId === action.payload.nbfcId ? action.payload : nbfc
        ),
      };
    default:
      return state;
  }
};

export default nbfcReducer;
