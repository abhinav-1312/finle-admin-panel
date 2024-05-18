/* ----------------------------------------------------------------------------
Information Contained Herein is Proprietary and Confidential. copyright notice in all copies, 
acknowledging that the code is provided without warranties, and strictly prohibiting unauthorized 
sharing or distribution without prior written consent from the copyright holder<DKG Labs Pvt. Ltd>
------------------------------------------------------------------------------ */

import React, { useState, useEffect, ChangeEvent } from "react";
import {
  Button,
  Modal,
  Box,
  Card,
  CardContent,
  TextField,
} from "@mui/material";
import ProductTable from "./ProductTable";
import ProductForm from "./ProductForm";
import { Add } from "@mui/icons-material";
import { useDispatch, useSelector } from "react-redux";
import { ThunkDispatch } from "redux-thunk";
import { RootState } from "../../store/store";
import ProductInterface from "./ProductInterface";
import {
  fetchProducts,
  addProduct,
  updateProduct,
  deleteProduct,
  toggleProductStatus,
} from "../../store/actions/productActions";

const ProductManagement: React.FC = () => {
  const [selectedProduct, setSelectedProduct] = useState<ProductInterface | null>(
    null
  );
  const [isFormVisible, setIsFormVisible] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  const dispatch = useDispatch<ThunkDispatch<RootState, null, any>>();
  const products = useSelector((state: RootState) => state.product.productList);

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  const showAddForm = () => {
    setSelectedProduct(null);
    setIsFormVisible(true);
  };

  const showUpdateForm = (product: ProductInterface) => {
    setSelectedProduct(product);
    setIsFormVisible(true);
  };

  const handleDeleteProduct = async (product: ProductInterface) => {
    try {
      await dispatch(deleteProduct(product));
      dispatch(fetchProducts());
    } catch (error) {
      console.error(error);
    }
  };

  const toggleProductStatusAction = async (product: ProductInterface) => {
    try {
      await dispatch(toggleProductStatus(product));
      dispatch(fetchProducts());
    } catch (error) {
      console.error(error);
    }
  };

  const hideForm = () => {
    setIsFormVisible(false);
  };

  const handleSearch = (event: ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  const handleFormSubmit = async (product: ProductInterface) => {
    try {
      if (selectedProduct === null) {
        await dispatch(addProduct(product));
      } else {
        await dispatch(updateProduct(product));
      }
      setIsFormVisible(false);
      dispatch(fetchProducts());
    } catch (error) {
      console.error(error);
    }
  };

  const filteredProductList = searchTerm
    ? products.filter((product) =>
        Object.values(product).some(
          (value) =>
            value &&
            typeof value === "string" &&
            value.toLowerCase().includes(searchTerm.toLowerCase())
        )
      )
    : products;

  return (
    <div>
      <h1>Product Management</h1>

      <Card>
        <CardContent>
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <TextField
              label="Search Product"
              variant="outlined"
              size="small"
              value={searchTerm}
              onChange={handleSearch}
            />
            <Button
              variant="contained"
              startIcon={<Add />}
              onClick={showAddForm}
            >
              Add Product
            </Button>
          </div>
          <br></br>
          <ProductTable
            products={filteredProductList}
            onUpdate={showUpdateForm}
            onDelete={handleDeleteProduct}
            onToggleStatus={toggleProductStatusAction}
          />
        </CardContent>
      </Card>

      <Modal open={isFormVisible} onClose={hideForm}>
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
          }}
        >
          <ProductForm
            product={selectedProduct}
            onSubmit={handleFormSubmit}
            onCancel={hideForm}
          />
        </Box>
      </Modal>
    </div>
  );
};

export default ProductManagement;
