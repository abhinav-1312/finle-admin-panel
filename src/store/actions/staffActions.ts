/* ----------------------------------------------------------------------------
Information Contained Herein is Proprietary and Confidential. copyright notice in all copies, 
acknowledging that the code is provided without warranties, and strictly prohibiting unauthorized 
sharing or distribution without prior written consent from the copyright holder<DKG Labs Pvt. Ltd>
------------------------------------------------------------------------------ */

import axios from 'axios';
import { Staff } from '../../pages/staff/StaffInterface';
import { BASE_URL, TOKEN } from '../../utils/BaseUrl';
import { Dispatch } from 'redux';

export const FETCH_STAFFS_SUCCESS = 'FETCH_STAFFS_SUCCESS';
export const ADD_STAFF_SUCCESS = 'ADD_STAFF_SUCCESS';
export const UPDATE_STAFF_SUCCESS = 'UPDATE_STAFF_SUCCESS';
export const DELETE_STAFF_SUCCESS = 'DELETE_STAFF_SUCCESS';
export const TOGGLE_STAFF_STATUS_SUCCESS = 'TOGGLE_STAFF_STATUS_SUCCESS';

export const fetchStaffsSuccess = (staffList: Staff[]) => ({
  type: FETCH_STAFFS_SUCCESS,
  payload: staffList,
});

export const fetchStaffs = () => {
  return async (dispatch: Dispatch) => {
    try {
      const response = await axios.get<any>(`${BASE_URL}/admin-service/getStaffDetails`, {
        headers: {
          Authorization: `${TOKEN}`,
        },
      });
      const staffList = response.data.responseData as Staff[];
      dispatch(fetchStaffsSuccess(staffList));
    } catch (error) {
      console.error(error);
      throw new Error('Failed to fetch Staff members');
    }
  };
};

export const addStaffSuccess = (staff: Staff) => ({
  type: ADD_STAFF_SUCCESS,
  payload: staff,
});

export const addStaff = (staff: Staff) => {
  return async (dispatch: Dispatch) => {
    try {
      const newStaff = await axios.post<Staff>(
        `${BASE_URL}/admin-service/addStaff`,
        JSON.stringify(staff),
        {
          headers: {
            Authorization: `${TOKEN}`,
            'Content-Type': 'application/json',
          },
        }
      );
      dispatch(addStaffSuccess(newStaff.data));
    } catch (error) {
      console.error(error);
      throw new Error('Failed to add Staff member');
    }
  };
};

export const updateStaffSuccess = (staff: Staff) => ({
  type: UPDATE_STAFF_SUCCESS,
  payload: staff,
});

export const updateStaff = (staff: Staff) => {
  return async (dispatch: Dispatch) => {
    try {
      const updatedStaff = await axios.post<Staff>(
        `${BASE_URL}/admin-service/updateStaff`,
        staff,
        {
          headers: {
            Authorization: `${TOKEN}`,
          },
        }
      );
      dispatch(updateStaffSuccess(updatedStaff.data));
    } catch (error) {
      console.error(error);
      throw new Error('Failed to update Staff member');
    }
  };
};

export const deleteStaffSuccess = (staff: Staff) => ({
  type: DELETE_STAFF_SUCCESS,
  payload: staff,
});

export const deleteStaff = (staff: Staff) => {
  return async (dispatch: Dispatch) => {
    try {
      await axios.post(`${BASE_URL}/admin-service/deleteStaff`, staff, {
        headers: {
          Authorization: `${TOKEN}`,
        },
      });
      dispatch(deleteStaffSuccess(staff));
    } catch (error) {
      console.error(error);
      throw new Error('Failed to delete Staff member');
    }
  };
};

export const toggleStaffStatusSuccess = (staff: Staff) => ({
  type: TOGGLE_STAFF_STATUS_SUCCESS,
  payload: staff,
});

export const toggleStaffStatus = (staff: Staff) => {
  return async (dispatch: Dispatch) => {
    try {
      let newStatus = staff.isActive === 'Y' ? 'N' : 'Y';

      if (newStatus === 'Y') {
        await axios.post(`${BASE_URL}/admin-service/activateStaff`, staff, {
          headers: {
            Authorization: `${TOKEN}`,
          },
        });
      } else {
        await axios.post(`${BASE_URL}/admin-service/deactivateStaff`, staff, {
          headers: {
            Authorization: `${TOKEN}`,
          },
        });
      }

      staff.isActive = newStatus;
      dispatch(toggleStaffStatusSuccess(staff));
    } catch (error) {
      console.error(error);
      throw new Error('Failed to toggle Staff member status');
    }
  };
};
