import { Button, Card, CardContent, Typography } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { useNavigate } from "react-router-dom";



const NbfcDealerDashboardDetailTable = ({ title, data, dataFor }) => {
  const navigate = useNavigate()
  const handleConsumerClick = (id) => {
    navigate(`/consumer/${id}`, {state: {fromLoc: window.location.pathname, dataFor}})
    // navigate('/consumer', {state: {nbfcId}})
  }

  const nbfcColumns = [
    {
      field: 'id',
      headerName: 'Loan ID',
      width: 120,
      renderCell: (params) => (
        <Button
          variant="text"
          color="inherit"
          sx={{ background: "#dcdcdc" }}
          onClick={() =>
            handleConsumerClick(
              params.row.id
            )
          }
        >
          {params.row.id}
        </Button>
      )
    },
    {
      field: 'userId',
      headerName: 'User ID',
      width: 120
    },
    {
      field: 'personalDetails',
      headerName: 'Full Name',
      renderCell: (params) => params?.row?.personalDetails?.name,
      width: 300
    },
    {
      field: 'partnerId',
      headerName: 'Dealer ID',
      width: 120
    },
  ];

  const dlrColumns = [
    {
      field: 'id',
      headerName: 'Loan ID',
      width: 120,
      renderCell: (params) => (
        <Button
          variant="text"
          color="inherit"
          sx={{ background: "#dcdcdc" }}
          onClick={() =>
            handleConsumerClick(
              params.row.id
            )
          }
        >
          {params.row.id}
        </Button>
      )
    },
    {
      field: 'userId',
      headerName: 'User ID',
      width: 120
    },
    {
      field: 'personalDetails',
      headerName: 'Full Name',
      renderCell: (params) => params?.row?.personalDetails?.name,
      width: 300
    },
    {
      field: 'nbfcId',
      headerName: 'NBFC ID',
      width: 120
    },
  ]

  const generateCol = () => {
    switch (dataFor){
      case "nbfc":
        return nbfcColumns
      case "dlr":
        return dlrColumns
      default: 
        break
    }
  }
  return (
    <Card>
      <CardContent>
        <Typography variant="h4" gutterBottom>
          {title}
        </Typography>
        <div style={{ height: "auto", width: "100%" }}>
          <DataGrid
            rows={data}
            columns={generateCol()}
            // columns={dataFor === 'nbfc' ? nbfcColumns : dlrColumns}
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

export default NbfcDealerDashboardDetailTable;
