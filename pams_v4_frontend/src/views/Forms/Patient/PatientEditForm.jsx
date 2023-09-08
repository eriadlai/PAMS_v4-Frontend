import { Box } from "@mui/material";
import React from "react";
import Header from "../../../components/Header";

const PatientEditForm = (oDatos) => {
  console.log(oDatos);
  return (
    <Box m="20px">
      {/* HEADER */}
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Header
          title="INFORMACION GENERAL"
          subtitle="Informacion general del paciente"
        />
      </Box>
    </Box>
  );
};

export default PatientEditForm;
