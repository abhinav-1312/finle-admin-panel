/* ----------------------------------------------------------------------------
Information Contained Herein is Proprietary and Confidential. copyright notice in all copies, 
acknowledging that the code is provided without warranties, and strictly prohibiting unauthorized 
sharing or distribution without prior written consent from the copyright holder<DKG Labs Pvt. Ltd>
------------------------------------------------------------------------------ */


import React, { useState, ChangeEvent, FormEvent } from "react";
import { Button, TextField,Typography,MenuItem } from "@mui/material";
import { Dealer } from "./DealerInterface";

interface DealerFormProps {
  dealer: Dealer | null;
  onSubmit: (dealer: Dealer) => void;
}

const DealerForm: React.FC<DealerFormProps> = ({ dealer, onSubmit }) => {
  const [formValues, setFormValues] = useState<Dealer>({
    dealerId: dealer ? dealer.dealerId : "",
    firstName: dealer ? dealer.firstName : "",
    lastName: dealer ? dealer.lastName : "",
    mgrName: dealer ? dealer.mgrName : "",
    addressLineFirst: dealer ? dealer.addressLineFirst : "",
    addressLineSecond: dealer ? dealer.addressLineSecond : "",
    city: dealer ? dealer.city : "",
    state: dealer ? dealer.state : "",
    pincode: dealer ? dealer.pincode : "",
    mobile: dealer ? dealer.mobile : "",
    phone: dealer ? dealer.phone : "",
    email: dealer ? dealer.email : "",
    lat: dealer ? dealer.lat : 0,
    lang: dealer ? dealer.lang : 0,
    isActive: dealer ? dealer.isActive : "",
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
        label="Dealer ID"
        variant="outlined"
        size="small"
        name="dealerId"
        value={formValues.dealerId}
        onChange={handleChange}
        className="dsa-form-input"
        disabled
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
        name="pincode"
        value={formValues.pincode}
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
        name="lang"
        type="number"
        value={formValues.lang}
        onChange={handleChange}
        className="dsa-form-input"
      />
     <TextField
        label="flag"
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

      <Button type="submit" variant="contained" >
        {dealer ? "Update" : "Add"}
      </Button>
    </form>
  );
};

export default DealerForm;
