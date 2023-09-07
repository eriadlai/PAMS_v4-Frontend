import { useTheme } from "@emotion/react";
import { Box, ButtonBase, Card, CardContent, Typography } from "@mui/material";
import React from "react";
import { tokens } from "../theme";
import { useNavigate } from "react-router-dom";

const MenuMobileCards = (oData) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const navigate = useNavigate();

  const oNavigate = (oLink) => {
    navigate(oLink);
  };
  return (
    <Card
      sx={{ minWidth: 250 }}
      style={{
        backgroundColor: colors.secondaryDark,
      }}
    >
      <ButtonBase onClick={() => oNavigate(oData.oData.to)}>
        <CardContent>
          <Box sx={{ display: "flex", justifyContent: "space-between" }}>
            <Typography
              variant="subtitle1"
              color={colors.white}
              component="div"
            >
              {oData.oData.title}
            </Typography>
          </Box>
          <Typography variant="subtitle2" color={colors.green} component="div">
            {oData.oData.subtitle}
          </Typography>
        </CardContent>
      </ButtonBase>
    </Card>
  );
};

export default MenuMobileCards;
