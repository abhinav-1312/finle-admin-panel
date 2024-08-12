import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { BASE_URL, TOKEN } from "../../utils/BaseUrl";
import QueUserDoc from '../../pages/consumer/QueUserDoc';
import { Link } from "react-router-dom";
import { Card, CardContent, Button } from '@mui/material';

const UserDetails = () => {
  const { mobileNo } = useParams();
  const [userDetails, setUserDetails] = useState(null);

  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        const response = await axios.post(
          `/user-service/userDetails`,
          {
            userId: mobileNo,
          },
          {
            headers: {
              Authorization: TOKEN,
            },
          }
        );

        if (response.status === 200) {
          setUserDetails(response.data.responseData);
        } else {
          console.error('Failed to fetch user details:', response.status, response.statusText);
        }
      } catch (error) {
        console.error('Error during user details fetch:', error);
      }
    };

    fetchUserDetails();
  }, [mobileNo]);


  if (!userDetails) {
    return <div>Loading...</div>;
  }

  return (
    <Card>
      <CardContent>
        <div style={{ display: 'flex', justifyContent: 'space-between	', }}>

          <h1>User Details</h1>
          <div>
            <Button
              variant="outlined"
              color="warning"

              component={Link}
              to="/queUser"
            >
              Go back
            </Button>
          </div>
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-evenly	' }}>
          <div style={{ width: '48%' }}>
            <div>
              <strong>User ID:</strong> {userDetails.userId}
            </div>
            <div>
              <strong>First Name:</strong> {userDetails.firstName}
            </div>
            <div>
              <strong>Last Name:</strong> {userDetails.lastName}
            </div>
            <div>
              <strong>User Type:</strong> {userDetails.userType}
            </div>
            <div>
              <strong>Email ID:</strong> {userDetails.emailId || 'N/A'}
            </div>
            <div>
              <strong>Admin Flag:</strong> {userDetails.adminFlag ? 'Yes' : 'No'}
            </div>
          </div>
          <div style={{ width: '48%' }}>
            <div>
              <strong>Mobile Number:</strong> {userDetails.mobileNumber}
            </div>
            <div>
              <strong>User Mode:</strong> {userDetails.userMode}
            </div>
            <div>
              <strong>Created Date:</strong> {userDetails.createdDate}
            </div>
            <div>
              <strong>Remarks:</strong> {userDetails.remarks || 'N/A'}
            </div>

            <div>
              <strong>Active:</strong> {userDetails.active ? 'Approved' : 'Pending'}
            </div>
          </div>
        </div>
        {/* Conditionally render QueUserDoc */}

        {/* Upload doc functionality to be not given to admin */}
        {/* {userDetails.userType === 'DLR' && <QueUserDoc userId={mobileNo} />} */}
      </CardContent>
    </Card>
  );
};

export default UserDetails;
