/* ----------------------------------------------------------------------------
Information Contained Herein is Proprietary and Confidential. copyright notice in all copies, 
acknowledging that the code is provided without warranties, and strictly prohibiting unauthorized 
sharing or distribution without prior written consent from the copyright holder<DKG Labs Pvt. Ltd>
------------------------------------------------------------------------------ */

import React, { useState, ChangeEvent, FormEvent } from "react";
import { Button, TextField, Typography, MenuItem } from "@mui/material";
import { Staff } from "./StaffInterface";

interface StaffFormProps {
  staff: Staff | null;
  onSubmit: (staff: Staff) => void;
}

const StaffForm: React.FC<StaffFormProps> = ({ staff, onSubmit }) => {
  const [formValues, setFormValues] = useState<Staff>({
    staffId: staff ? staff.staffId : 0,
    firstName: staff ? staff.firstName : "",
    lastName: staff ? staff.lastName : "",
    mgrName: staff ? staff.mgrName : "",
    addressLineFirst: staff ? staff.addressLineFirst : "",
    addressLineSecond: staff ? staff.addressLineSecond : "",
    city: staff ? staff.city : "",
    state: staff ? staff.state : "",
    pinCode: staff ? staff.pinCode : "",
    mobile: staff ? staff.mobile : "",
    phone: staff ? staff.phone : "",
    email: staff ? staff.email : "",
    lat: staff ? staff.lat : 0,
    lng: staff ? staff.lng : 0,
    isActive: staff ? staff.isActive : "",
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
        label="Staff ID"
        variant="outlined"
        size="small"
        name="dsaId"
        value={formValues.staffId}
        onChange={handleChange}
        className="dsa-form-input"
      />
      <TextField
        label="First Name"
        variant="outlined"
        size="small"
        name="firtName"
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
          <Typography variant="subtitle2" sx={{ color: "red" }}>
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
          className="staff-form-submit-button"
        >
          {staff ? "Update" : "Add"}
        </Button>
      </div>
    </form>
  );
};

export default StaffForm;
