// import { Button, Card, CardMedia, Grid, Paper, Typography } from "@mui/material";
// import axios from "axios";
// import React, { useEffect, useState } from "react";
// import { Link, useParams } from "react-router-dom";
// import PdfImgViewer from "../../components/PdfImgViewer";
// import { TOKEN } from "../../utils/BaseUrl";

// const docDtl = [
//   { vrfCode: "A6", vrfsCode: "A606", vrfSName: "Additional Document_1" },
//   { vrfCode: "A6", vrfsCode: "A607", vrfSName: "Additional Document_2" },
//   { vrfCode: "A6", vrfsCode: "A608", vrfSName: "Additional Document_3" },
//   { vrfCode: "A6", vrfsCode: "A609", vrfSName: "Additional Document_4" },
//   { vrfCode: "A6", vrfsCode: "A610", vrfSName: "Additional Document_5" },
// ];

// interface UploadedFiles {
//   [key: string]: {
//     file: File | null;
//     vrfCode: string;
//     vrfsCode: string;
//   } | null;
// }
// interface DocumentInfo {
//   vrfsCode: string;
//   vrfCode: string;
//   vrfSName: string;
//   uploadStatus: boolean;
// }

// const AddDocUpload = () => {
//   const { userId } = useParams();
//   const [uploadedFiles, setUploadedFiles] = useState<UploadedFiles>({});
//   const [documentInfo, setDocumentInfo] = useState<DocumentInfo[]>([]);
//   const [submitBtnEnabled, setSubmitBtnEnabled] = useState<boolean>(false)

//   const populateUploadedAdditionalDoc = () => {
//     docDtl.forEach(async (doc: any) => {
//       const data = await axios.get(
//         `https://finle-user-service.azurewebsites.net/user-service/downloadDocument?userId=${userId}&vrfCode=${doc.vrfCode}&vrfsCode=${doc.vrfsCode}`
//       );
//       const responseData = data?.data?.responseData;

//       if (responseData) {
//         setDocumentInfo((prev) => {
//           return [...prev, { ...doc, uploadStatus: true }];
//         });
//       } else {
//         setDocumentInfo((prev) => {
//           return [...prev, { ...doc, uploadStatus: false }];
//         });
//       }
//       // else{
//       //   setUploadedFiles(prev=> {
//       //     return [...prev, {...doc, uploadStatus: true}]
//       //   })
//       // }
//     });
//   };

//   const handleFileUpload =
//     (documentType: string, vrfCodeParam: string, vrfsCodeParam: string) =>
//     (event: React.ChangeEvent<HTMLInputElement>) => {
//       const file = event.target.files?.[0];
//       setUploadedFiles((prevFiles) => {
//         const updatedFiles = { ...prevFiles };
//         updatedFiles[documentType] = file
//           ? { file, vrfCode: vrfCodeParam, vrfsCode: vrfsCodeParam }
//           : null;
//         return updatedFiles;
//       });
//     };

//   const handleSubmit = async (
//     documentType: string,
//     vrfCode: string,
//     vrfsCode: string,
//     index: number
//   ) => {
//     const {
//       file,
//       vrfCode: fileVrfCode,
//       vrfsCode: fileVrfsCode,
//     } = uploadedFiles[documentType] || {};

//     if (!file) {
//       console.error(`No file selected for ${documentType}`);
//       return;
//     }

//     const maxFileSize = 20 * 1024 * 1024;
//     if (file.size > maxFileSize) {
//       console.error(`File size exceeds the maximum limit of 20 MB.`);
//       alert("File size exceeds the maximum limit of 20 MB.");
//       return;
//     }

//     try {
//       const formData = new FormData();
//       formData.append("file", file as Blob);
//       formData.append("userId", userId || "");
//       formData.append("vrfCode", vrfCode);
//       formData.append("vrfsCode", vrfsCode);

//       const response = await fetch(
//         `https://finle-api-gateway.azurewebsites.net/user-service/uploadDocument`,
//         {
//           method: "POST",
//           headers: {
//             Authorization: ` ${TOKEN}`,
//           },
//           body: formData,
//         }
//       );

//       if (response.ok) {
//         console.log(`${documentType} file uploaded successfully`);
//         alert(`${documentType} file uploaded successfully`);
//       } else {
//         console.error(`Failed to upload ${documentType} file`);
//         alert(`Failed to upload ${documentType} file`);
//       }
//     } catch (error) {
//       console.error("Error handling file:", error);
//     }
//   };

//   const handleClick = () => {
//     document.getElementById(`upload-${docDtl[0].vrfSName}`)?.click()
//     setSubmitBtnEnabled(true)
//   }

