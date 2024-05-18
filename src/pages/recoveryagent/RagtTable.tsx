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
import { Ragt } from "./RagtInterface";

interface RagtTableProps {
  gpList: Ragt[];
  editRagt: (ragt: Ragt) => void;
  deleteRagt: (gpId: number) => void;
  toggleRagtStatus: (gpId: number, status: "block" | "unblock") => void;
}

const RagtTable: React.FC<RagtTableProps> = ({
  gpList,
  editRagt,
  deleteRagt,
  toggleRagtStatus,
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
          {gpList.map((ragt) => (
            <TableRow key={ragt.Id}>
              <TableCell>{ragt.Id}</TableCell>
              <TableCell>{ragt.Name}</TableCell>
              <TableCell>{ragt.MgrName}</TableCell>
              <TableCell>{ragt.AdrLine1}</TableCell>
              <TableCell>{ragt.AdrLine2}</TableCell>
              <TableCell>{ragt.City}</TableCell>
              <TableCell>{ragt.State}</TableCell>
              <TableCell>{ragt.PinCode}</TableCell>
              <TableCell>{ragt.Mobile}</TableCell>
              <TableCell>{ragt.Phone}</TableCell>
              <TableCell>{ragt.Email}</TableCell>
              <TableCell>{ragt.Lat}</TableCell>
              <TableCell>{ragt.Lng}</TableCell>
              <TableCell>
                {ragt.Flag === "Y" ? (
                  <CheckCircle color="primary" />
                ) : (
                  <Block color="error" />
                )}
              </TableCell>
              <TableCell>
                <IconButton onClick={() => editRagt(ragt)}>
                  <Edit />
                </IconButton>
                <IconButton onClick={() => deleteRagt(ragt.Id)}>
                  <Delete />
                </IconButton>
                {ragt.Flag === "Y" ? (
                  <IconButton onClick={() => toggleRagtStatus(ragt.Id, "block")}>
                    <Block />
                  </IconButton>
                ) : (
                  <IconButton onClick={() => toggleRagtStatus(ragt.Id, "unblock")}>
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

export default RagtTable;
