import { DataGrid } from '@mui/x-data-grid'
import React from 'react'

const DealerOutletTable = ({data}) => {
    const columns = [
        {
            field: "outletId",
            headerName: "Outlet ID",
            width: 150
        },
        {
            field: "outletName",
            headerName: "Outlet Name",
            width: 150
        },
        {
            field: "addressLineFirst",
            headerName: "Address Line First",
            width: 150
        },
        {
            field: "addressLineSecond",
            headerName: "Address Line Second",
            width: 150
        },
        {
            field: "pincode",
            headerName: "Pincode",
            width: 150
        },
        {
            field: "city",
            headerName: "City",
            width: 150
        },
        {
            field: "state",
            headerName: "State",
            width: 150
        },
        {
            field: "createdAt",
            headerName: "Create Date",
            width: 150
        },

    ]
  return (
    <div style={{ height: "auto", width: "100%" }}>
      <DataGrid
        rows={data}
        columns={columns}
        autoHeight
        getRowId={(row) => Math.random() * data?.length}
        initialState={{
          pagination: {
            paginationModel: { page: 0, pageSize: 10 },
          },
        }}
        pageSizeOptions={[5, 10, 20, 30, 50, 100]}
        checkboxSelection
        disableRowSelectionOnClick
        className="custom-data-grid"
      />
    </div>
  )
}

export default DealerOutletTable
