import { Button } from '@mui/material'
import { DataGrid } from '@mui/x-data-grid'
import React from 'react'
import { useNavigate } from 'react-router-dom'

const LoanCases = ({data}) => {
    const navigate = useNavigate()

    const handleConsumerClick = (id) => {
        navigate(`/consumer/${id}`)
      }

    const columns = [
        {field: "id", headerName: "User ID", width: 100,
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
        {field: "loanId", headerName: "Loan ID", width: 100},
        {field: "fullName", headerName: "Full Name", width: 400}
      ]

      const modData = data?.map(record => ({id: record.userId, loanId: record?.loanId, fullName: record?.personalDetails?.name}))
  return (
    <div>
      <DataGrid
            rows={modData}
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
  )
}

export default LoanCases
