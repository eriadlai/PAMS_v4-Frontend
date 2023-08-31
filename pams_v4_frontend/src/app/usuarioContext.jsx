import { RutaLogin } from "../api/url";
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
  const oUsuario = await RutaLogin.post("/usuario/login", oBody);
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
      token: oUsuario.data.token,
    };
  } else {
    oErrorAlert("Error!", "Usuario o contraseña incorrectos");
  }
  return SetUsuario;
};
