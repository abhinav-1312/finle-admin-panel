import { Dispatch } from "redux";
import { BASE_URL, TOKEN } from "../../utils/BaseUrl";
import axios from "axios";
export const FETCH_LOAN_DETAIL_SUCCESS = 'FETCH_LOAN_DETAIL_SUCCESS'

export const fetchLoanDetailSuccess = (allLoanDetailList: any[]) => ({
    type: FETCH_LOAN_DETAIL_SUCCESS,
    payload: allLoanDetailList
})

export const fetchLoanDetail = () => {
    return async (dispatch: Dispatch) => {
        try{
            const response = await axios.get(`/user-service/allLoanDetails`, {
                headers: {
                  Authorization: TOKEN,
                },
              });

            dispatch(fetchLoanDetailSuccess(response?.data?.responseData))
        }
        catch(error){
            alert("Error while fetching loan details.")
            console.log("Error while fetching loan details.", error)
        }
    }
}