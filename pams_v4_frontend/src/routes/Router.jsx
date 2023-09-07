import React from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import Dashboard from "../views/Dashboard";
import UsersTable from "../views/Tables/UsersTable";
import UsersForm from "../views/Forms/Users/UsersForm";
import UsersEditForm from "../views/Forms/Users/UsersEditForm";
import AddMenu from "../views/Mobile/AddMenu";
import InfoMenu from "../views/Mobile/InfoMenu";
import Login from "../views/Login";
import RutaPrivada from "./PrivateRoute";

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
        <Route path="/AddMenu" element={<AddMenu />} />
        <Route path="/InfoMenu" element={<InfoMenu />} />
      </Route>
    </Routes>
  );
};

export default Router;
