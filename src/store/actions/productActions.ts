/* ----------------------------------------------------------------------------
Information Contained Herein is Proprietary and Confidential. copyright notice in all copies, 
acknowledging that the code is provided without warranties, and strictly prohibiting unauthorized 
sharing or distribution without prior written consent from the copyright holder<DKG Labs Pvt. Ltd>
------------------------------------------------------------------------------ */


import axios from "axios";
import { Dispatch } from "redux";
import  Product  from "../../pages/manageProducts/ProductInterface";
import { BASE_URL, TOKEN } from "../../utils/BaseUrl";


export const showAlert = (message: string) => {
  alert(message);
};

export const FETCH_PRODUCTS_SUCCESS = "FETCH_PRODUCTS_SUCCESS";
export const ADD_PRODUCT_SUCCESS = "ADD_PRODUCT_SUCCESS";
export const UPDATE_PRODUCT_SUCCESS = "UPDATE_PRODUCT_SUCCESS";
export const DELETE_PRODUCT_SUCCESS = "DELETE_PRODUCT_SUCCESS";
export const TOGGLE_PRODUCT_STATUS_SUCCESS = "TOGGLE_PRODUCT_STATUS_SUCCESS";

export const fetchProductsSuccess = (products: Product[]) => ({
  type: FETCH_PRODUCTS_SUCCESS,
  payload: products,
});

export const fetchProducts = () => {
  return async (dispatch: Dispatch) => {
    try {
      const response = await axios.get<{ responseData: Product[] }>(
        `/admin-service/getAllProductDetails`,
        {
          headers: {
            Authorization: TOKEN,
          },
        }
      );

      if (response.data && response.data.responseData) {
        dispatch(fetchProductsSuccess(response.data.responseData));
      } else {
        throw new Error("Invalid API response format");
      }
    } catch (error) {
      console.error("Error fetching products:", error);
      throw error;
    }
  };
};

export const addProductSuccess = (product: Product) => ({
  type: ADD_PRODUCT_SUCCESS,
  payload: product,
});

export const addProduct = (product: Product) => {
  return async (dispatch: Dispatch) => {
    try {
      const response = await axios.post<Product>(
        `/admin-service/addProduct`,
        product,
        {
          headers: {
            Authorization: TOKEN,
          },
        }
      );
      dispatch(addProductSuccess(response.data));
      showAlert('Product added successfully.');
    } catch (error) {
      console.error(error);
      showAlert('Failed to add Product. Please try again.');
      throw new Error("Failed to add Product");
    }
  };
};

export const updateProductSuccess = (product: Product) => ({
  type: UPDATE_PRODUCT_SUCCESS,
  payload: product,
});

export const updateProduct = (product: Product) => {
  return async (dispatch: Dispatch) => {
    try {
      const response = await axios.post<Product>(
        `/admin-service/updateProduct`,
        product,
        {
          headers: {
            Authorization: TOKEN,
          },
        }
      );
      dispatch(updateProductSuccess(response.data));
      showAlert('Product updated successfully.');
    } catch (error) {
      console.error(error);
      showAlert('Failed to update Product. Please try again.');
      throw new Error("Failed to update Product");
    }
  };
};

export const deleteProductSuccess = (product: Product) => ({
  type: DELETE_PRODUCT_SUCCESS,
  payload: product,
});

export const deleteProduct = (product: Product) => {
  return async (dispatch: Dispatch) => {
    try {
      await axios.post(
        `/admin-service/deleteProduct`,
        product,
        {
          headers: {
            Authorization: TOKEN,
          },
        }
      );
      dispatch(deleteProductSuccess(product));
      showAlert('Product deleted successfully.');
    } catch (error) {
      console.error(error);
      showAlert('Failed to delete Product. Please try again.');
      throw new Error("Failed to delete Product");
    }
  };
};

export const toggleProductStatusSuccess = (product: Product) => ({
  type: TOGGLE_PRODUCT_STATUS_SUCCESS,
  payload: product,
});

export const toggleProductStatus = (product: Product) => {
  return async (dispatch: Dispatch) => {
    try {
      let newStatus = product.isActive === "Y" ? "N" : "Y";

      if (newStatus === "Y") {
        await axios.post(
          `/admin-service/activateProduct`,
          product,
          {
            headers: {
              Authorization: TOKEN,
            },
          }
        );
      } else {
        await axios.post(
          `/admin-service/deactivateProduct`,
          product,
          {
            headers: {
              Authorization: TOKEN,
            },
          }
        );
      }

      product.isActive = newStatus;
      dispatch(toggleProductStatusSuccess(product));
      showAlert(`Product status changed to ${newStatus === 'Y' ? 'Active' : 'Inactive'}.`);
    } catch (error) {
      console.error(error);
      showAlert('Failed to toggle Product status. Please try again.');
      throw new Error("Failed to toggle Product status");
    }
  };
};
