import { Box, Button, Card, CardContent, Modal, TextField, Typography } from "@mui/material";
import axios from "axios";
import React, { useState } from "react";

const PasswordProtectionModal = ({ isOpen, setIsOpen, setVerified, handleFormSubmit }) => {
  const [password, setPassword] = useState("");
  const handleSubmit = async (e) => {
    e.preventDefault()
		const payload = {
			userId: localStorage.getItem("userId"),
			password
		}
    try{

      const data = await axios.post("/auth-service/login", payload)
      if(data.responseStatus.statusCode === 2){ // password is not correct
        alert("Incorrect password");
        setIsOpen(false);
        setPassword("");
      }
      else{
        await handleFormSubmit()
        setIsOpen(false);
      }
    }catch(error){
      alert("Error authenticating user.")
      console.log("ERROR: ", error)
    }
	};
  return (
    <Modal open={isOpen} onClose={() => setIsOpen(false)}>
      <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: "30%"
          }}
        >
          <Card>
            <CardContent>
              <Typography variant="h5" component="h2" gutterBottom>
                Authenticate
              </Typography>
              <form onSubmit={handleSubmit}>
                <TextField label="Password" name="password" value={password} onChange={(e) => setPassword(e.target.value)} size="small" style={{width: "100%"}}/>
                  <br /> <br />
                <Button type="submit" variant="contained" style={{marginLeft: "76%"}}>Submit</Button>
              </form>
            </CardContent>
          </Card>

        </Box>
    </Modal>
  );
};

export default PasswordProtectionModal;
