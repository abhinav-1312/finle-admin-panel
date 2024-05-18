/* ----------------------------------------------------------------------------
Information Contained Herein is Proprietary and Confidential. copyright notice in all copies, 
acknowledging that the code is provided without warranties, and strictly prohibiting unauthorized 
sharing or distribution without prior written consent from the copyright holder<DKG Labs Pvt. Ltd>
------------------------------------------------------------------------------ */


export interface Dealer {
  dealerId: string;
  firstName: string;
  lastName: string;
  mgrName: string;
  addressLineFirst: string;
  addressLineSecond: string;
  city: string;
  state: string;
  pincode: string;
  mobile: string;
  phone: string;
  email: string;
  lat: number;
  lang: number;
  isActive: string;
}
