import { Box } from "@mui/material";
import React from "react";
import Header from "../../../components/Header";
import { useSelector } from "react-redux";
import { useLocation } from "react-router-dom";

const PatientsMenu = () => {
  const oUser = useSelector((state) => state.usuario);
  const { state: data } = useLocation();
  console.log(data);
  return (
    <Box m="20px">
      {/* HEADER */}
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Header
          title="PANTALLA PRINCIPAL"
          subtitle="Bienvenido a la pantalla principal"
        />
      </Box>
    </Box>
  );
};

export default PatientsMenu;
