import { Button, Card, CardContent, Typography } from '@mui/material'
import { DataGrid } from '@mui/x-data-grid'
import React from 'react'

const ReleaseRequestTable = ({title, data, acceptBtnEnabled, rejectBtnEnabled, addDocBtnEnabled, actionColumnVisible}) => {

    let columns = [
        {
            field: "userId",
            headerName: "User ID",
            width: 120
        },
        {
            field: "loanId",
            headerName: "Loan ID",
            width: 120
        },
        {
            field: "dlrId",
            headerName: "Dealer ID",
            width: 120
        },
        {
            field: "nbfcId",
            headerName: "NBFC ID",
            width: 120
        },
        {
            field: "createdAt",
            headerName: "DO Application Date",
            width: 240
        }
    ]

    const actionColumn =  {
        field: 'actions',
        headerName: "Actions",
        renderCell: (params) => (
            <div style={{display: "flex", gap: "1rem"}}>
                {
                    acceptBtnEnabled &&
                    <Button variant='contained' color='success' onClick={()=> alert("Imlementation in progress.")}> Accept </Button>
                }
                {
                    rejectBtnEnabled && 
                    <Button variant='contained' color='success' onClick={()=> alert("Imlementation in progress.")}> Reject </Button>
                }
                {
                    addDocBtnEnabled && 
                    <Button variant='contained' onClick={()=> alert("Imlementation in progress.")}> Request Additional Doc </Button>
                }
            </div>
        )
    }

    if(actionColumnVisible){
        columns = [...columns, actionColumn]
    }


  return (
    <Card>
      <CardContent>
      <Typography variant="h5" gutterBottom>
            {title}
          </Typography>

          <div style={{ height: "auto", width: "100%" }}>
            <DataGrid
                rows={data}
                columns={columns}
                getRowId={(row) => row.id}
                pageSizeOptions={[5, 10, 20, 30, 50, 100]}
                autoHeight
                />
          </div>
      </CardContent>
    </Card>
  )
}

export default ReleaseRequestTable
