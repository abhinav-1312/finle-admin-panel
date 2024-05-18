/* ----------------------------------------------------------------------------
Information Contained Herein is Proprietary and Confidential. copyright notice in all copies, 
acknowledging that the code is provided without warranties, and strictly prohibiting unauthorized 
sharing or distribution without prior written consent from the copyright holder<DKG Labs Pvt. Ltd>
------------------------------------------------------------------------------ */


import { createStore, applyMiddleware, combineReducers } from 'redux';
import thunk from 'redux-thunk';
import nbfcReducer from './reducers/nbfcReducer'; 
import dsaReducer from './reducers/dsaReducer';
import dealerReducer from './reducers/dealerReducer';
import gpReducer from './reducers/gpReducer';
import staffReducer from './reducers/staffReducer';
import productReducer from './reducers/productReducer';
import specificDlrDtlsReducer from './reducers/specifixDlrDtlsReducer';
import specificNbfcLoanReducer from './reducers/specificNbfcLoanReducer'; // Import the new reducer

export type RootState = {
  nbfc: ReturnType<typeof nbfcReducer>;
  dsa: ReturnType<typeof dsaReducer>;
  dlr: ReturnType<typeof dealerReducer>;
  gp: ReturnType<typeof gpReducer>;
  staff: ReturnType<typeof staffReducer>;
  product: ReturnType<typeof productReducer>;
  specificDlrDtls: ReturnType<typeof specificDlrDtlsReducer>;
  specificNbfcLoan: ReturnType<typeof specificNbfcLoanReducer>; // Add the new reducer state type

}


const rootReducer = combineReducers({
  nbfc: nbfcReducer,
  dsa: dsaReducer,
  dlr: dealerReducer,
  gp: gpReducer,
  staff: staffReducer,
  product: productReducer,
  specificDlrDtls: specificDlrDtlsReducer,
  specificNbfcLoan: specificNbfcLoanReducer, // Include the new reducer

});

const store = createStore(rootReducer, applyMiddleware(thunk));

export default store;
