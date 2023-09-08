import { Box } from "@mui/material";
import React from "react";
import Header from "../../../components/Header";

const PatientProblematica = (oData) => {
  console.log("", oData);
  return (
    <Box m="20px">
      {/* HEADER */}
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Header
          title="PROBLEMATICA"
          subtitle="Informacion sobre la problematica del paciente"
        />
      </Box>
    </Box>
  );
};

export default PatientProblematica;
