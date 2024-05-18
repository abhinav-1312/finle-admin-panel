// CollectionDashboard.tsx

import React from "react";
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

const COLORS = ["#8884d8", "#82ca9d", "#ffc658"];

const CollectionDashboard: React.FC = () => {
  return (
    <div>
      <Typography variant="h4" gutterBottom>
        Collection Dashboard
      </Typography>

      {/* Row 1: Four Colorful Summary Cards */}
      <Grid container spacing={3}>
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
      </Grid>

      {/* Row 2: Four More Colorful Summary Cards */}
      <Grid container spacing={3} marginY={1}>
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
      </Grid>
     {/* Row 5: Table for Detailed Data */}
     <Grid container spacing={3} marginY={1}>
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
      </Grid>
      {/* Line Chart for Monthly Collections */}
      <Grid container spacing={3} marginY={1}>
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
      </Grid>

      {/* Row 3: Bar Chart for Top Ten Collections */}
      <Grid container spacing={3} marginY={1}>
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
      </Grid>

      {/* Row 4: Pie Chart for Entity Comparison */}
      <Grid container spacing={3} marginY={1}>
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
      </Grid>

 
    </div>
  );
};

export default CollectionDashboard;
