import { Box, Button, TextField, useMediaQuery } from "@mui/material";
import React, { useState } from "react";
import Header from "../../../components/Header";
import { Formik } from "formik";
import * as yup from "yup";
import TableInteractive from "../../../components/TableInteractive";

const PatientProblematica = (oData, oUser) => {
  const isNonMobile = useMediaQuery("(min-width:600px)");
  const initialValues = {
    id: oData.oData.id,
    acciones: oData.oData.problematica.acciones,
    causas: oData.oData.problematica.causas,
    evolucion: oData.oData.problematica.evolucion,
    implicaciones: oData.oData.problematica.implicaciones,
    resultadosObtenidos: oData.oData.problematica.resultadosObbtenidos,
    tratamientos: oData.oData.problematica.tratamientos,
    sustancia: oData.oData.sustancia,
  };
  const userSchema = yup.object().shape({
    acciones: yup.string().required("Campo obligatorio"),
  });
  const columns = [
    {
      field: "fechas",
      headerName: "Fechas",
      width: 100,
      align: "left",
      headerAlign: "left",
      editable: true,
    },
    {
      field: "duracion",
      headerName: "Duracion",
      width: 100,
      align: "left",
      headerAlign: "left",
      editable: true,
    },
    {
      field: "lugar",
      headerName: "Lugar",
      width: 100,
      align: "left",
      headerAlign: "left",
      editable: true,
    },
    {
      field: "aplicacion",
      headerName: "Aplicacion",
      width: 150,
      align: "left",
      headerAlign: "left",
      editable: true,
    },
    {
      field: "tratamiento",
      headerName: "Tratamiento",
      width: 200,
      align: "left",
      headerAlign: "left",
      editable: true,
    },
  ];

  const [oTratamientos, setTratamientos] = useState([]);

  const oSetTratamientos = (oData) => {
    setTratamientos(oData);
  };
  const handleFormSubmit = (values) => {
    values.tratamientos = oTratamientos;
    console.log(values, oUser);
  };
  return (
    <Box m="20px">
      {/* HEADER */}
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Header
          title="PROBLEMATICA"
          subtitle="Informacion sobre la problematica del paciente"
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
                label="Acciones"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.acciones}
                name="acciones"
                error={!!touched.acciones && !!errors.acciones}
                helperText={touched.acciones && errors.acciones}
                sx={{ gridColumn: "span 2" }}
              />
              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="Causas"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.causas}
                name="causas"
                error={!!touched.causas && !!errors.causas}
                helperText={touched.causas && errors.causas}
                sx={{ gridColumn: "span 2" }}
              />
              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="Evolucion"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.evolucion}
                name="evolucion"
                error={!!touched.evolucion && !!errors.evolucion}
                helperText={touched.evolucion && errors.evolucion}
                sx={{ gridColumn: "span 4" }}
              />
              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="Implicaciones"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.implicaciones}
                name="implicaciones"
                error={!!touched.implicaciones && !!errors.implicaciones}
                helperText={touched.implicaciones && errors.implicaciones}
                sx={{ gridColumn: "span 2" }}
              />
              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="Resultados Obtenidos"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.resultadosObtenidos}
                name="resultadosObtenidos"
                error={
                  !!touched.resultadosObtenidos && !!errors.resultadosObtenidos
                }
                helperText={
                  touched.resultadosObtenidos && errors.resultadosObtenidos
                }
                sx={{ gridColumn: "span 2" }}
              />
            </Box>
            <TableInteractive
              oData={values.tratamientos}
              oColumns={columns}
              oSetTratamientos={() => oSetTratamientos}
            />
            <Box display="flex" justifyContent="end" mt="20px">
              <Button type="submit" color="secondary" variant="contained">
                Actualizar Datos
              </Button>
            </Box>
          </form>
        )}
      </Formik>
    </Box>
  );
};

export default PatientProblematica;
