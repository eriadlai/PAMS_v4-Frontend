import { Box, useMediaQuery } from "@mui/material";
import React from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import Topbar from "../components/Topbar";
import Bottombar from "./Bottombar";

const Layout = () => {
  const isNonMobile = useMediaQuery("(min-width:600px)");
  return (
    <>
      <Box display="flex" position="relative" height="100%">
        {isNonMobile ? <Sidebar /> : <></>}

        <Box height="100%" width="100%">
          <Topbar />

          <Box mx="30px" mb="30px" flex="1" overflow="auto">
            <Outlet />
          </Box>
        </Box>
      </Box>
      {!isNonMobile ? <Bottombar /> : <></>}
    </>
  );
};

export default Layout;