//   // useEffect(() => {
//   //   populateUploadedAdditionalDoc();
//   // }, []);
//   return (
//     <>
//       <Typography variant="h4" gutterBottom>
//         Additional Doc Upload for Conumser : {userId}
//       </Typography>

//       <Button
//         variant="outlined"
//         color="warning"
//         component={Link}
//         to="/additionalDocReq"
//       >
//         Go back
//       </Button>

//       <Paper elevation={2} style={{ padding: 20, marginTop: 20 }}>
//         <Grid container spacing={3}>
//           {/* {
//             documentInfo?.map((doc, index) => (
//               <Grid item xs={6} key={doc.vrfSName}>
//                 <div>
//                   {
//                     !doc.uploadStatus && (
//                       <div
//                       style={{
//                         border: "1px dashed #ccc",
//                         padding: "20px",
//                         width: "100%",
//                         height: "300px",
//                         textAlign: "center",
//                       }}
//                     >
//                        <label htmlFor={`upload-${doc.vrfSName}`}>
//                         <Button variant="contained" component="span">
//                           Upload {doc.vrfSName}
//                         </Button>
//                       </label>
//                     </div>
//                     )
//                   }
//                 </div>
//                 <input
//                 // accept=" image/*"
//                 accept=".pdf, image/*"
//                 style={{ display: "none" }}
//                 id={`upload-${doc.vrfSName}`}
//                 type="file"
//                 // onChange={handleFileUpload(
//                 //   doc.vrfSName,
//                 //   doc.vrfCode,
//                 //   doc.vrfsCode
//                 // )}
//               />
//               {
//                 doc.uploadStatus && (
//                   <Card style={{ marginTop: 10 }}>
//                     <PdfImgViewer userId={userId} vrfCode={doc.vrfCode} vrfsCode={doc.vrfsCode} />
//                   </Card>
//                 )
//               }
//               </Grid>
//             ))
//           } */}
//           {/* {
//             documentInfo.map(doc => (
//               <PdfImgViewer userId={userId} vrfCode={doc.vrfCode} vrfsCode={doc.vrfsCode} />
//             ))
//           } */}

//           <div style={{width: '100%', margin: '2rem 0', display: 'flex', flexDirection: 'column', gap: '2rem', alignItems: 'center', justifyContent: 'center'}}>


//           <input
//             // accept=" image/*"
//             accept=".pdf, image/*"
//             style={{ display: "none" }}
//             id={`upload-${docDtl[0].vrfSName}`}
//             type="file"
//             onChange={handleFileUpload(
//               docDtl[0].vrfSName,
//               docDtl[0].vrfCode,
//               docDtl[0].vrfsCode
//             )}
//             />
//           <Button onClick={handleClick} style={{display: `${submitBtnEnabled ? 'none' : 'block'}`}}>Upload Additional Doc</Button>

//           <div>
//                       {uploadedFiles[docDtl[0].vrfSName]?.file?.type?.startsWith(
//                         "image/"
//                       ) ? (
//                         <CardMedia
//                         component="img"
//                         alt={`${docDtl[0].vrfSName} Preview`}
//                         style={{
//                           objectFit: "contain",
//                           width: "100%",
//                           height: "300px",
//                         }}
//                         image={URL.createObjectURL(
//                           uploadedFiles[docDtl[0].vrfSName]?.file as Blob
//                         )}
//                         />
//                       ) : (
//                         uploadedFiles[docDtl[0].vrfSName]?.file && (
//                           <iframe
//                           title={`${docDtl[0].vrfSName} Preview`}
//                           width="100%"
//                           height="300"
//                           src={URL.createObjectURL(
//                             uploadedFiles[docDtl[0].vrfSName]?.file as Blob
//                           )}
//                           />
//                         )
//                       )}
//                     </div>

//           <Button
//             size="medium"
//             variant="contained"
//             color="success"
//             onClick={() =>
//               handleSubmit(
//                 docDtl[0].vrfSName,
//                 docDtl[0].vrfCode,
//                 docDtl[0].vrfsCode,
//                 0
//               )
//             }
//             style={{display: `${submitBtnEnabled ? 'block' : 'none'}`}}
//             // disabled={disabledButtons[index]}
//             >
//             Submit {docDtl[0].vrfSName}
//           </Button>
//             </div>
//         </Grid>
//       </Paper>
//     </>
//   );
// };

// export default AddDocUpload;



import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { TOKEN } from '../../utils/BaseUrl';
import { Button, Card, CardActions, CardContent, CardMedia, Grid, Paper, Typography } from '@mui/material';
import PdfImgViewer from '../../components/PdfImgViewer';

