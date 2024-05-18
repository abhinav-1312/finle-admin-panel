/* ----------------------------------------------------------------------------
Information Contained Herein is Proprietary and Confidential. copyright notice in all copies, 
acknowledging that the code is provided without warranties, and strictly prohibiting unauthorized 
sharing or distribution without prior written consent from the copyright holder<DKG Labs Pvt. Ltd>
------------------------------------------------------------------------------ */

export interface UserRole {
  id: number;
  modCode: string;
  modName: string;
  sName: string;
  authDtl: (number | null)[];
  flag: string;
  createdBy: string | null;
  createdDate: string;
}
