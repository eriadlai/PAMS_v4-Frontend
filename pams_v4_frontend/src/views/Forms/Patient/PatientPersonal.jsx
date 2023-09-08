import { Box } from "@mui/material";
import React from "react";
import Header from "../../../components/Header";

const PatientPersonal = (oData) => {
  console.log(oData);
  return (
    <Box m="20px">
      {/* HEADER */}
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Header
          title="ASPECTOS PERSONALES"
          subtitle="Aspectos, habitos y comportamientos del paciente"
        />
      </Box>
    </Box>
  );
};

export default PatientPersonal;
