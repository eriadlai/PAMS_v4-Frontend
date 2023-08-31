import { Box } from "@mui/material";
import { tokens } from "../theme";
import { useTheme } from "@mui/material";

const TableStyle = ({ oData }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const oTema = theme.palette.mode;

  return (
    <Box
      m="40px 0 0 0"
      height="65vh"
      sx={{
        "& .MuiDataGrid-root": {
          border: "none",
          color: colors.white,
        },
        "& .MuiDataGrid-cell": {
          borderBottom: "none",
          color: colors.primaryDark,
        },
        "& .name-column--cell": {
          color: colors.dark,
        },
        "& .MuiDataGrid-columnHeaders": {
          backgroundColor: colors.primary,
          borderBottom: "none",
        },
        "& .MuiDataGrid-virtualScroller": {
          backgroundColor: colors.grey,
        },
        "& .MuiDataGrid-footerContainer": {
          borderTop: "none",
          backgroundColor: colors.primary,
        },
        "& .MuiCheckbox-root": {
          color: `${colors.green} !important`,
        },
        "& .MuiDataGrid-toolbarContainer .MuiButton-text": {
          color: `${colors.primary} !important`,
        },
        maxWidth: "90%",
      }}
    >
      {oData}
    </Box>
  );
};

export default TableStyle;
