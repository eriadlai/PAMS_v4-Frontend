import {
  Autocomplete,
  Box,
  Button,
  TextField,
  useMediaQuery,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import Header from "../../../components/Header";
import { useSelector } from "react-redux";
import * as yup from "yup";
import { RutaApi } from "../../../api/url";
import { EditarUsuario } from "../../../app/usuarioContext";
import { Formik } from "formik";
import { useLocation } from "react-router-dom";

const UsersEditForm = () => {
  const oUser = useSelector((state) => state.usuario);
  const { state: data } = useLocation();
  const isNonMobile = useMediaQuery("(min-width:600px)");

  const userSchema = yup.object().shape({
    nombre: yup.string().required("Campo obligatorio"),
    apellido: yup.string().required("Campo obligatorio"),
    correo: yup.string().email("Invalid email").required("Campo obligatorio"),
    Roles: yup.string().required("Campo obligatorio"),
  });

  const [roles, setRoles] = useState([]);

  useEffect(() => {
    RutaApi.get("/roles/all").then((rol) => setRoles(rol.data));
  }, []);

  const initialValues = {
    nombre: data.nombre,
    apellido: data.apellido,
    correo: data.correo,
    Roles: data.Roles,
  };
  const handleFormSubmit = (values) => {
    roles.forEach(async (role) => {
      if (values.Roles === role.nombre) {
        values.Roles = role._id;
      }
    });
    EditarUsuario(values, oUser, data._id);
  };
  return (
    <Box m="20px">
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Header
          title="EDICION DE DATOS DE USUARIO"
          subtitle="Apartado para la modificacion de datos"
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
                fullWidth
                variant="filled"
                type="text"
                label="Email"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.correo}
                name="correo"
                error={!!touched.correo && !!errors.correo}
                helperText={touched.correo && errors.correo}
                sx={{ gridColumn: "span 2" }}
              />
              <Autocomplete
                disablePortal
                id="oRoles"
                options={roles}
                onChange={(event, value) => (values.Roles = value._id)}
                getOptionLabel={(opt) => opt.nombre}
                sx={{ gridColumn: "span 2" }}
                renderInput={(params) => (
                  <TextField {...params} label="Roles" />
                )}
              />
            </Box>
            <Box display="flex" justifyContent="end" mt="20px">
              <Button type="submit" color="secondary" variant="contained">
                Guardar Cambios
              </Button>
            </Box>
          </form>
        )}
      </Formik>
    </Box>
  );
};

export default UsersEditForm;
