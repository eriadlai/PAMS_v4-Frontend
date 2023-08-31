import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

const MySwal = withReactContent(Swal);

export const oSuccessAlert = (oTitle, oText) => {
  MySwal.fire({
    title: oTitle,
    text: oText,
    icon: "success",
    confirmButtonText: "Aceptar",
  });
};
export const oErrorAlert = (oTitle, oText) => {
  MySwal.fire({
    title: oTitle,
    text: oText,
    icon: "error",
    confirmButtonText: "Aceptar",
  });
};
