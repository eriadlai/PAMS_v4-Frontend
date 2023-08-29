import { Box } from "@mui/material";
import React from "react";
import Header from "../../components/Header";

const UsersTable = () => {
  return (
    <Box m="20px">
      {/* HEADER */}
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Header
          title="USUARIOS REGISTRADOS"
          subtitle="Despliegue de todos los empleados registrados en el sistema"
        />
      </Box>
    </Box>
  );
};

export default UsersTable;