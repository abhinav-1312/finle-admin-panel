/* ----------------------------------------------------------------------------
Information Contained Herein is Proprietary and Confidential. copyright notice in all copies, 
acknowledging that the code is provided without warranties, and strictly prohibiting unauthorized 
sharing or distribution without prior written consent from the copyright holder<DKG Labs Pvt. Ltd>
------------------------------------------------------------------------------ */

import React from "react";
import { DataGrid, GridColDef, GridToolbar } from "@mui/x-data-grid";
import { IconButton } from "@mui/material";
import { Edit, Delete, Block, CheckCircle } from "@mui/icons-material";
import { Staff } from "./StaffInterface";

interface StaffTableProps {
  staffList: Staff[];
  editStaff: (staff: Staff) => void;
  deleteStaff: (staff: Staff) => Promise<void>; // Update the parameter type to Staff
  toggleStaffStatus: (
    staff: Staff,
    status: "Activate" | "Deactivate"
  ) => Promise<void>; // Update the parameter type to Staff
}

const StaffTable: React.FC<StaffTableProps> = ({
  staffList,
  editStaff,
  deleteStaff,
  toggleStaffStatus,
}) => {
  const rows = staffList.map((staff) => ({
    id: staff.staffId,
    ...staff,
  }));

  const columns: GridColDef[] = [
    { field: "staffId", headerName: "Staff ID", width: 120 },
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
          <IconButton onClick={() => editStaff(params.row as Staff)}>
            <Edit />
          </IconButton>
          <IconButton onClick={() => deleteStaff(params.row as Staff)}>
            <Delete />
          </IconButton>
          {(params.row as Staff).isActive === "Y" ? (
            <IconButton
              onClick={() =>
                toggleStaffStatus(params.row as Staff, "Deactivate")
              }
            >
              <Block />
            </IconButton>
          ) : (
            <IconButton
              onClick={() => toggleStaffStatus(params.row as Staff, "Activate")}
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

export default StaffTable;
