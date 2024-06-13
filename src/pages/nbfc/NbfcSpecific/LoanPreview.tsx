/* ----------------------------------------------------------------------------
Information Contained Herein is Proprietary and Confidential. copyright notice in all copies, 
acknowledging that the code is provided without warranties, and strictly prohibiting unauthorized 
sharing or distribution without prior written consent from the copyright holder<DKG Labs Pvt. Ltd>
------------------------------------------------------------------------------ */

/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-redeclare */
import React, { useEffect, useRef, useState } from "react";
import { useLocation } from "react-router-dom";
import { useReactToPrint } from 'react-to-print';
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
  const componentRef = useRef(null)
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const loanId = searchParams.get("loanId");
  const userId = searchParams?.get("userId");
  const [loanDetails, setLoanDetails] = useState<any>(null);
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

      const response = await axios.get(`${BASE_URL}/user-service/loanDetails`, {
        headers: auth,
        params: queryparams,
      });

      setLoanDetails(response.data.responseData);
      fetchDocumentPreviews(
        response.data.responseData.documentDetails.uploadedDocDetailsDtoList
      );
    } catch (error) {
      console.error(error);
    }
  };

  const fetchEVScoreDetails = async () => {
    try {
      const auth = {
        Authorization: TOKEN,
      };
      const response = await axios.get(
        `${BASE_URL}/user-service/getEVScore?userId=${userId}&loanId=${loanId}`,
        {
          headers: auth,
        }
      );
      setEvScore(response?.data?.responseData);
    } catch (error) {
      console.error(error);
    }
  };

  const fetchDocumentPreviews = async (documents: any[]) => {
    try {
      for (const doc of documents) {
        const token = localStorage.getItem("token");
        const auth = {
          Authorization: token,
        };

        const response = await axios.get(
          `${BASE_URL}/user-service/downloadDocument`,
          {
            headers: auth,
            params: {
              userId: userId,
              vrfCode: doc.vrfCode,
              vrfsCode: doc.vrfsCode,
            },
            responseType: "blob",
          }
        );

        if (response.status === 200) {
          const documentBlob = new Blob([response.data], {
            type: "application/pdf",
          });
          const documentUrl = URL.createObjectURL(documentBlob);
          setDocumentPreviews((prevPreviews) => ({
            ...prevPreviews,
            [doc.docName]: documentUrl,
          }));
        } else {
          console.error("Document download failed:", response.status);
        }
      }
    } catch (error) {
      console.error("Error fetching document previews:", error);
    }
  };

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
            {loanDetails.personalDetails.name} EV Score :-{" "}
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
              <Typography variant="h6" component="h3">
                Document Details
              </Typography>
              <Divider />
              <Grid container spacing={2}>
                {loanDetails?.documentDetails?.uploadedDocDetailsDtoList?.map(
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
                )}
              </Grid>
            </Box>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default LoanPreview;
