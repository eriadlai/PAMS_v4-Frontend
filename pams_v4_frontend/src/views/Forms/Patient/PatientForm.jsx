import {
  Autocomplete,
  Box,
  Button,
  TextField,
  useMediaQuery,
} from "@mui/material";
import React from "react";
import Header from "../../../components/Header";
import { Formik } from "formik";
import { useSelector } from "react-redux";
import * as yup from "yup";
import { CrearPaciente } from "../../../app/pacienteContext";
import {
  oEstadoCivilOpciones,
  oNivelEscolarOpciones,
  phoneRegExp,
} from "../../../app/staticDataContext";

const PatientForm = () => {
  const oUser = useSelector((state) => state.usuario);
  const isNonMobile = useMediaQuery("(min-width:600px)");
  const initialValues = {
    nombre: "",
    apellido: "",
    fechaNacimiento: "",
    ocupacion: "",
    actividadExtra: "",
    direccion: "",
    telefono: "",
    estadoCivil: "",
    nivelEscolar: "",
    religion: "",
  };

  const userSchema = yup.object().shape({
    nombre: yup.string().required("Campo obligatorio"),
    apellido: yup.string().required("Campo obligatorio"),
    fechaNacimiento: yup.date().required("Campo obligatorio"),
    ocupacion: yup.string().required("Campo obligatorio"),
    actividadExtra: yup.string().required("Campo obligatorio"),
    direccion: yup.string().required("Campo obligatorio"),
    telefono: yup.number(phoneRegExp).required("Campo obligatorio"),
    estadoCivil: yup.string().required("Campo obligatorio"),
    nivelEscolar: yup.string().required("Campo obligatorio"),
    religion: yup.string().required("Campo obligatorio"),
  });
  const handleFormSubmit = (values) => {
    CrearPaciente(values, oUser);
  };
  return (
    <Box sx={{ m: "20px", pb: 8 }}>
      {/* HEADER */}
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Header
          title="REGISTRO DE PACIENTES"
          subtitle="Apartado para el registro de nuevos pacientes"
        />
      </Box>
      <Formik
        onSubmit={handleFormSubmit}
        initialValues={initialValues}
        validationSchema={userSchema}
      >
        {({
          values,
          errors,
          touched,
          handleBlur,
          handleChange,
          handleSubmit,
        }) => (
          <form onSubmit={handleSubmit}>
            <Box
              display="grid"
              gap="30px"
              gridTemplateColumns="repeat(4,minmax(0,1fr))"
              sx={{
                "& > div": { gridColumn: isNonMobile ? undefined : "span 4" },
              }}
            >
              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="Nombre"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.nombre}
                name="nombre"
                error={!!touched.nombre && !!errors.nombre}
                helperText={touched.nombre && errors.nombre}
                sx={{ gridColumn: "span 2" }}
              />
              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="Apellido(s)"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.apellido}
                name="apellido"
                error={!!touched.apellido && !!errors.apellido}
                helperText={touched.apellido && errors.apellido}
                sx={{ gridColumn: "span 2" }}
              />
              <TextField
                InputLabelProps={{ shrink: true }}
                fullWidth
                variant="filled"
                type="date"
                label="Fecha de Nacimiento"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.fechaNacimiento}
                name="fechaNacimiento"
                error={!!touched.fechaNacimiento && !!errors.fechaNacimiento}
                helperText={touched.fechaNacimiento && errors.fechaInforme}
                sx={{ gridColumn: "span 2" }}
              />
              <TextField
                fullWidth
                variant="filled"
                type="number"
                label="Telefono/Celular"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.telefono}
                name="telefono"
                error={!!touched.telefono && !!errors.telefono}
                helperText={touched.telefono && errors.telefono}
                sx={{ gridColumn: "span 2" }}
              />
              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="Ocupacion"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.ocupacion}
                name="ocupacion"
                error={!!touched.ocupacion && !!errors.ocupacion}
                helperText={touched.ocupacion && errors.ocupacion}
                sx={{ gridColumn: "span 2" }}
              />
              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="Religion"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.religion}
                name="religion"
                error={!!touched.religion && !!errors.religion}
                helperText={touched.religion && errors.religion}
                sx={{ gridColumn: "span 2" }}
              />
              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="Actividad Extra"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.actividadExtra}
                name="actividadExtra"
                error={!!touched.actividadExtra && !!errors.actividadExtra}
                helperText={touched.actividadExtra && errors.actividadExtra}
                sx={{ gridColumn: "span 4" }}
              />
              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="Direccion"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.direccion}
                name="direccion"
                error={!!touched.direccion && !!errors.direccion}
                helperText={touched.direccion && errors.direccion}
                sx={{ gridColumn: "span 4" }}
              />

              <Autocomplete
                disablePortal
                id="oEstadoCivil"
                options={oEstadoCivilOpciones}
                onChange={(event, value) => (values.estadoCivil = value)}
                getOptionLabel={(opt) => opt}
                sx={{ gridColumn: "span 2" }}
                renderInput={(params) => (
                  <TextField {...params} label="Estado Civil" />
                )}
              />
              <Autocomplete
                disablePortal
                id="oNivelEscolar"
                options={oNivelEscolarOpciones}
                onChange={(event, value) => (values.nivelEscolar = value)}
                getOptionLabel={(opt) => opt}
                sx={{ gridColumn: "span 2" }}
                renderInput={(params) => (
                  <TextField {...params} label="Nivel Escolar" />
                )}
              />
            </Box>
            <Box display="flex" justifyContent="end" mt="20px">
              <Button type="submit" color="secondary" variant="contained">
                Crear Paciente
              </Button>
            </Box>
          </form>
        )}
      </Formik>
    </Box>
  );
};

export default PatientForm;
