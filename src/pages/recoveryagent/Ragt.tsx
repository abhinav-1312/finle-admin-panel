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
import { Ragt } from "./RagtInterface";
import RagtForm from "./RagtForm";
import RagtTable from "./RagtTable";
import { userVerified } from "../../utils/UtilFunctions";

const RagtManagement: React.FC = () => {
  const [RagtList, setRagtList] = useState<Ragt[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [RagtFormData, setRagtFormData] = useState<Ragt | null>(null);

  useEffect(() => {
    fetchRagtList();
  }, []);

  const fetchRagtList = async () => {
    // Hardcoded table values
    const dummyRagts: Ragt[] = [
      {
        Id: 1,
        RagtId: 2000002,
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
        RagtId: 2000005,
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

    setRagtList(dummyRagts);
  };

  const addNewRagt = () => {
    setRagtFormData(null);
    setIsModalOpen(true);
  };

  const editRagt = (ragt: Ragt) => {
    setRagtFormData(ragt);
    setIsModalOpen(true);
  };

  const deleteRagtItem = async (RagtId: number) => {
    const isVerified = await userVerified();
    if(isVerified){
      setRagtList((prevList) => prevList.filter((ragt) => ragt.Id !== RagtId));
    }
  };

  const toggleRagtStatus = async (RagtId: number, status: "block" | "unblock") => {
    const isVerified = await userVerified();
    if(isVerified){

      setRagtList((prevList) =>
        prevList.map((ragt) => {
          if (ragt.Id === RagtId) {
            return { ...ragt, Flag: status === "block" ? "Blocked" : "Active" };
          }
          return ragt;
        })
      );
    }
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
    setRagtFormData(null);
  };

  const handleFormSubmit = async (ragt: Ragt) => {
    const isVerified = await userVerified();
    if(isVerified){

      if (RagtFormData === null) {
        ragt.Id = RagtList.length + 1; // Assign a unique ID for the dummy data
        setRagtList((prevList) => [...prevList, ragt]);
      } else {
        setRagtList((prevList) =>
          prevList.map((item) =>
            item.Id === ragt.Id ? { ...ragt, Flag: item.Flag } : item
      )
    );
  }
    }
    setIsModalOpen(false);
  };

  const filteredRagtList = RagtList.filter((ragt) =>
    ragt.Name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div>
      <h1>Ragt Management</h1>
      <Card>
        <CardContent>
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <TextField
              label="Search Ragt"
              variant="outlined"
              size="small"
              value={searchTerm}
              onChange={handleSearch}
            />
            <Button variant="contained" startIcon={<Add />} onClick={addNewRagt}>
              Add Ragt
            </Button>
          </div>
          <RagtTable
            gpList={filteredRagtList}
            editRagt={editRagt}
            deleteRagt={deleteRagtItem}
            toggleRagtStatus={toggleRagtStatus}
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
                {RagtFormData ? "Edit Ragt" : "Add Ragt"}
              </Typography>
              <RagtForm ragt={RagtFormData} onSubmit={handleFormSubmit} />
            </CardContent>
          </Card>
        </Box>
      </Modal>
    </div>
  );
};

export default RagtManagement;
