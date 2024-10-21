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
import { GP } from "./GPInterface";
import GPForm from "./GPForm";
import GPTable from "./GPTable";
import { useDispatch, useSelector } from "react-redux";
import { ThunkDispatch } from "redux-thunk";
import { RootState } from "../../store/store";
import {
  fetchGPs,
  addGP,
  updateGP,
  deleteGP,
  toggleGPStatus,
} from "../../store/actions/gpActions";
import { userVerified } from "../../utils/UtilFunctions";

const GPManagement: React.FC = () => {
  // const [gpList, setGpList] = useState<GP[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [gpFormData, setGpFormData] = useState<GP | null>(null);

  const dispatch = useDispatch<ThunkDispatch<RootState, null, any>>();
  const gpList = useSelector((state: RootState) => state.gp.gpList);

  useEffect(() => {
    dispatch(fetchGPs());
  }, [dispatch]);

  const addNewGp = () => {
    setGpFormData(null);
    setIsModalOpen(true);
  };

  const editGp = (gp: GP) => {
    setGpFormData(gp);
    setIsModalOpen(true);
  };

  const deleteGpItem = async (gp: GP) => {
    const isVerified = await userVerified();
    if(isVerified){

      try {
        await dispatch(deleteGP(gp));
      } catch (error) {
        console.error(error);
      }
    }
  };

  const handleToggleGPStatus = async (gp: GP) => {
    const isVerified = await userVerified();
    if(isVerified){

      try {
        await dispatch(toggleGPStatus(gp));
        dispatch(fetchGPs());
      } catch (error) {
        console.error(error);
      }
    }
  };

  const handleSearch = (event: ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  // const handleModalOpen = () => {
  //   setIsModalOpen(true);
  // };

  const handleModalClose = () => {
    setIsModalOpen(false);
    setGpFormData(null);
  };

  const handleFormSubmit = async (gp: GP) => {
    const isVerified = await userVerified();
    if(isVerified){

      try {
        if (gpFormData === null) {
          await dispatch(addGP(gp));
          dispatch(fetchGPs());
        } else {
          await dispatch(updateGP(gp));
          dispatch(fetchGPs());
        }
        setIsModalOpen(false);
      } catch (error) {
        console.error(error);
      }
    }
  };

  const filteredGpList = searchTerm
    ? gpList.filter((gp) =>
        Object.values(gp).some(
          (value) =>
            value &&
            typeof value === "string" &&
            value.toLowerCase().includes(searchTerm.toLowerCase())
        )
      )
    : gpList;

  return (
    <div>
      <h1>GP Management</h1>
      <Card>
        <CardContent>
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <TextField
              label="Search GP"
              variant="outlined"
              size="small"
              value={searchTerm}
              onChange={handleSearch}
            />
            <Button variant="contained" startIcon={<Add />} onClick={addNewGp}>
              Add GP
            </Button>
          </div>
          <br />
          <GPTable
            gpList={filteredGpList}
            editGP={editGp}
            deleteGP={deleteGpItem}
            toggleGPStatus={handleToggleGPStatus}
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
                {gpFormData ? "Edit GP" : "Add GP"}
              </Typography>
              <GPForm gp={gpFormData} onSubmit={handleFormSubmit} />
            </CardContent>
          </Card>
        </Box>
      </Modal>
    </div>
  );
};

export default GPManagement;
