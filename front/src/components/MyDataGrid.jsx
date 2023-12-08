import { useTheme } from "@mui/material/styles";
import { useState } from "react";
import { DataGrid, GridOverlay } from "@mui/x-data-grid";
import LinearProgress from "@mui/material/LinearProgress";
import CircularProgress from "@mui/material/CircularProgress";
import { jaJP } from "@mui/x-data-grid";
import { Paper } from "@mui/material";
import Button from "@mui/material/Button";
import Slider from "@mui/material/Slider";

// function CustomLoadingOverlay1() {
//   return (
//     <GridOverlay>
//       <LinearProgress />
//     </GridOverlay>
//   );
// }

function CustomLoadingOverlay() {
  return (
    <GridOverlay>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          height: "100%",
        }}
      >
        <CircularProgress />
      </div>
    </GridOverlay>
  );
}

const MyDataGrid = ({ rows, columns, loading }) => {
  const theme = useTheme();
  const [selectedRow, setSelectedRow] = useState(null);
  const [drawerWidth, setDrawerWidth] = useState(50);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const handleRowClick = (params) => {
    setSelectedRow(params.row);
    setIsDrawerOpen(true);
  };
  const handleDrawerClose = () => {
    setIsDrawerOpen(false);
  };
  const handleSliderChange = (event, newValue) => {
    setDrawerWidth(newValue);
  };

  return (
    <div>
      <div style={{ height: 500, width: "1000px", overflowX: "auto" }}>
        <DataGrid
          localeText={jaJP.components.MuiDataGrid.defaultProps.localeText}
          rows={rows}
          columns={columns}
          pageSize={5}
          checkboxSelection
          loading={loading}
          onRowClick={handleRowClick}
          components={{
            LoadingOverlay: CustomLoadingOverlay,
          }}
          sx={{
            "& .MuiDataGrid-columnHeaders": {
              backgroundColor: "#678",
              color: "#fafafa",
            },
            "& .MuiDataGrid-row:nth-of-type(odd)": {
              backgroundColor: "#f0f0f0",
            },
          }}
        />
        {isDrawerOpen && (
          <Paper
            style={{
              width: `${drawerWidth}%`,
              height: "80%",
              position: "fixed",
              right: 0,
              bottom: 0,
              overflow: "auto",
              transition: "transform 0.3s ease-in-out",
              transform: isDrawerOpen ? "translateX(0)" : "translateX(100%)",
            }}
          >
            <Button onClick={handleDrawerClose}>閉じる</Button>
            <Slider
              value={drawerWidth}
              onChange={handleSliderChange}
              min={20}
              max={80}
              style={{ width: "90%", margin: "0 auto" }}
            />
            <div style={{ padding: 20 }}>
              {selectedRow && JSON.stringify(selectedRow, null, 2)}
            </div>
          </Paper>
        )}
      </div>
    </div>
  );
};

export default MyDataGrid;
