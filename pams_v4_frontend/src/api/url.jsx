import axios from "axios";
import store from "../tools/store";
import { logoutUser, updateToken } from "../tools/userSlice";
import jwt_decode from "jwt-decode";

export const oSetLog = (oUsuario) => {
  const oLog = {
    oUserID: oUsuario.user.id,
    oUserRol: oUsuario.user.rol,
  };
  return oLog;
};
export const oUpdateToken = (oUsuario, oToken) => {
  const oUpdate = {
    id: oUsuario.user.id,
    nombre: oUsuario.user.nombre,
    apellido: oUsuario.user.apellido,
    correo: oUsuario.user.correo,
    rol: oUsuario.user.rol,
    isActive: true,
    isLoged: true,
    token: oToken,
  };
  store.dispatch(updateToken(oUpdate));
};
export const RutaLogin = axios.create({
  baseURL: "http://localhost:4000/",
});
const RutaApi = axios.create({
  baseURL: "http://localhost:4000/",
});
const handleLogout = () => {
  store.dispatch(logoutUser());
  window.location.href = "/";
};
RutaApi.interceptors.request.use(async (config) => {
  const state = store.getState();
  const oToken = state.usuario.user.token;
  if (!oToken) {
    handleLogout();
    return Promise.reject(new Error("Token missing"));
  }
  const oValidarToken = jwt_decode(oToken).exp * 1000 < Date.now();
  if (oValidarToken) {
    handleLogout();
    return Promise.reject(new Error("SESION EXPIRADA"));
  }

  config.headers.Authorization = oToken ? `Bearer ${oToken}` : "";
  return config;
});

export { RutaApi };
