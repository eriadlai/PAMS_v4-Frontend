import { Box, Container, Grid, Stack, useMediaQuery } from "@mui/material";
import React, { useEffect } from "react";
import Header from "../../components/Header";
import MenuMobileCards from "../../components/MenuMobileCards";
import { useNavigate } from "react-router-dom";

const AddMenu = () => {
  const isNonMobile = useMediaQuery("(min-width:600px)");
  const oNavegacion = useNavigate();

  useEffect(() => {
    if (isNonMobile) {
      oNavegacion("/Dashboard");
    }
  });
  const oLinks = [
    {
      title: "Usuarios",
      subtitle: "Agregar nuevos usuarios",
      to: "/FormUsuarios",
    },
    {
      title: "Pacientes",
      subtitle: "Agregar nuevos pacientes",
      to: "/FormPacientes",
    },
    {
      title: "Citas",
      subtitle: "Agendar una nueva cita",
      to: "/FormCita",
    },
  ];
  return (
    <>
      <Box m="20px">
        {/* HEADER */}
        <Box display="flex" justifyContent="space-between" alignItems="center">
          <Header
            title="AGREGAR ENTIDADES"
            subtitle="Seleccione para agregar una nueva entidad"
          />
        </Box>
        <Stack
          direction={"row"}
          justifyContent="space-between"
          style={{ padding: "20px" }}
        >
          <Container sx={{ py: 2 }}>
            <Grid container spacing={4}>
              {oLinks.map((link) => {
                return (
                  <Grid item md={6} lg={4} xl={3}>
                    <MenuMobileCards oData={link} />
                  </Grid>
                );
              })}
            </Grid>
          </Container>
        </Stack>
      </Box>
    </>
  );
};

export default AddMenu;
