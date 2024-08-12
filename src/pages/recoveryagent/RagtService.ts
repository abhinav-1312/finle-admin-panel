/* ----------------------------------------------------------------------------
Information Contained Herein is Proprietary and Confidential. copyright notice in all copies, 
acknowledging that the code is provided without warranties, and strictly prohibiting unauthorized 
sharing or distribution without prior written consent from the copyright holder<DKG Labs Pvt. Ltd>
------------------------------------------------------------------------------ */

import axios from "axios";
import { Ragt } from "./RagtInterface";
import {BASE_URL,TOKEN} from "../../utils/BaseUrl";


export const fetchRagts = async (): Promise<Ragt[]> => {
  try {
    const response = await axios.get<Ragt[]>(`/ragt`);
    return response.data;
  } catch (error) {
    console.error(error);
    throw new Error("Failed to fetch Ragts");
  }
};

export const addRagt = async (ragt: Ragt): Promise<Ragt> => {
  try {
    const response = await axios.post<Ragt>(`/ragt`, ragt);
    return response.data;
  } catch (error) {
    console.error(error);
    throw new Error("Failed to add Ragt");
  }
};

export const updateRagt = async (ragt: Ragt): Promise<Ragt> => {
  try {
    const response = await axios.put<Ragt>(`/ragt/${ragt.Id}`, ragt);
    return response.data;
  } catch (error) {
    console.error(error);
    throw new Error("Failed to update Ragt");
  }
};

export const deleteRagt = async (nbfcId: number): Promise<void> => {
  try {
    await axios.delete(`/ragt/${nbfcId}`);
  } catch (error) {
    console.error(error);
    throw new Error("Failed to delete Ragt");
  }
};

export const blockRagt = async (nbfcId: number): Promise<void> => {
  try {
    await axios.put(`/ragt/${nbfcId}/block`);
  } catch (error) {
    console.error(error);
    throw new Error("Failed to block Ragt");
  }
};

export const unblockRagt = async (nbfcId: number): Promise<void> => {
  try {
    await axios.put(`/ragt/${nbfcId}/unblock`);
  } catch (error) {
    console.error(error);
    throw new Error("Failed to unblock Ragt");
  }
};
