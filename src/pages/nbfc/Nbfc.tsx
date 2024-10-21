/* ----------------------------------------------------------------------------
Information Contained Herein is Proprietary and Confidential. copyright notice in all copies, 
acknowledging that the code is provided without warranties, and strictly prohibiting unauthorized 
sharing or distribution without prior written consent from the copyright holder<DKG Labs Pvt. Ltd>
------------------------------------------------------------------------------ */

import React, { useState, useEffect, ChangeEvent } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ThunkDispatch } from "redux-thunk";
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
import { NBFC } from "./NbfcInterface";
import {
  fetchNBFCs,
  addNBFC,
  updateNBFC,
  deleteNBFC,
  toggleNBFCStatus,
} from "../../store/actions/nbfcActions";
import NBFCForm from "./NbfcForm";
import NBFCTable from "./NbfcTable";
import { RootState } from "../../store/store";
import { userVerified } from "../../utils/UtilFunctions";

const NBFCManagement: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [nbfcFormData, setNBFCFormData] = useState<NBFC | null>(null);

  const dispatch = useDispatch<ThunkDispatch<RootState, null, any>>();
  const nbfcList = useSelector((state: RootState) => state.nbfc.nbfcList);
  useEffect(() => {
    dispatch(fetchNBFCs());
  }, [dispatch]);

  const addNewNBFC = () => {
    setNBFCFormData(null);
    setIsModalOpen(true);
  };

  const editNBFC = (nbfc: NBFC) => {
    setNBFCFormData(nbfc);
    setIsModalOpen(true);
  };

  const deleteNBFCItem = async (nbfc: NBFC) => {
    const isVerified = await userVerified();
    if (isVerified) {
      try {
        await dispatch(deleteNBFC(nbfc));
      } catch (error) {
        alert("Error occured while deleting NBFC.");
        console.error(error);
      }
    }
  };

  const handleToggleNBFCStatus = async (nbfc: NBFC) => {
    const isVerified = await userVerified();
    if(isVerified){
      try {
        await dispatch(toggleNBFCStatus(nbfc));
        dispatch(fetchNBFCs());
      } catch (error) {
        console.error(error);
      }
    }
  };

  const handleSearch = (event: ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
    setNBFCFormData(null);
  };

  const handleFormSubmit = async (formValues: any) => {
    const isVerified = await userVerified();
    if (isVerified) {
      try {
        if (nbfcFormData === null) {
          await dispatch(addNBFC(formValues));
          dispatch(fetchNBFCs());
        } else {
          await dispatch(updateNBFC(formValues));
          dispatch(fetchNBFCs());
        }
        setIsModalOpen(false);
      } catch (error) {
        alert("Error submitting data.");
        console.error(error);
      }
    }
  };

  const filteredNBFCList = searchTerm
    ? nbfcList.filter((nbfc) =>
        Object.values(nbfc).some(
          (value) =>
            value &&
            typeof value === "string" &&
            value.toLowerCase().includes(searchTerm.toLowerCase())
        )
      )
    : nbfcList;

  return (
    <div>
      <h1>NBFC Management</h1>
      <Card>
        <CardContent>
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <TextField
              label="Search NBFC"
              variant="outlined"
              size="small"
              value={searchTerm}
              onChange={handleSearch}
            />
            <Button
              variant="contained"
              startIcon={<Add />}
              onClick={addNewNBFC}
            >
              Add NBFC
            </Button>
          </div>
          <br />
          <NBFCTable
            nbfcList={filteredNBFCList}
            editNBFC={editNBFC}
            deleteNBFC={deleteNBFCItem}
            toggleNBFCStatus={handleToggleNBFCStatus}
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
                {nbfcFormData ? "Edit NBFC" : "Add NBFC"}
              </Typography>
              <NBFCForm nbfc={nbfcFormData} onSubmit={handleFormSubmit} />
            </CardContent>
          </Card>
        </Box>
      </Modal>
    </div>
  );
};

export default NBFCManagement;
