/* ----------------------------------------------------------------------------
Information Contained Herein is Proprietary and Confidential. copyright notice in all copies, 
acknowledging that the code is provided without warranties, and strictly prohibiting unauthorized 
sharing or distribution without prior written consent from the copyright holder<DKG Labs Pvt. Ltd>
------------------------------------------------------------------------------ */


import axios from 'axios';
import { BASE_URL, TOKEN } from '../../utils/BaseUrl';
import { Dispatch } from 'redux';
import { DSA } from '../../pages/dsa/DsaInterface';

export const showAlert = (message: string) => {
  alert(message);
};

export const FETCH_DSAS_SUCCESS = 'FETCH_DSAS_SUCCESS';
export const ADD_DSA_SUCCESS = 'ADD_DSA_SUCCESS';
export const UPDATE_DSA_SUCCESS = 'UPDATE_DSA_SUCCESS';
export const DELETE_DSA_SUCCESS = 'DELETE_DSA_SUCCESS';
export const TOGGLE_DSA_STATUS_SUCCESS = 'TOGGLE_DSA_STATUS_SUCCESS';

export const fetchDSAsSuccess = (dsaList: DSA[]) => ({
  type: FETCH_DSAS_SUCCESS,
  payload: dsaList,
});

export const fetchDSAs = () => {
  return async (dispatch: Dispatch) => {
    try {
      const response = await axios.get<any>(`/admin-service/getDSADetails`, {
        headers: {
          Authorization: `${TOKEN}`,
        },
      });
      const dsaList = response.data.responseData as DSA[];
      dispatch(fetchDSAsSuccess(dsaList));
    } catch (error) {
      console.error(error);
      showAlert('Failed to fetch DSAs. Please try again.');
      throw new Error('Failed to fetch DSAs');
    }
  };
};

export const addDSASuccess = (dsa: DSA) => ({
  type: ADD_DSA_SUCCESS,
  payload: dsa,
});

export const addDSA = (dsa: DSA) => {
  return async (dispatch: Dispatch) => {
    try {
      const response = await axios.post<DSA>(
        `/admin-service/addDSA`,
        JSON.stringify(dsa),
        {
          headers: {
            Authorization: `${TOKEN}`,
            'Content-Type': 'application/json',
          },
        }
      );
      const newDSA = response.data;
      dispatch(addDSASuccess(newDSA));
      showAlert('DSA added successfully.');
    } catch (error) {
      console.error(error);
      showAlert('Failed to add DSA. Please try again.');
      throw new Error('Failed to add DSA');
    }
  };
};

export const updateDSASuccess = (dsa: DSA) => ({
  type: UPDATE_DSA_SUCCESS,
  payload: dsa,
});

export const updateDSA = (dsa: DSA) => {
  return async (dispatch: Dispatch) => {
    try {
      const response = await axios.post<DSA>(
        `/admin-service/updateDSA`,
        dsa,
        {
          headers: {
            Authorization: `${TOKEN}`,
          },
        }
      );
      const updatedDSA = response.data;
      dispatch(updateDSASuccess(updatedDSA));
      showAlert('DSA updated successfully.');
    } catch (error) {
      console.error(error);
      showAlert('Failed to update DSA. Please try again.');
      throw new Error('Failed to update DSA');
    }
  };
};

export const deleteDSASuccess = (dsa: DSA) => ({
  type: DELETE_DSA_SUCCESS,
  payload: dsa,
});

export const deleteDSA = (dsa: DSA) => {
  return async (dispatch: Dispatch) => {
    try {
      await axios.post(`/admin-service/deleteDSA`, dsa, {
        headers: {
          Authorization: `${TOKEN}`,
        },
      });
      dispatch(deleteDSASuccess(dsa));
      showAlert('DSA deleted successfully.');
    } catch (error) {
      console.error(error);
      showAlert('Failed to delete DSA. Please try again.');
      throw new Error('Failed to delete DSA');
    }
  };
};

export const toggleDSAStatusSuccess = (dsa: DSA) => ({
  type: TOGGLE_DSA_STATUS_SUCCESS,
  payload: dsa,
});

export const toggleDSAStatus = (dsa: DSA) => {
  return async (dispatch: Dispatch) => {
    try {
      let newStatus = dsa.isActive === 'Y' ? 'N' : 'Y';

      if (newStatus === 'Y') {
        await axios.post(`/admin-service/activateDSA`, dsa, {
          headers: {
            Authorization: `${TOKEN}`,
          },
        });
      } else {
        await axios.post(`/admin-service/deactivateDSA`, dsa, {
          headers: {
            Authorization: `${TOKEN}`,
          },
        });
      }

      dsa.isActive = newStatus;
      dispatch(toggleDSAStatusSuccess(dsa));
      showAlert(`DSA status changed to ${newStatus === 'Y' ? 'Active' : 'Inactive'}.`);
    } catch (error) {
      console.error(error);
      showAlert('Failed to toggle DSA status. Please try again.');
      throw new Error('Failed to toggle DSA status');
    }
  };
};
