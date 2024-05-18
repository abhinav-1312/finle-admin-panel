/* ----------------------------------------------------------------------------
Information Contained Herein is Proprietary and Confidential. copyright notice in all copies, 
acknowledging that the code is provided without warranties, and strictly prohibiting unauthorized 
sharing or distribution without prior written consent from the copyright holder<DKG Labs Pvt. Ltd>
------------------------------------------------------------------------------ */


import React, { useState, ChangeEvent, FormEvent } from "react";
import { Button, TextField,MenuItem,Typography } from "@mui/material";
import { GP } from "./GPInterface";

interface GPFormProps {
  gp: GP | null;
  onSubmit: (gp: GP) => void;
}

const GPForm: React.FC<GPFormProps> = ({ gp, onSubmit }) => {
  const [formValues, setFormValues] = useState<GP>({
    gpId: gp ? gp.gpId : "",
    firstName: gp ? gp.firstName : "",
    lastName: gp ? gp.lastName : "",
    mgrName: gp ? gp.mgrName : "",
    addressLineFirst: gp ? gp.addressLineFirst : "",
    addressLineSecond: gp ? gp.addressLineSecond : "",
    city: gp ? gp.city : "",
    state: gp ? gp.state : "",
    pinCode: gp ? gp.pinCode : "",
    mobile: gp ? gp.mobile : "",
    phone: gp ? gp.phone : "",
    email: gp ? gp.email : "",
    lat: gp ? gp.lat : 0,
    lng: gp ? gp.lng : 0,
    isActive: gp ? gp.isActive : '',
  });

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormValues((prevValues) => ({ ...prevValues, [name]: value }));
  };

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    onSubmit(formValues);
  };

  return (
    <form onSubmit={handleSubmit} className="dsa-form-component">
      <TextField
        label="GP ID"
        variant="outlined"
        size="small"
        name="gpId"
        value={formValues.gpId}
        onChange={handleChange}
        className="dsa-form-input"
      />
     <TextField
        label="First Name"
        required
        variant="outlined"
        size="small"
        name="firstName"
        value={formValues.firstName}
        onChange={handleChange}
        className="dsa-form-input"
      />
       <TextField
        label="Last Name"
        variant="outlined"
        size="small"
        name="lastName"
        value={formValues.lastName}
        onChange={handleChange}
        className="dsa-form-input"
      />
      <TextField
        label="MgrName"
        variant="outlined"
        size="small"
        name="mgrName"
        value={formValues.mgrName}
        onChange={handleChange}
        className="dsa-form-input"
      />
      <TextField
        label="Address Line 1"
        variant="outlined"
        size="small"
        name="addressLineFirst"
        value={formValues.addressLineFirst}
        onChange={handleChange}
        className="dsa-form-input"
      />
      <TextField
        label="Address Line 2"
        variant="outlined"
        size="small"
        name="addressLineSecond"
        value={formValues.addressLineSecond}
        onChange={handleChange}
        className="dsa-form-input"
      />
      <TextField
        label="City"
        variant="outlined"
        size="small"
        name="city"
        value={formValues.city}
        onChange={handleChange}
        className="dsa-form-input"
      />
      <TextField
        label="State"
        variant="outlined"
        size="small"
        name="state"
        value={formValues.state}
        onChange={handleChange}
        className="dsa-form-input"
      />
      <TextField
        label="Pincode"
        variant="outlined"
        size="small"
        name="pinCode"
        value={formValues.pinCode}
        onChange={handleChange}
        className="dsa-form-input"
      />
        <div>
        <TextField
          required
          label="Mobile"
          variant="outlined"
          size="small"
          name="mobile"
          value={formValues.mobile}
          onChange={handleChange}
          className="dsa-form-input"
        />
        {formValues.mobile && !/^\d{10}$/.test(formValues.mobile) && (
          <Typography variant="subtitle2" sx={{color:'red'}}>
            Please enter a valid 10-digit mobile number.
          </Typography>
        )}
      </div>
      <TextField
        label="Phone"
        variant="outlined"
        size="small"
        name="phone"
        value={formValues.phone}
        onChange={handleChange}
        className="dsa-form-input"
      />
      <TextField
        label="Email"
        variant="outlined"
        size="small"
        name="email"
        value={formValues.email}
        onChange={handleChange}
        className="dsa-form-input"
      />
      <TextField
        label="Latitude"
        variant="outlined"
        size="small"
        name="lat"
        type="number"
        value={formValues.lat}
        onChange={handleChange}
        className="dsa-form-input"
      />
      <TextField
        label="Longitude"
        variant="outlined"
        size="small"
        name="lng"
        type="number"
        value={formValues.lng}
        onChange={handleChange}
        className="dsa-form-input"
      />
       <TextField
        label="isActive"
        variant="outlined"
        size="small"
        name="isActive"
        select
        value={formValues.isActive}
        onChange={handleChange}
        className="dsa-form-input"
        >
        <MenuItem value="Y">Yes</MenuItem>
        <MenuItem value="N">No</MenuItem>
      </TextField>
      <Button
        type="submit"
        variant="contained"
        className="dsa-form-submit-button"
      >
        {gp ? "Update" : "Add"}
      </Button>
    </form>
  );
};

export default GPForm;
