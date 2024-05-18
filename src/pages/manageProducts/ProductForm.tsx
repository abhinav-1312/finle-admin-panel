/* ----------------------------------------------------------------------------
Information Contained Herein is Proprietary and Confidential. copyright notice in all copies, 
acknowledging that the code is provided without warranties, and strictly prohibiting unauthorized 
sharing or distribution without prior written consent from the copyright holder<DKG Labs Pvt. Ltd>
------------------------------------------------------------------------------ */


import React, { useState, useEffect } from "react";
import { SelectChangeEvent, Card, CardContent } from "@mui/material";
import  ProductInterface  from "./ProductInterface";
import "./product.scss";

import {
  TextField,
  TextareaAutosize,
  Button,
  Select,
  MenuItem,
} from "@mui/material";

interface ProductFormProps {
  product: ProductInterface | null;
  onCancel: () => void;
  onSubmit: (product: ProductInterface) => void;
}

const ProductForm: React.FC<ProductFormProps> = ({
  product,
  onSubmit,
  onCancel,
}) => {
  const [productData, setProductData] = useState<ProductInterface>({
    productCode: "",
    productName: "",
    productDesc: "",
    productCategory: "",
    productMileage: "",
    productPower: "",
    productBatDtls: "",
    productLoadCapacity: "",
    productSafety: "",
    productRemark: "",
    productImage: "",
    isActive: "Y",
    chassisNumber: "", // New field
    colorName: "", // New field
    costPrice: 0, // New field
    make: "", // New field
    model: "", // New field
    owner: "", // New field
    year: "", // New field
  });
  useEffect(() => {
    if (product) {
      setProductData(product);
    }
  }, [product]);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setProductData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleTextAreaChange = (
    event: React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    const { name, value } = event.target;
    setProductData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSelectChange = (event: SelectChangeEvent<string>) => {
    const { name, value } = event.target;
    setProductData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    onSubmit(productData)
  };

  return (
    <Card>
      <CardContent>
        <form className="product-form" onSubmit={handleSubmit}>
          <div>
            <label>Product Code:</label>
            <TextField
              type="text"
              name="productCode"
              value={productData.productCode}
              onChange={handleInputChange}
              required
            />
          </div>
          <div>
            <label>Product Name:</label>
            <TextField
              type="text"
              name="productName"
              value={productData.productName}
              onChange={handleInputChange}
              required
            />
          </div>
          <div>
            <label>Product Description:</label>
            <TextareaAutosize
              className="descArea"
              minRows={3}
              placeholder="Product Description"
              name="productDesc"
              value={productData.productDesc}
              onChange={handleTextAreaChange}
              required
            />
          </div>
          <div>
            <label>Product Category:</label>
            <TextField
              type="text"
              name="productCategory"
              value={productData.productCategory}
              onChange={handleInputChange}
              required
            />
          </div>
          <div>
            <label>Product Mileage:</label>
            <TextField
              type="text"
              name="productMileage"
              value={productData.productMileage}
              onChange={handleInputChange}
              required
            />
          </div>
          <div>
            <label>Product Power:</label>
            <TextField
              type="text"
              name="productPower"
              value={productData.productPower}
              onChange={handleInputChange}
              required
            />
          </div>
          <div>
            <label>Product Battery Details:</label>
            <TextField
              type="text"
              name="productBatDtls"
              value={productData.productBatDtls}
              onChange={handleInputChange}
              required
            />
          </div>
          <div>
            <label>Product Load Capacity:</label>
            <TextField
              type="text"
              name="productLoadCapacity"
              value={productData.productLoadCapacity}
              onChange={handleInputChange}
              required
            />
          </div>
          <div>
            <label>Product Safety:</label>
            <TextField
              type="text"
              name="productSafety"
              value={productData.productSafety}
              onChange={handleInputChange}
              required
            />
          </div>
          <div>
            <label>Chassis Number:</label>
            <TextField
              type="text"
              name="chassisNumber"
              value={productData.chassisNumber}
              onChange={handleInputChange}
              required
            />
          </div>
          <div>
            <label>Color Name:</label>
            <TextField
              type="text"
              name="colorName"
              value={productData.colorName}
              onChange={handleInputChange}
              required
            />
          </div>
          <div>
            <label>Cost Price:</label>
            <TextField
              type="number"
              name="costPrice"
              value={productData.costPrice}
              onChange={handleInputChange}
              required
            />
          </div>
          <div>
            <label>Make:</label>
            <TextField
              type="text"
              name="make"
              value={productData.make}
              onChange={handleInputChange}
              required
            />
          </div>
          <div>
            <label>Model:</label>
            <TextField
              type="text"
              name="model"
              value={productData.model}
              onChange={handleInputChange}
              required
            />
          </div>
          <div>
            <label>Owner:</label>
            <TextField
              type="text"
              name="owner"
              value={productData.owner}
              onChange={handleInputChange}
              required
            />
          </div>
          <div>
            <label>Year:</label>
            <TextField
              type="text"
              name="year"
              value={productData.year}
              onChange={handleInputChange}
              required
            />
          </div>

          <div>
            <label>Product Remark:</label>
            <TextField
              type="text"
              name="productRemark"
              value={productData.productRemark}
              onChange={handleInputChange}
              required
            />
          </div>
          <div>
            <label>Product Image:</label>
            <TextField
              type="text"
              name="productImage"
              value={productData.productImage}
              onChange={handleInputChange}
              required
            />
          </div>
          <div>
            <label>Active:</label>
            <Select
              name="isActive"
              value={productData.isActive}
              onChange={handleSelectChange}
            >
              <MenuItem value="Y">Yes</MenuItem>
              <MenuItem value="N">No</MenuItem>
            </Select>
          </div>
          <div>
            <Button type="submit" variant="contained">
              {product ? "Update" : "Add"}
            </Button>
            <Button type="button" variant="contained" onClick={onCancel}>
              Cancel
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
};

export default ProductForm;
