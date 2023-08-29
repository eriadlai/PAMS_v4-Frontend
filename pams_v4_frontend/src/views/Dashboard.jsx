import React from "react";
import Header from "../components/Header";
import { Box } from "@mui/material";

const Dashboard = () => {
  return (
    <>
      <Box m="20px">
        {/* HEADER */}
        <Box display="flex" justifyContent="space-between" alignItems="center">
          <Header
            title="PANTALLA PRINCIPAL"
            subtitle="Bienvenido a la pantalla principal"
          />
        </Box>
      </Box>
    </>
  );
};

export default Dashboard;
