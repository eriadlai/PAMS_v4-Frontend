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
import { CrearUsuario } from "../../../app/usuarioContext";
import { Formik } from "formik";

const UsersForm = () => {
  const oUser = useSelector((state) => state.usuario);
  const isNonMobile = useMediaQuery("(min-width:600px)");
  const initialValues = {
    nombre: "",
    apellido: "",
    correo: "",
    password: "",
    Roles: "",
  };
  const userSchema = yup.object().shape({
    nombre: yup.string().required("Campo obligatorio"),
    apellido: yup.string().required("Campo obligatorio"),
    correo: yup.string().email("Invalid email").required("Campo obligatorio"),
    password: yup.string().required("Campo obligatorio"),
    confirmPassword: yup
      .string()
      .oneOf([yup.ref("password"), null], "Las contraseñas deben ser iguales.")
      .required("Campo obligatorio"),
    Roles: yup.string().required("Campo obligatorio"),
  });

  const [roles, setRoles] = useState([]);

  useEffect(() => {
    RutaApi.get("/roles/all").then((rol) => setRoles(rol.data));
  }, []);
  const handleFormSubmit = (values) => {
    CrearUsuario(values, oUser);
  };
  return (
    <Box m="20px">
      {/* HEADER */}
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Header
          title="REGISTRO DE USUARIOS"
          subtitle="Apartado para el registro de nuevos empleados"
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
                sx={{ gridColumn: "span 4" }}
              />

              <TextField
                fullWidth
                variant="filled"
                type="password"
                label="Contraseña"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.password}
                name="password"
                error={!!touched.password && !!errors.password}
                helperText={touched.password && errors.password}
                sx={{ gridColumn: "span 2" }}
              />
              <TextField
                fullWidth
                variant="filled"
                type="password"
                label="Confirmar Contraseña"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.confirmPassword}
                name="confirmPassword"
                error={!!touched.confirmPassword && !!errors.confirmPassword}
                helperText={touched.confirmPassword && errors.confirmPassword}
                sx={{ gridColumn: "span 2" }}
              />
              <Autocomplete
                disablePortal
                id="oRoles"
                options={roles}
                onChange={(event, value) => (values.Roles = value._id)}
                getOptionLabel={(opt) => opt.nombre}
                sx={{ gridColumn: "span 4" }}
                renderInput={(params) => (
                  <TextField {...params} label="Roles" />
                )}
              />
            </Box>
            <Box display="flex" justifyContent="end" mt="20px">
              <Button type="submit" color="secondary" variant="contained">
                Crear Usuario
              </Button>
            </Box>
          </form>
        )}
      </Formik>
    </Box>
  );
};

export default UsersForm;
