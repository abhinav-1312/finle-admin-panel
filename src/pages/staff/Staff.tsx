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
import { Staff } from "./StaffInterface";
import StaffForm from "./StaffForm";
import StaffTable from "./StaffTable";
import { useDispatch, useSelector } from "react-redux";
import { ThunkDispatch } from "redux-thunk";
import { RootState } from "../../store/store";
import {
  fetchStaffs,
  addStaff,
  updateStaff,
  deleteStaff,
  toggleStaffStatus,
} from "../../store/actions/staffActions";
const StaffManagement: React.FC = () => {
  // const [staffList, setStaffList] = useState<Staff[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [staffFormData, setStaffFormData] = useState<Staff | null>(null);
  const [confirmDelete, setConfirmDelete] = useState<boolean>(false);

  const dispatch = useDispatch<ThunkDispatch<RootState, null, any>>();
  const staffList = useSelector((state: RootState) => state.staff.staffList);

  useEffect(() => {
    dispatch(fetchStaffs());
  }, [dispatch]);

  const addNewStaff = () => {
    setStaffFormData(null);
    setIsModalOpen(true);
  };

  const editStaff = (staff: Staff) => {
    setStaffFormData(staff);
    setIsModalOpen(true);
  };

  const deleteStaffItem = async (staff: Staff) => {
    if (confirmDelete) {
      try {
        await dispatch(deleteStaff(staff));
      } catch (error) {
        console.error(error);
      }
    } else {
      setConfirmDelete(true);
    }
  };

  const handleToggleStaffStatus = async (staff: Staff) => {
    try {
      await dispatch(toggleStaffStatus(staff));
      dispatch(fetchStaffs());
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
    setStaffFormData(null);
  };

  const handleFormSubmit = async (staff: Staff) => {
    try {
      if (staffFormData === null) {
        await dispatch(addStaff(staff));
        dispatch(fetchStaffs());
      } else {
        await dispatch(updateStaff(staff));
        dispatch(fetchStaffs());
      }
      setIsModalOpen(false);
    } catch (error) {
      console.error(error);
    }
  };

  const filteredStaffList = searchTerm
    ? staffList.filter((staff) =>
        Object.values(staff).some(
          (value) =>
            value &&
            typeof value === "string" &&
            value.toLowerCase().includes(searchTerm.toLowerCase())
        )
      )
    : staffList;

  return (
    <div>
      <h1>Staff Management</h1>
      <Card>
        <CardContent>
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <TextField
              label="Search Staff"
              variant="outlined"
              size="small"
              value={searchTerm}
              onChange={handleSearch}
            />
            <Button
              variant="contained"
              startIcon={<Add />}
              onClick={addNewStaff}
            >
              Add Staff
            </Button>
          </div>
          <br />
          <StaffTable
            staffList={filteredStaffList}
            editStaff={editStaff}
            deleteStaff={deleteStaffItem}
            toggleStaffStatus={handleToggleStaffStatus}
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
                {staffFormData ? "Edit Staff" : "Add Staff"}
              </Typography>
              <StaffForm staff={staffFormData} onSubmit={handleFormSubmit} />
            </CardContent>
          </Card>
        </Box>
      </Modal>
    </div>
  );
};

export default StaffManagement;
