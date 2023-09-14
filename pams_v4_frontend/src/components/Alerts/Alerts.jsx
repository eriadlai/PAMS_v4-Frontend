import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import { tokens } from "../../theme";

const colors = tokens();
const MySwal = withReactContent(Swal);

export const oSuccessAlert = (oTitle, oText) => {
  MySwal.fire({
    title: oTitle,
    text: oText,
    icon: "success",
    confirmButtonText: "Aceptar",
  });
};
export const oSuccessAlertRedirection = (oTitle, oText, oRuta) => {
  MySwal.fire({
    title: oTitle,
    text: oText,
    icon: "success",
    confirmButtonText: "Aceptar",
  }).then(() => window.location.replace(oRuta));
};
export const oSuccessAlertReload = (oTitle, oText) => {
  MySwal.fire({
    title: oTitle,
    text: oText,
    icon: "success",
    confirmButtonText: "Aceptar",
  }).then(() => window.location.reload());
};
export const oErrorAlert = (oTitle, oText) => {
  MySwal.fire({
    title: oTitle,
    text: oText,
    icon: "error",
    confirmButtonText: "Aceptar",
  });
};
export const oWarningAlert = async (oTitle, oText) => {
  MySwal.fire({
    title: oTitle,
    text: oText,
    icon: "warning",
  });
};
export const oOpciones = (oData, oEdit, oDelete) => {
  MySwal.fire({
    title: "Opciones Disponibles",
    icon: "info",
    showDenyButton: true,
    showCancelButton: true,
    confirmButtonText: "Editar",
    denyButtonText: `Eliminar`,
    cancelButtonText: "Cancelar",
    confirmButtonColor: colors.secondary,
    denyButtonColor: colors.secondaryDark,
    cancelButtonColor: colors.blue,
  }).then((result) => {
    if (result.isConfirmed) {
      oEdit(oData);
    } else if (result.isDenied) {
      MySwal.fire({
        title: "¿Estas seguro?",
        text: "Esta accion es irreversible!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: colors.primary,
        cancelButtonColor: colors.blue,
        confirmButtonText: "Si, eliminar",
        cancelButtonText: "Cancelar",
      }).then((result) => {
        if (result.isConfirmed) {
          oDelete(oData._id);
        }
      });
    }
  });
};
