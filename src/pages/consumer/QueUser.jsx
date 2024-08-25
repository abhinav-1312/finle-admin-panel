/* ----------------------------------------------------------------------------
Information Contained Herein is Proprietary and Confidential. copyright notice in all copies, 
acknowledging that the code is provided without warranties, and strictly prohibiting unauthorized 
sharing or distribution without prior written consent from the copyright holder<DKG Labs Pvt. Ltd>
------------------------------------------------------------------------------ */

import React, { useEffect, useState } from "react";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { BASE_URL, TOKEN } from "../../utils/BaseUrl";
import { Card, CardContent, TextField, Button, Tabs, Tab, Stack } from "@mui/material";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const QueUser = () => {
  const [users, setUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedTab, setSelectedTab] = React.useState(1);

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };
  const handleTabChange = (event, newValue) => {
    setSelectedTab(newValue);
  };

  const fetchUsers = async () => {
    try {
      const response = await axios.post(`/user-service/getAllUserDetails`, {}, {
        headers: {
          Authorization: TOKEN,
        },
      });

      if (response.status === 200) {
        const allUsers = response.data.responseData;
        const csrUsers = allUsers.filter((user) => user.userType !== "CSR").reverse();
        setUsers(csrUsers);

      } else {
        console.error("Failed to fetch data:", response.status, response.statusText);
      }
    } catch (error) {
      console.error("Error during data fetch:", error);
    }
  };

  const [approveBtnEnabled, setApproveBtnEnabled] = useState(true)
  const [rejBtnEnabled, setRejBtnEnabled] = useState(true)

  console.log("Users: ", users)

  const handleApprove = async (userId, userType) => {
    setApproveBtnEnabled(false)
    try {
      const userRemarks = prompt("Enter remarks:");
      if (userRemarks !== null) {
        const response = await axios.post(
          `/admin-service/approve`,
          {

            remarks: userRemarks,
            userId: userId,
            userType: userType,

          },
          {
            headers: {
              Authorization: TOKEN,
              'Content-Type': 'application/json',
            },
          }
        );



        if (response.status === 200) {
          alert("Approved successfully");
          console.log("Approval successful");
          setApproveBtnEnabled(true)
          fetchUsers()
        } else {
          console.log("Failed to approve user:", response.status, response.statusText);
          setApproveBtnEnabled(true)
        }
      }
    } catch (error) {
      console.error("Error during approval:", error);
      setApproveBtnEnabled(true)
    }
  };

  const handleReject = async (userId, userType) => {
    setRejBtnEnabled(false)
    try {
      const userRemarks = prompt("Enter remarks:");
      console.log("SER REMSRK: ", userRemarks !== '')

      if(userRemarks === ''){
        alert("Please enter remark to continue.")
        return
      }

        const response = await axios.post(
          `/admin-service/reject`,
          {

            remarks: userRemarks,
            userId: userId,
            userType: userType,

          },
          {
            headers: {
              Authorization: TOKEN,
              'Content-Type': 'application/json',
            },
          }

        );

        if (response.status === 200) {
          alert("Reject successfully");
          setRejBtnEnabled(true)
          fetchUsers()
        } else {
          console.log("Failed to Reject user:", response.status, response.statusText);
          setRejBtnEnabled(true)
        }
    } catch (error) {
      console.error("Error during Reject:", error);
      setRejBtnEnabled(true)
    }
    finally{
      setRejBtnEnabled(true)
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

  const navigate = useNavigate();

  const handleUserDetailClick = (mobileNumber) => {
    navigate(`/userDetails/${mobileNumber}`);
  };

  const columns = [
    {
      field: "userId", headerName: "User ID", width: 150, renderCell: (params) => (
        <Button
          variant="text"
          color="inherit"
          sx={{ background: "#dcdcdc" }}
          onClick={() =>
            handleUserDetailClick(
              params.row.userId
            )
          }
        >
          {params.row.userId}
        </Button>
      ),
    },
    { field: "firstName", headerName: "First Name", width: 150 },
    { field: "lastName", headerName: "Last Name", width: 150 },
    { field: "userType", headerName: "User Type", width: 150 },
    { field: "mobileNumber", headerName: "Mobile Number", width: 180 },
    { field: "createdDate", headerName: "Created Date", width: 200 },
    { field: "remarks", headerName: "Remarks", width: 150 },
    {
      field: "active",
      headerName: "Status",
      width: 120,
      renderCell: (params) => (
        <span>
          {params.row.active ? "Approved" : "Pending"}
        </span>
      ),
    },

    {
      field: "action",
      headerName: "Action",
      width: 130,
      renderCell: (params) => (
        <Stack spacing={2} direction="row">
          {selectedTab === 0 && (
            <Button
              variant="contained"
              color="success"
              onClick={() => handleApprove(params.row.userId, params.row.userType)}
              disabled={!approveBtnEnabled}
            >
              Approve
            </Button>
          )}
          {selectedTab === 1 && (
            <Button
              variant="contained"
              color="warning"
              onClick={() => handleReject(params.row.userId, params.row.userType)}
              disabled={!rejBtnEnabled}
            >
              Reject
            </Button>
          )}
        </Stack>
      ),
    },
  ];

  const pendingUsers = filteredUsers.filter((user) => !user.active && user.remarks === null);
  const blacklistedUsers = filteredUsers.filter((user) => !user.active && user.remarks !== null);
  const approvedUsers = filteredUsers.filter((user) => user.active);



  return (
    <>
      <h1> User Lead Queue</h1>
      <Tabs value={selectedTab} onChange={handleTabChange}>
        <Tab label="Pending Users" />
        <Tab label="Approved Users" />
        {/* <Tab label="Blacklisted Users" /> */}
      </Tabs>
      <br />

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
          {selectedTab === 0 && (
            <div style={{ height: "700px", width: "100%" }}>
              <DataGrid
                rows={pendingUsers}
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
                // checkboxSelection
                disableRowSelectionOnClick
                components={{
                  Toolbar: GridToolbar,
                }}
              />
            </div>
          )}

          {selectedTab === 1 && (
            <div style={{ height: "700px", width: "100%" }}>
              <DataGrid
                rows={approvedUsers}
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
                // checkboxSelection
                disableRowSelectionOnClick
                components={{
                  Toolbar: GridToolbar,
                }}
              />
            </div>
          )}
          {/* {selectedTab === 2 && (
            <div style={{ height: "700px", width: "100%" }}>
              <DataGrid
                rows={blacklistedUsers}
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
                // checkboxSelection
                disableRowSelectionOnClick
                components={{
                  Toolbar: GridToolbar,
                }}
              />
            </div>
          )} */}
        </CardContent>
      </Card>
    </>
  );
};

export default QueUser;
