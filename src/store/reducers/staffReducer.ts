/* ----------------------------------------------------------------------------
Information Contained Herein is Proprietary and Confidential. copyright notice in all copies, 
acknowledging that the code is provided without warranties, and strictly prohibiting unauthorized 
sharing or distribution without prior written consent from the copyright holder<DKG Labs Pvt. Ltd>
------------------------------------------------------------------------------ */

import {
  FETCH_STAFFS_SUCCESS,
  ADD_STAFF_SUCCESS,
  UPDATE_STAFF_SUCCESS,
  DELETE_STAFF_SUCCESS,
  TOGGLE_STAFF_STATUS_SUCCESS,
} from '../actions/staffActions'; 
import { Staff } from '../../pages/staff/StaffInterface';



interface StaffState {
  staffList: Staff[];
}

const initialState: StaffState = {
  staffList: [],
};

const staffReducer = (state = initialState, action: any): StaffState => {
  switch (action.type) {
    case FETCH_STAFFS_SUCCESS:
      return {
        ...state,
        staffList: action.payload,
      };
    case ADD_STAFF_SUCCESS:
      return {
        ...state,
        staffList: [...state.staffList, action.payload],
      };
    case UPDATE_STAFF_SUCCESS:
      return {
        ...state,
        staffList: state.staffList.map((staff) =>
          staff.staffId === action.payload.staffId ? action.payload : staff
        ),
      };
    case DELETE_STAFF_SUCCESS:
      return {
        ...state,
        staffList: state.staffList.filter(
          (staff) => staff.staffId !== action.payload.staffId
        ),
      };
    case TOGGLE_STAFF_STATUS_SUCCESS:
      return {
        ...state,
        staffList: state.staffList.map((staff) =>
          staff.staffId === action.payload.staffId ? action.payload : staff
        ),
      };
    default:
      return state;
  }
};

export default staffReducer;
