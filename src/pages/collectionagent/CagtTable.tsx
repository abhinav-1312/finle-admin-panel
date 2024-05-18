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
  TableContainer,
  TableHead,
  TableRow,
  IconButton,
} from "@mui/material";
import { Edit, Delete, Block, CheckCircle } from "@mui/icons-material";
import { Cagt } from "./CagtInterface";

interface CagtTableProps {
  cagtList: Cagt[];
  editCagt: (cagt: Cagt) => void;
  deleteCagt: (gpId: number) => void;
  toggleCagtStatus: (gpId: number, status: "block" | "unblock") => void;
}

const CagtTable: React.FC<CagtTableProps> = ({
  cagtList,
  editCagt,
  deleteCagt,
  toggleCagtStatus,
}) => {
  return (
    <TableContainer>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>ID</TableCell>
            <TableCell>Name</TableCell>
            <TableCell>MgrName</TableCell>
            <TableCell>AdrLine1</TableCell>
            <TableCell>AdrLine2</TableCell>
            <TableCell>City</TableCell>
            <TableCell>State</TableCell>
            <TableCell>PinCode</TableCell>
            <TableCell>Mobile</TableCell>
            <TableCell>Phone</TableCell>
            <TableCell>Email</TableCell>
            <TableCell>Lat</TableCell>
            <TableCell>Lng</TableCell>
            <TableCell>Flag</TableCell>
            <TableCell>Action</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {cagtList.map((cagt) => (
            <TableRow key={cagt.Id}>
              <TableCell>{cagt.Id}</TableCell>
              <TableCell>{cagt.Name}</TableCell>
              <TableCell>{cagt.MgrName}</TableCell>
              <TableCell>{cagt.AdrLine1}</TableCell>
              <TableCell>{cagt.AdrLine2}</TableCell>
              <TableCell>{cagt.City}</TableCell>
              <TableCell>{cagt.State}</TableCell>
              <TableCell>{cagt.PinCode}</TableCell>
              <TableCell>{cagt.Mobile}</TableCell>
              <TableCell>{cagt.Phone}</TableCell>
              <TableCell>{cagt.Email}</TableCell>
              <TableCell>{cagt.Lat}</TableCell>
              <TableCell>{cagt.Lng}</TableCell>
              <TableCell>
                {cagt.Flag === "Y" ? (
                  <CheckCircle color="primary" />
                ) : (
                  <Block color="error" />
                )}
              </TableCell>
              <TableCell>
                <IconButton onClick={() => editCagt(cagt)}>
                  <Edit />
                </IconButton>
                <IconButton onClick={() => deleteCagt(cagt.Id)}>
                  <Delete />
                </IconButton>
                {cagt.Flag === "Y" ? (
                  <IconButton onClick={() => toggleCagtStatus(cagt.Id, "block")}>
                    <Block />
                  </IconButton>
                ) : (
                  <IconButton onClick={() => toggleCagtStatus(cagt.Id, "unblock")}>
                    <CheckCircle color="primary" />
                  </IconButton>
                )}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default CagtTable;
