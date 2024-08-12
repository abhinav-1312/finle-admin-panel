/* ----------------------------------------------------------------------------
Information Contained Herein is Proprietary and Confidential. copyright notice in all copies, 
acknowledging that the code is provided without warranties, and strictly prohibiting unauthorized 
sharing or distribution without prior written consent from the copyright holder<DKG Labs Pvt. Ltd>
------------------------------------------------------------------------------ */

import axios from "axios";
import { BASE_URL, TOKEN } from "../../utils/BaseUrl";
import { Dispatch } from "redux";

export const showAlert = (message: string) => {
  alert(message);
}

export const FETCH_Dlr_Dtls = 'FETCH_Dlr_Dtls';

export const fetchDlrDtls = (dlrDtls: []) => ({
  type: FETCH_Dlr_Dtls,
  payload: dlrDtls,
});

export const fetchspecificDlrDtls = (partnerId: string) => {
  return async (dispatch: Dispatch) => {
    try {
      const response = await axios.get<any>(`/collection-service/getCollectionDetails`, {
        headers: {
          Authorization: `${TOKEN}`,
        },
      });
      const dlrDtls = response.data.responseData;
      dispatch(fetchDlrDtls(dlrDtls));
    } catch (error) {
      console.error(error);
      showAlert('Failed to fetch Dealers. Please try again.');
      throw new Error('Failed to fetch Dealers');
    }
  };
};
