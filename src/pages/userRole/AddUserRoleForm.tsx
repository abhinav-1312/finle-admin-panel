/* ----------------------------------------------------------------------------
Information Contained Herein is Proprietary and Confidential. copyright notice in all copies, 
acknowledging that the code is provided without warranties, and strictly prohibiting unauthorized 
sharing or distribution without prior written consent from the copyright holder<DKG Labs Pvt. Ltd>
------------------------------------------------------------------------------ */


import React, { useState } from "react";
import { TextField, Button, Grid, Card, CardContent } from "@mui/material";
import { UserRole } from "./UserInterface";

interface AddUserRoleFormProps {
  onAddRole: (role: UserRole) => void;
  onCancel: () => void;
}

const AddUserRoleForm: React.FC<AddUserRoleFormProps> = ({
  onAddRole,
  onCancel,
}) => {
  const [newRole, setNewRole] = useState<UserRole>({
    id: 0,
    modCode: "",
    modName: "",
    sName: "",
    authDtl: [],
    flag: "",
    createdBy: "",
    createdDate: "",
  });

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setNewRole((prevRole) => ({ ...prevRole, [name]: value }));
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    onAddRole(newRole);
    setNewRole({
      id: 0,
      modCode: "",
      modName: "",
      sName: "",
      authDtl: [],
      flag: "",
      createdBy: "",
      createdDate: "",
    });
  };

  return (
    <Card>
      <CardContent>
        <form onSubmit={handleSubmit}>
          <Grid container spacing={2} alignItems="center">
            <Grid item>
              <TextField
                name="modCode"
                label="ModCode"
                value={newRole.modCode}
                onChange={handleInputChange}
                required
              />
            </Grid>
            <Grid item>
              <TextField
                name="modName"
                label="ModName"
                value={newRole.modName}
                onChange={handleInputChange}
                required
              />
            </Grid>
            <Grid item>
              <TextField
                name="sName"
                label="SName"
                value={newRole.sName}
                onChange={handleInputChange}
                required
              />
            </Grid>
            <Grid item>
              <TextField
                name="authDtl"
                label="AuthDtl"
                value={newRole.authDtl}
                onChange={handleInputChange}
                required
              />
            </Grid>
            <Grid item>
              <TextField
                name="flag"
                label="Flag"
                value={newRole.flag}
                onChange={handleInputChange}
                required
              />
            </Grid>
            <Grid item>
              <Button type="submit" variant="contained">
                Add Role
              </Button>
              <Button variant="contained" onClick={onCancel}>
                Cancel
              </Button>
            </Grid>
          </Grid>
        </form>
      </CardContent>
    </Card>
  );
};

export default AddUserRoleForm;
