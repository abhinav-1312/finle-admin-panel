import { Card, CardContent } from '@mui/material'
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

const ConsumerDetail = () => {
    const {userId} = useParams()

    const [data, setData] = useState(null)

    const fetchDetails = async () => {
        const url = `https://finle-user-service.azurewebsites.net/user-service/loanDetails?userId=${userId}&loanId=${userId}`
        try{
            const {data} = await axios.get(url)
            const {responseData} = data
            setData({...responseData})
        }catch(error){
            console.log("Error: ", error)
        }
    }


    useEffect(() => {
        fetchDetails()

        
    }, [])

    if(!data){
        return (
            <h3> Loading please wait...</h3>
        )
    }
  return (
    <Card>
        <CardContent>
            <div style={{display: "flex", flexDirection: "column", gap: "1rem"}}>
                <h1>Consumer Details </h1>
                <div style={{display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: "0.5rem"}}>
                    <div>
                        <strong>User ID: </strong> {data?.userId}
                    </div>
                    <div>
                        <strong>Loan ID: </strong> {data?.loanId}
                    </div>
                    <div>
                        <strong>Loan Stage Flag: </strong> {data?.loanStageFlag}
                    </div>
                    <div>
                        <strong>Application Completion Status: </strong> {data?.loanStageFlag}
                    </div>
                    <div>
                        <strong>Psy Test Status: </strong> {data?.psyTestSatuas}
                    </div>
                    <div>
                        <strong>Psy Test Result Status: </strong> {data?.psyTestResultSatuas}
                    </div>
                </div>
                
                <hr style={{height: "1px", width: "100%", backgroundColor: "#7b7b7b"}} />
                <div>
                    <h3>Personal Details</h3>
                    <div style={{display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: "0.5rem"}}>
                        <div>
                            <div>
                                <strong>Full Name: </strong> {data?.personalDetails?.name || "Data Not Available"}
                            </div>
                            <div>
                                <strong>First Name: </strong> {data?.personalDetails?.firstName || "Data Not Available"}
                            </div>
                            <div>
                                <strong>Last Name: </strong> {data?.personalDetails?.lastName || "Data Not Available"}
                            </div>
                            <div>
                                <strong>Gender: </strong> {data?.personalDetails?.gender || "Data Not Available"}
                            </div>
                            <div>
                                <strong>Date Of Birth: </strong> {data?.personalDetails?.dateOfBirth || "Data Not Available"}
                            </div>
                            <div>
                                <strong>Guardian First Name: </strong> {data?.personalDetails?.guardianFirstName || "Data Not Available"}
                            </div>
                            <div>
                                <strong>Guardian Last Name: </strong> {data?.personalDetails?.guardianLastName || "Data Not Available"}
                            </div>
                        </div>

                        <div>
                        <div>
                                <strong>Mobile Number: </strong> {data?.personalDetails?.mobileNumber || "Data Not Available"}
                            </div>
                            <div>
                                <strong>Phone Number: </strong> {data?.personalDetails?.phoneNumber || "Data Not Available"}
                            </div>
                            <div>
                                <strong>Qualification: </strong> {data?.personalDetails?.qualification || "Data Not Available"}
                            </div>
                            <div>
                                <strong>Martial Status: </strong> {data?.personalDetails?.maritalStatus || "Data Not Available"}
                            </div>
                            <div>
                                <strong>Residence Ownership: </strong> {data?.personalDetails?.residenceOwnership || "Data Not Available"}
                            </div>
                            <div>
                                <strong>Year Of Residence: </strong> {data?.personalDetails?.yearOfResidence || "Data Not Available"}
                            </div>
                        </div>
                    </div>
                </div>
                <hr style={{height: "1px", width: "100%", backgroundColor: "#7b7b7b"}} />
                <div>
                    <h3>Contact Details</h3>
                    <div style={{display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: "1rem"}}>
                        <div>
                            <div>
                                <strong>Email: </strong> {data?.contactDetails?.email || "Data Not Available"}
                            </div>
                            <div>
                                <strong>Residence Telephone: </strong> {data?.contactDetails?.residenceTelephone || "Data Not Available"}
                            </div>
                            <div>
                                <strong>Office Telephone: </strong> {data?.personalDetails?.officeTelephone || "Data Not Available"}
                            </div>
                            <div>
                                <strong>Office STD Code: </strong> {data?.personalDetails?.officeStdCode || "Data Not Available"}
                            </div>
                        </div>
                        <div>
                            <div>
                                <strong>Other Mobile Number: </strong> {data?.contactDetails?.otherMobileNumber || "Data Not Available"}
                            </div>
                            <div>
                                <strong>Residence STD Code: </strong> {data?.contactDetails?.residenceStdCode || "Data Not Available"}
                            </div>
                            <div>
                                <strong>Whatsapp Number: </strong> {data?.contactDetails?.whatsappNo || "Data Not Available"}
                            </div>
                        </div>
                    </div>
                </div>
                <hr style={{height: "1px", width: "100%", backgroundColor: "#7b7b7b"}} />
                <div>
                    <h3>Income Details</h3>
                    <div style={{display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: "1rem"}}>
                        <div>
                            <div>
                                <strong>Borrower Type: </strong> {data?.incomeDetails?.borrowerType || "Data Not Available"}
                            </div>
                            <div>
                                <strong>Annual Income: </strong> {data?.incomeDetails?.annualIncome || "Data Not Available"}
                            </div>
                            <div>
                                <strong>Organization Name: </strong> {data?.incomeDetails?.orgName || "Data Not Available"}
                            </div>
                            <div>
                                <strong>Profession: </strong> {data?.incomeDetails?.profession || "Data Not Available"}
                            </div>
                            <div>
                                <strong>Salary: </strong> {data?.incomeDetails?.salary || "Data Not Available"}
                            </div>
                        </div>
                        <div>
                            <div>
                                <strong>Other Loan: </strong> {data?.incomeDetails?.otherLoan || "Data Not Available"}
                            </div>
                            <div>
                                <strong>Other Loan Amount: </strong> {data?.incomeDetails?.otherLoanAmount || "Data Not Available"}
                            </div>
                            <div>
                                <strong>Dependent Member: </strong> {data?.incomeDetails?.dependentMember || "Data Not Available"}
                            </div>
                            <div>
                                <strong>Earning Member First Name: </strong> {data?.incomeDetails?.earningMemberFirstName || "Data Not Available"}
                            </div>
                            <div>
                                <strong>Earning Member Last Name: </strong> {data?.incomeDetails?.earningMemberLastName || "Data Not Available"}
                            </div>
                        </div>
                    </div>
                </div>
                <hr style={{height: "1px", width: "100%", backgroundColor: "#7b7b7b"}} />
                <div>
                    <h3>Bank Details</h3>
                    <div style={{display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: "1rem"}}>
                        <div>
                            <div>
                                <strong>Account Holder Name: </strong> {data?.bankDetails?.accHolderName || "Data Not Available"}
                            </div>
                            <div>
                                <strong>Account Number: </strong> {data?.bankDetails?.accountNumber || "Data Not Available"}
                            </div>
                            <div>
                                <strong>Bank Name: </strong> {data?.bankDetails?.bankName || "Data Not Available"}
                            </div>
                        </div>
                        <div>
                            <div>
                                <strong>Bank Address: </strong> {data?.bankDetails?.bankAddress || "Data Not Available"}
                            </div>
                            <div>
                                <strong>IFSC Code: </strong> {data?.bankDetails?.ifscCode || "Data Not Available"}
                            </div>
                            <div>
                                <strong>Account Verification Flag: </strong> {data?.bankDetails?.accountVerificationFlag || "Data Not Available"}
                            </div>
                        </div>
                    </div>
                </div>

                <hr style={{height: "1px", width: "100%", backgroundColor: "#7b7b7b"}} />

                <div>
                    <h3>Loan Detail</h3>
                    <div style={{display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: "1rem"}}>
                        <div>
                            <div>
                                <strong>Loan Request Amount: </strong> Rs. {data?.loanDetail?.loanRequestAmt || "Data Not Available"}
                            </div>
                            <div>
                                <strong>Loan Estimated Amount: </strong> Rs. {data?.loanDetail?.loanEstimatedAmt || "Data Not Available"}
                            </div>
                            <div>
                                <strong>Loan Approved Amount: </strong> Rs. {data?.loanDetail?.loanApprovedAmt || "Data Not Available"}
                            </div>
                            <div>
                                <strong>LDG: </strong> {data?.loanDetail?.ldg || "Data Not Available"}
                            </div>
                            <div>
                                <strong>LDG Code: </strong>{data?.loanDetail?.ldgCode || "Data Not Available"}
                            </div>
                            <div>
                                <strong>LDG Name: </strong>{data?.loanDetail?.ldgName || "Data Not Available"}
                            </div>
                        </div>
                        <div>
                            <div>
                                <strong>Start Date: </strong> {data?.loanDetail?.startDate || "Data Not Available"}
                            </div>
                            <div>
                                <strong>End Date: </strong> {data?.loanDetail?.endDate || "Data Not Available"}
                            </div>
                            <div>
                                <strong>Status: </strong> {data?.loanDetail?.status || "Data Not Available"}
                            </div>
                            <div>
                                <strong>Loan Approved Flag: </strong> {data?.loanDetail?.loanApprovedFlag || "Data Not Available"}
                            </div>
                            <div>
                                <strong>Loan Deny Flag: </strong> {data?.loanDetail?.loanDenyFlag || "Data Not Available"}
                            </div>
                        </div>
                    </div>
                </div>

                <hr style={{height: "1px", width: "100%", backgroundColor: "#7b7b7b"}} />

                <div>
                    <h3>Collateral Details</h3>
                    <div style={{display: "flex", justifyContent: "space-between", alignItems: "center", gap: "1rem"}}>
                        <div>
                            <strong>Collateral Security: </strong> {data?.collateralDetails?.collateralSecurity || "Data Not Available"}
                        </div>
                        <div>
                            <strong>Collateral Type: </strong> {data?.collateralDetails?.collateralType || "Data Not Available"}
                        </div>
                        <div>
                            <strong>Collateral Value: </strong> {data?.collateralDetails?.collateralValue || "Data Not Available"}
                        </div>
                    </div>
                </div>
                <hr style={{height: "1px", width: "100%", backgroundColor: "#7b7b7b"}} />

                <div>
                    <h3>Approval Details</h3>
                    <div style={{display: "flex", alignItems: "center", gap: "4rem"}}>
                        <div>
                            <strong>Soft Approval: </strong> {data?.approvalDetails?.softApproval || "Data Not Available"}
                        </div>
                        <div>
                            <strong>NBFC Approval: </strong> {data?.approvalDetails?.nbfcApproval || "Data Not Available"}
                        </div>
                    </div>
                </div>
                <hr style={{height: "1px", width: "100%", backgroundColor: "#7b7b7b"}} />
                <div>
                    <h3>KYC Details</h3>
                    <div style={{display: "flex", alignItems: "center", gap: "4rem"}}>
                        <div>
                            <strong>KYC Flag: </strong> {data?.kycDetails?.kycFlag || "Data Not Available"}
                        </div>
                        <div>
                            <strong>VKYC Flag: </strong> {data?.kycDetails?.vkycFlag || "Data Not Available"}
                        </div>
                    </div>
                </div>

                <hr style={{height: "1px", width: "100%", backgroundColor: "#7b7b7b"}} />

                <div>
                    <h3>Address Details</h3>
                    {data?.addressDetails || "Data Not Available"}
                </div>

                <hr style={{height: "1px", width: "100%", backgroundColor: "#7b7b7b"}} />

                <div>
                    <h3>Document Details</h3>
                    <div style={{display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: "1rem"}}>
                        <div>
                            <div>
                                <strong>Adhaar Number: </strong> {data?.documentDetails?.aadhaarNo || "Data Not Available"}
                            </div>
                            <div>
                                <strong>PAN Number: </strong> {data?.documentDetails?.panNo || "Data Not Available"}
                            </div>
                            <div>
                                <strong>Adhaar Flag: </strong> {data?.documentDetails?.adhaarFlag || "Data Not Available"}
                            </div>
                        </div>
                        <div>
                            <div>
                                <strong>Electricity Bill Details: </strong> {data?.documentDetails?.electricityBillDetailsDto || "Data Not Available"}
                            </div>
                            <div>
                                <strong>Electricity Bill Flag: </strong> {data?.documentDetails?.electricityBillFlag || "Data Not Available"}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </CardContent>
    </Card>
  )
}

export default ConsumerDetail
