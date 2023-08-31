import { Box } from "@mui/material";
import React from "react";
import Header from "../../components/Header";

const UsersForm = () => {
  return (
    <Box m="20px">
      {/* HEADER */}
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Header
          title="REGISTRO DE USUARIOS"
          subtitle="Apartado para el registro de nuevos empleados"
        />
      </Box>
    </Box>
  );
};

export default UsersForm;
