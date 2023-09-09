import React from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import Dashboard from "../views/Dashboard";
import UsersTable from "../views/Tables/UsersTable";
import UsersForm from "../views/Forms/Users/UsersForm";
import UsersEditForm from "../views/Forms/Users/UsersEditForm";
import PatientsTable from "../views/Tables/PatientsTable";
import PatientForm from "../views/Forms/Patient/PatientForm";
import AddMenu from "../views/Mobile/AddMenu";
import InfoMenu from "../views/Mobile/InfoMenu";
import Login from "../views/Login";
import RutaPrivada from "./PrivateRoute";
import PatientsMenu from "../views/Forms/Patient/PatientsMenu";

const Router = () => {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/Dashboard" replace />} />
      <Route path="/login" element={<Login />} />
      <Route element={<RutaPrivada />}>
        <Route path="/Dashboard" element={<Dashboard />} />
        <Route path="/FormUsuarios" element={<UsersForm />} />
        <Route path="/FormEditUsuarios" element={<UsersEditForm />} />
        <Route path="/TablaUsuarios" element={<UsersTable />} />
        <Route path="/TablaPacientes" element={<PatientsTable />} />
        <Route path="/FormPaciente" element={<PatientForm />} />
        <Route path="/MenuPaciente" element={<PatientsMenu />} />
        <Route path="/AddMenu" element={<AddMenu />} />
        <Route path="/InfoMenu" element={<InfoMenu />} />
      </Route>
    </Routes>
  );
};

export default Router;
