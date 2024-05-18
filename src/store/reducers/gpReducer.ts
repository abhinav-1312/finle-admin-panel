/* ----------------------------------------------------------------------------
Information Contained Herein is Proprietary and Confidential. copyright notice in all copies, 
acknowledging that the code is provided without warranties, and strictly prohibiting unauthorized 
sharing or distribution without prior written consent from the copyright holder<DKG Labs Pvt. Ltd>
------------------------------------------------------------------------------ */


import {
  FETCH_GPs_SUCCESS,
  ADD_GP_SUCCESS,
  UPDATE_GP_SUCCESS,
  DELETE_GP_SUCCESS,
  TOGGLE_GP_STATUS_SUCCESS,
} from '../actions/gpActions';
import { GP } from '../../pages/growthpartner/GPInterface';

interface GPState {
  gpList: GP[];
}

const initialState: GPState = {
  gpList: [],
};

const gpReducer = (state = initialState, action: any): GPState => {
  switch (action.type) {
    case FETCH_GPs_SUCCESS:
      return {
        ...state,
        gpList: action.payload,
      };
    case ADD_GP_SUCCESS:
      return {
        ...state,
        gpList: [...state.gpList, action.payload],
      };
    case UPDATE_GP_SUCCESS:
      return {
        ...state,
        gpList: state.gpList.map((gp) =>
          gp.gpId === action.payload.gpId ? action.payload : gp
        ),
      };
    case DELETE_GP_SUCCESS:
      return {
        ...state,
        gpList: state.gpList.filter(
          (gp) => gp.gpId !== action.payload.gpId
        ),
      };
    case TOGGLE_GP_STATUS_SUCCESS:
      return {
        ...state,
        gpList: state.gpList.map((gp) =>
          gp.gpId === action.payload.gpId ? action.payload : gp
        ),
      };
    default:
      return state;
  }
};

export default gpReducer;
