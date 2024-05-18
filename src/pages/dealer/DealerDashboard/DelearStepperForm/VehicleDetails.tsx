/* ----------------------------------------------------------------------------
Information Contained Herein is Proprietary and Confidential. copyright notice in all copies, 
acknowledging that the code is provided without warranties, and strictly prohibiting unauthorized 
sharing or distribution without prior written consent from the copyright holder<DKG Labs Pvt. Ltd>
------------------------------------------------------------------------------ */


import React, { useState } from "react";
import { TextField, Button, Card, CardContent } from "@mui/material";
// import "./VehicleForm.css";
import "./DelearStepperForm.css";
interface VehicleDetails {
  [key: string]: string;
}

const initialVehicleDetails: VehicleDetails = {
  make: "Toyota",
  model: "Corolla",
  year: "2022",
  vin: "1HGCM82633A123456", 
  color: "Silver",
  mileage: "25000",
  registration: "ABC123",
  chassisNumber: "ABCD1234567890", 
};

const VehicleForm: React.FC = () => {
  const [vehicleDetails, setVehicleDetails] = useState<VehicleDetails>(
    initialVehicleDetails
  );
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
      setVehicleDetails((prevDetails) => ({
        ...prevDetails,
        [field]: event.target.value,
      }));
    };

  return (
    <Card>
      <CardContent>
        <div className="user-form-container">
          <h2>Vehicle Details</h2>
          <div className="user-fields">
            {Object.keys(vehicleDetails).map((field) => (
              <TextField
                key={field}
                label={field}
                value={vehicleDetails[field]}
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

export default VehicleForm;
