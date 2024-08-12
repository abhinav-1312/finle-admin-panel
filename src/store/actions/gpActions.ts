/* ----------------------------------------------------------------------------
Information Contained Herein is Proprietary and Confidential. copyright notice in all copies, 
acknowledging that the code is provided without warranties, and strictly prohibiting unauthorized 
sharing or distribution without prior written consent from the copyright holder<DKG Labs Pvt. Ltd>
------------------------------------------------------------------------------ */


import axios from 'axios';
import { GP } from '../../pages/growthpartner/GPInterface';
import { BASE_URL, TOKEN } from '../../utils/BaseUrl';
import { Dispatch } from 'redux';

export const showAlert = (message: string) => {
  alert(message);
};
export const FETCH_GPs_SUCCESS = 'FETCH_GPs_SUCCESS';
export const ADD_GP_SUCCESS = 'ADD_GP_SUCCESS';
export const UPDATE_GP_SUCCESS = 'UPDATE_GP_SUCCESS';
export const DELETE_GP_SUCCESS = 'DELETE_GP_SUCCESS';
export const TOGGLE_GP_STATUS_SUCCESS = 'TOGGLE_GP_STATUS_SUCCESS';

export const fetchGPsSuccess = (gpList: GP[]) => ({
  type: FETCH_GPs_SUCCESS,
  payload: gpList,
});

export const fetchGPs = () => {
  return async (dispatch: Dispatch) => {
    try {
      const response = await axios.get<any>(`/admin-service/getGPDetails`, {
        headers: {
          Authorization: `${TOKEN}`,
        },
      });
      const gpList = response.data.responseData as GP[];
      dispatch(fetchGPsSuccess(gpList));
    } catch (error) {
      console.error(error);
      throw new Error('Failed to fetch GPs');
    }
  };
};

export const addGPSuccess = (gp: GP) => ({
  type: ADD_GP_SUCCESS,
  payload: gp,
});

export const addGP = (gp: GP) => {
  return async (dispatch: Dispatch) => {
    try {
      const newGP = await axios.post<GP>(
        `/admin-service/addGP`,
        JSON.stringify(gp),
        {
          headers: {
            Authorization: `${TOKEN}`,
            'Content-Type': 'application/json',
          },
        }
      );
      dispatch(addGPSuccess(newGP.data));
      showAlert('GP added successfully.');
    } catch (error) {
      console.error(error);
      showAlert('Failed to add GP. Please try again.');
      throw new Error('Failed to add GP');
    }
  };
};

export const updateGPSuccess = (gp: GP) => ({
  type: UPDATE_GP_SUCCESS,
  payload: gp,
});

export const updateGP = (gp: GP) => {
  return async (dispatch: Dispatch) => {
    try {
      const updatedGP = await axios.post<GP>(
        `/admin-service/updateGP`,
        gp,
        {
          headers: {
            Authorization: `${TOKEN}`,
          },
        }
      );
      dispatch(updateGPSuccess(updatedGP.data));
      showAlert('GP updated successfully.');
    } catch (error) {
      console.error(error);
      showAlert('Failed to update GP. Please try again.');
      throw new Error('Failed to update GP');
    }
  };
};

export const deleteGPSuccess = (gp: GP) => ({
  type: DELETE_GP_SUCCESS,
  payload: gp,
});

export const deleteGP = (gp: GP) => {
  return async (dispatch: Dispatch) => {
    try {
      await axios.post(`/admin-service/deleteGP`, gp, {
        headers: {
          Authorization: `${TOKEN}`,
        },
      });
      dispatch(deleteGPSuccess(gp));
      showAlert('GP deleted successfully.');
    } catch (error) {
      console.error(error);
      showAlert('Failed to delete GP. Please try again.');

      throw new Error('Failed to delete GP');
    }
  };
};

export const toggleGPStatusSuccess = (gp: GP) => ({
  type: TOGGLE_GP_STATUS_SUCCESS,
  payload: gp,
});

export const toggleGPStatus = (gp: GP) => {
  return async (dispatch: Dispatch) => {
    try {
      let newStatus = gp.isActive === 'Y' ? 'N' : 'Y';

      if (newStatus === 'Y') {
        await axios.post(`/admin-service/activateGP`, gp, {
          headers: {
            Authorization: `${TOKEN}`,
          },
        });
      } else {
        await axios.post(`/admin-service/deactivateGP`, gp, {
          headers: {
            Authorization: `${TOKEN}`,
          },
        });
      }

      gp.isActive = newStatus;
      dispatch(toggleGPStatusSuccess(gp));
      showAlert(`GP status changed to ${newStatus === 'Y' ? 'Active' : 'Inactive'}.`);

    } catch (error) {
      console.error(error);
      showAlert('Failed to toggle GP status. Please try again.');

      throw new Error('Failed to toggle GP status');
    }
  };
};
