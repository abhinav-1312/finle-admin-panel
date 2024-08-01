import { Dispatch } from "redux";
import { ActiveCustomers } from "../reducers/totActiveCustReducer";
import { BASE_URL, TOKEN } from "../../utils/BaseUrl";
import axios from "axios";

export const FETCH_ACTIVE_CUST_SUCCESS = "FETCH_ACTIVE_CUST_SUCCESS";

export const fetchActiveCustSuccess = (activeCustList : ActiveCustomers[]) => ({
    type: FETCH_ACTIVE_CUST_SUCCESS,
    payload: activeCustList
})

export const fetchActiveCustomers = () => {
    return async (dispatch: Dispatch) => {
        try {
            const response = await axios.post(`${BASE_URL}/user-service/getAllUserDetails`, {}, {
              headers: {
                Authorization: TOKEN,
              },
            });
      
              const allUsers = response?.data?.responseData;
              const activeCustList = allUsers?.filter((user: any) => user.active === true)
              dispatch(fetchActiveCustSuccess(activeCustList))
          } catch (error) {
            console.error("Error during data fetch:", error);
            alert("Failed to fetch active customer data")
          }
    }
}