/* ----------------------------------------------------------------------------
Information Contained Herein is Proprietary and Confidential. copyright notice in all copies, 
acknowledging that the code is provided without warranties, and strictly prohibiting unauthorized 
sharing or distribution without prior written consent from the copyright holder<DKG Labs Pvt. Ltd>
------------------------------------------------------------------------------ */

/* eslint-disable eqeqeq */
import React, { useState } from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { Navigate } from "react-router-dom";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import IconButton from "@mui/material/IconButton";
import axios, { AxiosResponse } from "axios";
import { BASE_URL } from "../utils/BaseUrl";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";

const defaultTheme = createTheme();

export default function SignIn() {
  const [value, setValue] = React.useState(0);

  const [userLoginId, setUserLoginId] = useState("");
  const [password, setPassword] = useState("");
  const [mobileLogin, setMobileLogin] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");

  const handleLogin = async (event: React.FormEvent) => {
    event.preventDefault();
    try {
      const response: AxiosResponse = await axios.post(
        `${BASE_URL}/auth-service/login`,
        {
          mobileNumber: value === 0 ? mobileLogin : null,
          password: password,
          userId: value === 0 ? null : userLoginId,
        }
      );

      const { userId, token, mobileNumber } = response.data.responseData;
      localStorage.setItem("userId", userId);
      localStorage.setItem("token", token);
      localStorage.setItem("mobileNumber", mobileNumber);
      await fetchUserDetails();
      setIsLoggedIn(true);
    } catch (error) {
      alert("Invalid user ");
      console.error(error);
    }
  };

  const fetchUserDetails = async () => {
    const token = localStorage.getItem("token");
    const userId = localStorage.getItem("userId");
    try {
      const response = await axios.post(
        `${BASE_URL}/user-service/userDetails`,
        {
          userId,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: token,
          },
        }
      );
      const { userType, active, firstName, lastName } =
        response.data.responseData;
      setFirstName(firstName);
      setLastName(lastName);
      localStorage.setItem("firstName", firstName);
      localStorage.setItem("lastName", lastName);

      if (userType == "CAGT") {
        const userRole = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15];
        localStorage.setItem("userRole", JSON.stringify(userRole));
        localStorage.setItem("userType", "superAdmin");
      }
      if (userType == "NBFC") {
        localStorage.setItem("userType", "Nbfc");
        const userRole = [1, 12, 13];
        localStorage.setItem("userRole", JSON.stringify(userRole));
      }
      if (userType == "DLR") {
        localStorage.setItem("userType", "Delear");
        const userRole = [1, 14, 15];
        localStorage.setItem("userRole", JSON.stringify(userRole));
      }
      if (userType == "DSA") {
        localStorage.setItem("userType", "DSA");
        const userRole = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15];
        localStorage.setItem("userRole", JSON.stringify(userRole));
      }
      if (userType == "STF") {
        localStorage.setItem("userType", "Staff");
        const userRole = [1];
        localStorage.setItem("userRole", JSON.stringify(userRole));
      }
      localStorage.setItem("active", active);
      localStorage.setItem("userdetails", "api call success");
      window.location.reload();
      if (userType == "CSR") {
        localStorage.setItem("userType", "CSR");
        window.location.href =
          "https://drive.google.com/file/d/1uyrQtneAosYaQ4-_TYGzZp2ZvC8tIzpr/view?usp=drive_link";
        alert("For consumer use, please utilize our Finle application.");
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  const handleTogglePasswordVisibility = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
  };

  if (isLoggedIn) {
    return <Navigate to="/" replace />;
  }

  return (
    <ThemeProvider theme={defaultTheme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            paddingTop: 10,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            background: "#f2f2f2",
            height: "100vh",
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <Tabs
            value={value}
            onChange={handleChange}
            variant="scrollable"
            scrollButtons="auto"
            aria-label="scrollable auto tabs example"
          >
            <Tab label="Mobile No." />
            <Tab label="User Id" />
          </Tabs>
          <br />
          <Box
            component="form"
            onSubmit={handleLogin}
            noValidate
            sx={{ mt: 1 }}
          >
            {value === 0 ? (
              <>
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  id="textField"
                  label="Mobile Number"
                  name="mobileNumber"
                  autoComplete="mobileNumber"
                  value={mobileLogin}
                  onChange={(e) => setMobileLogin(e.target.value)}
                  autoFocus
                />
              </>
            ) : (
              <>
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  id="textField"
                  label="User ID"
                  name="userId"
                  autoComplete="userId"
                  value={userLoginId}
                  onChange={(e) => setUserLoginId(e.target.value)}
                  autoFocus
                />
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type={showPassword ? "text" : "password"}
                  id="password"
                  autoComplete="current-password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  InputProps={{
                    endAdornment: (
                      <IconButton
                        onClick={handleTogglePasswordVisibility}
                        edge="end"
                      >
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    ),
                  }}
                />
              </>
            )}
            <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Remember me"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign In
            </Button>
            <Grid container>
              {/* <Grid item xs>
                 <Link href="#" variant="body2">
                  Forgot password?
                </Link> 
              </Grid>  */}
              <Grid item>
                <Link href="https:/a/finle.in/register" variant="body2">
                  {"Don't have an account? Sign Up"}
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}
