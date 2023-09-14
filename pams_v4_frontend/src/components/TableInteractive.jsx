import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import AddIcon from "@mui/icons-material/Add";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/DeleteOutlined";
import SaveIcon from "@mui/icons-material/Save";
import CancelIcon from "@mui/icons-material/Close";
import {
  GridRowModes,
  DataGrid,
  GridToolbarContainer,
  GridActionsCellItem,
  GridRowEditStopReasons,
} from "@mui/x-data-grid";
import { randomId } from "@mui/x-data-grid-generator";
import { useTheme } from "@emotion/react";
import { tokens } from "../theme";

function EditToolbar(props) {
  const { setRows, setRowModesModel, oData, oSetFocus } = props;
  const handleClick = () => {
    const id = randomId();
    oData.oObject.id = id;
    oData.oObject.isNew = true;
    setRows((oldRows) => [...oldRows, oData.oObject]);
    setRowModesModel((oldModel) => ({
      ...oldModel,
      [id]: { mode: GridRowModes.Edit, fieldToFocus: oSetFocus },
    }));
  };

  return (
    <GridToolbarContainer>
      <Button color="primary" startIcon={<AddIcon />} onClick={handleClick}>
        AGREGAR
      </Button>
    </GridToolbarContainer>
  );
}

const TableInteractive = (oData) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const oTema = theme.palette.mode;
  oData.oData.map((x) => {
    x.id = randomId();
    x.isNew = true;
  });
  const [rows, setRows] = useState(oData.oData);
  const [rowModesModel, setRowModesModel] = useState({});

  const oSetData = oData.oSetData();
  const handleRowEditStop = (params, event) => {
    if (params.reason === GridRowEditStopReasons.rowFocusOut) {
      event.defaultMuiPrevented = true;
    }
  };

  const handleEditClick = (id) => () => {
    setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.Edit } });
    oSetData(rows);
  };

  const handleSaveClick = (id) => () => {
    setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.View } });
    oSetData(rows);
  };

  const handleDeleteClick = (id) => () => {
    setRows(rows.filter((row) => row.id !== id));
    oSetData(rows);
  };

  const handleCancelClick = (id) => () => {
    setRowModesModel({
      ...rowModesModel,
      [id]: { mode: GridRowModes.View, ignoreModifications: true },
    });

    const editedRow = rows.find((row) => row.id === id);
    if (editedRow.isNew) {
      setRows(rows.filter((row) => row.id !== id));
    }
    oSetData(rows);
  };

  const processRowUpdate = (newRow) => {
    const updatedRow = { ...newRow, isNew: false };
    setRows(rows.map((row) => (row.id === newRow.id ? updatedRow : row)));
    oSetData(rows);
    return updatedRow;
  };

  const handleRowModesModelChange = (newRowModesModel) => {
    setRowModesModel(newRowModesModel);
    oSetData(rows);
  };
  const oColumns = [
    {
      field: "actions",
      type: "actions",
      headerName: "Opciones",
      width: 100,
      cellClassName: "actions",
      getActions: ({ id }) => {
        const isInEditMode = rowModesModel[id]?.mode === GridRowModes.Edit;

        if (isInEditMode) {
          return [
            <GridActionsCellItem
              icon={<SaveIcon />}
              label="Save"
              sx={{
                color: "primary",
              }}
              onClick={handleSaveClick(id)}
            />,
            <GridActionsCellItem
              icon={<CancelIcon />}
              label="Cancel"
              className="textPrimary"
              onClick={handleCancelClick(id)}
              color="inherit"
            />,
          ];
        }

        return [
          <GridActionsCellItem
            icon={<EditIcon />}
            label="Edit"
            className="textPrimary"
            onClick={handleEditClick(id)}
            color="inherit"
          />,
          <GridActionsCellItem
            icon={<DeleteIcon />}
            label="Delete"
            onClick={handleDeleteClick(id)}
            color="inherit"
          />,
        ];
      },
    },
  ];
  oData.oColumns.forEach((x) => {
    oColumns.unshift(x);
  });
  const oSetFocus = oColumns[0].field;
  return (
    <Box
      sx={{
        pt: 4,
        "& .MuiDataGrid-cell": {
          borderBottom: "none",
          color: colors.dark,
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
          color: `${
            oTema === "light" ? colors.primaryDark : colors.green
          } !important`,
        },
        "& .actions": {
          color: colors.primaryDark,
        },
        "& .textPrimary": {
          color: colors.primary,
        },
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
        rows={rows}
        columns={oColumns}
        editMode="row"
        rowModesModel={rowModesModel}
        onRowModesModelChange={handleRowModesModelChange}
        onRowEditStop={handleRowEditStop}
        processRowUpdate={processRowUpdate}
        slots={{
          toolbar: EditToolbar,
        }}
        slotProps={{
          toolbar: { setRows, setRowModesModel, oData, oSetFocus },
        }}
      />
    </Box>
  );
};

export default TableInteractive;
