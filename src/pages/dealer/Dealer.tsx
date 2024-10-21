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
import { Dealer } from "./DealerInterface";
import {
  fetchDealers,
  addDealer,
  updateDealer,
  deleteDealer,
  toggleDealerStatus,
} from "../../store/actions/dealerActions";
import { useDispatch, useSelector } from "react-redux";
import { ThunkDispatch } from "redux-thunk";
import { RootState } from "../../store/store";
import DealerForm from "./DealerForm";
import DealerTable from "./DealerTable";
import { userVerified } from "../../utils/UtilFunctions";

const DealerManagement: React.FC = () => {
  // const [DlrList, setDealerList] = useState<Dealer[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [DlrFormData, setDealerFormData] = useState<Dealer | null>(null);

  const dispatch = useDispatch<ThunkDispatch<RootState, null, any>>();
  const DlrList = useSelector((state: RootState) => state.dlr.dealerList);

  useEffect(() => {
    dispatch(fetchDealers());
  }, [dispatch]);

  const addNewDealer = () => {
    setDealerFormData(null);
    setIsModalOpen(true);
  };

  const editDealer = (dealer: Dealer) => {
    setDealerFormData(dealer);
    setIsModalOpen(true);
  };

  const deleteDealerItem = async (dealer: Dealer) => {
    const isVerified = await userVerified();
    if(isVerified){
      try {
        await dispatch(deleteDealer(dealer));
      } catch (error) {
        console.error(error);
      }
    }
  };

  const handleToggleDealerStatus = async (dealer: Dealer) => {
    const isVerified = await userVerified();
    if(isVerified){

      try {
        await dispatch(toggleDealerStatus(dealer));
        dispatch(fetchDealers());
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
    setDealerFormData(null);
  };

  const handleFormSubmit = async (dealer: Dealer) => {
    const isVerified = await userVerified();
    if(isVerified){
      try {
        if (DlrFormData === null) {
          await dispatch(addDealer(dealer));
          dispatch(fetchDealers());
        } else {
          await dispatch(updateDealer(dealer));
          dispatch(fetchDealers());
        }
        setIsModalOpen(false);
      } catch (error) {
        console.error(error);
      }
    }
  };

  const filteredDealerList = searchTerm
    ? DlrList.filter((dealer) =>
        Object.values(dealer).some(
          (value) =>
            value &&
            typeof value === "string" &&
            value.toLowerCase().includes(searchTerm.toLowerCase())
        )
      )
    : DlrList;

  return (
    <div>
      <h1>Dealer Management</h1>
      <Card>
        <CardContent>
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <TextField
              label="Search Dealer"
              variant="outlined"
              size="small"
              value={searchTerm}
              onChange={handleSearch}
            />
            <Button
              variant="contained"
              startIcon={<Add />}
              onClick={addNewDealer}
            >
              Add Dealer
            </Button>
          </div>
          <br></br>
          <DealerTable
            DlrList={filteredDealerList}
            editDealer={editDealer}
            deleteDealer={deleteDealerItem}
            toggleDealerStatus={handleToggleDealerStatus}
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
                {DlrFormData ? "Edit Dealer" : "Add Dealer"}
              </Typography>
              <DealerForm dealer={DlrFormData} onSubmit={handleFormSubmit} />
            </CardContent>
          </Card>
        </Box>
      </Modal>
    </div>
  );
};

export default DealerManagement;
