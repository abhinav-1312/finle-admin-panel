import React from 'react'
import PdfImgViewer from './PdfImgViewer';
import { Button } from '@mui/material';

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

const DocumentDrawer = ({docData,  userId, downloadOptionEnabled}) => {
  return (
    <div
          style={{
            display: "grid",
            gap: "1rem",
            gridTemplateColumns: "repeat(auto-fit, minmax(24rem, 1fr))",
          }}
        >
          {docData?.map((doc) => {
            return (
              <div key={doc.vrfSName} style={{border:  '1px solid #1876d2', width: 'fit-content', padding: '0.5rem', borderRadius: '5px'}}>
                <h3 style={{margin: '0.2rem 0'}}>{doc.vrfSName || doc.docName}</h3>
                {( !('uploadStatus' in doc) || doc.uploadStatus) ? (
                  <>
                  <PdfImgViewer
                    userId={userId}
                    vrfCode={doc.vrfCode}
                    vrfsCode={doc.vrfsCode}
                    />

                    {
                        downloadOptionEnabled && (
                            <>
                                <Button
                                variant="outlined"
                                color="primary"
                                sx={{marginTop: "0.5rem"}}
                                href={`https://finle-user-service.azurewebsites.net/user-service/downloadDocument?userId=${userId}&vrfCode=${doc.vrfCode}&vrfsCode=${doc.vrfsCode} `}
                                download
                                >
                                Download 
                                </Button>
                            </>
                        )
                    }
                  </>
                ) : (
                  <BlankImage />
                )}

              </div>
            );
          })}
        </div>
  )
}

export default DocumentDrawer
