import { Box, Button, Card, CardContent, Modal, TextField, Typography } from '@mui/material';
import React, { useState } from 'react'
import axios from 'axios';
import { TOKEN } from '../utils/BaseUrl';

interface outletFormInterface  {
  dlrId: string,
  outletName: string,
  addressLineFirst: string,
  addressLineSecond: string,
  pincode: string,
  city: string,
  state: string,
}

interface AddDlrOutletModalProps {
  isModalOpen: boolean;
  dealerId: string;
  handleModalClose: () => void;
  fetchDealerOutlet: () => void
}



const AddDlrOutletModal: React.FC<AddDlrOutletModalProps> = ({isModalOpen, handleModalClose, dealerId, fetchDealerOutlet}) => {
  const [formData, setFormData] = useState<outletFormInterface>({
    dlrId: dealerId,
    outletName: "",
    addressLineFirst: "",
    addressLineSecond: "",
    pincode: "",
    city: "",
    state: "",
  });

  const handleFormValueChange = (e: any) => {
    setFormData((prev)=> {
      return {
        ...prev,
        [e.target.name]: e.target.value
      }
    })
  }
  const handleFormSubmit = async (e: any) => {
    e.preventDefault()

    try {
      const data = await axios.post('/admin-service/createDlrOutlet', formData, {
        headers: {
          Authorization: TOKEN
        }
      })

      alert(data?.data?.responseData)
      handleModalClose()
      setFormData({ dlrId: dealerId,
        outletName: "",
        addressLineFirst: "",
        addressLineSecond: "",
        pincode: "",
        city: "",
        state: "",
      })
      fetchDealerOutlet()
    }
    catch(error){
      alert("Error adding new outlet")
    }
  }
  return (
    <Modal open={isModalOpen} onClose={handleModalClose}>
      <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: "50%"
          }}
        >
          <Card>
            <CardContent>
            <Typography variant="h5" component="h2" gutterBottom>
                Add Dealer Outlet
              </Typography>

              <form onSubmit={handleFormSubmit} style={{display: "grid", gridTemplateColumns: "auto auto", gap: "1rem"}}>
              <TextField
                label="Dealer Id"
                variant="outlined"
                size="small"
                name="dlrId"
                value={formData.dlrId}
                disabled
              />
              <TextField
                label="Outlet Name"
                variant="outlined"
                size="small"
                name="outletName"
                value={formData.outletName}
                onChange = {handleFormValueChange}
                required
              />
              <TextField
                label="Address Line First"
                variant="outlined"
                size="small"
                name="addressLineFirst"
                value={formData.addressLineFirst}
                style={{gridColumn: "span 2/ span 2"}}
                onChange = {handleFormValueChange}
                required
              />
              <TextField
                label="Address Line Second"
                variant="outlined"
                size="small"
                name="addressLineSecond"
                value={formData.addressLineSecond}
                style={{gridColumn: "span 2/ span 2"}}
                onChange = {handleFormValueChange}
                required
              />
              <TextField
                label="Pincode"
                variant="outlined"
                size="small"
                name="pincode"
                value={formData.pincode}
                onChange = {handleFormValueChange}
                required
              />

              <TextField
                label="City"
                variant="outlined"
                size="small"
                name="city"
                value={formData.city}
                onChange = {handleFormValueChange}
                required
              />
              <TextField
                label="State"
                variant="outlined"
                size="small"
                name="state"
                value={formData.state}
                onChange = {handleFormValueChange}
                required
              />
              <Button type='submit' variant='contained' style={{gridColumn: "span 2 / span 2"}}>Submit</Button>
              </form>
            </CardContent>
          </Card>
        </Box>
    </Modal>
  )
}

export default AddDlrOutletModal
