/* ----------------------------------------------------------------------------
Information Contained Herein is Proprietary and Confidential. copyright notice in all copies, 
acknowledging that the code is provided without warranties, and strictly prohibiting unauthorized 
sharing or distribution without prior written consent from the copyright holder<DKG Labs Pvt. Ltd>
------------------------------------------------------------------------------ */

import React from "react";
import { DataGrid, GridColDef, GridToolbar } from "@mui/x-data-grid";
import { Button, IconButton } from "@mui/material";
import { Edit, Delete, Block, CheckCircle } from "@mui/icons-material";
import { NBFC } from "./NbfcInterface";
import { useNavigate } from "react-router-dom";

interface NBFCTableProps {
  nbfcList: NBFC[];
  editNBFC: (nbfc: NBFC) => void;
  deleteNBFC: (nbfc: NBFC) => void;
  toggleNBFCStatus: (nbfc: NBFC, isActive: "Y" | "N") => void;
}

const NBFCTable: React.FC<NBFCTableProps> = ({
  nbfcList,
  editNBFC,
  deleteNBFC,
  toggleNBFCStatus,
}) => {
  const rows = nbfcList.map((nbfc) => ({
    id: nbfc.nbfcId,
    ...nbfc,
  }));

  const navigate = useNavigate()

  const handleNbfcIdClick = (nbfcId: any) => {
    navigate(`/nbfc/${nbfcId}`)
  }

  const columns: GridColDef[] = [
    { field: "nbfcId", headerName: "ID", width: 100,
      renderCell: (params) => (
        <Button
          variant="text"
          color="inherit"
          sx={{ background: "#dcdcdc" }}
          onClick={() =>
            handleNbfcIdClick(
              params.row.nbfcId
            )
          }
        >
          {params.row.nbfcId}
        </Button>
      )
     },
    { 
      field: "name",
      headerName: "Name",
      width: 250,
      renderCell: (params) => params.row.firstName + " " + params.row.lastName
    },
    { field: "mgrName", headerName: "MgrName", width: 150 },
    { field: "addressLineFirst", headerName: "AdrLine1", width: 200 },
    { field: "addressLineSecond", headerName: "AdrLine2", width: 200 },
    { field: "city", headerName: "City", width: 120 },
    { field: "state", headerName: "State", width: 120 },
    { field: "pincode", headerName: "Pincode", width: 120 },
    { field: "mobile", headerName: "Mobile", width: 120 },
    { field: "phone", headerName: "Phone", width: 120 },
    { field: "email", headerName: "Email", width: 150 },
    { field: "lat", headerName: "Lat", width: 120 },
    { field: "lng", headerName: "Lang", width: 120 },
    { field: "remarks", headerName: "Remarks", width: 120 },
    {
      field: "isActive",
      headerName: "isActive",
      width: 120,
      renderCell: (params) =>
        params.value === "Y" ? (
          <CheckCircle color="primary" />
        ) : (
          <Block color="error" />
        ),
    },
    {
      field: "actions",
      headerName: "Action",
      width: 200,
      renderCell: (params) => (
        <>
          <IconButton onClick={() => editNBFC(params.row as NBFC)}>
            <Edit />
          </IconButton>
          <IconButton onClick={() => deleteNBFC(params.row as NBFC)}>
            <Delete />
          </IconButton>
          {(params.row as NBFC).isActive === "Y" ? (
            <IconButton
              onClick={() => toggleNBFCStatus(params.row as NBFC, "N")}
            >
              <Block />
            </IconButton>
          ) : (
            <IconButton
              onClick={() => toggleNBFCStatus(params.row as NBFC, "Y")}
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
        checkboxSelection
        disableRowSelectionOnClick
        components={{
          Toolbar: GridToolbar,
        }}
      />
    </div>
  );
};

export default NBFCTable;
