/* ----------------------------------------------------------------------------
Information Contained Herein is Proprietary and Confidential. copyright notice in all copies, 
acknowledging that the code is provided without warranties, and strictly prohibiting unauthorized 
sharing or distribution without prior written consent from the copyright holder<DKG Labs Pvt. Ltd>
------------------------------------------------------------------------------ */

import React, { useEffect } from "react";
import SummaryCard1 from "../../components/SummaryCard1";
import { Grid, Card, CardContent } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { ThunkDispatch } from "redux-thunk";
import { RootState } from "../../store/store";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";
import {
  Table,
  TableContainer,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
} from "@mui/material";
import { fetchspecificDlrDtls } from "../../store/actions/specificDlrDtlsActions";

const DealerDashboard = () => {
  const dispatch = useDispatch<ThunkDispatch<RootState, null, any>>();
  const specificDlrDtls = useSelector(
    (state: RootState) => state.specificDlrDtls.dlrDtls
  );

  useEffect(() => {
    dispatch(fetchspecificDlrDtls("10000003"));
  }, [dispatch]);

  const vehicleFinanceData = [
    { month: "Jan", applications: 50, approvals: 30, disbursed: 25 },
    { month: "Feb", applications: 60, approvals: 35, disbursed: 28 },
    { month: "Mar", applications: 55, approvals: 33, disbursed: 29 },
  ];

  // Vehicle Lease Data
  const vehicleLeaseData = [
    { month: "Jan", applications: 40, approvals: 25, leased: 20 },
    { month: "Feb", applications: 45, approvals: 28, leased: 22 },
    { month: "Mar", applications: 42, approvals: 27, leased: 21 },
  ];

  // Consumer Summary Data
  const consumerSummaryData = [
    { name: "Rishab Jain", loanAmount: "₹50,000", leaseAmount: "₹20,000" },
    { name: "Himanshu ", loanAmount: "₹65,000", leaseAmount: "₹18,000" },
    { name: "Rajat Modwil", loanAmount: "₹55,000", leaseAmount: "₹22,000" },
  ];

  // Dealer Summary Data
  const summaryCardData = [
    {
      title: "Total Loan Amount",
      value: specificDlrDtls?.totalLoanAmount || 0,
    },
    { title: "Total Loan Due", value: specificDlrDtls?.totalLoanDue || 0 },
    {
      title: "Total Loan Emi Due Amount",
      value: specificDlrDtls?.totalLoanEmiDueAmount || 0,
    },
    {
      title: "Total Pending Emi Amount",
      value: specificDlrDtls?.totalPendingEmiAmount || 0,
    },
    {
      title: "Total Last Emi Txn Amount",
      value: specificDlrDtls?.totalLastEmiTxnAmount || 0,
    },
    {
      title: "Total Late Fee Amount",
      value: specificDlrDtls?.totalLateFeeAmount || 0,
    },
  ];

  return (
    <div>
      <br />
      <Grid container spacing={3}>
        {summaryCardData.map((item) => (
          <Grid item xs={12} sm={6} md={3} key={item.title}>
            <SummaryCard1 title={item.title} value={item.value} />
          </Grid>
        ))}
      </Grid>

      <br />
      <br />
  {/*    <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <h2>Vehicle Finance</h2>
              <BarChart
                width={500}
                height={300}
                data={vehicleFinanceData}
                margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar
                  dataKey="applications"
                  fill="#8884d8"
                  name="Applications"
                />
                <Bar dataKey="approvals" fill="#82ca9d" name="Approvals" />
                <Bar dataKey="disbursed" fill="#ffc658" name="Disbursed" />
              </BarChart>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <h2>Vehicle Lease</h2>
              <BarChart
                width={500}
                height={300}
                data={vehicleLeaseData}
                margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar
                  dataKey="applications"
                  fill="#8884d8"
                  name="Applications"
                />
                <Bar dataKey="approvals" fill="#82ca9d" name="Approvals" />
                <Bar dataKey="leased" fill="#ffc658" name="Leased" />
              </BarChart>
            </CardContent>
          </Card>
        </Grid>
        </Grid>*/}

      <br />
      <br />

     {/* <Grid container spacing={3}>
        <Grid item xs={12}>
          <Card>
            <CardContent>
              <h2>Consumer Summary</h2>
              <TableContainer>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell>Name</TableCell>
                      <TableCell>Loan Amount</TableCell>
                      <TableCell>Lease Amount</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {consumerSummaryData.map((row) => (
                      <TableRow key={row.name}>
                        <TableCell>{row.name}</TableCell>
                        <TableCell>{row.loanAmount}</TableCell>
                        <TableCell>{row.leaseAmount}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </CardContent>
          </Card>
        </Grid>
                    </Grid>*/}
      
    </div>
  );
};

export default DealerDashboard;
