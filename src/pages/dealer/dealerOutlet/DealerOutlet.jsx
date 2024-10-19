import { Add } from '@mui/icons-material'
import { Button, Card, CardContent, TextField } from '@mui/material'
import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { apiCall } from '../../../utils/UtilFunctions'
import DealerOutletTable from './DealerOutletTable'
import AddDlrOutletModal from '../../../components/AddDlrOutletModal'

const DealerOutlet = () => {

    const {dealerId} = useParams()

    const [outletData, setOutletData] = useState([]);

    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleModalClose = () => {
        setIsModalOpen(false)
    }

    const fetchDealerOutlet = async () => {
        try{
            const {responseData} = await apiCall("GET", `/admin-service/getDlrOutletDtls?dealerId=${dealerId}`)
            const modResponse = responseData?.map(res => ({id: res.outletId, ...res}))
            setOutletData(modResponse)
        }catch(error){
            alert("Error occured fetching outlet data.")
        }
    }

    useEffect(() => {
        fetchDealerOutlet()
    }, [])

  return (
    <div>
        <h1> Dealer Outlet Management for Dealer ID: {dealerId} </h1>
        <Card>
            <CardContent>
            <div style={{ display: "flex", justifyContent: "space-between" }}>
            <TextField
              label="Search Dealer"
              variant="outlined"
              size="small"
            //   value={searchTerm}
            //   onChange={handleSearch}
            />
            <Button
              variant="contained"
              startIcon={<Add />}
              onClick={() => setIsModalOpen(true)}
            >
              Add New Outlet
            </Button>
          </div>
          <br /> <br />
            <DealerOutletTable data={outletData} />
            </CardContent>
        </Card>
        <AddDlrOutletModal dealerId={dealerId} isModalOpen={isModalOpen} handleModalClose={handleModalClose} fetchDealerOutlet={fetchDealerOutlet} />
    </div>
  )
}

export default DealerOutlet
