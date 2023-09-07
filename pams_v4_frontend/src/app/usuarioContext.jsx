import { RutaApi, RutaLogin, oUpdateToken } from "../api/url";
import {
  oSuccessAlert,
  oErrorAlert,
  oSuccessAlertRedirection,
} from "../components/Alerts/Alerts";

export const LoginModule = async (username, password) => {
  const oBody = { oUser: username, oPass: password };
  let SetUsuario = {
    id: "",
    nombre: "",
    apellido: "",
    correo: "",
    rol: "",
    isActive: true,
    isLoged: false,
  };
  const oUsuario = await RutaLogin.post("/usuario/login", oBody);
  if (oUsuario.data !== 401) {
    oSuccessAlert("¡Éxito!", "Bienvenido");
    SetUsuario = {
      id: oUsuario.data._id,
      nombre: oUsuario.data.nombre,
      apellido: oUsuario.data.apellido,
      correo: oUsuario.data.correo,
      rol: oUsuario.data.Roles,
      isActive: true,
      isLoged: true,
      token: oUsuario.data.token,
    };
  } else {
    oErrorAlert("Error!", "Usuario o contraseña incorrectos");
  }
  return SetUsuario;
};
export const CrearUsuario = async (oUsuario, oData) => {
  const SetUsuario = {
    nombre: oUsuario.nombre,
    apellido: oUsuario.apellido,
    correo: oUsuario.correo,
    password: oUsuario.password,
    isActive: 1,
    Roles: oUsuario.Roles,
    oUserRol: oData.user.rol,
    oUserID: oData.user.id,
  };
  const oResult = await RutaApi.post("/usuario/insert", SetUsuario);
  if (oResult.status !== 200) {
    oErrorAlert("Ups", "Ha sucedido un error...");
  }
  oUpdateToken(oData, oData.user.token);
  oSuccessAlertRedirection(
    "Usuario  Creado",
    "Se ha registrado satisfactoriamente al usuario",
    "/TablaUsuarios"
  );
};
export const EditarUsuario = async (oUsuario, oData, oID) => {
  const SetUsuario = {
    oID: oID,
    nombre: oUsuario.nombre,
    apellido: oUsuario.apellido,
    correo: oUsuario.correo,
    Roles: oUsuario.Roles,
    oUserRol: oData.user.rol,
    oUserID: oData.user.id,
  };
  const oResult = await RutaApi.patch("/usuario/update", SetUsuario);
  if (oResult.status !== 200) {
    oErrorAlert("Ups", "Ha sucedido un error...");
  }
  oUpdateToken(oData, oData.user.token);
  oSuccessAlertRedirection(
    "Usuario  Actualizado",
    "Se han guardado los cambios",
    "/TablaUsuarios"
  );
};
export const EliminarUsuario = async (oData, oID) => {
  const SetUsuario = {
    oID: oID,
    oUserRol: oData.user.rol,
    oUserID: oData.user.id,
  };
  const oResult = await RutaApi.patch("/usuario/delete", SetUsuario);
  if (oResult.status !== 200) {
    oErrorAlert("Ups", "Ha sucedido un error...");
  }
  oUpdateToken(oData, oData.user.token);
  oSuccessAlertRedirection(
    "Usuario  Eliminado",
    "Datos eliminados satisfactoriamente",
    "/TablaUsuarios"
  );
};
