/* ----------------------------------------------------------------------------
Information Contained Herein is Proprietary and Confidential. copyright notice in all copies, 
acknowledging that the code is provided without warranties, and strictly prohibiting unauthorized 
sharing or distribution without prior written consent from the copyright holder<DKG Labs Pvt. Ltd>
------------------------------------------------------------------------------ */


import axios from "axios";
import { Cagt } from "./CagtInterface";
import {BASE_URL} from "../../utils/BaseUrl";


export const fetchCagts = async (): Promise<Cagt[]> => {
  try {
    const response = await axios.get<Cagt[]>(`${BASE_URL}/cagt`);
    return response.data;
  } catch (error) {
    console.error(error);
    throw new Error("Failed to fetch Cagts");
  }
};

export const addCagt = async (cagt: Cagt): Promise<Cagt> => {
  try {
    const response = await axios.post<Cagt>(`${BASE_URL}/cagt`, cagt);
    return response.data;
  } catch (error) {
    console.error(error);
    throw new Error("Failed to add Cagt");
  }
};

export const updateCagt = async (cagt: Cagt): Promise<Cagt> => {
  try {
    const response = await axios.put<Cagt>(`${BASE_URL}/cagt/${cagt.Id}`, cagt);
    return response.data;
  } catch (error) {
    console.error(error);
    throw new Error("Failed to update Cagt");
  }
};

export const deleteCagt = async (CagtId: number): Promise<void> => {
  try {
    await axios.delete(`${BASE_URL}/cagt/${CagtId}`);
  } catch (error) {
    console.error(error);
    throw new Error("Failed to delete Cagt");
  }
};

export const blockCagt = async (CagtId: number): Promise<void> => {
  try {
    await axios.put(`${BASE_URL}/cagt/${CagtId}/block`);
  } catch (error) {
    console.error(error);
    throw new Error("Failed to block Cagt");
  }
};

export const unblockCagt = async (CagtId: number): Promise<void> => {
  try {
    await axios.put(`${BASE_URL}/cagt/${CagtId}/unblock`);
  } catch (error) {
    console.error(error);
    throw new Error("Failed to unblock Cagt");
  }
};
