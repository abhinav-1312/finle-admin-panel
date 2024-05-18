/* ----------------------------------------------------------------------------
Information Contained Herein is Proprietary and Confidential. copyright notice in all copies, 
acknowledging that the code is provided without warranties, and strictly prohibiting unauthorized 
sharing or distribution without prior written consent from the copyright holder<DKG Labs Pvt. Ltd>
------------------------------------------------------------------------------ */


import React, { useState, useEffect, ChangeEvent } from "react";
import {
  Button,
  TextField,
  Typography,
  Box,
  Modal,
  Card,
  CardContent,
} from "@mui/material";
import { Add } from "@mui/icons-material";
import { Cagt } from "./CagtInterface";
import CagtForm from "./CagtForm";
import CagtTable from "./CagtTable";

const CagtManagement: React.FC = () => {
  const [cagtList, setcagtList] = useState<Cagt[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [CagtFormData, setCagtFormData] = useState<Cagt | null>(null);

  useEffect(() => {
    fetchcagtList();
  }, []);

  const fetchcagtList = async () => {
    // Hardcoded table values
    const dummyCagts: Cagt[] = [
      {
        Id: 1,
        CagtId: 2000002,
        Name: "abc ev",
        MgrName: "test 1",
        AdrLine1: "689 niti khand 2",
        AdrLine2: "Shipra sun city",
        City: "Ghaziabad",
        State: "Uttar Pradesh",
        PinCode: "201010",
        Mobile: "9899324553",
        Phone: "9899324553",
        Email: "demo@demo.com",
        Lat: 3234432.3432423,
        Lng: 43242343.3434344,
        Flag: "Y",
        CreatedBy: "Admin",
        CreatedDate: "2019-08-24 11:00:03.410",
      },
      {
        Id: 2,
        CagtId: 2000005,
        Name: "abc ev",
        MgrName: "test",
        AdrLine1: "Vasundhara",
        AdrLine2: "Sector 1",
        City: "Ghaziabad",
        State: "UP",
        PinCode: "201012",
        Mobile: "9958684283",
        Phone: "9958684283",
        Email: "test@test.com",
        Lat: 3234432.3432423,
        Lng: 43242343.3434344,
        Flag: "Y",
        CreatedBy: "Admin",
        CreatedDate: "2019-08-26 12:07:35.507",
      },
    ];

    setcagtList(dummyCagts);
  };

  const addNewCagt = () => {
    setCagtFormData(null);
    setIsModalOpen(true);
  };

  const editCagt = (cagt: Cagt) => {
    setCagtFormData(cagt);
    setIsModalOpen(true);
  };

  const deleteCagtItem = async (CagtId: number) => {
    setcagtList((prevList) => prevList.filter((cagt) => cagt.Id !== CagtId));
  };

  const toggleCagtStatus = async (
    CagtId: number,
    status: "block" | "unblock"
  ) => {
    setcagtList((prevList) =>
      prevList.map((cagt) => {
        if (cagt.Id === CagtId) {
          return { ...cagt, Flag: status === "block" ? "Blocked" : "Active" };
        }
        return cagt;
      })
    );
  };

  const handleSearch = (event: ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const handleModalOpen = () => {
    setIsModalOpen(true);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
    setCagtFormData(null);
  };

  const handleFormSubmit = async (cagt: Cagt) => {
    if (CagtFormData === null) {
      cagt.Id = cagtList.length + 1; // Assign a unique ID for the dummy data
      setcagtList((prevList) => [...prevList, cagt]);
    } else {
      setcagtList((prevList) =>
        prevList.map((item) =>
          item.Id === cagt.Id ? { ...cagt, Flag: item.Flag } : item
        )
      );
    }
    setIsModalOpen(false);
  };

  const filteredcagtList = cagtList.filter((cagt) =>
    cagt.Name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div>
      <h1>Cagt Management</h1>
      <Card>
        <CardContent>
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <TextField
              label="Search Cagt"
              variant="outlined"
              size="small"
              value={searchTerm}
              onChange={handleSearch}
            />
            <Button
              variant="contained"
              startIcon={<Add />}
              onClick={addNewCagt}
            >
              Add Cagt
            </Button>
          </div>
          <CagtTable
            cagtList={filteredcagtList}
            editCagt={editCagt}
            deleteCagt={deleteCagtItem}
            toggleCagtStatus={toggleCagtStatus}
          />
        </CardContent>
      </Card>
      <Modal open={isModalOpen} onClose={handleModalClose}>
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
          }}
        >
          <Card>
            <CardContent>
              <Typography variant="h5" component="h2" gutterBottom>
                {CagtFormData ? "Edit Cagt" : "Add Cagt"}
              </Typography>
              <CagtForm cagt={CagtFormData} onSubmit={handleFormSubmit} />
            </CardContent>
          </Card>
        </Box>
      </Modal>
    </div>
  );
};

export default CagtManagement;
