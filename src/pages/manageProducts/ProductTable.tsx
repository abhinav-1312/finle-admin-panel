/* ----------------------------------------------------------------------------
Information Contained Herein is Proprietary and Confidential. copyright notice in all copies, 
acknowledging that the code is provided without warranties, and strictly prohibiting unauthorized 
sharing or distribution without prior written consent from the copyright holder<DKG Labs Pvt. Ltd>
------------------------------------------------------------------------------ */


import React from "react";
import { DataGrid, GridColDef, GridToolbar } from "@mui/x-data-grid";
import { Edit, Delete, Block, CheckCircle } from "@mui/icons-material";
import { IconButton } from "@mui/material";
import ProductInterface from "./ProductInterface";

interface ProductTableProps {
  products: ProductInterface[];
  onUpdate: (product: ProductInterface) => void;
  onDelete: (product: ProductInterface) => void;
  onToggleStatus: (product: ProductInterface, status: "N" | "Y") => void;
}

const ProductTable: React.FC<ProductTableProps> = ({
  products,
  onUpdate,
  onDelete,
  onToggleStatus,
}) => {
  const rows = products.map((product) => ({
    id: product.productCode,
    ...product,
  }));

  const columns: GridColDef[] = [
    {
      field: "productCode",
      headerName: "Code",
      width: 120,
      valueGetter: (params) => params.value || "NA",
    },
    {
      field: "productName",
      headerName: "Name",
      width: 150,
      valueGetter: (params) => params.value || "NA",
    },
    {
      field: "productDesc",
      headerName: "Description",
      width: 200,
      valueGetter: (params) => params.value || "NA",
    },
    {
      field: "productCategory",
      headerName: "Category",
      width: 150,
      valueGetter: (params) => params.value || "NA",
    },
    {
      field: "productMileage",
      headerName: "Mileage",
      width: 120,
      valueGetter: (params) => params.value || "NA",
    },
    {
      field: "productPower",
      headerName: "Power",
      width: 120,
      valueGetter: (params) => params.value || "NA",
    },
    {
      field: "productBatDtls",
      headerName: "Battery Details",
      width: 200,
      valueGetter: (params) => params.value || "NA",
    },
    {
      field: "productLoadCapacity",
      headerName: "Load Capacity",
      width: 150,
      valueGetter: (params) => params.value || "NA",
    },
    {
      field: "productSafety",
      headerName: "Safety",
      width: 150,
      valueGetter: (params) => params.value || "NA",
    },
    {
      field: "productRemark",
      headerName: "Remark",
      width: 150,
      valueGetter: (params) => params.value || "NA",
    },
    {
      field: "productImage",
      headerName: "Image",
      width: 150,
      valueGetter: (params) => params.value || "NA",
    },
    {
      field: "chassisNumber",
      headerName: "Chassis Number",
      width: 150,
      valueGetter: (params) => params.value || "NA",
    },
    {
      field: "colorName",
      headerName: "Color Name",
      width: 150,
      valueGetter: (params) => params.value || "NA",
    },
    {
      field: "costPrice",
      headerName: "Cost Price",
      width: 150,
      valueGetter: (params) => params.value || "NA",
    },
    {
      field: "make",
      headerName: "Make",
      width: 150,
      valueGetter: (params) => params.value || "NA",
    },
    {
      field: "model",
      headerName: "Model",
      width: 150,
      valueGetter: (params) => params.value || "NA",
    },
    {
      field: "owner",
      headerName: "Owner",
      width: 150,
      valueGetter: (params) => params.value || "NA",
    },
    {
      field: "year",
      headerName: "Year",
      width: 150,
      valueGetter: (params) => params.value || "NA",
    },
    {
      field: "isActive",
      headerName: "isActive",
      width: 120,
      valueFormatter: (params) =>
        params.value || "NA",
    },
    {
      field: "actions",
      headerName: "Action",
      width: 200,
      renderCell: (params) => (
        <>
          <IconButton onClick={() => onUpdate(params.row as ProductInterface)}>
            <Edit />
          </IconButton>
          <IconButton onClick={() => onDelete(params.row as ProductInterface)}>
            <Delete />
          </IconButton>
          {params.row.isActive === "Y" ? (
            <IconButton
              onClick={() => onToggleStatus(params.row as ProductInterface , "N")}
            >
              <Block />
            </IconButton>
          ) : (
            <IconButton
              onClick={() => onToggleStatus(params.row as ProductInterface, "Y")}
            >
              <CheckCircle color="primary" />
            </IconButton>
          )}
        </>
      ),
    },
  ];

  return (
    <div style={{ height: "auto", width: "100%" }}>
      <DataGrid
        rows={rows}
        columns={columns}
        autoHeight
        getRowId={(row) => Math.random() * rows.length}
        initialState={{
          pagination: {
            paginationModel: { page: 0, pageSize: 10 },
          },
        }}
        pageSizeOptions={[5, 10, 20, 30, 50, 100]}
        // checkboxSelection
        components={{
          Toolbar: GridToolbar,
        }}
      />
    </div>
  );
};

export default ProductTable;
