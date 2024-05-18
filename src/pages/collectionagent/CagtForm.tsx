/* ----------------------------------------------------------------------------
Information Contained Herein is Proprietary and Confidential. copyright notice in all copies, 
acknowledging that the code is provided without warranties, and strictly prohibiting unauthorized 
sharing or distribution without prior written consent from the copyright holder<DKG Labs Pvt. Ltd>
------------------------------------------------------------------------------ */


import React, { useState, ChangeEvent, FormEvent } from "react";
import { Button, TextField } from "@mui/material";
import { Cagt } from "./CagtInterface";

interface CagtFormProps {
  cagt: Cagt | null;
  onSubmit: (cagt: Cagt) => void;
}

const CagtForm: React.FC<CagtFormProps> = ({ cagt, onSubmit }) => {
  const [formValues, setFormValues] = useState<Cagt>({
    Id: cagt ? cagt.Id : 0,
    CagtId: cagt ? cagt.CagtId : 0,
    Name: cagt ? cagt.Name : "",
    MgrName: cagt ? cagt.MgrName : "",
    AdrLine1: cagt ? cagt.AdrLine1 : "",
    AdrLine2: cagt ? cagt.AdrLine2 : "",
    City: cagt ? cagt.City : "",
    State: cagt ? cagt.State : "",
    PinCode: cagt ? cagt.PinCode : "",
    Mobile: cagt ? cagt.Mobile : "",
    Phone: cagt ? cagt.Phone : "",
    Email: cagt ? cagt.Email : "",
    Lat: cagt ? cagt.Lat : 0,
    Lng: cagt ? cagt.Lng : 0,
    Flag: cagt ? cagt.Flag : "",
    CreatedBy: cagt ? cagt.CreatedBy : "",
    CreatedDate: cagt ? cagt.CreatedDate : "",
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
        label="Cagt ID"
        variant="outlined"
        size="small"
        name="CagtId"
        value={formValues.CagtId}
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
        {cagt ? "Update" : "Add"}
      </Button>
    </form>
  );
};

export default CagtForm;
