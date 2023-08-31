import axios from "axios";
import store from "../tools/store";
import { logoutUser } from "../tools/userSlice";
import jwt_decode from "jwt-decode";

export const oSetLog = (oUsuario) => {
  const oLog = {
    oUserID: oUsuario.id,
    oUserRol: oUsuario.rol,
  };
  return oLog;
};

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
    return Promise.reject(new Error("Token or refreshToken missing"));
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
