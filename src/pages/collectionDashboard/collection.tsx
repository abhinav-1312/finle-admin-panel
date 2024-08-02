// CollectionDashboard.tsx

import React, { useEffect, useState } from "react";
import { RootState } from "../../store/store";
import {
  Typography,
  Grid,
  Card,
  CardContent,
  TableCell,
  TableContainer,
  Table,
  TableHead,
  TableBody,
  TableRow,
  Button,
  ButtonBase,
} from "@mui/material";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { BarChart, Bar, Legend, PieChart, Pie, Cell } from "recharts";
import { useDispatch, useSelector } from "react-redux";
import { fetchLoanDetail } from "../../store/actions/allLoanDetailActions";
import { ThunkDispatch } from "@reduxjs/toolkit";
import { apiCall } from "../../utils/UtilFunctions";
import LoanCases from "./LoanCases";

const monthlyChartData = [
  { month: "Jan", collections: 800 },
  { month: "Feb", collections: 1200 },
  { month: "Mar", collections: 1000 },
  { month: "Apr", collections: 1500 },
  { month: "May", collections: 1300 },
  { month: "Jun", collections: 1800 },
];
const topTenChartData = [
  { name: "Collection 1", amount: 1000 },
  { name: "Collection 2", amount: 1500 },
  { name: "Collection 3", amount: 1200 },
  { name: "Collection 4", amount: 1000 },
  { name: "Collection 5", amount: 1500 },
  { name: "Collection 6", amount: 1200 },
  // Add more top ten collections data as needed
];

const detailedCollectionData = [
  {
    id: 1,
    name: "Collection 1",
    amount: 1000,
    totalLoanAmount: 50000,
    totalLoanDue: 5,
    totalLateFeeAmount: 200,
  },
  {
    id: 2,
    name: "Collection 2",
    amount: 1500,
    totalLoanAmount: 75000,
    totalLoanDue: 8,
    totalLateFeeAmount: 300,
  },
  // Add more detailed collection data as needed
];

const entityComparisonData = [
  { entity: "Dealer", collections: 5000 },
  { entity: "Consumer", collections: 3000 },
  { entity: "NBFC", collections: 4000 },
  { entity: "DSA", collections: 2000 },
  // Add more entity comparison data as needed
];

const tileColor = [
  "#1ABC9C",  // Turquoise
  "#2ECC71",  // Emerald
  "#3498DB",  // Peter River
  "#9B59B6",  // Amethyst
  "#F1C40F",  // Sunflower
  "#E67E22",  // Carrot
  "#E74C3C",  // Alizarin
  "#ECF0F1",  // Clouds
  "#95A5A6",  // Concrete
  "#8E44AD",  // Wisteria
  "#00B894",  // Mint
  "#6C5B7B",  // Lavender
  "#008080",  // Teal
  "#FF7F50",  // Coral
  "#FFDB58",  // Mustard
  "#808000",  // Olive
  "#4682B4",  // Steel Blue
  "#FA8072",  // Salmon
  "#87CEEB",  // Sky Blue
  "#D2691E"   // Chocolate
]

const COLORS = ["#8884d8", "#82ca9d", "#ffc658"];

