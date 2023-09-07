import { useEffect, useState } from "react";
import { ProSidebar, Menu, MenuItem } from "react-pro-sidebar";
import {
  Box,
  IconButton,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { Link } from "react-router-dom";
import "react-pro-sidebar/dist/css/styles.css";
import { tokens } from "../theme";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import PeopleOutlinedIcon from "@mui/icons-material/PeopleOutlined";
import MenuOutlinedIcon from "@mui/icons-material/MenuOutlined";
import { GroupAddOutlined } from "@mui/icons-material";
import { useSelector } from "react-redux";

const Item = ({ title, to, icon, selected, setSelected }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  return (
    <MenuItem
      active={selected === title}
      style={{
        color: colors.white,
      }}
      onClick={() => setSelected(title)}
      icon={icon}
    >
      <Typography fontSize={14}>{title}</Typography>
      <Link to={to} />
    </MenuItem>
  );
};

const Sidebar = () => {
  const oUsuarios = useSelector((state) => state.usuario);
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const isNonMobile = useMediaQuery("(min-width:600px)");

  const [isCollapsed, setIsCollapsed] = useState(
    localStorage.getItem("isCollapsed") === "true"
  );
  const [selected, setSelected] = useState(
    localStorage.getItem("selectedOption") || "Pantalla Principal"
  );
  useEffect(() => {
    localStorage.setItem("selectedOption", selected);
    localStorage.setItem("isCollapsed", isCollapsed);
  }, [isCollapsed, selected]);

  return (
    <Box
      sx={{
        height: "100%",
        "& .pro-sidebar-inner": {
          background: `${colors.primary} !important`,
        },
        "& .pro-icon-wrapper": {
          backgroundColor: "transparent !important",
        },
        "& .pro-inner-item:hover": {
          color: colors.blue + "!important",
        },
        "& .pro-menu-item.active": {
          color: colors.blue + "!important",
        },
      }}
    >
      <ProSidebar collapsed={isCollapsed}>
        <Menu iconShape="square">
          {isNonMobile && (
            <MenuItem
              onClick={() => setIsCollapsed(!isCollapsed)}
              icon={isCollapsed ? <MenuOutlinedIcon /> : undefined}
              style={{
                margin: "10px 0 20px 0",
                color: colors.white,
              }}
            >
              {!isCollapsed && (
                <Box
                  display="flex"
                  justifyContent="space-between"
                  alignItems="center"
                  ml="15px"
                >
                  <IconButton onClick={() => setIsCollapsed(!isCollapsed)}>
                    <MenuOutlinedIcon />
                  </IconButton>
                </Box>
              )}
            </MenuItem>
          )}

          {!isCollapsed && (
            <Box mb="25px">
              <Box textAlign="center">
                <Typography
                  variant="h2"
                  color={colors.white}
                  fontWeight="bold"
                  sx={{ m: "10px 0 0 0" }}
                >
                  {oUsuarios.user.nombre + " " + oUsuarios.user.apellido}
                </Typography>
                <Typography variant="h5" color={colors.green}>
                  {oUsuarios.user.rol}
                </Typography>
              </Box>
            </Box>
          )}

          <Box paddingLeft={isCollapsed ? undefined : "10%"}>
            <Item
              title="Pantalla Principal"
              to="/Dashboard"
              icon={<HomeOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
            />

            {!isCollapsed ? (
              <Typography
                variant="h6"
                color={colors.green}
                sx={{ m: "15px 0 5px 20px" }}
              >
                Registros
              </Typography>
            ) : (
              <></>
            )}
            <Item
              title="Tabla de Usuarios"
              to="/TablaUsuarios"
              icon={<PeopleOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
            />
            <Item
              title="Tabla de Pacientes"
              to="/TablaPacientes"
              icon={<PeopleOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
            />
            {!isCollapsed ? (
              <Typography
                variant="h6"
                color={colors.green}
                sx={{ m: "15px 0 5px 20px" }}
              >
                Formularios
              </Typography>
            ) : (
              <></>
            )}
            <Item
              title="Agregar Usuarios"
              to="/FormUsuarios"
              icon={<GroupAddOutlined />}
              selected={selected}
              setSelected={setSelected}
            />
          </Box>
        </Menu>
      </ProSidebar>
    </Box>
  );
};

export default Sidebar;
