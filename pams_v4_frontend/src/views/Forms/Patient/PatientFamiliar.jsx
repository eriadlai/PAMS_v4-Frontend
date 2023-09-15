import {
  Autocomplete,
  Box,
  Button,
  TextField,
  useMediaQuery,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import Header from "../../../components/Header";
import * as yup from "yup";
import { Formik } from "formik";
import TableInteractive from "../../../components/TableInteractive";
import {
  oIngresoPromedio,
  oServiciosCasa,
  oTipoCasa,
} from "../../../app/staticDataContext";
import ModalTable from "../../../components/ModalTable";
import { randomId } from "@mui/x-data-grid-generator";

const PatientFamiliar = (oData) => {
  console.log(oData);
  const isNonMobile = useMediaQuery("(min-width:600px)");
  const initialValues = {
    id: oData.oData.id,
    cantFamilias: oData.oData.cantFamilias,
    cantHabitacion: oData.oData.cantHabitacion,
    ingresoFamiliar: oData.oData.ingresoFamiliar,
    tipo: oData.oData.tipo,
    serviciosHogar: oData.oData.casa.serviciosHogar,
    familiares: oData.oData.familiares,
  };
  const userSchema = yup.object().shape({
    cantFamilias: yup.string().required("Campo obligatorio"),
  });

  const [oServiciosHogar, setServiciosHogar] = useState(
    initialValues.serviciosHogar
  );
  const [oFamiliares, setFamiliares] = useState(initialValues.familiares);
  const [oSustancias, setSustancias] = useState(
    initialValues.familiares.map((x) => {
      return x.sustancia;
    })
  );

  const oSetServiciosHogar = (oData) => {
    setServiciosHogar(oData);
  };
  const oSetFamiliares = (oData) => {
    setFamiliares(oData);
  };
  const oSetSustancia = (oData) => {
    setSustancias(oData);
  };
  const oServicioObject = {
    nombre: "",
  };
  const oSustanciaObject = {
    nombre: "",
  };
  const oFamiliaresObject = {
    apellido: "",
    fechaNacimiento: "",
    nombre: "",
    ocupacion: "",
    parentesco: "",
    sustancia: "",
  };
  const oServiciosColumns = [
    {
      field: "nombre",
      headerName: "Servicio",
      width: 400,
      align: "left",
      headerAlign: "left",
      editable: true,
      type: "singleSelect",
      valueOptions: oServiciosCasa,
    },
  ];
  const oSustanciaColumns = [
    {
      field: "nombre",
      headerName: "Sustancia",
      width: 150,
      align: "left",
      headerAlign: "left",
      editable: true,
    },
  ];
  const oFamiliaresColumns = [
    {
      field: "Sustancias",
      headerName: "Sustancias",
      width: 180,
      renderCell: (cellValues) => {
        return (
          <>
            <ModalTable
              oData={cellValues.row.sustancia}
              oTextButton={"Ver Detalles"}
              oColumns={oSustanciaColumns}
              oObject={oSustanciaObject}
              oSetData={() => oSetSustancia}
            />
          </>
        );
      },
    },
    {
      field: "fechaNacimiento",
      headerName: "Fecha de Nacimiento",
      type: "date",
      width: 180,
      editable: true,
      valueGetter: (params) => {
        return new Date(params.value);
      },
    },
    {
      field: "parentesco",
      headerName: "Parentesco",
      width: 100,
      align: "left",
      headerAlign: "left",
      editable: true,
    },

    {
      field: "ocupacion",
      headerName: "Ocupacion",
      width: 100,
      align: "left",
      headerAlign: "left",
      editable: true,
    },
    {
      field: "apellido",
      headerName: "Apellido",
      width: 100,
      align: "left",
      headerAlign: "left",
      editable: true,
    },
    {
      field: "nombre",
      headerName: "Nombre",
      width: 100,
      align: "left",
      headerAlign: "left",
      editable: true,
    },
  ];
  const handleFormSubmit = (values) => {
    values.serviciosHogar = oServiciosHogar;
    values.oFamiliares = oFamiliares;
    console.log(values);
  };
  return (
    <Box m="20px">
      {/* HEADER */}
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Header
          title="ASPECTOS FAMILIARES"
          subtitle="Familiares y aspectos de la vivienda del paciente"
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
                type="number"
                label="Cantidad de Familias"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.cantFamilias}
                name="cantFamilias"
                error={!!touched.cantFamilias && !!errors.cantFamilias}
                helperText={touched.cantFamilias && errors.cantFamilias}
                sx={{ gridColumn: "span 2" }}
              />
              <TextField
                fullWidth
                variant="filled"
                type="number"
                label="Cantidad de habitaciones (No baños ni cocina)"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.cantHabitacion}
                name="cantHabitacion"
                error={!!touched.cantHabitacion && !!errors.cantHabitacion}
                helperText={touched.cantHabitacion && errors.cantHabitacion}
                sx={{ gridColumn: "span 2" }}
              />
              <Autocomplete
                disablePortal
                id="oIngresoFamiliar"
                options={oIngresoPromedio}
                onChange={(event, value) => (values.ingresoFamiliar = value)}
                getOptionLabel={(opt) => opt}
                sx={{ gridColumn: "span 2" }}
                renderInput={(params) => (
                  <TextField {...params} label="Ingreso promedio mensual" />
                )}
              />
              <Autocomplete
                disablePortal
                id="oTipoHogar"
                options={oTipoCasa}
                onChange={(event, value) => (values.tipo = value)}
                getOptionLabel={(opt) => opt}
                sx={{ gridColumn: "span 2" }}
                renderInput={(params) => (
                  <TextField {...params} label="La casa que habitan es:" />
                )}
              />
            </Box>
            <TableInteractive
              oData={values.serviciosHogar}
              oColumns={oServiciosColumns}
              oSetData={() => oSetServiciosHogar}
              oObject={oServicioObject}
            />
            <TableInteractive
              oData={values.familiares}
              oColumns={oFamiliaresColumns}
              oSetData={() => oSetFamiliares}
              oObject={oFamiliaresObject}
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

export default PatientFamiliar;
