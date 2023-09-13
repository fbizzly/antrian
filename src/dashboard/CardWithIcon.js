import * as React from "react";
import { FC, createElement } from "react";
import { Card, Box, Typography, Divider } from "@mui/material";
import { Link, To } from "react-router-dom";
import { ReactNode } from "react";

import cartouche from "./cartouche.png";
import cartoucheDark from "./cartoucheDark.png";

const CardWithIcon = props => {
  const { icon, no_antrian,layanan, no_layanan, to, children } = props;

  var newlayanan = layanan.replace("_", " ").toUpperCase();

  return (
    <Card
      sx={{
        borderRadius: '16px',
        minHeight: 52,
        display: "flex",
        flexDirection: "column",
        flex: "1",
        "& a": {
          textDecoration: "none",
          color: theme =>
            theme.palette.mode === "dark" ? "inherit" : "#dc2440"
        }
      }}
    >
      <Link to={to}>
        <Box
          sx={{
            boxShadow: 10,
            overflow: "inherit",
            padding: "16px",
            background: theme =>
              `url(${
              theme.palette.mode === "#dc2440"
              }) no-repeat`,
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            "& .icon": {
              color: theme =>
                theme.palette.mode === "dark" ? "inherit" : "#000"
            }
          }}
        >
         
          <Box textAlign="left">
            <Typography variant="h1" component="h2" color="#dc2440" sx={{fontWeight: 'bold'}}>
              {no_layanan || " "}
            </Typography>
            <Typography color="textSecondary" sx={{fontWeight: 'bold'}} variant="h5">{newlayanan}</Typography>
          </Box>
          <Box textAlign="right">
            <Typography variant="h1" component="h2" color="#000" sx={{fontWeight: 'bold'}}>
              {no_antrian || " "}
            </Typography>
            <Typography color="textSecondary" sx={{fontWeight: 'bold'}} variant="h5">{"NO ANTRIAN"}</Typography>
          </Box>
        </Box>
      </Link>
      {children && <Divider />}
      {children}
    </Card>
  );
};

export default CardWithIcon;
