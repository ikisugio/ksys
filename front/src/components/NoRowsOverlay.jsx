import React from "react";
import { GridOverlay } from "@mui/x-data-grid";
import Typography from "@mui/material/Typography";
import InfoIcon from "@mui/icons-material/Info";

function NoRowsOverlay() {
  return (
    <GridOverlay>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          height: "100%",
          gap: "20px",
        }}
      >
        <InfoIcon style={{ fontSize: 60, color: "#999" }} />
        <Typography variant="h5" style={{ color: "#999" }}>
          データがありません
        </Typography>
      </div>
    </GridOverlay>
  );
}

export default NoRowsOverlay;
