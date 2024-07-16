import axios from "axios";
import React, { useState, useEffect, useCallback } from "react";
import { Link, useParams } from "react-router-dom";
import PdfImgViewer from "../../components/PdfImgViewer";
import { Button, Card, CardContent } from "@mui/material";

const BlankImage = () => {
    return (
        <div style={{border: "2px solid #a9a9a9de", display: "flex", height: "22rem", width: "22rem", alignItems:'center', justifyContent: 'center' }} >
            <h3 style={{color: "#a9a9a9de"}}>No image uploaded</h3>
        </div>
    )
}

const NbfcDetail = () => {
    const {nbfcId} = useParams()

    const [docData, setDocData] = useState(null)


    const fetchDocuments = useCallback(async () => {
        const url = `https://finle-user-service.azurewebsites.net/user-service/dealerDocuments?userId=${nbfcId}`
        try{
            const {data} = await axios.get(url)
            const {responseData: documentData} = data
            setDocData([...documentData])

        }catch(error){

        }
    }, [nbfcId])

    useEffect(()=>{
        fetchDocuments()
    }, [fetchDocuments])
    return (
                <Card>
                    <CardContent>

                    <div style={{display: 'flex', justifyContent: "space-between", alignItems: "center"}}>
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
                        
                        <div style={{display: "grid", gap: "1rem", gridTemplateColumns: "repeat(auto-fit, minmax(24rem, 1fr))"}}>
                            {
                                docData?.map(doc => {
                                    return (
                                        <div key={doc.vrfSName}>
                                        <h3>{doc.vrfSName}</h3>
                                        {
                                            doc.uploadStatus ? 
                                            <PdfImgViewer userId={nbfcId} vrfCode={doc.vrfCode} vrfsCode={doc.vrfsCode} />
                                            : 
                                            <BlankImage />
                                        }
                                    </div>
                                    )
                                })
                            }
                        </div>
                    </CardContent>
                </Card>
    )
}

export default NbfcDetail