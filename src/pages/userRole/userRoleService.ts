/* ----------------------------------------------------------------------------
Information Contained Herein is Proprietary and Confidential. copyright notice in all copies, 
acknowledging that the code is provided without warranties, and strictly prohibiting unauthorized 
sharing or distribution without prior written consent from the copyright holder<DKG Labs Pvt. Ltd>
------------------------------------------------------------------------------ */


import axios from 'axios';
import { UserRole } from './UserInterface';
import {BASE_URL,TOKEN} from "../../utils/BaseUrl";



export const getUserRoles = (): Promise<UserRole[]> => {
  return axios.get(`${BASE_URL}/user-roles`).then((response) => response.data);
};

export const addUserRole = (newRole: UserRole): Promise<UserRole> => {
  return axios.post(`${BASE_URL}/user-roles`, newRole).then((response) => response.data);
};

export const updateUserRole = (updatedRole: UserRole): Promise<UserRole> => {
  return axios.put(`${BASE_URL}/user-roles/${updatedRole.id}`, updatedRole).then((response) => response.data);
};

export const removeUserRole = (roleId: number): Promise<void> => {
  return axios.delete(`${BASE_URL}/user-roles/${roleId}`);
};
