/* ----------------------------------------------------------------------------
Information Contained Herein is Proprietary and Confidential. copyright notice in all copies, 
acknowledging that the code is provided without warranties, and strictly prohibiting unauthorized 
sharing or distribution without prior written consent from the copyright holder<DKG Labs Pvt. Ltd>
------------------------------------------------------------------------------ */


import React, { useEffect, useState } from "react";
import UserRolesTable from "./UserRolesTable";
import AddUserRoleForm from "./AddUserRoleForm";
import EditUserRoleForm from "./EditUserRoleForm";
import { UserRole } from "./UserInterface";
import { Button } from "@mui/material";

const UserRoleManagementPage: React.FC = () => {
  const [userRoles, setUserRoles] = useState<UserRole[]>([]);
  const [isAdding, setIsAdding] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editingRole, setEditingRole] = useState<UserRole | null>(null);
  const [authRole, setAuthRole] = useState<number[]>([]);

  useEffect(() => {
    const dummyUserRoles: UserRole[] = [
      {
        id: 1,
        modCode: "Dkg",
        modName: "Admin",
        sName: "dkg",
        authDtl: authRole,
        flag: "Flag 1",
        createdBy: "John Doe",
        createdDate: "2023-01-01",
      },
    ];
    setUserRoles(dummyUserRoles);
  }, [authRole]);

  useEffect(() => {
    const rolarr = localStorage.getItem("userRole");

    if (rolarr !== null) {
      const parsedRolarr = JSON.parse(rolarr);
      setAuthRole(parsedRolarr);
    }
  }, []);

  const handleAddRole = (newRole: UserRole) => {
    setUserRoles((prevRoles) => [...prevRoles, newRole]);
    setIsAdding(false);
  };

  const handleEditRole = (editedRole: UserRole) => {
    if (editingRole) {
      setUserRoles((prevRoles) =>
        prevRoles.map((prevRole) =>
          prevRole.id === editedRole.id ? editedRole : prevRole
        )
      );
      setIsEditing(false);
      setEditingRole(null);
    }
  };

  const handleRemoveRole = (roleId: number) => {
    setUserRoles((prevRoles) => prevRoles.filter((role) => role.id !== roleId));
  };

  const handleCancelEdit = () => {
    setIsEditing(false);
    setEditingRole(null);
  };

  const handleCancelAdd = () => {
    setIsAdding(false);
    setEditingRole(null);
  };

  return (
    <div>
      <h1>User Role Management</h1>

      {!isAdding && !isEditing && (
        <div>
          <Button variant="contained" onClick={() => setIsAdding(true)}>
            Add New Role
          </Button>{" "}
          <br />
          <br />
          <UserRolesTable
            userRoles={userRoles}
            onEditRole={(role) => {
              setIsEditing(true);
              setEditingRole(role);
            }}
            onRemoveRole={handleRemoveRole}
          />
        </div>
      )}

      {isAdding && (
        <div>
          <h2>Add New Role</h2>
          <AddUserRoleForm
            onAddRole={handleAddRole}
            onCancel={handleCancelAdd}
          />
        </div>
      )}

      {isEditing && editingRole && (
        <div>
          <h2>Edit Role</h2>
          <EditUserRoleForm
            role={editingRole}
            onEditRole={handleEditRole}
            onCancel={handleCancelEdit}
          />
        </div>
      )}
    </div>
  );
};

export default UserRoleManagementPage;
