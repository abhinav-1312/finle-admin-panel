/* ----------------------------------------------------------------------------
Information Contained Herein is Proprietary and Confidential. copyright notice in all copies, 
acknowledging that the code is provided without warranties, and strictly prohibiting unauthorized 
sharing or distribution without prior written consent from the copyright holder<DKG Labs Pvt. Ltd>
------------------------------------------------------------------------------ */

import React, { useState, useEffect } from "react";
import {
  TextField,
  Button,
  Grid,
  Card,
  CardContent,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  SelectChangeEvent,
  ListItemText,
} from "@mui/material";
import { UserRole } from "./UserInterface";
import Checkbox from "@mui/material/Checkbox";
import Autocomplete from "@mui/material/Autocomplete";
import CheckBoxOutlineBlankIcon from "@mui/icons-material/CheckBoxOutlineBlank";
import CheckBoxIcon from "@mui/icons-material/CheckBox";
import { arrayBuffer } from "stream/consumers";

const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
const checkedIcon = <CheckBoxIcon fontSize="small" />;

interface EditUserRoleFormProps {
  role: UserRole;
  onEditRole: (role: UserRole) => void;
  onCancel: () => void;
}

const EditUserRoleForm: React.FC<EditUserRoleFormProps> = ({
  role,
  onEditRole,
  onCancel,
}) => {
  const [editedRole, setEditedRole] = useState<UserRole>(role);

  useEffect(() => {
    setEditedRole(role);
  }, [role]);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;

    if (name === "authDtl") {
      // Convert the comma-separated string into an array of numbers
      const selectedRoles = value.split(",").map((item) => {
        const trimmedItem = item.trim();
        return trimmedItem !== "" ? parseInt(trimmedItem, 10) : null;
      });
      setEditedRole((prevRole) => ({ ...prevRole, [name]: selectedRoles }));
    } else {
      setEditedRole((prevRole) => ({ ...prevRole, [name]: value }));
    }
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    onEditRole(editedRole);
    localStorage.setItem("userRole", JSON.stringify(editedRole.authDtl));
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
                value={editedRole.modCode}
                onChange={handleInputChange}
                required
              />
            </Grid>
            <Grid item>
              <TextField
                name="modName"
                label="ModName"
                value={editedRole.modName}
                onChange={handleInputChange}
                required
              />
            </Grid>
            <Grid item>
              <TextField
                name="sName"
                label="SName"
                value={editedRole.sName}
                onChange={handleInputChange}
                required
              />
            </Grid>
            <Grid item>
              <TextField
                name="authDtl"
                label="AuthDtl"
                value={editedRole.authDtl}
                onChange={handleInputChange}
                required
              />
            </Grid>
            
            <Grid item>
              <TextField
                name="flag"
                label="Flag"
                value={editedRole.flag}
                onChange={handleInputChange}
                required
              />
            </Grid>
            <Grid item>
              <Button type="submit" variant="contained">
                Save
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
const SelectRoll = [
  { title: "Dashboard", value: 1 },
  { title: "Role Management", value: 2 },
  { title: "Product Management", value: 3 },
  { title: "Manage Consumers", value: 4 },
  { title: "Manage NBFC", value: 5 },
  { title: "Manage Dealer", value: 6 },
  { title: "Manage DSA", value: 7 },
  { title: "Manage GP", value: 8 },
  { title: "Manage Staff", value: 9 },
  { title: "Manage Recover Agent", value: 10 },
  { title: "Manage Collection Agent", value: 11 },
];
const privilegesOptions = [
  "Dashboard",
  "Assets",
  "Asset Type",
  "Location",
  "User",
  "Department",
  "Employee",
  "Transcation",
  "QuickCode",
  // Add more options as needed
];
export default EditUserRoleForm;
