/* ----------------------------------------------------------------------------
Information Contained Herein is Proprietary and Confidential. copyright notice in all copies, 
acknowledging that the code is provided without warranties, and strictly prohibiting unauthorized 
sharing or distribution without prior written consent from the copyright holder<DKG Labs Pvt. Ltd>
------------------------------------------------------------------------------ */

import React from "react";
import { DataGrid, GridColDef, GridToolbar } from "@mui/x-data-grid";
import { IconButton } from "@mui/material";
import { Edit, Delete, Block, CheckCircle } from "@mui/icons-material";
import { Dealer } from "./DealerInterface";

interface DealerTableProps {
  DlrList: Dealer[];
  editDealer: (dealer: Dealer) => void;
  deleteDealer: (dealer: Dealer) => void;
  toggleDealerStatus: (dealer: Dealer, status: "N" | "Y") => void;
}

const DealerTable: React.FC<DealerTableProps> = ({
  DlrList,
  editDealer,
  deleteDealer,
  toggleDealerStatus,
}) => {
  const rows = DlrList.map((dealer) => ({
    id: dealer.dealerId,
    ...dealer,
  }));

  const columns: GridColDef[] = [
    { field: "dealerId", headerName: "ID", width: 100 },
    { field: "firstName", headerName: "First Name", width: 150 },
    { field: "lastName", headerName: "Last Name", width: 150 },
    { field: "mgrName", headerName: "MgrName", width: 150 },
    { field: "addressLineFirst", headerName: "Adrline1", width: 200 },
    { field: "addressLineSecond", headerName: "Adrline2", width: 200 },
    { field: "city", headerName: "City", width: 120 },
    { field: "state", headerName: "State", width: 120 },
    { field: "pincode", headerName: "Pincode", width: 120 },
    { field: "mobile", headerName: "Mobile", width: 120 },
    { field: "phone", headerName: "Phone", width: 120 },
    { field: "email", headerName: "Email", width: 150 },
    { field: "lat", headerName: "Lat", width: 120 },
    { field: "lang", headerName: "Lang", width: 120 },
    { field: "isActive", headerName: "isActive", width: 120 },
    {
      field: "actions",
      headerName: "Action",
      width: 200,
      renderCell: (params) => (
        <>
          <IconButton onClick={() => editDealer(params.row as Dealer)}>
            <Edit />
          </IconButton>
          <IconButton onClick={() => deleteDealer(params.row as Dealer)}>
            <Delete />
          </IconButton>
          {params.row.isActive === "Y" ? (
            <IconButton
              onClick={() => toggleDealerStatus(params.row as Dealer, "N")}
            >
              <Block />
            </IconButton>
          ) : (
            <IconButton
              onClick={() => toggleDealerStatus(params.row as Dealer, "Y")}
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
        slots={{ toolbar: GridToolbar }}
        className="custom-data-grid"
      />
    </div>
  );
};

export default DealerTable;