const CollectionDashboard: React.FC = () => {

  const [activeTab, setActiveTab] = useState("tab1")
  const [totalAmountCollected, setTotalAmountCollected] = useState(0)

  const loanDetailList = useSelector((state: RootState) => state.allLoanDetail.allLoanDetailList)

  const activeLoanCases: any = []
  const rejectedLoanCases: any = []
  const pendingLoanCases: any = []
  const awaitingApprovalFiles: any = []
  const incompleteLoanFiles: any = []
  const totalLoanCasesFiles: any = []
  const closedLoanFiles: any = []

  loanDetailList?.forEach(record => {
    const {loanStatus} = record
    
    if(loanStatus === 'Active Loan')
      activeLoanCases.push(record)
    else if(loanStatus === "Rejected")
      rejectedLoanCases.push(record)
    else if(loanStatus === "Pending")
      pendingLoanCases.push(record)
    else if(loanStatus === "Awaiting Approval")
      awaitingApprovalFiles.push(record)
    else if(loanStatus === "Incomplete")
      incompleteLoanFiles.push(record)
    else if(loanStatus === "Closed Loan")
      closedLoanFiles.push(record)

    if(loanStatus === "Active Loan" || loanStatus === "Closed Loan")
      totalLoanCasesFiles.push(record)
  })

  // loanDetailList?.forEach(async record =>{
  //   const {loanId} = record
  //   let unpaidCount = 0;
  //   const {responseData} = await apiCall("GET", `collection-service/getLoanEmiDetails?loanId=${loanId}`)

  //   if(responseData){
  //     let isUnpaid = false
  //     responseData.forEach((subRecord : any) => {
  //       const {loanEmiStatus} = subRecord
  //       if(loanEmiStatus === 'unpaid'){
  //         isUnpaid = true;
  //         break
  //       }
  //     })
  //   }

  //   if(isUnpaid){
  //     unpaidCount = unpaidCount + 1;
  //   }
    
  // })

  const [delinquentLoanCount, setDelinquentLoanCount] = useState(0)
  let unpaidCount: number = 0.0
  let totAmtCollected: number = 0.0
  let totalAmountOutstanding: number = 0.0
  let overdueAmount: number = 0.0
  let amountCollectedFromActiveLoan: number = 0.0
  let amountToBeCollectedFromActiveLoan: number = 0.0
  let avgCollectionRate: number = 0.0

  const processDelinquentLoan = async () => {
  
    for (const record of loanDetailList) {
      const { loanId, loanStatus } = record;
      const { responseData } = await apiCall("GET", `/collection-service/getLoanEmiDetails?loanId=${loanId}`);
  
      if (responseData) {
        let isUnpaid = false;
  
        for (const subRecord of responseData) {
          const { loanEmiStatus, loanEmiAmount } = subRecord;
          if (loanEmiStatus === 'Unpaid') {
            isUnpaid = true;
            overdueAmount += parseFloat(loanEmiAmount)
          }

          if((loanStatus === "Active Loan" || loanStatus === "Closed Loan") && loanEmiStatus === "Paid"){
            totAmtCollected += parseFloat(loanEmiAmount)
          }

          if(loanEmiStatus === "Unpaid" || loanEmiStatus === "Pending"){
            totalAmountOutstanding += parseFloat(loanEmiAmount)
          }

          if(loanStatus === "Active Loan"){
            if(loanEmiStatus === "Paid"){
              amountCollectedFromActiveLoan += parseFloat(loanEmiAmount)
            }
            else{
              amountToBeCollectedFromActiveLoan += parseFloat(loanEmiAmount)
            }
          }
        }
  
        if (isUnpaid) {
          unpaidCount += 1; // Increment the unpaid count
        }
      }
    }

    avgCollectionRate = amountToBeCollectedFromActiveLoan > 0 ?  (amountCollectedFromActiveLoan/amountToBeCollectedFromActiveLoan) * 100 : 0

  }

  if(loanDetailList){
    processDelinquentLoan()
  }

  const dispatch = useDispatch<ThunkDispatch<RootState, null, any>>();

  useEffect(() => {
    dispatch(fetchLoanDetail())
  }, [])



  return (
    <div>
      <Typography variant="h4" gutterBottom>
        Collection Dashboard
      </Typography>

      <div className="dashboard-grid">
        <Card className={`summary-card grid-cell ${activeTab === "tab1" ? 'clicked' : ''}`} onClick={()=>setActiveTab('tab1')} sx={{backgroundColor: tileColor[0]}}>
          <Typography variant="h6" gutterBottom>
            Total Loan Files
          </Typography>
          <Typography variant="h4">
            {totalLoanCasesFiles.length}
          </Typography>
        </Card>
        <Card className={`summary-card grid-cell ${activeTab === "tab2" ? 'clicked' : ''}`} onClick={()=>setActiveTab('tab2')} sx={{backgroundColor: tileColor[1]}}>
          <Typography variant="h6" gutterBottom>
            Active Loan Files
          </Typography>
          <Typography variant="h4">
            {activeLoanCases.length}
          </Typography>
        </Card>

        <Card className={`summary-card grid-cell ${activeTab === "tab3" ? 'clicked' : ''}`} onClick={()=>setActiveTab('tab3')} sx={{backgroundColor: tileColor[2]}}>
          <Typography variant="h6" gutterBottom>
            Foreclosed Loan Files
          </Typography>
          <Typography variant="h4">
            {closedLoanFiles.length}
          </Typography>
        </Card>

        <Card className={`summary-card grid-cell ${activeTab === "tab4" ? 'clicked' : ''}`} onClick={()=>setActiveTab('tab4')} sx={{backgroundColor: tileColor[3]}}>
          <Typography variant="h6" gutterBottom>
            Delinquent Loan Files
          </Typography>
          <Typography variant="h4">
            {delinquentLoanCount}
          </Typography>
        </Card>

        <Card className={`summary-card grid-cell ${activeTab === "tab5" ? 'clicked' : ''}`} onClick={()=>setActiveTab('tab5')} sx={{backgroundColor: tileColor[4]}}>
          <Typography variant="h6" gutterBottom>
            Immobilized Vehicles
          </Typography>
          <Typography variant="h4">
            1000
          </Typography>
        </Card>

        <Card className={`summary-card grid-cell ${activeTab === "tab6" ? 'clicked' : ''}`} onClick={()=>setActiveTab('tab6')} sx={{backgroundColor: tileColor[5]}}>
          <Typography variant="h6" gutterBottom>
            NPA
          </Typography>
          <Typography variant="h4">
            1000
          </Typography>
        </Card>

        <Card className={`summary-card grid-cell ${activeTab === "tab7" ? 'clicked' : ''}`} onClick={()=>setActiveTab('tab7')} sx={{backgroundColor: tileColor[6]}}>
          <Typography variant="h6" gutterBottom>
            Total Amount Collected
          </Typography>
          <Typography variant="h4">
            {totalAmountCollected}
          </Typography>
        </Card>

        <Card className={`summary-card grid-cell ${activeTab === "tab8" ? 'clicked' : ''}`} onClick={()=>setActiveTab('tab8')} sx={{backgroundColor: tileColor[7]}}>
          <Typography variant="h6" gutterBottom>
            Total Amount Outstanding
          </Typography>
          <Typography variant="h4">
            {totalAmountOutstanding}
          </Typography>
        </Card>

        <Card className={`summary-card grid-cell ${activeTab === "tab9" ? 'clicked' : ''}`} onClick={()=>setActiveTab('tab9')} sx={{backgroundColor: tileColor[8]}}>
          <Typography variant="h6" gutterBottom>
            Overdue Amount
          </Typography>
          <Typography variant="h4">
            {overdueAmount}
          </Typography>
        </Card>

        <Card className={`summary-card grid-cell ${activeTab === "tab10" ? 'clicked' : ''}`} onClick={()=>setActiveTab('tab10')} sx={{backgroundColor: tileColor[9]}}>
          <Typography variant="h6" gutterBottom>
            Avg. Collection Rate
          </Typography>
          <Typography variant="h4">
            {avgCollectionRate} %
          </Typography>
        </Card>

        <Card className={`summary-card grid-cell ${activeTab === "tab11" ? 'clicked' : ''}`} onClick={()=>setActiveTab('tab11')} sx={{backgroundColor: tileColor[10]}}>
          <Typography variant="h6" gutterBottom>
            Delinquency Rate
          </Typography>
          <Typography variant="h4">
            0 %
          </Typography>
        </Card>

        <Card className={`summary-card grid-cell ${activeTab === "tab12" ? 'clicked' : ''}`} onClick={()=>setActiveTab('tab12')} sx={{backgroundColor: tileColor[11]}}>
          <Typography variant="h6" gutterBottom>
            C. Agency Assigned
          </Typography>
          <Typography variant="h4">
            1000
          </Typography>
        </Card>

        <Card className={`summary-card grid-cell ${activeTab === "tab13" ? 'clicked' : ''}`} onClick={()=>setActiveTab('tab13')} sx={{backgroundColor: tileColor[12]}}>
          <Typography variant="h6" gutterBottom>
            R. Agency Assigned
          </Typography>
          <Typography variant="h4">
            1000
          </Typography>
        </Card>

      </div>

      {
        activeTab === "tab1" && (
          <LoanCases data = {totalLoanCasesFiles} />
        )
      }
      {
        activeTab === "tab2" && (
          <LoanCases data = {activeLoanCases} />
        )
      }
      {
        activeTab === "tab3" && (
          <LoanCases data = {closedLoanFiles} />
        )
      }
      {
        activeTab === "tab4" && (
          <LoanCases data = {closedLoanFiles} />
        )
      }
      {
        activeTab === "tab5" && (
          <LoanCases data = {closedLoanFiles} />
        )
      }
      {
        activeTab === "tab6" && (
          <LoanCases data = {closedLoanFiles} />
        )
      }
      {
        activeTab === "tab7" && (
          <LoanCases data = {closedLoanFiles} />
        )
      }
      {
        activeTab === "tab8" && (
          <LoanCases data = {closedLoanFiles} />
        )
      }
      {
        activeTab === "tab9" && (
          <LoanCases data = {closedLoanFiles} />
        )
      }
      {
        activeTab === "tab10" && (
          <LoanCases data = {closedLoanFiles} />
        )
      }
      {
        activeTab === "tab11" && (
          <LoanCases data = {closedLoanFiles} />
        )
      }
      {
        activeTab === "tab12" && (
          <LoanCases data = {closedLoanFiles} />
        )
      }
      {
        activeTab === "tab13" && (
          <LoanCases data = {closedLoanFiles} />
        )
      }

      {/* Row 1: Four Colorful Summary Cards */}
      {/* <Grid container spacing={3}>
        <Grid item xs={12} sm={6} md={3}>
          <Card style={{ backgroundColor: "#FF5252", color: "#fff" }}>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Total Collections
              </Typography>
              <Typography variant="h4">1000</Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Card style={{ backgroundColor: "#66BB6A", color: "#fff" }}>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Total Amount
              </Typography>
              <Typography variant="h4">₹1,000,000</Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Card style={{ backgroundColor: "#2196F3", color: "#fff" }}>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Average Collection
              </Typography>
              <Typography variant="h4">₹1,000</Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Card style={{ backgroundColor: "#FFC107", color: "#fff" }}>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Pending Collections
              </Typography>
              <Typography variant="h4">50</Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid> */}

      {/* Row 2: Four More Colorful Summary Cards */}
      {/* <Grid container spacing={3} marginY={1}>
        <Grid item xs={12} sm={6} md={3}>
          <Card style={{ backgroundColor: "#FF4081", color: "#fff" }}>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Successful Collections
              </Typography>
              <Typography variant="h4">800</Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Card style={{ backgroundColor: "#4CAF50", color: "#fff" }}>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Failed Collections
              </Typography>
              <Typography variant="h4">50</Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Card style={{ backgroundColor: "#3F51B5", color: "#fff" }}>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Top Performer
              </Typography>
              <Typography variant="h4">Rajesh</Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Card style={{ backgroundColor: "#FF9800", color: "#fff" }}>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Lowest Performer
              </Typography>
              <Typography variant="h4">Kamal</Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Card style={{ backgroundColor: "#FF9800", color: "#fff" }}>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Lowest Performer
              </Typography>
              <Typography variant="h4">Kamal</Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid> */}
     {/* Row 5: Table for Detailed Data */}
     {/* <Grid container spacing={3} marginY={1}>
        <Grid item xs={12} md={12}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Collection Detailed Table
              </Typography>
              <TableContainer>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell>ID</TableCell>
                      <TableCell>Name</TableCell>
                      <TableCell>Amount</TableCell>
                      <TableCell>Total Loan Amount</TableCell>
                      <TableCell>Total Loan Due</TableCell>
                      <TableCell>Total Late Fee Amount</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {detailedCollectionData.map((collection) => (
                      <TableRow key={collection.id}>
                        <TableCell>{collection.id}</TableCell>
                        <TableCell>{collection.name}</TableCell>
                        <TableCell>{collection.amount}</TableCell>
                        <TableCell>{collection.totalLoanAmount}</TableCell>
                        <TableCell>{collection.totalLoanDue}</TableCell>
                        <TableCell>{collection.totalLateFeeAmount}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </CardContent>
          </Card>
        </Grid>
      </Grid> */}
      {/* Line Chart for Monthly Collections */}
      {/* <Grid container spacing={3} marginY={1}>
        <Grid item xs={12} md={12}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Monthly Collections Overview
              </Typography>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={monthlyChartData}>
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Line
                    type="monotone"
                    dataKey="collections"
                    stroke="#8884d8"
                  />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </Grid>
      </Grid> */}

      {/* Row 3: Bar Chart for Top Ten Collections */}
      {/* <Grid container spacing={3} marginY={1}>
        <Grid item xs={12} md={12}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Top Ten Collections
              </Typography>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={topTenChartData}>
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="amount" fill="#8884d8" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </Grid>
      </Grid> */}

      {/* Row 4: Pie Chart for Entity Comparison */}
      {/* <Grid container spacing={3} marginY={1}>
        <Grid item xs={12} md={12}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Entity-wise Collection Comparison
              </Typography>
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    dataKey="collections"
                    data={entityComparisonData}
                    cx="50%"
                    cy="50%"
                    outerRadius={100}
                    fill="#8884d8"
                    label
                  >
                    {entityComparisonData.map((entry, index) => (
                      <Cell
                        key={`cell-₹{index}`}
                        fill={COLORS[index % COLORS.length]}
                      />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </Grid>
      </Grid> */}

 
    </div>
  );
};

export default CollectionDashboard;
