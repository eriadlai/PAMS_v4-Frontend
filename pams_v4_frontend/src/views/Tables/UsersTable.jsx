import { Box, Button } from "@mui/material";
import Header from "../../components/Header";
import { useEffect, useState } from "react";
import { RutaApi, oSetLog, oUpdateToken } from "../../api/url";
import TableStyle from "../../components/TableStyle";
import { useSelector } from "react-redux";
import { oOpciones } from "../../components/Alerts/Alerts";
import { useNavigate } from "react-router-dom";
import { EliminarUsuario } from "../../app/usuarioContext";

const UsersTable = () => {
  const oUser = useSelector((state) => state.usuario);
  const navigator = useNavigate();
  const handleEdit = (data) => {
    navigator("/FormEditUsuarios", { state: data });
  };
  const handleDelete = (data) => {
    EliminarUsuario(oUser, data);
  };
  const columns = [
    { field: "_id", headerName: "ID", width: 100 },
    {
      field: "nombre",
      headerName: "Nombre",
      width: 200,
      cellClassName: "name-column--cell",
    },
    {
      field: "apellido",
      headerName: "Apellido(s)",
      width: 200,
      cellClassName: "name-column--cell",
    },
    {
      field: "correo",
      headerName: "Usuario",
      width: 200,
      cellClassName: "name-column--cell",
    },
    {
      field: "Roles",
      headerName: "Rol",
      width: 150,
    },
    {
      field: "opciones",
      headerName: "Opciones",
      width: 150,
      renderCell: (cellValues) => {
        return (
          <>
            <Button
              type="submit"
              color="primary"
              variant="contained"
              onClick={() => {
                oOpciones(cellValues.row, handleEdit, handleDelete);
              }}
              sx={{ marginRight: 2 }}
            >
              OPCIONES
            </Button>
          </>
        );
      },
    },
  ];
  const [usuarios, setUsuarios] = useState([]);
  useEffect(() => {
    RutaApi.post("/usuario/all", oSetLog(oUser))
      .then((usuario) => {
        setUsuarios(usuario.data);
        oUpdateToken(oUser, usuario.data[usuario.data.length - 1].token);
        usuario.data.pop();
      })
      .catch((err) => {
        console.log(err.response.status);
      });
  }, []);
  return (
    <>
      <Header
        title="USUARIOS REGISTRADOS"
        subtitle="Despliegue de todos los empleados registrados en el sistema"
      />
      <TableStyle oData={usuarios} oColumns={columns} />
    </>
  );
};

export default UsersTable;
