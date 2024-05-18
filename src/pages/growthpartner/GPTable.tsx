/* ----------------------------------------------------------------------------
Information Contained Herein is Proprietary and Confidential. copyright notice in all copies, 
acknowledging that the code is provided without warranties, and strictly prohibiting unauthorized 
sharing or distribution without prior written consent from the copyright holder<DKG Labs Pvt. Ltd>
------------------------------------------------------------------------------ */

import React from "react";
import { DataGrid, GridColDef, GridToolbar } from "@mui/x-data-grid";
import { IconButton } from "@mui/material";
import { Edit, Delete, Block, CheckCircle } from "@mui/icons-material";
import { GP } from "./GPInterface";

interface GPTableProps {
  gpList: GP[];
  editGP: (gp: GP) => void;
  deleteGP: (gp: GP) => void;
  toggleGPStatus: (gp: GP, status: "Y" | "N") => void;
}

const GPTable: React.FC<GPTableProps> = ({
  gpList,
  editGP,
  deleteGP,
  toggleGPStatus,
}) => {
  const rows = gpList.map((gp) => ({
    id: gp.gpId,
    ...gp,
  }));

  const columns: GridColDef[] = [
    { field: "gpId", headerName: "gpId", width: 120 },
    { field: "firstName", headerName: "First Name", width: 150 },
    { field: "lastName", headerName: "Last Name", width: 150 },
    { field: "mgrName", headerName: "MgrName", width: 150 },
    { field: "addressLineFirst", headerName: "AdrLine1", width: 200 },
    { field: "addressLineSecond", headerName: "AdrLine2", width: 200 },
    { field: "city", headerName: "City", width: 120 },
    { field: "state", headerName: "State", width: 120 },
    { field: "pinCode", headerName: "PinCode", width: 120 },
    { field: "mobile", headerName: "Mobile", width: 120 },
    { field: "phone", headerName: "Phone", width: 120 },
    { field: "email", headerName: "Email", width: 150 },
    { field: "lat", headerName: "Lat", width: 120 },
    { field: "lng", headerName: "Lng", width: 120 },
    { field: "isActive", headerName: "isActive", width: 120 },
    {
      field: "actions",
      headerName: "Action",
      width: 200,
      renderCell: (params) => (
        <>
          <IconButton onClick={() => editGP(params.row as GP)}>
            <Edit />
          </IconButton>
          <IconButton onClick={() => deleteGP(params.row as GP)}>
            <Delete />
          </IconButton>
          {(params.row as GP).isActive === "Y" ? (
            <IconButton onClick={() => toggleGPStatus(params.row as GP, "N")}>
              <Block />
            </IconButton>
          ) : (
            <IconButton onClick={() => toggleGPStatus(params.row as GP, "Y")}>
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
        checkboxSelection
        disableRowSelectionOnClick
        components={{ Toolbar: GridToolbar }}
      />
    </div>
  );
};

export default GPTable;
