/* ----------------------------------------------------------------------------
Information Contained Herein is Proprietary and Confidential. copyright notice in all copies, 
acknowledging that the code is provided without warranties, and strictly prohibiting unauthorized 
sharing or distribution without prior written consent from the copyright holder<DKG Labs Pvt. Ltd>
------------------------------------------------------------------------------ */

import React from "react";
import { Card, CardContent, Typography } from "@mui/material";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { useSelector } from "react-redux";
import { RootState } from "../../store/store";

interface Activity {
  id: any;
  Name: string;
}

interface RecentActivitiesProps {
  activeSummaryCard: string;
  title: string;
}

const RecentActivities: React.FC<RecentActivitiesProps> = ({
  activeSummaryCard,
  title,
}) => {
  const nbfcs = useSelector((state: RootState) => state.nbfc.nbfcList);
  const dlrs = useSelector((state: RootState) => state.dlr.dealerList);
  const dsas = useSelector((state: RootState) => state.dsa.dsaList);
  const staffs = useSelector((state: RootState) => state.staff.staffList);

  let recentActivities: Activity[] = [];

  switch (activeSummaryCard) {
    case "nbfc":
      recentActivities = nbfcs
        .map((record) => ({
          id: record.nbfcId,
          Name: `${record.firstName}`,
        }))
        .slice(-10);
      break;

    case "dlr":
      recentActivities = dlrs
        .map((record) => ({
          id: record.dealerId,
          Name: ` ${record.firstName}`,
        }))
        .slice(-10);
      break;

    case "dsa":
      recentActivities = dsas
        .map((record) => ({
          id: record.dsaId,
          Name: `${record.firstName}`,
        }))
        .slice(-10);
      break;

    case "staff":
      recentActivities = staffs
        .map((record) => ({
          id: record.staffId,
          Name: `${record.firstName}`,
        }))
        .slice(-10);
      break;

    default:
      break;
  }

  const columns: GridColDef[] = [
    { field: "id", headerName: "ID", width: 100 },
    { field: "Name", headerName: "Name", width: 200 },
  ];

  return (
    <Card>
      <CardContent>
        <Typography variant="h4" gutterBottom>
          {title}
        </Typography>
        <div style={{ height: "auto", width: "100%" }}>
          <DataGrid
            rows={recentActivities}
            columns={columns}
            autoHeight
            initialState={{
              pagination: {
                paginationModel: { page: 0, pageSize: 10 },
              },
            }}
            pageSizeOptions={[5, 10, 20, 30, 50, 100]}
          />
        </div>
      </CardContent>
    </Card>
  );
};

export default RecentActivities;
