import { Tab, Tabs } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { apiCall } from '../../../utils/UtilFunctions';
import ReleaseRequestTable from './ReleaseRequestTable';

const ReleaseRequestQueue = () => {
  const [selectedTab, setSelectedTab] = useState(0);

  const [releaseRequestData, setReleaseRequestData] = useState({
    acceptedList: [],
    rejectedList: [],
    addDocList: [],
    pendingList: []
  })

  const userType = localStorage.getItem("userType");

  console.log("BOOL: ", userType === "Nbfc")

  const populateReleaseRequestData = async () => {
    const userId = localStorage.getItem("userId")
    const nbfcId = (userType === "admin" || userType === "superAdmin") ? null : userId;

    try{
      const {responseData} = await apiCall("GET", `/admin-service/getReleaseRequestDetails?nbfcId=${nbfcId}`);
      const {pendingList, acceptedList, rejectedList, addDocList} = responseData
      setReleaseRequestData({
        acceptedList: acceptedList,
        pendingList: pendingList,
        addDocList: addDocList,
        rejectedList: rejectedList
      })
    }catch(error){
      alert("Error fetching release request data.")
    }
  }
  useEffect(() => {
    populateReleaseRequestData()
  }, [])
  return (
    <div>
      <Tabs value={selectedTab} onChange={(e, value) => setSelectedTab(value)}>
        <Tab label="Pending Requests"/>
        <Tab label="Approved Requests"/>
        <Tab label="Rejected Requests"/>
        <Tab label="Additional Info Requested List"/>
      </Tabs>

      {
        selectedTab === 0 && (
          <ReleaseRequestTable 
            data={releaseRequestData?.pendingList} 
            title="Pending Requests"
            acceptBtnEnabled
            rejectBtnEnabled
            addDocBtnEnabled
            actionColumnVisible = {userType === "Nbfc" ? true : false}
          />
        )
      }
      {
        selectedTab === 1 && (
          <ReleaseRequestTable 
            data={releaseRequestData?.pendingList} 
            title="Accepted Requests"
            // acceptBtnEnabled
            rejectBtnEnabled
            actionColumnVisible = {userType === "Nbfc" ? true : false}
            // addDocBtnEnabled
          />
        )
      }
      {
        selectedTab === 2 && (
          <ReleaseRequestTable 
            data={releaseRequestData?.pendingList} 
            title="Rejected Requests"
            acceptBtnEnabled
            // rejectBtnEnabled
            addDocBtnEnabled
            actionColumnVisible = {userType === "Nbfc" ? true : false}
          />
        )
      }
      {
        selectedTab === 3 && (
          <ReleaseRequestTable 
            data={releaseRequestData?.pendingList} 
            title="Additional Info Requested List"
            acceptBtnEnabled
            rejectBtnEnabled
            addDocBtnEnabled
            actionColumnVisible = {userType === "Nbfc" ? true : false} // show action column only to nbfc for actions
          />
        )
      }
    </div>
  )
}

export default ReleaseRequestQueue
