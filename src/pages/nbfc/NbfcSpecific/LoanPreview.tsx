/* ----------------------------------------------------------------------------
Information Contained Herein is Proprietary and Confidential. copyright notice in all copies, 
acknowledging that the code is provided without warranties, and strictly prohibiting unauthorized 
sharing or distribution without prior written consent from the copyright holder<DKG Labs Pvt. Ltd>
------------------------------------------------------------------------------ */

/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-redeclare */
import React, { useEffect, useRef, useState } from "react";
import { useLocation } from "react-router-dom";
import { useReactToPrint } from "react-to-print";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import axios from "axios";
import {
  Typography,
  Box,
  Divider,
  Button,
  Grid,
  Card,
  CardContent,
} from "@mui/material";
import "./LoanPreview.scss";
import { BASE_URL, TOKEN } from "../../../utils/BaseUrl";
import { Link } from "react-router-dom";
import { apiCall, convertToDDMMYYYY } from "../../../utils/UtilFunctions";
import DocumentDrawer from "../../../components/DocumentDrawer";

type Field = {
  label: string;
  value: string;
  show?: boolean;
};

type SectionProps = {
  title: string;
  fields: Field[];
};

const Section: React.FC<SectionProps> = ({ title, fields }) => (
  <Box className="section">
    <Typography variant="h6" component="h3">
      {title}
    </Typography>
    <Divider />
    {fields?.map((field, index) => (
      <Box className="field" key={index}>
        <Typography variant="body1" component="span">
          {field.label}:
        </Typography>
        <Typography variant="body2" component="span">
          {field.value || "N/A"}
        </Typography>
      </Box>
    ))}
  </Box>
);

type FieldProps = {
  label: string;
  value: string;
};

const Field: React.FC<FieldProps> = ({ label, value }) => (
  <Box className="field">
    <Typography variant="body1" component="span">
      {label}:
    </Typography>
    <Typography variant="body2" component="span">
      {value || "N/A"}
    </Typography>
  </Box>
);

