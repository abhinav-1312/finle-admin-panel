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
  Alert,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { ThunkDispatch } from "redux-thunk";
import { RootState } from "../../store/store";
import { Add } from "@mui/icons-material";
import { DSA } from "./DsaInterface";
import DSAForm from "./DsaForm";
import DSATable from "./DsaTable";
import {
  fetchDSAs,
  addDSA,
  updateDSA,
  deleteDSA,
  toggleDSAStatus,
} from "../../store/actions/dsaActions";

const DSAManagement: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [dsaFormData, setDSAFormData] = useState<DSA | null>(null);
  const [confirmDelete, setConfirmDelete] = useState<boolean>(false);

  const dispatch = useDispatch<ThunkDispatch<RootState, null, any>>();
  const dsaList = useSelector((state: RootState) => state.dsa.dsaList);

  useEffect(() => {
    dispatch(fetchDSAs());
  }, [dispatch]);

  const addNewDSA = () => {
    setDSAFormData(null);
    setIsModalOpen(true);
  };

  const editDSA = (dsa: DSA) => {
    setDSAFormData(dsa);
    setIsModalOpen(true);
  };

  const deleteDSAItem = async (dsa: DSA) => {
    if (confirmDelete) {
      try {
        await dispatch(deleteDSA(dsa));
      } catch (error) {
        console.error(error);
      }
    } else {
      setConfirmDelete(true);
    }
  };

  const confirmDeleteAction = () => {
    setConfirmDelete(true);
  };

  const cancelDeleteAction = () => {
    setConfirmDelete(false);
  };

  const handleToggleDSAStatus = async (dsa: DSA) => {
    try {
      await dispatch(toggleDSAStatus(dsa));
      dispatch(fetchDSAs());
    } catch (error) {
      console.error(error);
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
    setDSAFormData(null);
  };

  const handleFormSubmit = async (dsa: DSA) => {
    try {
      if (dsaFormData === null) {
        await dispatch(addDSA(dsa));
        dispatch(fetchDSAs());
      } else {
        await dispatch(updateDSA(dsa));
        dispatch(fetchDSAs());
      }
      setIsModalOpen(false);
    } catch (error) {
      console.error(error);
    }
  };

  const filteredDSAList = searchTerm
    ? dsaList.filter((dsa) =>
        Object.values(dsa).some(
          (value) =>
            value &&
            typeof value === "string" &&
            value.toLowerCase().includes(searchTerm.toLowerCase())
        )
      )
    : dsaList;

  return (
    <div style={{ width: "auto" }}>
      <h1>DSA Management</h1>

      {confirmDelete && (
        <Alert
          severity="warning"
          onClose={cancelDeleteAction}
          action={
            <>
              <Button onClick={cancelDeleteAction} color="inherit" size="small">
                Cancel
              </Button>
              <Button
                onClick={confirmDeleteAction}
                color="inherit"
                size="small"
                autoFocus
              >
                Delete
              </Button>
            </>
          }
        >
          Are you sure you want to delete this DSA?
        </Alert>
      )}
      <Card>
        <CardContent>
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <TextField
              label="Search DSA"
              variant="outlined"
              size="small"
              value={searchTerm}
              onChange={handleSearch}
            />
            <Button variant="contained" startIcon={<Add />} onClick={addNewDSA}>
              Add DSA
            </Button>
          </div>
          <br />
          <DSATable
            dsaList={filteredDSAList}
            editDSA={editDSA}
            deleteDSA={deleteDSAItem}
            toggleDSAStatus={handleToggleDSAStatus}
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
                {dsaFormData ? "Edit DSA" : "Add DSA"}
              </Typography>
              <DSAForm dsa={dsaFormData} onSubmit={handleFormSubmit} />
            </CardContent>
          </Card>
        </Box>
      </Modal>
    </div>
  );
};

export default DSAManagement;