interface DocumentInfo {
  vrfsCode: string;
  vrfCode: string;
  vrfSName: string;
  vrfName: string;
  mandatory: string;
  uploadStatus: boolean;
}

interface UploadedFiles {
  [key: string]: {
    file: File | null;
    vrfCode: string;
    vrfsCode: string;
  } | null;
}

const AddDocUpload = () => {
  const {userId} = useParams()
  const [documentInfo, setDocumentInfo] = useState<DocumentInfo[]>([]);
  const [uploadedFiles, setUploadedFiles] = useState<UploadedFiles>({});
  const [disabledButtons, setDisabledButtons] = useState<boolean[]>([]);

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

  const getLoanDocuments = async () => {
    try{
      const data = await axios.get(`/user-service/loanDocuments?loanId=L${userId}`, 
        {
          headers: {
            Authorization: TOKEN, // Replace with your token
        },
        }
      )
      const {responseData} = data.data

      setDocumentInfo([...responseData?.requiredNbfcDocDetailList, ...responseData?.optionalNbfcDocDetailList])

    }catch(error){
      console.log("Error: ", error)
      alert("Error fetching loan documents.")
    }
  }

  console.log(documentInfo)

  const handleSubmit = async (
    documentType: string,
    vrfCode: string,
    vrfsCode: string,
    index: number
  ) => {
    setDisabledButtons((prev) => {
      const updatedDisabled = [...prev];
      updatedDisabled[index] = true;
      return updatedDisabled;
    });
    const {
      file,
      vrfCode: fileVrfCode,
      vrfsCode: fileVrfsCode,
    } = uploadedFiles[documentType] || {};

    if (!file) {
      console.error(`No file selected for ${documentType}`);
      return;
    }

    const maxFileSize = 20 * 1024 * 1024;
    if (file.size > maxFileSize) {
      console.error(`File size exceeds the maximum limit of 20 MB.`);
      alert("File size exceeds the maximum limit of 20 MB.");
      return;
    }

    try {
      const formData = new FormData();
      formData.append("file", file as Blob);
      formData.append("userId", userId || "");
      formData.append("vrfCode", vrfCode);
      formData.append("vrfsCode", vrfsCode);

      const response = await fetch(
        `https://finle-api-gateway.azurewebsites.net/user-service/uploadDocument`,
        {
          method: "POST",
          headers: {
            Authorization: ` ${TOKEN}`,
          },
          body: formData,
        }
      );

      if (response.ok) {
        console.log(`${documentType} file uploaded successfully`);
        alert(`${documentType} file uploaded successfully`);
      } else {
        console.error(`Failed to upload ${documentType} file`);
        alert(`Failed to upload ${documentType} file`);
        setDisabledButtons((prev) => {
          const updatedDisabled = [...prev];
          updatedDisabled[index] = false;
          return updatedDisabled;
        });
      }
    } catch (error) {
      console.error("Error handling file:", error);
      setDisabledButtons((prev) => {
        const updatedDisabled = [...prev];
        updatedDisabled[index] = false;
        return updatedDisabled;
      });
    }
  };

  useEffect(() => {
    getLoanDocuments()
  }, [])
  return (
    <>
     <Typography variant='h4' gutterBottom>
      Consumer Document Upload For Consumer ID: {userId}
     </Typography>

     <Button variant="outlined" color="warning" component={Link} to="/additionalDocReq">
        Go back
      </Button>

      <Paper elevation={2} style={{ padding: 20, marginTop: 20 }}>
        <Grid container spacing={3}>
          {documentInfo?.map((document, index) => (
            <Grid item xs={6} key={document.vrfSName}>
              <div>
                {
                  !document.uploadStatus &&
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
                  )
                }
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

              {
                (document.uploadStatus || uploadedFiles[document.vrfSName]) && (
                  <Card style={{marginTop: 10}}>
                    {
                      document.uploadStatus ? (
                        <div>
                          <PdfImgViewer userId={userId} vrfCode={document.vrfCode} vrfsCode={document.vrfsCode} />
                        </div>
                      ) : (
                        <div>
                          {
                            uploadedFiles[document.vrfSName]?.file?.type?.startsWith('image') ? 
                            (
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
                            )
                            

                          }
                        </div>
                      )
                    }

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

                          setDisabledButtons((prev) => {
                            const updatedDisabled = [...prev];
                            updatedDisabled[index] = false;
                            return updatedDisabled;
                          });
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
                            document.vrfsCode,
                            index
                          )
                        }
                        disabled={disabledButtons[index]}
                      >
                        Submit {document.vrfSName}
                      </Button>
                    )}
                  </CardActions>
                  </Card>
                )
              }
            </Grid>
          ))}
        </Grid>
        </Paper>
    </>
  )
}

export default AddDocUpload
