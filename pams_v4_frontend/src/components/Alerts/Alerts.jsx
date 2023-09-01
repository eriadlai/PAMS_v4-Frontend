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
export const oSuccessAlertRedirection = (oTitle, oText, oRuta) => {
  MySwal.fire({
    title: oTitle,
    text: oText,
    icon: "success",
    confirmButtonText: "Aceptar",
  }).then(() => window.location.replace(oRuta));
};
export const oErrorAlert = (oTitle, oText) => {
  MySwal.fire({
    title: oTitle,
    text: oText,
    icon: "error",
    confirmButtonText: "Aceptar",
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
  }).then((result) => {
    if (result.isConfirmed) {
      oEdit(oData);
    } else if (result.isDenied) {
      MySwal.fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete it!",
      }).then((result) => {
        if (result.isConfirmed) {
          oDelete(oData._id);
          MySwal.fire("Deleted!", "Your file has been deleted.", "success");
        }
      });
    }
  });
};
