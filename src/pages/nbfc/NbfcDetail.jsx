import axios from "axios";
import React, { useState, useEffect, useCallback } from "react";
import { Link, useParams } from "react-router-dom";
import PdfImgViewer from "../../components/PdfImgViewer";
import { Button, Card, CardContent } from "@mui/material";
import DownloadIcon from '@mui/icons-material/Download';
import DocumentDrawer from "../../components/DocumentDrawer";

const BlankImage = () => {
  return (
    <div
      style={{
        border: "2px solid #a9a9a9de",
        display: "flex",
        height: "22rem",
        width: "22rem",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <h3 style={{ color: "#a9a9a9de" }}>No image uploaded</h3>
    </div>
  );
};

const NbfcDetail = () => {
  const { nbfcId } = useParams();

  const [docData, setDocData] = useState(null);

  const fetchDocuments = useCallback(async () => {
    const url = `https://finle-user-service.azurewebsites.net/user-service/dealerDocuments?userId=${nbfcId}`;
    try {
      const { data } = await axios.get(url);
      const { responseData: documentData } = data;
      setDocData([...documentData]);
    } catch (error) {}
  }, [nbfcId]);

  useEffect(() => {
    fetchDocuments();
  }, [fetchDocuments]);
  return (
    <Card>
      <CardContent>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <h1>Details for NBFC ID: {nbfcId} </h1>
          <div>
            <Button
              variant="outlined"
              color="warning"
              component={Link}
              to="/nbfc"
            >
              Go back
            </Button>
          </div>
        </div>
        
        <DocumentDrawer docData={docData} userId={nbfcId} downloadOptionEnabled={true} />

      </CardContent>
    </Card>
  );
};

export default NbfcDetail;
