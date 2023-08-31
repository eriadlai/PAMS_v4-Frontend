import { Button } from "@mui/material";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import Header from "../../components/Header";
import { useEffect, useState } from "react";
import { RutaApi, oSetLog, oUpdateToken } from "../../api/url";
import TableStyle from "../../components/TableStyle";
import { useSelector } from "react-redux";

const UsersTable = () => {
  const oUser = useSelector((state) => state.usuario);
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
      width: 100,
      renderCell: (cellValues) => {
        return (
          <>
            <Button
              type="submit"
              color="primary"
              variant="contained"
              onClick={() => {
                console.log("BUTTON");
              }}
              sx={{ marginRight: 2 }}
            >
              EDITAR
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
      <TableStyle
        oData={
          <DataGrid
            getRowId={(usuarios) => usuarios._id}
            rows={usuarios}
            columns={columns}
            slots={{ Toolbar: GridToolbar }}
            initialState={{
              ...usuarios.initialState,
              columns: {
                ...usuarios.initialState?.columns,
                columnVisibilityModel: {
                  _id: false,
                },
              },
            }}
          />
        }
      />
    </>
  );
};

export default UsersTable;
