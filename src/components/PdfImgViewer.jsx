import axios from 'axios';
import React, { useCallback, useEffect, useState } from 'react';
import { BASE_URL } from '../utils/BaseUrl';

function PdfImgViewer({ userId, vrfCode, vrfsCode }) {
    const [url, setUrl] = useState(null)

    const generateImg = useCallback( async (userId, vrfCode, vrfsCode) => {
            try {
            //   for (const doc of documents) {
                const token = localStorage.getItem("token");
                const auth = {
                  Authorization: token,
                };
        
                const response = await axios.get(
                  `/user-service/downloadDocument`,
                  {
                    headers: auth,
                    params: {
                      userId: userId,
                      vrfCode: vrfCode,
                      vrfsCode: vrfsCode,
                    },
                    responseType: "blob",
                  }
                );
        
                if (response.status === 200) {
                  const documentBlob = new Blob([response.data], {
                    type: "application/pdf",
                  });
                  const documentUrl = URL.createObjectURL(documentBlob);
                setUrl(documentUrl)
                } else {
                  console.error("Document download failed:", response.status);
                }
            //   }
            } catch (error) {
              console.error("Error fetching document previews:", error);
            }
        //   };
    }
    , [])

    useEffect(() => {
        if(userId && vrfCode && vrfsCode){
            generateImg(userId, vrfCode, vrfsCode)
        }
    }, [userId, vrfCode, vrfsCode, generateImg]);

    return (
        <div style={{border: "2px solid grey", display: "flex", height: "22rem", width: "22rem", alignItems:'center', justifyContent: 'center' }}>
            {
                url ? 
                <img src={url} alt="Uploaded document" style={{height: "inherit", width: "inherit"}} />
                : 
                <h2>Loading...</h2>
            }
        </div>
    )
}

export default PdfImgViewer;
