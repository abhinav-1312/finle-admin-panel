/* ----------------------------------------------------------------------------
Information Contained Herein is Proprietary and Confidential. copyright notice in all copies, 
acknowledging that the code is provided without warranties, and strictly prohibiting unauthorized 
sharing or distribution without prior written consent from the copyright holder<DKG Labs Pvt. Ltd>
------------------------------------------------------------------------------ */


export default interface Product {
  productCode: string;
  productName: string;
  productDesc: string;
  productCategory: string;
  productMileage: string;
  productPower: string;
  productBatDtls: string;
  productLoadCapacity: string;
  productSafety: string;
  productRemark: string;
  productImage: string;
  isActive: string;
  chassisNumber: string;
  colorName: string;
  costPrice: number;
  make: string;
  model: string;
  owner: string;
  year: string;
}
