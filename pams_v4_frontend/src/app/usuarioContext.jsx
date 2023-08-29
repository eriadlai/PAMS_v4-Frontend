import { RutaApi } from "../api/url";
import { oSuccessAlert, oErrorAlert } from "../components/Alerts/Alerts";

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
  const oUsuario = await RutaApi.post("/usuario/login", oBody);
  if (oUsuario.status === 200) {
    oSuccessAlert("¡Éxito!", "Bienvenido");
    SetUsuario = {
      id: oUsuario.data._id,
      nombre: oUsuario.data.nombre,
      apellido: oUsuario.data.apellido,
      correo: oUsuario.data.correo,
      rol: oUsuario.data.Roles,
      isActive: true,
      isLoged: true,
    };
  } else {
    oErrorAlert("Error!", "Usuario o contraseña incorrectos");
  }
  return SetUsuario;
};
