import React from "react";
import { useState, useEffect } from "react";
import {
  useDataProvider, Loading, Error, ReferenceField, TextField, useRefresh
} from 'react-admin';

import dataProvider from "../dataProvider";

import CardWithIcon from "./CardWithIcon";
import LocalMallIcon from "@mui/icons-material/LocalMall";
import {Box} from "@mui/material";
import LinearProgress from '@mui/material/LinearProgress';

const CardAntrian = ({ authData, periodeID }) => {

  const [data, setData] = useState();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState();

  useEffect(() => {
    try {
      setInterval(function() {
          dataProvider.getAll("queue").then(data => {
            setData(data.data);
            setLoading(false);
        });
      }, 1000)
    } catch (error) {
      setError(error);
      setLoading(false);
    }
  }, []);

  if (loading) return <LinearProgress />;
  if (error) return <Error />;
  if (!data) return null;

  return (
    <>
      {data.map((item, index) => (
            <Box maxWidth="100em"   pl={1}  pr={1} style={{ marginTop: 2,   height: "33%"}} >
             <CardWithIcon
                  icon={LocalMallIcon}
                  title={"GROOMING"}
                  no_layanan={index+1}
                  layanan={item.layanan}
                  no_antrian={item.no_antrian || "001"}
                  subtitle={1}
                ></CardWithIcon>
                </Box>
         ))}
              
    </>

  );
};

export default CardAntrian;
