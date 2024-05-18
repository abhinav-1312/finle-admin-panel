/* ----------------------------------------------------------------------------
Information Contained Herein is Proprietary and Confidential. copyright notice in all copies, 
acknowledging that the code is provided without warranties, and strictly prohibiting unauthorized 
sharing or distribution without prior written consent from the copyright holder<DKG Labs Pvt. Ltd>
------------------------------------------------------------------------------ */



import React, { useState, ChangeEvent, FormEvent } from "react";
import {
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Typography,
  Box,
  Modal,
  Card,
  CardContent,
} from "@mui/material";
import { Add, Edit, Delete, Block, CheckCircle } from "@mui/icons-material";
import axios from "axios";

interface Consumer {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  contact: string;
  status: "Active" | "Blocked" | string;
}

const style = {
  position: "absolute" as "absolute",
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

const dummyData: Consumer[] = [
  {
    id: 1,
    firstName: "John",
    lastName: "Doe",
    email: "john.doe@example.com",
    contact: "1234567890",
    status: "Active",
  },
  {
    id: 2,
    firstName: "Jane",
    lastName: "Smith",
    email: "jane.smith@example.com",
    contact: "0987654321",
    status: "Blocked",
  },
];
const ManageConsumer: React.FC = () => {
  const [consumerList, setConsumerList] = useState<Consumer[]>(dummyData);
  const [searchTerm, setSearchTerm] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [consumerFormData, setConsumerFormData] = useState<Consumer>({
    id: 0,
    firstName: "",
    lastName: "",
    email: "",
    contact: "",
    status: "Active",
  });

  // useEffect(() => {
  //   fetchConsumerList();
  // }, []);

  // const fetchConsumerList = async () => {
  //   try {
  //     const response = await axios.get("/api/consumer");
  //     setConsumerList(response.data);
  //   } catch (error) {
  //     console.error(error);
  //   }
  // };

  const addConsumer = async (consumer: Consumer) => {
    try {
      const response = await axios.post("/api/consumer", consumer);
      setConsumerList((prevList) => [...prevList, response.data]);
      setIsModalOpen(false);
    } catch (error) {
      console.error(error);
    }
  };

  const editConsumer = async (consumer: Consumer) => {
    try {
      const response = await axios.put(
        `/api/consumer/${consumer.id}`,
        consumer
      );
      setConsumerList((prevList) =>
        prevList.map((item) => (item.id === consumer.id ? response.data : item))
      );
      setIsModalOpen(false);
    } catch (error) {
      console.error(error);
    }
  };

  const deleteConsumer = async (consumerId: number) => {
    try {
      await axios.delete(`/api/consumer/${consumerId}`);
      setConsumerList((prevList) =>
        prevList.filter((item) => item.id !== consumerId)
      );
    } catch (error) {
      console.error(error);
    }
  };

  const toggleConsumerStatus = async (
    consumerId: number,
    status: "Active" | "Blocked"
  ) => {
    try {
      await axios.put(`/api/consumer/${consumerId}`, { status });
      setConsumerList((prevList) =>
        prevList.map((item) =>
          item.id === consumerId ? { ...item, status } : item
        )
      );
    } catch (error) {
      console.error(error);
    }
  };

  const handleSearch = (event: ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setSearchTerm(value);
  };

  const handleModalOpen = () => {
    setIsModalOpen(true);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
    setConsumerFormData({
      id: 0,
    firstName: "",
    lastName: "",
    email: "",
    contact: "",
    status: "Active",
    });
  };

  const handleFormChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setConsumerFormData((prevState) => ({ ...prevState, [name]: value }));
  };

  const handleFormSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (consumerFormData.id === 0) {
      addConsumer(consumerFormData);
    } else {
      editConsumer(consumerFormData);
    }
  };

  const handleEditClick = (consumer: Consumer) => {
    setConsumerFormData(consumer);
    setIsModalOpen(true);
  };

  const filteredConsumerList = consumerList.filter((consumer) =>
    consumer.firstName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div>
      <h1>

      Consumer Management
      </h1>
      <Card>
        <CardContent>
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <TextField
              label="Search Consumer"
              variant="outlined"
              value={searchTerm}
              onChange={handleSearch}
            />

            <Button
              variant="contained"
              startIcon={<Add />}
              onClick={handleModalOpen}
            >
              Add Consumer
            </Button>
          </div>

          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>First Name</TableCell>
                  <TableCell>Last Name</TableCell>
                  <TableCell>Email</TableCell>
                  <TableCell>Contact</TableCell>
                  <TableCell>Status</TableCell>
                  <TableCell>Actions</TableCell>
                </TableRow>
              </TableHead>

              <TableBody>
                {filteredConsumerList.map((consumer) => (
                  <TableRow key={consumer.id}>
                    <TableCell>{consumer.firstName}</TableCell>
                    <TableCell>{consumer.lastName}</TableCell>
                    <TableCell>{consumer.email}</TableCell>
                    <TableCell>{consumer.contact}</TableCell>{" "}
                    <TableCell>
                      {consumer.status === "Active" ? (
                        <CheckCircle color="primary" />
                      ) : (
                        <Block color="error" />
                      )}
                    </TableCell>
                    <TableCell>
                      <Button
                        startIcon={<Edit />}
                        onClick={() => handleEditClick(consumer)}
                      >
                        Edit
                      </Button>

                      <Button
                        startIcon={<Delete />}
                        onClick={() => deleteConsumer(consumer.id)}
                      >
                        Delete
                      </Button>
                      {consumer.status === "Active" ? (
                        <Button
                          startIcon={<Block />}
                          onClick={() =>
                            toggleConsumerStatus(consumer.id, "Blocked")
                          }
                        >
                          Block
                        </Button>
                      ) : (
                        <Button
                          startIcon={<CheckCircle />}
                          onClick={() =>
                            toggleConsumerStatus(consumer.id, "Active")
                          }
                        >
                          Unblock
                        </Button>
                      )}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </CardContent>
      </Card>
      <Modal open={isModalOpen} onClose={handleModalClose}>
        <Box sx={{ ...style }}>
          <Typography variant="h6">
            {consumerFormData.id === 0 ? "Add Consumer" : "Edit Consumer"}
          </Typography>
          <form onSubmit={handleFormSubmit}>
            <TextField
              label="firstName"
              variant="outlined"
              name="firstName"
              value={consumerFormData.firstName}
              onChange={handleFormChange}
            />
            <TextField
              label="lastName"
              variant="outlined"
              name="lastName"
              value={consumerFormData.lastName}
              onChange={handleFormChange}
            />
             <TextField
              label="email"
              variant="outlined"
              name="email"
              value={consumerFormData.email}
              onChange={handleFormChange}
            />
            <TextField
              label="Contact"
              variant="outlined"
              name="contact"
              value={consumerFormData.contact}
              onChange={handleFormChange}
            />
            <Button variant="contained" type="submit">
              {consumerFormData.id === 0 ? "Add" : "Save"}
            </Button>
          </form>
        </Box>
      </Modal>
    </div>
  );
};

export default ManageConsumer;
