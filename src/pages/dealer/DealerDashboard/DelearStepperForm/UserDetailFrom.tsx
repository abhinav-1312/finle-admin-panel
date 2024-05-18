/* ----------------------------------------------------------------------------
Information Contained Herein is Proprietary and Confidential. copyright notice in all copies, 
acknowledging that the code is provided without warranties, and strictly prohibiting unauthorized 
sharing or distribution without prior written consent from the copyright holder<DKG Labs Pvt. Ltd>
------------------------------------------------------------------------------ */


import React, { useState } from "react";
import { TextField, Button, Card, CardContent } from "@mui/material";
import "./DelearStepperForm.css";

interface UserDetails {
  [key: string]: string; 
}

const initialUserDetails: UserDetails = {
  firstName: "John",
  lastName: "Doe",
  email: "john.doe@example.com",

  name: "HIMANSHU SRIVASTAVA",
  dateOfBirth: "10/06/1999",
  gender: "N/A",
  maritalStatus: "N/A",
  mobileNumber: "7081654255",
  borrowerType: "Self-employed",
  annualIncome: "250000",
  organizationName: "N/A",
  profession: "N/A",
  salary: "null",
  otherLoan: "N",
  otherLoanAmount: "N/A",
  dependentMember: "4-5",
  residenceTelephone: "N/A",
  officeTelephone: "N/A",
  phoneNumber: "N/A",
  accountHolderName: "N/A",
  accountNumber: "N/A",
  bankName: "N/A",
  bankAddress: "N/A",
  ifscCode: "N/A",
  earningMemberFirstName: "N/A",
  earningMemberLastName: "N/A",
};

const UserDetailForm: React.FC = () => {
  const [userDetails, setUserDetails] =
    useState<UserDetails>(initialUserDetails);
  const [editMode, setEditMode] = useState(false);

  const handleEditClick = () => {
    setEditMode(true);
  };

  const handleSaveClick = () => {
    // Perform save/update logic here
    setEditMode(false);
  };

  const handleChange =
    (field: string) => (event: React.ChangeEvent<HTMLInputElement>) => {
      setUserDetails((prevDetails) => ({
        ...prevDetails,
        [field]: event.target.value,
      }));
    };

  return (
    <Card>
      <CardContent>
        <div className="user-form-container">
          <h2>User Details</h2>
          <div className="button-container">
            {editMode ? (
              <Button
                variant="contained"
                color="primary"
                onClick={handleSaveClick}
              >
                Save
              </Button>
            ) : (
              <Button
                variant="contained"
                color="secondary"
                onClick={handleEditClick}
              >
                Edit
              </Button>
            )}
          </div>
          <div className="user-fields">
            {Object.keys(userDetails).map((field) => (
              <TextField
                key={field}
                label={field}
                value={userDetails[field]}
                onChange={handleChange(field)}
                disabled={!editMode}
                className="UsrField"
              />
            ))}
          </div>
         
        </div>
      </CardContent>
    </Card>
  );
};

export default UserDetailForm;
