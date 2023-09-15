import { Box, Button, Modal } from "@mui/material";
import React, { useState } from "react";
import Header from "./Header";
import { useTheme } from "@emotion/react";
import { tokens } from "../theme";
import TableInteractive from "./TableInteractive";

const ModalTable = (oData) => {
  const oSetData = oData.oSetData();
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <div>
      <Button color="primary" variant="contained" onClick={handleOpen}>
        {oData.oTextButton}
      </Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: 400,
            bgcolor: theme.palette.mode === "dark" ? colors.dark : colors.white,
            boxShadow: 24,
            p: 4,
          }}
        >
          <Header
            title="Sustancias"
            subtitle="Sustancias que ingiere el familiar del paciente"
          />
          <TableInteractive
            oData={oData.oData}
            oColumns={oData.oColumns}
            oSetData={() => oSetData}
            oObject={oData.oObject}
          />
        </Box>
      </Modal>
    </div>
  );
};

export default ModalTable;
