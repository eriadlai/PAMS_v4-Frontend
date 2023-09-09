import { Box } from "@mui/material";
import React, { useState } from "react";
import Header from "../../../components/Header";
import { useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import PatientEditForm from "./PatientEditForm";
import PatientProblematica from "./PatientProblematica";
import PatientFamiliar from "./PatientFamiliar";
import PatientAntecedentes from "./PatientAntecedentes";
import PatientPersonal from "./PatientPersonal";
import { useTheme } from "@emotion/react";

const PatientsMenu = () => {
  const theme = useTheme();
  const oUser = useSelector((state) => state.usuario);
  const { state: data } = useLocation();
  const [value, setValue] = useState(1);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const oDatosGenerales = {
    _id: data._id,
    nombre: data.nombre,
    apellido: data.apellido,
    telefono: data.telefono,
    religion: data.religion,
    ocupacion: data.ocupacion,
    noExpediente: data.noExpediente,
    nivelEscolar: data.nivelEscolar,
    fechaRegistro: data.fechaRegistro,
    fechaNacimiento: data.fechaNacimiento,
    estadoCivil: data.estadoCivil,
    direccion: data.direccion,
    actividadExtra: data.actividadExtra,
    sustancia: data.Sustancia,
  };
  const oDatosFamiliar = {
    _id: data._id,
    familiares: data.Familiar,
    casa: data.Casa,
  };
  const oDatosAntecedentes = {
    _id: data._id,
    antecedentesFamiliares: data.AntecedentesFamiliares,
    antecedentesClinicos: data.AntecedentesClinicos,
  };
  const oDatosPersonales = {
    _id: data._id,
    circuloSocial: data.CirculoSocial,
    estadoMental: data.EstadoMental,
    habitos: data.Habitos,
    historialSexual: data.historialSexual,
  };
  const oDatosProblematica = {
    id: data._id,
    problematica: data.Problematica,
    sustancia: data.Sustancia,
  };

  return (
    <Box m="20px">
      {/* HEADER */}
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Header
          title="DETALLES DEL PACIENTE"
          subtitle="Detalles de la informacion del paciente seleccionado"
        />
      </Box>
      <Box sx={{ width: "100%", typography: "body1" }}>
        <TabContext value={value}>
          <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
            <TabList
              textColor={
                theme.palette.mode === "dark" ? "secondary" : "primary"
              }
              indicatorColor={
                theme.palette.mode === "dark" ? "secondary" : "primary"
              }
              onChange={handleChange}
              variant="scrollable"
              scrollButtons="auto"
              aria-label="scrollable auto tabs example"
            >
              <Tab label="Informacion General" value={1} />
              <Tab label="Problematica" value={2} />
              <Tab label="Aspectos Familiares" value={3} />
              <Tab label="Antecedentes" value={4} />
              <Tab label="Aspectos Personales" value={5} />
            </TabList>
          </Box>
          <TabPanel value={1}>
            <PatientEditForm oDatos={oDatosGenerales} oUser={oUser} />
          </TabPanel>
          <TabPanel value={2}>
            <PatientProblematica oData={oDatosProblematica} oUser={oUser} />
          </TabPanel>
          <TabPanel value={3}>
            <PatientFamiliar oData={oDatosFamiliar} oUser={oUser} />
          </TabPanel>
          <TabPanel value={4}>
            <PatientAntecedentes oData={oDatosAntecedentes} oUser={oUser} />
          </TabPanel>
          <TabPanel value={5}>
            <PatientPersonal oData={oDatosPersonales} oUser={oUser} />
          </TabPanel>
        </TabContext>
      </Box>
    </Box>
  );
};

export default PatientsMenu;
