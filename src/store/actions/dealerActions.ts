/* ----------------------------------------------------------------------------
Information Contained Herein is Proprietary and Confidential. copyright notice in all copies, 
acknowledging that the code is provided without warranties, and strictly prohibiting unauthorized 
sharing or distribution without prior written consent from the copyright holder<DKG Labs Pvt. Ltd>
------------------------------------------------------------------------------ */


import axios from "axios";
import { BASE_URL ,TOKEN} from "../../utils/BaseUrl";
import { Dispatch } from "redux";
import { Dealer } from "../../pages/dealer/DealerInterface";

export const showAlert = (message: string) => {
  alert(message);
}

export const FETCH_DealerS_SUCCESS = 'FETCH_DealerS_SUCCESS';
export const ADD_Dealer_SUCCESS = 'ADD_Dealer_SUCCESS';
export const UPDATE_Dealer_SUCCESS = 'UPDATE_Dealer_SUCCESS';
export const DELETE_Dealer_SUCCESS = 'DELETE_Dealer_SUCCESS';
export const TOGGLE_Dealer_STATUS_SUCCESS = 'TOGGLE_Dealer_STATUS_SUCCESS';

export const fetchDealersSuccess = (dlrList: Dealer[]) => ({
  type: FETCH_DealerS_SUCCESS,
  payload: dlrList,
});

export const fetchDealers = () => {
  return async (dispatch: Dispatch) => {
    try {
      const response = await axios.get<any>(`${BASE_URL}/admin-service/getDealerDetails`, {
        headers: {
          Authorization: `${TOKEN}`,
        },
      });
      const dlrList = response.data.responseData as Dealer[];
      dispatch(fetchDealersSuccess(dlrList));
    } catch (error) {
      console.error(error);
      showAlert('Failed to fetch Dealers. Please try again.');
      throw new Error('Failed to fetch Dealers');
    }
  };
};




// Action creators for adding Dealers
export const addDealerSuccess = (dlr: Dealer) => ({
  type: ADD_Dealer_SUCCESS,
  payload: dlr,
});

export const addDealer = (dlr: Dealer) => {
  return async (dispatch: Dispatch) => {
    try {
      const response = await axios.post<Dealer>(
        `${BASE_URL}/admin-service/addDealer`,
        JSON.stringify(dlr),
        {
          headers: {
            Authorization: `${TOKEN}`,
            'Content-Type': 'application/json',
          },
        }
      );
      const newDealer = response.data;
      dispatch(addDealerSuccess(newDealer));
      showAlert('Dealer added successfully.');
    } catch (error) {
      console.error(error);
      showAlert('Failed to add Dealer. Please try again.');
      throw new Error('Failed to add Dealer');
    }
  };
};

// Action creators for updating Dealers
export const updateDealerSuccess = (dlr: Dealer) => ({
  type: UPDATE_Dealer_SUCCESS,
  payload: dlr,
});

export const updateDealer = (dlr: Dealer) => {
  return async (dispatch: Dispatch) => {
    try {
      const response = await axios.post<Dealer>(
        `${BASE_URL}/admin-service/updateDealer`,
        dlr,
        {
          headers: {
            Authorization: `${TOKEN}`,
          },
        }
      );
      const updatedDealer = response.data;
      dispatch(updateDealerSuccess(updatedDealer));
      showAlert('Dealer updated successfully.');
    } catch (error) {
      console.error(error);
      showAlert('Failed to update Dealer. Please try again.');
      throw new Error('Failed to update Dealer');
    }
  };
};

// Action creators for deleting Dealers
export const deleteDealerSuccess = (dlr: Dealer) => ({
  type: DELETE_Dealer_SUCCESS,
  payload: dlr,
});

export const deleteDealer = (dlr: Dealer) => {
  return async (dispatch: Dispatch) => {
    try {
      await axios.post(`${BASE_URL}/admin-service/deleteDealer`, dlr, {
        headers: {
          Authorization: `${TOKEN}`,
        },
      });
      dispatch(deleteDealerSuccess(dlr));
      showAlert('Dealer deleted successfully.');
    } catch (error) {
      console.error(error);
      showAlert('Failed to delete Dealer. Please try again.');
      throw new Error('Failed to delete Dealer');
    }
  };
};

// Action creators for toggling Dealer status
export const toggleDealerStatusSuccess = (dlr: Dealer) => ({
  type: TOGGLE_Dealer_STATUS_SUCCESS,
  payload: dlr,
});

export const toggleDealerStatus = (dlr: Dealer) => {
  return async (dispatch: Dispatch) => {
    try {
      let newStatus = dlr.isActive === 'Y' ? 'N' : 'Y';

      if (newStatus === 'Y') {
        await axios.post(`${BASE_URL}/admin-service/activateDealer`, dlr, {
          headers: {
            Authorization: `${TOKEN}`,
          },
        });
      } else {
        await axios.post(`${BASE_URL}/admin-service/deactivateDealer`, dlr, {
          headers: {
            Authorization: `${TOKEN}`,
          },
        });
      }

      dlr.isActive = newStatus;
      dispatch(toggleDealerStatusSuccess(dlr));
      showAlert(`Dealer status changed to ${newStatus === 'Y' ? 'Active' : 'Inactive'}.`);
    } catch (error) {
      console.error(error);
      showAlert('Failed to toggle Dealer status. Please try again.');
      throw new Error('Failed to toggle Dealer status');
    }
  };
};
