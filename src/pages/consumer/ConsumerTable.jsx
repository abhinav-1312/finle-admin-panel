/* ----------------------------------------------------------------------------
Information Contained Herein is Proprietary and Confidential. copyright notice in all copies, 
acknowledging that the code is provided without warranties, and strictly prohibiting unauthorized 
sharing or distribution without prior written consent from the copyright holder<DKG Labs Pvt. Ltd>
------------------------------------------------------------------------------ */


import React, { useEffect, useState } from "react";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { BASE_URL, TOKEN } from "../../utils/BaseUrl";
import { Card, CardContent, TextField } from "@mui/material";
import axios from "axios";

const ConsumerTable = () => {
  const [users, setUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const fetchUsers = async () => {
    try {
      const response = await axios.post(`${BASE_URL}/user-service/getAllUserDetails`, {}, {
        headers: {
          Authorization: TOKEN,
        },
      });

      if (response.status === 200) {
        const allUsers = response.data.responseData;
        const csrUsers = allUsers.filter((user) => user.userType === "CSR");
        setUsers(csrUsers);

      } else {
        console.error("Failed to fetch data:", response.status, response.statusText);
      }
    } catch (error) {
      console.error("Error during data fetch:", error);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const filteredUsers = searchTerm
    ? users.filter((user) =>
      Object.values(user).some(
        (value) =>
          value &&
          typeof value === "string" &&
          value.toLowerCase().includes(searchTerm.toLowerCase())
      )
    )
    : users;

  const columns = [
    { field: "userId", headerName: "User ID", width: 150 },
    { field: "firstName", headerName: "First Name", width: 150 },
    { field: "lastName", headerName: "Last Name", width: 150 },
    // { field: "userType", headerName: "User Type", width: 150 },
    { field: "mobileNumber", headerName: "Mobile Number", width: 180 },
    { field: "userMode", headerName: "User Mode", width: 120 },
    // { field: "createdBy", headerName: "Created By", width: 150 },
    // { field: "createdDate", headerName: "Created Date", width: 180 },
    { field: "active", headerName: "Active", width: 120 },
    { field: "adminFlag", headerName: "Admin Flag", width: 120 },
  ];

  return (
    <>
      <h1>Consumer Details</h1>

      <Card>
        <CardContent>

          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <TextField
              label="Search user"
              variant="outlined"
              size="small"
              value={searchTerm}
              onChange={handleSearch}
            />
          </div>
          <br />
          <div style={{ height: "700px", width: "100%" }}>
            <DataGrid
              rows={filteredUsers}
              columns={columns}
              initialState={{
                pagination: {
                  paginationModel: { page: 0, pageSize: 10 },
                },
              }}
              getRowId={(row) => Math.random() * filteredUsers.length}
              // autoHeight
              style={{ maxHeight: '700px !important' }}
              pageSizeOptions={[5, 10, 20, 30, 50, 100]}
              checkboxSelection
              disableRowSelectionOnClick
              components={{
                Toolbar: GridToolbar,
              }}
            />
          </div>
        </CardContent>
      </Card>
    </>
  );
};

export default ConsumerTable;
