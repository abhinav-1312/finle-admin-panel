import React, { useState, useEffect } from "react";
import {
  Button,
  Typography,
  Paper,
  Grid,
  Card,
  CardContent,
  CardActions,
  CardMedia,
} from "@mui/material";
import { BASE_URL, TOKEN } from "../../../../utils/BaseUrl";

interface UploadedFiles {
  [key: string]: {
    file: File | null;
    vrfCode: string;
    vrfsCode: string;
  } | null;
}

interface DocumentInfo {
  vrfsCode: string;
  vrfCode: string;
  vrfSName: string;
  vrfName: string;
  mandatory: string;
  uploadStatus: boolean;
}

const DealerDocUpload: React.FC = () => {
  const [uploadedFiles, setUploadedFiles] = useState<UploadedFiles>({});
  const [documentInfo, setDocumentInfo] = useState<DocumentInfo[]>([]);
  const getUserId = localStorage.getItem("userId");
  const [imageError, setImageError] = useState(false);
  useEffect(() => {
    const fetchDocumentInfo = async () => {
      try {
        const response = await fetch(
          `${BASE_URL}/user-service/dealerDocuments?userId=${getUserId}`,
          {
            headers: {
              Authorization: ` ${TOKEN}`,
            },
          }
        );
        const data = await response.json();
        if (response.ok) {
          setDocumentInfo(data.responseData);
          // data.responseData.forEach((document: DocumentInfo) => {
          //   if (document.uploadStatus) {
          //     downloadDocumentAPI({
          //       vrfCode: document.vrfCode,
          //       vrfsCode: document.vrfsCode,
          //     });
          //   }
          // });
        } else {
          console.error("Failed to fetch document info:", data.responseStatus);
        }
      } catch (error) {
        console.error("Error fetching document info:", error);
      }
    };

    fetchDocumentInfo();
  }, []);

  const handleFileUpload =
    (documentType: string, vrfCodeParam: string, vrfsCodeParam: string) =>
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const file = event.target.files?.[0];
      setUploadedFiles((prevFiles) => {
        const updatedFiles = { ...prevFiles };
        updatedFiles[documentType] = file
          ? { file, vrfCode: vrfCodeParam, vrfsCode: vrfsCodeParam }
          : null;
        return updatedFiles;
      });
    };

  const handleSubmit = async (
    documentType: string,
    vrfCode: string,
    vrfsCode: string
  ) => {
    const {
      file,
      vrfCode: fileVrfCode,
      vrfsCode: fileVrfsCode,
    } = uploadedFiles[documentType] || {};

    if (!file) {
      console.error(`No file selected for ${documentType}`);
      return;
    }

    const maxFileSize = 1 * 1024 * 1024;
    if (file.size > maxFileSize) {
      console.error(`File size exceeds the maximum limit of 1 MB`);
      alert("File size exceeds the maximum limit of 1 MB");
      return;
    }

    try {
      const formData = new FormData();
      formData.append("file", file as Blob);
      formData.append("userId", localStorage.getItem("userId") || "");
      formData.append("vrfCode", vrfCode);
      formData.append("vrfsCode", vrfsCode);

      const response = await fetch(`${BASE_URL}/user-service/uploadDocument`, {
        method: "POST",
        headers: {
          Authorization: ` ${TOKEN}`,
        },
        body: formData,
      });

      if (response.ok) {
        console.log(`${documentType} file uploaded successfully`);
        alert(`${documentType} file uploaded successfully`);
      } else {
        console.error(`Failed to upload ${documentType} file`);
        alert(`Failed to upload ${documentType} file`);
      }
    } catch (error) {
      console.error("Error handling file:", error);
    }
  };

  // const downloadDocumentAPI = async ({
  //   vrfCode,
  //   vrfsCode,
  // }: {
  //   vrfCode: string;
  //   vrfsCode: string;
  // }) => {
  //   try {
  //     const response = await fetch(
  //       `${BASE_URL}/user-service/downloadDocument?userId=${getUserId}&vrfCode=${vrfCode}&vrfsCode=${vrfsCode}`,
  //       {
  //         headers: {
  //           Authorization: ` ${TOKEN}`,
  //         },
  //       }
  //     );

  //     if (response.ok) {
  //       console.log("Download successful");
  //     } else {
  //       console.error("Failed to download document");
  //     }
  //   } catch (error) {
  //     console.error("Error handling download:", error);
  //   }
  // };
  const handleImageError = () => {
    setImageError(true);
  };

  return (
    <>
      <Typography variant="h4" gutterBottom>
        Dealer Doc Upload
      </Typography>
      <Paper elevation={2} style={{ padding: 20, marginTop: 20 }}>
        <Grid container spacing={3}>
          {documentInfo.map((document) => (
            <Grid item xs={6} key={document.vrfSName}>
              <div>
                {!document.uploadStatus &&
                  !uploadedFiles[document.vrfSName] && (
                    <div
                      style={{
                        border: "1px dashed #ccc",
                        padding: "20px",
                        width: "100%",
                        height: "300px",
                        textAlign: "center",
                      }}
                    >
                      <label htmlFor={`upload-${document.vrfSName}`}>
                        <Button variant="contained" component="span">
                          Upload {document.vrfSName}
                        </Button>
                      </label>
                    </div>
                  )}
              </div>
              <input
                 // accept=" image/*"
                accept=".pdf, image/*"
                style={{ display: "none" }}
                id={`upload-${document.vrfSName}`}
                type="file"
                onChange={handleFileUpload(
                  document.vrfSName,
                  document.vrfCode,
                  document.vrfsCode
                )}
              />

              {(document.uploadStatus || uploadedFiles[document.vrfSName]) && (
                <Card style={{ marginTop: 10 }}>
                  {document.uploadStatus ? (
                    <div>
                 
                        {/* <CardMedia
                          component="img"
                          alt={`${document.vrfSName} Preview`}
                          style={{
                            objectFit: "contain",
                            width: "100%",
                            height: "300px",
                          }}
                          image={`https://fintech-users-service.azurewebsites.net/user-service/downloadDocument?userId=${getUserId}&vrfCode=${document.vrfCode}&vrfsCode=${document.vrfsCode} `}
                          // onError={handleImageError}
                        /> */}
                  

                    
                        <Button
                          variant="contained"
                          color="primary"
                          style={{
                            objectFit: "contain",
                            width: "100%",
                            height: "300px",
                          }}
                          href={`https://fintech-users-service.azurewebsites.net/user-service/downloadDocument?userId=${getUserId}&vrfCode=${document.vrfCode}&vrfsCode=${document.vrfsCode} `}
                          download
                        >
                          Download Document
                        </Button>
                   
                    </div>
                  ) : (
                    <div>
                      {uploadedFiles[document.vrfSName]?.file?.type?.startsWith(
                        "image/"
                      ) ? (
                        <CardMedia
                          component="img"
                          alt={`${document.vrfSName} Preview`}
                          style={{
                            objectFit: "contain",
                            width: "100%",
                            height: "300px",
                          }}
                          image={URL.createObjectURL(
                            uploadedFiles[document.vrfSName]?.file as Blob
                          )}
                        />
                      ) : (
                        uploadedFiles[document.vrfSName]?.file && (
                          <iframe
                            title={`${document.vrfSName} Preview`}
                            width="100%"
                            height="300"
                            src={URL.createObjectURL(
                              uploadedFiles[document.vrfSName]?.file as Blob
                            )}
                          />
                        )
                      )}
                    </div>
                  )}
                  <CardContent>
                    <Typography variant="body2" color="text.secondary">
                      {document.vrfSName} - Preview
                    </Typography>
                  </CardContent>

                  <CardActions>
                    <Button
                      size="medium"
                      color="error"
                      variant="outlined"
                      onClick={() => {
                        setUploadedFiles((prevFiles) => {
                          const updatedFiles = { ...prevFiles };
                          updatedFiles[document.vrfSName] = null;
                          return updatedFiles;
                        });
                        // Optionally, you can update the documentInfo state to set uploadStatus to false
                        setDocumentInfo((prevDocs) =>
                          prevDocs.map((doc) =>
                            doc.vrfSName === document.vrfSName
                              ? { ...doc, uploadStatus: false }
                              : doc
                          )
                        );
                      }}
                    >
                      Remove
                    </Button>
                    {document.uploadStatus ? null : (
                      <Button
                        size="medium"
                        variant="contained"
                        color="success"
                        onClick={() =>
                          handleSubmit(
                            document.vrfSName,
                            document.vrfCode,
                            document.vrfsCode
                          )
                        }
                      >
                        Submit {document.vrfSName}
                      </Button>
                    )}
                  </CardActions>
                </Card>
              )}
            </Grid>
          ))}
        </Grid>
      </Paper>
    </>
  );
};

export default DealerDocUpload;
