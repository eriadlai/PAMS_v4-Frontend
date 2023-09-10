import { Box } from "@mui/material";
import { tokens } from "../theme";
import { useTheme } from "@mui/material";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";

const TableStyle = ({ oData, oColumns }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  return (
    <Box
      sx={{
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
        "& .MuiDataGrid-toolbarContainer .MuiButton-text": {
          color: `${colors.primary} !important`,
        },
        // Estilos responsivos para dispositivos móviles
        "@media (max-width: 600px)": {
          "& .MuiDataGrid-root": {
            overflowX: "auto",
          },
          "& .MuiDataGrid-columnsContainer": {
            flexWrap: "nowrap",
          },
          "& .MuiDataGrid-colCellTitle": {
            whiteSpace: "nowrap",
            overflow: "hidden",
            textOverflow: "ellipsis",
          },
        },
      }}
    >
      <DataGrid
        getRowId={(oData) => oData._id}
        rows={oData}
        columns={oColumns}
        slots={{ Toolbar: GridToolbar }}
        initialState={{
          ...oData.initialState,
          columns: {
            ...oData.initialState?.columns,
            columnVisibilityModel: {
              _id: false,
            },
          },
        }}
      />
    </Box>
  );
};

export default TableStyle;
