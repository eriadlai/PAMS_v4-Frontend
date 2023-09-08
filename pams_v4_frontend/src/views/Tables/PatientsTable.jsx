import React, { useEffect, useState } from "react";
import { RutaApi, oSetLog, oUpdateToken } from "../../api/url";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Button } from "@mui/material";
import { oOpciones } from "../../components/Alerts/Alerts";
import Header from "../../components/Header";
import TableStyle from "../../components/TableStyle";

const PatientsTable = () => {
  const oUser = useSelector((state) => state.usuario);
  const navigator = useNavigate();
  const handleEdit = (data) => {
    navigator("/MenuPaciente", { state: data });
  };
  const handleDelete = (data) => {
    console.log(data, "ELIMINAR");
  };
  const columns = [
    { field: "_id", headerName: "ID", width: 100 },
    { field: "noExpediente", headerName: "ID", width: 50 },
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
      field: "telefono",
      headerName: "Telefono",
      width: 150,
      cellClassName: "name-column--cell",
    },
    {
      field: "fechaRegistro",
      headerName: "Fecha de registro",
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
  const [pacientes, setPacientes] = useState([]);
  useEffect(() => {
    RutaApi.post("/paciente/all", oSetLog(oUser))
      .then((paciente) => {
        setPacientes(paciente.data);
        oUpdateToken(oUser, paciente.data[paciente.data.length - 1].token);
        paciente.data.pop();
      })
      .catch((err) => {
        console.log(err.response.status);
      });
  }, []);
  return (
    <>
      <Header
        title="PACIENTES REGISTRADOS"
        subtitle="Despliegue de todos los pacientes registrados en el sistema"
      />
      <TableStyle oData={pacientes} oColumns={columns} />
    </>
  );
};

export default PatientsTable;
