/* ----------------------------------------------------------------------------
Information Contained Herein is Proprietary and Confidential. copyright notice in all copies, 
acknowledging that the code is provided without warranties, and strictly prohibiting unauthorized 
sharing or distribution without prior written consent from the copyright holder<DKG Labs Pvt. Ltd>
------------------------------------------------------------------------------ */

import {
  FETCH_PRODUCTS_SUCCESS,
  ADD_PRODUCT_SUCCESS,
  UPDATE_PRODUCT_SUCCESS,
  DELETE_PRODUCT_SUCCESS,
  TOGGLE_PRODUCT_STATUS_SUCCESS,
} from "../actions/productActions";
import Product from "../../pages/manageProducts/ProductInterface";

interface ProductState {
  productList: Product[];
}

const initialState: ProductState = {
  productList: [],
};

const productReducer = (state = initialState, action: any): ProductState => {
  switch (action.type) {
    case FETCH_PRODUCTS_SUCCESS:
      return {
        ...state,
        productList: action.payload,
      };
    case ADD_PRODUCT_SUCCESS:
      return {
        ...state,
        productList: [...state.productList, action.payload],
      };
    case UPDATE_PRODUCT_SUCCESS:
      return {
        ...state,
        productList: state.productList.map((product) =>
          product.productCode === action.payload.productCode
            ? action.payload
            : product
        ),
      };
    case DELETE_PRODUCT_SUCCESS:
      return {
        ...state,
        productList: state.productList.filter(
          (product) => product.productCode !== action.payload.productCode
        ),
      };
    case TOGGLE_PRODUCT_STATUS_SUCCESS:
      return {
        ...state,
        productList: state.productList.map((product) =>
          product.productCode === action.payload.productCode
            ? action.payload
            : product
        ),
      };
    default:
      return state;
  }
};

export default productReducer;
