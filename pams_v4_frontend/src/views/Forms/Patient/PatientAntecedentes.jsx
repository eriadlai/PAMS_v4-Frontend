import { Box } from "@mui/material";
import React from "react";
import Header from "../../../components/Header";

const PatientAntecedentes = (oData) => {
  console.log(oData);
  return (
    <Box m="20px">
      {/* HEADER */}
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Header
          title="ANTECEDENTES CLINICOS Y FAMIMLIARES"
          subtitle="Antecedentes registrados del paciente"
        />
      </Box>
    </Box>
  );
};

export default PatientAntecedentes;
