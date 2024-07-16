/* ----------------------------------------------------------------------------
Information Contained Herein is Proprietary and Confidential. copyright notice in all copies, 
acknowledging that the code is provided without warranties, and strictly prohibiting unauthorized 
sharing or distribution without prior written consent from the copyright holder<DKG Labs Pvt. Ltd>
------------------------------------------------------------------------------ */


import React, { useEffect, useState } from "react";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { BASE_URL, TOKEN } from "../../utils/BaseUrl";
import { Box, Button, Card, CardContent, IconButton, Modal, TextField, Typography } from "@mui/material";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Edit } from "@mui/icons-material";

const style = {
  position: "absolute",
  top: "40%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 1000,
  bgcolor: "background.paper",
  boxShadow: 24,
  pt: 2,
  px: 4,
  pb: 3,
};

const ConsumerTable = () => {
  const [users, setUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [modalOpen, setModalOpen] = useState(false)
  const [consumerFormData, setConsumerFormData] = useState(null)

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

  const navigate = useNavigate()

  const handleUserDetailClick = (userId) => {
    navigate(`/consumer/${userId}`)
  }

  const editConsumer = (obj) => {
    console.log("Obj: ", obj)
    setConsumerFormData({...obj, email: obj.emailId})
    setModalOpen(true)
  }

  console.log("cfd: ", consumerFormData) 

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
    { field: "userId", headerName: "User ID", width: 150,
      renderCell: (params) => (
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
      )
     },
    { field: "firstName", headerName: "First Name", width: 150 },
    { field: "lastName", headerName: "Last Name", width: 150 },
    { field: "mobileNumber", headerName: "Mobile Number", width: 180 },
    { field: "active", headerName: "Active", width: 120 },
    { field: "action", headerName: "Action", width: 120,
      renderCell: (params) => (
        <IconButton onClick={() => editConsumer(params.row)}>
            <Edit />
          </IconButton>
      )
     },
    // { field: "adminFlag", headerName: "Admin Flag", width: 120 },
  ];

  const handleModalClose = () => {
    setModalOpen(false)
  }

  const handleFormChange = (event) => {
    const { name, value } = event.target;
    setConsumerFormData((prevState) => ({ ...prevState, [name]: value }));
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault()
    const url = "https://finle-user-service.azurewebsites.net/user-service/updateUser"
    try{
      const res = await axios.post(url, consumerFormData)
      alert("Consumer data editted successfully!")
    }catch(error){
      console.log("Error on edit.", error)
      alert("Error on editing consumer. Please try again!")
    }
    finally{
      setModalOpen(false)
    }
  }

  return (
    <div>
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

      <Modal open={modalOpen} onClose={handleModalClose}> 
        <Box sx={{...style}}>
          <Typography variant="h6">Edit Consumer</Typography>

          <form onSubmit={handleFormSubmit} style={{display: "grid", gridTemplateColumns: "repeat(auto-fit(min-max(220px, 1fr)))", gap: "1rem"}}>
            <TextField
              label="firstName"
              variant="outlined"
              name="firstName"
              value={consumerFormData?.firstName}
              onChange={handleFormChange}
            />
            <TextField
              label="lastName"
              variant="outlined"
              name="lastName"
              value={consumerFormData?.lastName}
              onChange={handleFormChange}
            />
             <TextField
              label="email"
              variant="outlined"
              name="email"
              value={consumerFormData?.emailId}
              onChange={handleFormChange}
            />
            <TextField
              label="Contact"
              variant="outlined"
              name="mobileNumber"
              value={consumerFormData?.mobileNumber}
              onChange={handleFormChange}
            />
            <Button variant="contained" type="submit">
              Save
            </Button>
          </form>

        </Box>
         
      </Modal>
    </div>
  );
};

export default ConsumerTable;
