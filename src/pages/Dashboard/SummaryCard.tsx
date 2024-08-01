/* ----------------------------------------------------------------------------
Information Contained Herein is Proprietary and Confidential. copyright notice in all copies, 
acknowledging that the code is provided without warranties, and strictly prohibiting unauthorized 
sharing or distribution without prior written consent from the copyright holder<DKG Labs Pvt. Ltd>
------------------------------------------------------------------------------ */

import React from "react";
import { Card, CardContent, Typography } from "@mui/material";

interface SummaryCardProps {
  title: string;
  value: any;
  isActive: boolean;
  tileColor: string;
  onClick: () => void;
}

const SummaryCard: React.FC<SummaryCardProps> = ({ title, value, onClick, isActive, tileColor }) => {
  return (
    <Card
      className={`summary-card ${isActive ? "clicked" : ""}`}
      onClick={onClick}
      sx={{backgroundColor: tileColor, position: "relative", height: "inherit"}}
    >
      <CardContent>
        <Typography variant="h6" gutterBottom>
          {title}
        </Typography>
        <Typography variant="h4">{value}</Typography>
      </CardContent>
    </Card>
  );
};

export default SummaryCard;
