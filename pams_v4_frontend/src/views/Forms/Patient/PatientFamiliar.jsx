import { Box } from "@mui/material";
import React from "react";
import Header from "../../../components/Header";

const PatientFamiliar = (oData) => {
  console.log(oData);
  return (
    <Box m="20px">
      {/* HEADER */}
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Header
          title="ASPECTOS FAMILIARES"
          subtitle="Familiares y aspectos de la vivienda del paciente"
        />
      </Box>
    </Box>
  );
};

export default PatientFamiliar;
