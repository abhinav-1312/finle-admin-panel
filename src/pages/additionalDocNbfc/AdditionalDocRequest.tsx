import { useEffect } from 'react'
import { fetchNBFCs } from '../../store/actions/nbfcActions'
import { fetchRejectedLoan } from '../../store/actions/rejectedLoanNbfcWiseAction';
import { useDispatch, useSelector } from 'react-redux';
import { ThunkDispatch } from '@reduxjs/toolkit';
import { RootState } from '../../store/store';
import { fetchLoanDetail } from '../../store/actions/allLoanDetailActions';
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { Button, Card, CardContent, Typography } from '@mui/material';

const AdditionalDocRequest = () => {
    const dispatch = useDispatch<ThunkDispatch<RootState, null, any>>();
    const rejectedRemarkObj = useSelector((state: RootState) => state.rejectedLoanDetail.rejectedLoanObj)
    const loanDetailList = useSelector((state: RootState) => state.allLoanDetail.allLoanDetailList)
    useEffect(() => {
        const util = async () => {
            await dispatch(fetchNBFCs())
            dispatch(fetchLoanDetail())
            dispatch(fetchRejectedLoan())
        }
        util()
    }, [dispatch])

    const additionalDocReqLoan: any = []

    loanDetailList?.forEach(record => {
      if(record.loanStatus === "Incomplete"){
          if(record.nbfcId && record.loanId && rejectedRemarkObj[record.nbfcId] && rejectedRemarkObj[record.nbfcId][record.loanId]){
            additionalDocReqLoan.push(
              {
                id: record.userId,
                nbfcId: record.nbfcId,
                loanId: record.loanId,
                remark: rejectedRemarkObj[record.nbfcId][record.loanId]
              }
            )
          }
      }
    })

    console.log("Add doc: ", additionalDocReqLoan)

    if(loanDetailList.length === 0){
      return <h1> Loading...</h1>
    }

    const columns: GridColDef[] = [
      {
        field: 'id',
        headerName: 'User ID',
        width: 120
      },
      {
        field: 'nbfcId',
        headerName: 'NBFC ID',
        width: 120
      },
      {
        field: 'loanId',
        headerName: 'Loan ID',
        width: 150
      },
      {
        field: 'remark',
        headerName: 'Remark',
        width: 350
      },
      {
        field: 'action',
        headerName: "Action",
        width: 250,
        renderCell: (params) => (
          <Button variant='outlined' onClick={() => alert("Please contact NBFC.")}>
            Upload Requested Doc
          </Button>
        )
      }
    ]
    
  return (
    <Card>
      <CardContent>
      <Typography variant="h4" gutterBottom>
          Additional Info Requested Loan Applicants
        </Typography>

        <div style={{ height: "auto", width: "100%" }}>
          <DataGrid
            rows={additionalDocReqLoan}
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
  )
}

export default AdditionalDocRequest
