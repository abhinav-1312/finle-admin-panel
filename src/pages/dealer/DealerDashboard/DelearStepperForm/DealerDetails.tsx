/* ----------------------------------------------------------------------------
Information Contained Herein is Proprietary and Confidential. copyright notice in all copies, 
acknowledging that the code is provided without warranties, and strictly prohibiting unauthorized 
sharing or distribution without prior written consent from the copyright holder<DKG Labs Pvt. Ltd>
------------------------------------------------------------------------------ */


import React, { useState } from "react";
import { TextField, Button, Card, CardContent } from "@mui/material";
// import "./DealerForm.css";
import "./DelearStepperForm.css";
interface DealerDetails {
  [key: string]: string;
}

const initialDealerDetails: DealerDetails = {
  dealerName: "ABC Motors",
  contactPerson: "John Smith",
  dealerCode: "D1234",
  address: "123 Main Street",
  city: "Cityville",
  state: "State",
  postalCode: "12345",
  phone: "123-456-7890",
  email: "dealer@example.com",
};

const DealerForm: React.FC = () => {
  const [dealerDetails, setDealerDetails] =
    useState<DealerDetails>(initialDealerDetails);
  const [editMode, setEditMode] = useState(false);

  const handleEditClick = () => {
    setEditMode(true);
  };

  const handleSaveClick = () => {
    setEditMode(false);
  };

  const handleChange =
    (field: string) => (event: React.ChangeEvent<HTMLInputElement>) => {
      setDealerDetails((prevDetails) => ({
        ...prevDetails,
        [field]: event.target.value,
      }));
    };

  return (
    <Card>
      <CardContent>
        <div className="user-form-container">
          <h2>Dealer Details</h2>
          <div className="user-fields">
            {Object.keys(dealerDetails).map((field) => (
              <TextField
                key={field}
                label={field}
                value={dealerDetails[field]}
                onChange={handleChange(field)}
                disabled={!editMode}
                className="UsrField"
              />
            ))}
          </div>
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
        </div>
      </CardContent>
    </Card>
  );
};

export default DealerForm;
