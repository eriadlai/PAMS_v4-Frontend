import { Box, CssBaseline } from "@mui/material";
import React from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import Topbar from "../components/Topbar";

const Layout = () => {
  return (
    <>
      <CssBaseline />
      <Box display="flex" height="100vh">
        <Sidebar />

        <Box flex="1" display="flex" flexDirection="column">
          <Topbar />

          <Box mx="30px" mb="30px" flex="1" overflow="auto">
            <Outlet />
          </Box>
        </Box>
      </Box>
    </>
  );
};

export default Layout;
