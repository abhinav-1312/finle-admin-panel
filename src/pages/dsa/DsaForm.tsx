/* ----------------------------------------------------------------------------
Information Contained Herein is Proprietary and Confidential. copyright notice in all copies, 
acknowledging that the code is provided without warranties, and strictly prohibiting unauthorized 
sharing or distribution without prior written consent from the copyright holder<DKG Labs Pvt. Ltd>
------------------------------------------------------------------------------ */


import React, { useState, ChangeEvent, FormEvent } from "react";
import { Button, TextField, MenuItem, Typography } from "@mui/material";
import { DSA } from "./DsaInterface";

interface DSAFormProps {
  dsa: DSA | null;
  onSubmit: (dsa: DSA) => void;
}

const DSAForm: React.FC<DSAFormProps> = ({ dsa, onSubmit }) => {
  const [formValues, setFormValues] = useState<DSA>({
    dsaId: dsa ? dsa.dsaId : 0,
    firstName: dsa ? dsa.firstName : "",
    lastName: dsa ? dsa.lastName : "",
    mgrName: dsa ? dsa.mgrName : "",
    addressLineFirst: dsa ? dsa.addressLineFirst : "",
    addressLineSecond: dsa ? dsa.addressLineSecond : "",
    city: dsa ? dsa.city : "",
    state: dsa ? dsa.state : "",
    pinCode: dsa ? dsa.pinCode : "",
    mobile: dsa ? dsa.mobile : "",
    phone: dsa ? dsa.phone : "",
    email: dsa ? dsa.email : "",
    lat: dsa ? dsa.lat : 0,
    lng: dsa ? dsa.lng : 0,
    isActive: dsa ? dsa.isActive : "",
  });

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormValues((prevValues) => ({ ...prevValues, [name]: value }));
  };

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    const isConfirmed = window.confirm('Are you sure you want to perform the action?');
    if(isConfirmed)
      onSubmit(formValues);
  };

  return (
    <form onSubmit={handleSubmit} className="dsa-form-component">
      <TextField
        label="DSA ID"
        variant="outlined"
        size="small"
        name="dsaId" 
        value={formValues.dsaId}
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
      <div>
        <Button
          type="submit"
          variant="contained"
          className="dsa-form-submit-button"
        >
          {dsa ? "Update" : "Add"}
        </Button>
      </div>
    </form>
  );
};

export default DSAForm;
