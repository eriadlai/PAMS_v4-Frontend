import {
  AppBar,
  BottomNavigation,
  BottomNavigationAction,
} from "@mui/material";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import PeopleOutlinedIcon from "@mui/icons-material/PeopleOutlined";
import { useNavigate } from "react-router-dom";
import { GroupAddOutlined } from "@mui/icons-material";
import React, { useEffect, useState } from "react";
import { useTheme } from "@emotion/react";
import { tokens } from "../theme";

const Bottombar = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const navigate = useNavigate();
  const [value, setValue] = useState(
    localStorage.getItem("selectedValue") || 1
  );
  useEffect(() => {
    localStorage.setItem("selectedValue", value);
  }, [value]);
  const oNavigate = (oLink) => {
    navigate(oLink);
  };
  console.log(value);
  return (
    <>
      <AppBar
        position="fixed"
        color="primary"
        style={{ top: "auto", bottom: 0 }}
      >
        <BottomNavigation
          sx={{
            "& .MuiBottomNavigationAction-root": {
              color: colors.white,
            },
            "& .Mui-selected, .Mui-selected > svg": {
              color: colors.blue,
            },
            backgroundColor: colors.primary,
            width: "100%",
            position: "absolute",
            bottom: 0,
          }}
          showLabels
          value={value}
          onChange={(event, newValue) => {
            setValue(newValue);
          }}
        >
          <BottomNavigationAction
            label="Agregar"
            value={0}
            icon={<GroupAddOutlined />}
            onClick={() => oNavigate("/AddMenu")}
          />
          <BottomNavigationAction
            label="Principal"
            value={1}
            icon={<HomeOutlinedIcon />}
            onClick={() => oNavigate("/Dashboard")}
          />
          <BottomNavigationAction
            label="Registros"
            value={2}
            icon={<PeopleOutlinedIcon />}
            onClick={() => oNavigate("/InfoMenu")}
          />
        </BottomNavigation>
      </AppBar>
    </>
  );
};

export default Bottombar;
