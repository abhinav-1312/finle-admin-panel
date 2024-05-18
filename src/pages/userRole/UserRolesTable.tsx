/* ----------------------------------------------------------------------------
Information Contained Herein is Proprietary and Confidential. copyright notice in all copies, 
acknowledging that the code is provided without warranties, and strictly prohibiting unauthorized 
sharing or distribution without prior written consent from the copyright holder<DKG Labs Pvt. Ltd>
------------------------------------------------------------------------------ */


import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Button,
  Card,
  CardContent,
} from "@mui/material";
import { UserRole } from "./UserInterface";

interface UserRolesTableProps {
  userRoles: UserRole[];
  onEditRole: (role: UserRole) => void;
  onRemoveRole: (roleId: number) => void;
}

const UserRolesTable: React.FC<UserRolesTableProps> = ({
  userRoles,
  onEditRole,
  onRemoveRole,
}) => {
  return (
    <Card>
      <CardContent>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>ModCode</TableCell>
              <TableCell>ModName</TableCell>
              <TableCell>SName</TableCell>
              <TableCell>AuthDtl</TableCell>
              <TableCell>Flag</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {userRoles.map((role) => (
              <TableRow key={role.id}>
                <TableCell>{role.id}</TableCell>
                <TableCell>{role.modCode}</TableCell>
                <TableCell>{role.modName}</TableCell>
                <TableCell>{role.sName}</TableCell>
                <TableCell>
                  {Array.isArray(role.authDtl) ? role.authDtl.join(", ") : ""}
                </TableCell>
                <TableCell>{role.flag}</TableCell>
                <TableCell>
                  <Button variant="outlined" onClick={() => onEditRole(role)}>
                    Edit
                  </Button>
                  <Button
                    variant="outlined"
                    color="error"
                    onClick={() => onRemoveRole(role.id)}
                  >
                    Delete
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
};

export default UserRolesTable;
