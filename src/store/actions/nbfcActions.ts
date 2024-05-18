/* ----------------------------------------------------------------------------
Information Contained Herein is Proprietary and Confidential. copyright notice in all copies, 
acknowledging that the code is provided without warranties, and strictly prohibiting unauthorized 
sharing or distribution without prior written consent from the copyright holder<DKG Labs Pvt. Ltd>
------------------------------------------------------------------------------ */


import axios from 'axios';
import { BASE_URL, TOKEN } from '../../utils/BaseUrl';
import { Dispatch } from 'redux';
import { NBFC } from '../../pages/nbfc/NbfcInterface';
export const showAlert = (message: string) => {
  alert(message);
};


export const FETCH_NBFC_SUCCESS = 'FETCH_NBFC_SUCCESS';
export const ADD_NBFC_SUCCESS = 'ADD_NBFC_SUCCESS';
export const UPDATE_NBFC_SUCCESS = 'UPDATE_NBFC_SUCCESS';
export const DELETE_NBFC_SUCCESS = 'DELETE_NBFC_SUCCESS';
export const TOGGLE_NBFC_STATUS_SUCCESS = 'TOGGLE_NBFC_STATUS_SUCCESS';


export const fetchNBFCsSuccess = (nbfcList: NBFC[]) => ({
  type: FETCH_NBFC_SUCCESS,
  payload: nbfcList,
});

export const fetchNBFCs = () => {
  return async (dispatch: Dispatch) => {
    try {
      const response = await axios.get<any>(`${BASE_URL}/admin-service/getNBFCDetails`, {
        headers: {
          Authorization: `${TOKEN}`,
        },
      });
      const nbfcList = response.data.responseData as NBFC[];
      dispatch(fetchNBFCsSuccess(nbfcList));
    } catch (error) {
      console.error(error);
      showAlert('Failed to fetch NBFCs. Please try again.');
      throw new Error('Failed to fetch NBFCs');
    }
  };
};

export const addNBFCSuccess = (nbfc: NBFC) => ({
  type: ADD_NBFC_SUCCESS,
  payload: nbfc,
});

export const addNBFC = (nbfc: NBFC) => {
  return async (dispatch: Dispatch) => {
    try {
      const response = await axios.post<NBFC>(
        `${BASE_URL}/admin-service/addNBFC`,
        JSON.stringify(nbfc),
        {
          headers: {
            Authorization: `${TOKEN}`,
            'Content-Type': 'application/json',
          },
        }
      );
      const newNBFC = response.data;
      dispatch(addNBFCSuccess(newNBFC));
      showAlert('NBFC added successfully.');
      
      
    } catch (error) {
      console.error(error);
      showAlert('Failed to add NBFC. Please try again.');
      throw new Error('Failed to add NBFC');
    }
  };
};

export const updateNBFCSuccess = (nbfc: NBFC) => ({
  type: UPDATE_NBFC_SUCCESS,
  payload: nbfc,
});

export const updateNBFC = (nbfc: NBFC) => {
  return async (dispatch: Dispatch) => {
    try {
      const response = await axios.post<NBFC>(
        `${BASE_URL}/admin-service/updateNBFC`,
        nbfc,
        {
          headers: {
            Authorization: `${TOKEN}`,
          },
        }
      );
      const updatedNBFC = response.data;
      dispatch(updateNBFCSuccess(updatedNBFC));
      showAlert('NBFC updated successfully.');
    } catch (error) {
      console.error(error);
      showAlert('Failed to update NBFC. Please try again.');
      throw new Error('Failed to update NBFC');
    }
  };
};

export const deleteNBFCSuccess = (nbfc: NBFC) => ({
  type: DELETE_NBFC_SUCCESS,
  payload: nbfc,
});

export const deleteNBFC = (nbfc: NBFC) => {
  return async (dispatch: Dispatch) => {
    try {
      await axios.post(`${BASE_URL}/admin-service/deleteNBFC`, nbfc, {
        headers: {
          Authorization: `${TOKEN}`,
        },
      });
      dispatch(deleteNBFCSuccess(nbfc));
      showAlert('NBFC deleted successfully.');
    } catch (error) {
      console.error(error);
      showAlert('Failed to delete NBFC. Please try again.');
      throw new Error('Failed to delete NBFC');
    }
  };
};

export const toggleNBFCStatusSuccess = (nbfc: NBFC) => ({
  type: TOGGLE_NBFC_STATUS_SUCCESS,
  payload: nbfc,
});

export const toggleNBFCStatus = (nbfc: NBFC) => {
  return async (dispatch: Dispatch) => {
    try {
      let newStatus = nbfc.isActive === 'Y' ? 'N' : 'Y';

      if (newStatus === 'Y') {
        await axios.post(`${BASE_URL}/admin-service/activateNBFC`, nbfc, {
          headers: {
            Authorization: `${TOKEN}`,
          },
        });
      } else {
        await axios.post(`${BASE_URL}/admin-service/deactivateNBFC`, nbfc, {
          headers: {
            Authorization: `${TOKEN}`,
          },
        });
      }

      nbfc.isActive = newStatus;
      dispatch(toggleNBFCStatusSuccess(nbfc));
      showAlert(`NBFC status changed to ${newStatus === 'Y' ? 'Active' : 'Inactive'}.`);
    } catch (error) {
      console.error(error);
      showAlert('Failed to toggle NBFC status. Please try again.');
      throw new Error('Failed to toggle NBFC status');
    }
  };
};
