import ReactDOM from "react-dom";
import React, { useState, useEffect } from "react";
import QRCode from 'qrcode.react';
import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  tableCellClasses,
  Typography,
  Image,
  CssBaseline,
  Container,
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  ThemeProvider,
  createTheme,
  Card,
  CardMedia,
  CardContent,
  CardActions,
  Stack,
  Grid,
  CardHeader,
  Collapse,
  Divider,
  Button,
  IconButton,
  Hidden,
  CircularProgress,
  Tab,
  Avatar
} from "@mui/material";
import ChevronUp from 'mdi-material-ui/ChevronUp'
import ChevronDown from 'mdi-material-ui/ChevronDown'
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Link,
  useParams
} from "react-router-dom";
import { styled } from '@mui/material/styles';
import { makeStyles } from '@mui/styles';
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import "./App.css";
import numeral from 'numeral';
import { 
  TabContext, 
  TabList, 
  TabPanel 
} from '@mui/lab'
import AdminDashboard from "./dashboard/AdminDashboard";
const theme = createTheme({
  palette: {
    background: {
      default: "#EFEFEF"
    },
  }
});

function NotFound() {
  const BoxWrapper = styled(Box)(({ theme }) => ({
    [theme.breakpoints.down('md')]: {
      width: '90vw'
    }
  }))
  return (
    <React.Fragment>
      <Box className='content-center'>
        <Box sx={{ p: 5, display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center' }}>
          <BoxWrapper>
            <Typography variant='h1'>404</Typography>
            <Typography variant='h5' sx={{ mb: 1, fontSize: '1.5rem !important' }}>
              Page Not Found ⚠️
            </Typography>
            <Typography variant='body2'>We couldn&prime;t find the page you are looking for.</Typography>
          </BoxWrapper>
        </Box>
      </Box>
    </React.Fragment>
  )
}

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<AdminDashboard />} />
        <Route element={<NotFound />} />
      </Routes>
    </Router>
  );
}
// ReactDOM.render(<App />, document.querySelector("#app"));
export default App;