const LoanPreview: React.FC = () => {
  const componentRef = useRef(null);
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const loanId = searchParams.get("loanId");
  const userId = searchParams?.get("userId");
  const [loanDetails, setLoanDetails] = useState<any>(null);
  const [loanPayment, setLoanPayment] = useState<any>(null);
  const [drawerOpen, setDrawerOpen] = useState<any>(false);
  const [evScore, setEvScore] = useState<any>(null);
  const [downloadFormat, setDownloadFormat] = useState<string>("html");
  const [documentPreviews, setDocumentPreviews] = useState<{
    [key: string]: string | null;
  }>({});

  useEffect(() => {
    fetchLoanDetails();
    fetchEVScoreDetails();
  }, []);

  const fetchLoanDetails = async () => {
    try {
      const token = localStorage.getItem("token");
      const auth = {
        Authorization: token,
      };

      const queryparams = {
        userId: userId,
        loanId: loanId,
      };

      // const response = await axios.get(`/user-service/loanDetails`, {
      //   headers: auth,
      //   params: queryparams,
      // });

      const loanDetailsUrl = `/user-service/loanDetails?userId=${userId}&loanId=${loanId}`;
      const loanPaymentUrl = `/collection-service/getLoanPaymentDetails?userId=${userId}&loanId=${loanId}`;

      const [loanDetailsRes, loanPaymentDataRes] = await Promise.all([
        apiCall("GET", loanDetailsUrl),
        apiCall("GET", loanPaymentUrl),
      ]);

      // filter payment date  data
      const currentDate = new Date();
      const currentYear = currentDate.getUTCFullYear();
      const currentMonth = currentDate.getUTCMonth();
      // const loanPaymentData = {...loanPaymentDataRes?.responseData,
      //   loanEmiDetailsDtoList: loanPaymentDataRes?.responseData?.loanEmiDetailsDtoList?.filter((record:any) =>{
      //     const paymentDate = new Date(record.loanEmiPaymentDate);
      //     const paymentYear = paymentDate.getUTCFullYear();
      //     const paymentMonth = paymentDate.getUTCMonth();

      //     // Check if the payment year is less than or equal to the current year
      //     // and the payment month is less than or equal to the current month if the year is the same
      //     return (paymentYear < currentYear) ||
      //           (paymentYear === currentYear && paymentMonth <= currentMonth);

      //     })
      //   }

      const loanPaymentData = {
        ...loanPaymentDataRes?.responseData,
        loanEmiDetailsDtoList:
          loanPaymentDataRes?.responseData?.loanEmiDetailsDtoList
            ?.filter((record: any) => {
              const paymentDate = new Date(record.loanEmiPaymentDate);
              const paymentYear = paymentDate.getUTCFullYear();
              const paymentMonth = paymentDate.getUTCMonth();

              // Check if the payment year is less than or equal to the current year
              // and the payment month is less than or equal to the current month if the year is the same
              return (
                paymentYear < currentYear ||
                (paymentYear === currentYear && paymentMonth <= currentMonth)
              );
            })
            ?.map((record: any) => {
              // Add the new key-value pair
              return {
                ...record, // Spread existing properties
                id: record.loanEmiId, // Add the new key-value pair here
              };
            }),
      };

      console.log("dsnf: ", loanPaymentData);

      setLoanDetails(loanDetailsRes.responseData);
      console.log("setign loan payment");
      setLoanPayment({ ...loanPaymentData });
      // fetchDocumentPreviews(
      //   loanDetailsRes.responseData.documentDetails.uploadedDocDetailsDtoList
      // );
    } catch (error) {
      console.error(error);
    }
  };

  console.log(loanPayment);

  const fetchEVScoreDetails = async () => {
    try {
      const auth = {
        Authorization: TOKEN,
      };
      const response = await axios.get(
        `/user-service/getEVScore?userId=${userId}&loanId=${loanId}`,
        {
          headers: auth,
        }
      );
      setEvScore(response?.data?.responseData);
    } catch (error) {
      console.error(error);
    }
  };

  // const fetchDocumentPreviews = async (documents: any[]) => {
  //   if (!documents) {
  //     return;
  //   }
  //   try {
  //     for (const doc of documents) {
  //       const token = localStorage.getItem("token");
  //       const auth = {
  //         Authorization: token,
  //       };

  //       const response = await axios.get(`/user-service/downloadDocument`, {
  //         headers: auth,
  //         params: {
  //           userId: userId,
  //           vrfCode: doc.vrfCode,
  //           vrfsCode: doc.vrfsCode,
  //         },
  //         responseType: "blob",
  //       });

  //       if (response.status === 200) {
  //         const documentBlob = new Blob([response.data], {
  //           type: "application/pdf",
  //         });
  //         const documentUrl = URL.createObjectURL(documentBlob);
  //         setDocumentPreviews((prevPreviews) => ({
  //           ...prevPreviews,
  //           [doc.docName]: documentUrl,
  //         }));
  //       } else {
  //         console.error("Document download failed:", response.status);
  //       }
  //     }
  //   } catch (error) {
  //     console.error("Error fetching document previews:", error);
  //   }
  // };

  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });

  const handleDownload = () => {
    const element = document.getElementById("loan-details-container");
    if (element) {
      const htmlContent = element.innerHTML;
      let fileName = "loan-details";
      let mimeType = "";

      if (downloadFormat === "html") {
        mimeType = "text/html";
        fileName += ".html";
      } else if (downloadFormat === "pdf") {
        mimeType = "application/pdf";
        fileName += ".pdf";
      } else if (downloadFormat === "png") {
        mimeType = "image/png";
        fileName += ".png";
      } else if (downloadFormat === "jpeg") {
        mimeType = "image/jpeg";
        fileName += ".jpeg";
      }

      try {
        const blob = new Blob([htmlContent], { type: mimeType });
        const link = document.createElement("a");
        link.href = window.URL.createObjectURL(blob);
        link.setAttribute("download", fileName);
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      } catch (error) {
        console.error("Error downloading file:", error);
      }
    }
  };

  // const handleDownload = () => {
  //   const element = document.getElementById("loan-details-container");
  //   if (element) {
  //     const htmlContent = element.innerHTML;
  //     let fileName = "loan-details";
  //     let mimeType = "";

  //     if (downloadFormat === "html") {
  //       mimeType = "text/html";
  //       fileName += ".html";
  //     } else if (downloadFormat === "pdf") {
  //       mimeType = "application/pdf";
  //       fileName += ".pdf";
  //     } else if (downloadFormat === "png") {
  //       mimeType = "image/png";
  //       fileName += ".png";
  //     } else if (downloadFormat === "jpeg") {
  //       mimeType = "image/jpeg";
  //       fileName += ".jpeg";
  //     }

  //     const blob = new Blob([htmlContent], { type: mimeType });
  //     const url = URL.createObjectURL(blob);
  //     const link = document.createElement("a");
  //     link.href = url;
  //     link.download = fileName;
  //     link.click();
  //     URL.revokeObjectURL(url);
  //   }
  // };

  if (!loanDetails) {
    return <div>Loading...</div>;
  }

  if(drawerOpen){
    return (
      <Card> 
        <CardContent>
        <div className="hide-comp">
            <Button
              variant="outlined"
              color="warning"
              // component={Link}
              // to="/NbfcLoanDetails"
              onClick={()=>setDrawerOpen(false)}
            >
              Go back
            </Button>
          </div>

          <DocumentDrawer userId={userId} docData={loanDetails?.documentDetails?.uploadedDocDetailsDtoList} downloadOptionEnabled={true} />
        </CardContent>
      </Card>
    )
  }

  const personalDetailsFields: Field[] = [
    { label: "Name", value: loanDetails.personalDetails.name },
    { label: "Date of Birth", value: loanDetails.personalDetails.dateOfBirth },
    { label: "Gender", value: loanDetails.personalDetails.gender || "N/A" },
    {
      label: "Marital Status",
      value: loanDetails.personalDetails.maritalStatus || "N/A",
    },
    {
      label: "Mobile Number",
      value: loanDetails.personalDetails.mobileNumber || "N/A",
    },
  ];

  const incomeDetailsFields: Field[] = [
    { label: "Borrower Type", value: loanDetails.incomeDetails.borrowerType },
    { label: "Annual Income", value: loanDetails.incomeDetails.annualIncome },
    {
      label: "Organization Name",
      value: loanDetails.incomeDetails.orgName || "N/A",
    },
    {
      label: "Profession",
      value: loanDetails.incomeDetails.profession || "N/A",
    },
    { label: "Salary", value: loanDetails.incomeDetails.salary || "N/A" },
    { label: "Other Loan", value: loanDetails.incomeDetails.otherLoan },
    {
      label: "Other Loan Amount",
      value: loanDetails.incomeDetails.otherLoanAmount || "N/A",
      show: loanDetails.incomeDetails.otherLoan === "Y",
    },
    {
      label: "Dependent Member",
      value: loanDetails.incomeDetails.dependentMember || "N/A",
    },
  ];

  const contactDetailsFields: Field[] = [
    { label: "User Id", value: evScore?.userId || "N/A" },
    { label: "Loan Id", value: evScore?.loanId || "N/A" },
    {
      label: "Ev Score",
      value: evScore?.evScore || "N/A",
    },
    {
      label: "Ev Score Time ",
      value: evScore?.evScoreDateTime || "N/A",
    },
    {
      label: "Phone Number",
      value: loanDetails.personalDetails.phoneNumber || "N/A",
    },
  ];

  const bankDetailsFields: Field[] = [
    {
      label: "Account Holder Name",
      value: loanDetails.bankDetails.accHolderName || "N/A",
    },
    {
      label: "Account Number",
      value: loanDetails.bankDetails.accountNumber || "N/A",
    },
    { label: "Bank Name", value: loanDetails.bankDetails.bankName || "N/A" },
    {
      label: "Bank Address",
      value: loanDetails.bankDetails.bankAddress || "N/A",
    },
    { label: "IFSC Code", value: loanDetails.bankDetails.ifscCode || "N/A" },
    {
      label: "Earning Member First Name",
      value: loanDetails.incomeDetails.earningMemberFirstName || "N/A",
    },
    {
      label: "Earning Member Last Name",
      value: loanDetails.incomeDetails.earningMemberLastName || "N/A",
    },
  ];

  const getEvScoreColorClass = (score: number) => {
    if (score >= 0 && score < 100) {
      return "low-ev-score";
    } else if (score >= 100 && score < 150) {
      return "moderate-ev-score";
    } else {
      return "high-ev-score";
    }
  };

  const loanPaymentColums: GridColDef[] = [
    {
      field: "loanEmiNumber",
      headerName: "Loan EMI No.",
    },
    {
      field: "loanEmiPaymentDate",
      headerName: "Payment Date",
      renderCell: (params: any) =>
        convertToDDMMYYYY(params.row.loanEmiPaymentDate),
      width: 120,
    },
    {
      field: "loanCurrentBalance",
      headerName: "Current Loan Balance",
      width: 160,
    },
    {
      field: "loanEmiAmount",
      headerName: "Amount",
      width: 120,
    },
    {
      field: "loanEmiPrincipal",
      headerName: "Principal",
      width: 120,
    },
    {
      field: "loanEmiInterest",
      headerName: "Interest",
      width: 120,
    },
    {
      field: "loanEmiStatus",
      headerName: "Status",
      width: 120,
    },
  ];

  const loanPaymentDetailsField: Field[] = [
    {
      label: "Loan Type",
      value: loanPayment?.loanType,
    },
    {
      label: "Loan EMI Frequency",
      value: loanPayment?.loanEmiFrequency,
    },
    {
      label: "Loan Amount",
      value: loanPayment?.loanAmount,
    },
    {
      label: "Loan Interest Amount",
      value: loanPayment?.loanInterest,
    },
    {
      label: "Due Amount",
      value: loanPayment?.loanTotalDueAmount,
    },
    {
      label: "Rate of Interest",
      value: loanPayment?.rateOfInterest + "%",
    },
    {
      label: "Loan Status",
      value: loanPayment?.loanStatus,
    },
    {
      label: "EMI Payment Mode",
      value: loanPayment?.loanEmiPaymentMode,
    },
    {
      label: "Loan Tenure (in months)",
      value: loanPayment?.loanTenure,
    },
    {
      label: "E-Nach Status",
      value: loanPayment?.emandateStatus || 'N/A'
    },
  ];

  return (
    <div ref={componentRef}>
      <Card>
        <CardContent>
          <div className="hide-comp">
            <Button
              variant="outlined"
              color="warning"
              component={Link}
              to="/NbfcLoanDetails"
            >
              Go back
            </Button>
            <br />
            <br />
            <Button
              variant="contained"
              color="primary"
              onClick={() => setDrawerOpen(true)}
            >
              Document Drawer
            </Button>
          </div>
          <div className="buttons-container hide-comp">
            <Button onClick={handlePrint}>Print</Button>
            {/* <select
              value={downloadFormat}
              onChange={(e) => setDownloadFormat(e.target.value)}
            >
              <option value="html">HTML</option>
              <option value="pdf">PDF</option>
              <option value="png">PNG</option>
              <option value="jpeg">JPEG</option>
            </select>
            <Button onClick={handleDownload}>Download</Button> */}
          </div>
          <div className="nbfcEvscore">
            {" "}
            {loanDetails.personalDetails.name} EV Score : 
            <span className={getEvScoreColorClass(evScore?.evScore)}>
              {evScore?.evScore}
            </span>
          </div>

          {/* Inserting legend */}

          <div className="legend-container">
            <div>
              <span className="legend-color red"></span>
              <Typography
                variant="body1"
                component="span"
                className="legend-text"
              >
                High Risk
              </Typography>
            </div>
            <div>
              <span className="legend-color yellow"></span>
              <Typography
                variant="body1"
                component="span"
                className="legend-text"
              >
                Moderate
              </Typography>
            </div>
            <div>
              <span className="legend-color green"></span>
              <Typography
                variant="body1"
                component="span"
                className="legend-text"
              >
                Safe
              </Typography>
            </div>
          </div>

          <div id="loan-details-container" className="loan-details-container">
            <Grid container spacing={2}>
              <Grid item xs={6}>
                <Section
                  title="Personal Details"
                  fields={personalDetailsFields}
                />

                <Section title="Income Details" fields={incomeDetailsFields} />
              </Grid>

              <Grid item xs={6}>
                <Section title="Loan Details" fields={contactDetailsFields} />

                <Section title="Bank Details" fields={bankDetailsFields} />
              </Grid>
            </Grid>

            <Box className="section">
              <Section title="Loan Details" fields={loanPaymentDetailsField} />
              <DataGrid
                rows={loanPayment?.loanEmiDetailsDtoList || []}
                columns={loanPaymentColums}
                autoHeight
                // initialState={{
                //   pagination: {
                //     paginationModel: { page: 0, pageSize: 10 },
                //   },
                // }}
                // pageSizeOptions={[5, 10, 20, 30, 50, 100]}
              />
            </Box>

            <Box className="section">
              <Typography variant="h6" component="h3">
                Document Details
              </Typography>
              <Divider />
              <div>
                <Typography variant="body1" component="span">
                  <Box className="field">
                    Adhaar No.:{" "}
                    {loanDetails?.documentDetails?.aadhaarNo || "N/A"}
                  </Box>
                  <Box className="field">
                    Pan No.: {loanDetails?.documentDetails?.panNo || "N/A"}
                  </Box>
                  <Box className="field">
                    Electricity Bill:{" "}
                    {loanDetails?.documentDetails?.electricityBillDetailsDto ||
                      "N/A"}
                  </Box>
                </Typography>
              </div>
              <Divider />
              <Grid container spacing={2}>
                <Typography sx={{ marginTop: "2rem" }}>
                  Uploaded Documents:{" "}
                </Typography>
                {!loanDetails?.documentDetails?.uploadedDocDetailsDtoList && (
                  <h3 className="field"> No documents uploaded</h3>
                )}
                {/* {loanDetails?.documentDetails?.uploadedDocDetailsDtoList?.map(
                  (doc: any, index: number) => (
                    <Grid item xs={6} key={index}>
                      <Box>
                        <Typography variant="body1" component="span">
                          {doc.docName}:
                        </Typography>
                      </Box>

                      <Box className="field">
                        {documentPreviews[doc.docName] && (
                          <div className="document-preview">
                            <Typography variant="body2" component="span">
                              <img
                                src={documentPreviews[doc.docName] || ""}
                                alt="Document Preview"
                                width="300"
                                height="200"
                              />
                            </Typography>
                          </div>
                        )}
                      </Box>

                    </Grid>
                  )
                )} */}
              </Grid>
            </Box>
                <DocumentDrawer docData={loanDetails?.documentDetails?.uploadedDocDetailsDtoList} userId={userId} downloadOptionEnabled={false} />
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default LoanPreview;
