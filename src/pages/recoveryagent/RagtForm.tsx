/* ----------------------------------------------------------------------------
Information Contained Herein is Proprietary and Confidential. copyright notice in all copies, 
acknowledging that the code is provided without warranties, and strictly prohibiting unauthorized 
sharing or distribution without prior written consent from the copyright holder<DKG Labs Pvt. Ltd>
------------------------------------------------------------------------------ */


import React, { useState, ChangeEvent, FormEvent } from "react";
import { Button, TextField } from "@mui/material";
import { Ragt } from "./RagtInterface";

interface RagtFormProps {
  ragt: Ragt | null;
  onSubmit: (ragt: Ragt) => void;
}

const RagtForm: React.FC<RagtFormProps> = ({ ragt, onSubmit }) => {
  const [formValues, setFormValues] = useState<Ragt>({
    Id: ragt ? ragt.Id : 0,
    RagtId: ragt ? ragt.RagtId : 0,
    Name: ragt ? ragt.Name : "",
    MgrName: ragt ? ragt.MgrName : "",
    AdrLine1: ragt ? ragt.AdrLine1 : "",
    AdrLine2: ragt ? ragt.AdrLine2 : "",
    City: ragt ? ragt.City : "",
    State: ragt ? ragt.State : "",
    PinCode: ragt ? ragt.PinCode : "",
    Mobile: ragt ? ragt.Mobile : "",
    Phone: ragt ? ragt.Phone : "",
    Email: ragt ? ragt.Email : "",
    Lat: ragt ? ragt.Lat : 0,
    Lng: ragt ? ragt.Lng : 0,
    Flag: ragt ? ragt.Flag : "",
    CreatedBy: ragt ? ragt.CreatedBy : "",
    CreatedDate: ragt ? ragt.CreatedDate : "",
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
    <form onSubmit={handleSubmit}>
      <TextField
        label="Ragt ID"
        variant="outlined"
        size="small"
        name="RagtId"
        value={formValues.RagtId}
        onChange={handleChange}
      />
      <TextField
        label="Name"
        variant="outlined"
        size="small"
        name="Name"
        value={formValues.Name}
        onChange={handleChange}
      />
      <TextField
        label="MgrName"
        variant="outlined"
        size="small"
        name="MgrName"
        value={formValues.MgrName}
        onChange={handleChange}
      />
      <TextField
        label="Address Line 1"
        variant="outlined"
        size="small"
        name="AdrLine1"
        value={formValues.AdrLine1}
        onChange={handleChange}
      />
      <TextField
        label="Address Line 2"
        variant="outlined"
        size="small"
        name="AdrLine2"
        value={formValues.AdrLine2}
        onChange={handleChange}
      />
      <TextField
        label="City"
        variant="outlined"
        size="small"
        name="City"
        value={formValues.City}
        onChange={handleChange}
      />
      <TextField
        label="State"
        variant="outlined"
        size="small"
        name="State"
        value={formValues.State}
        onChange={handleChange}
      />
      <TextField
        label="Pincode"
        variant="outlined"
        size="small"
        name="PinCode"
        value={formValues.PinCode}
        onChange={handleChange}
      />
      <TextField
        label="Mobile"
        variant="outlined"
        size="small"
        name="Mobile"
        value={formValues.Mobile}
        onChange={handleChange}
      />
      <TextField
        label="Phone"
        variant="outlined"
        size="small"
        name="Phone"
        value={formValues.Phone}
        onChange={handleChange}
      />
      <TextField
        label="Email"
        variant="outlined"
        size="small"
        name="Email"
        value={formValues.Email}
        onChange={handleChange}
      />
      <TextField
        label="Latitude"
        variant="outlined"
        size="small"
        name="Lat"
        type="number"
        value={formValues.Lat}
        onChange={handleChange}
      />
      <TextField
        label="Longitude"
        variant="outlined"
        size="small"
        name="Lng"
        type="number"
        value={formValues.Lng}
        onChange={handleChange}
      />
      <TextField
        label="Flag"
        variant="outlined"
        size="small"
        name="Flag"
        value={formValues.Flag}
        onChange={handleChange}
      />
      <TextField
        label="Created By"
        variant="outlined"
        size="small"
        name="CreatedBy"
        value={formValues.CreatedBy}
        onChange={handleChange}
      />
      <TextField
        label="Created Date"
        variant="outlined"
        size="small"
        name="CreatedDate"
        value={formValues.CreatedDate}
        onChange={handleChange}
      />
      <Button type="submit" variant="contained">
        {ragt ? "Update" : "Add"}
      </Button>
    </form>
  );
};

export default RagtForm;
