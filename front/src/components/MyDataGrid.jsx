import { useTheme, alpha } from "@mui/material/styles";
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

  const hoveredColor = alpha(theme.palette.primary.main, 0.8);
  const selectedColor = alpha(theme.palette.primary.main, 0.4);
  //   const hoveredColor = alpha(theme.palette.primary.main, 0.9);
  //   const selectedColor = alpha(theme.palette.primary.main, 0.4);

  return (
    <div>
      <div style={{ height: "75vh", width: "90vw", overflowX: "auto" }}>
        <style>
          {`
          ::-webkit-scrollbar {
            width: 12px;  /* スクロールバーの幅 */
            height: 12px;
          }

          ::-webkit-scrollbar-track {
            background: #f1f1f1;  /* トラックの背景色 */
            border-radius: 10px;  /* トラックの角丸設定 */
          }

          ::-webkit-scrollbar-thumb {
            background: #888;  /* サムの背景色 */
            border-radius: 10px;  /* サムの角丸設定 */
          }

          ::-webkit-scrollbar-thumb:hover {
            background: #555;  /* サムの背景色（ホバー時） */
          }
        `}
        </style>
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
              backgroundColor: "#333",
              color: "#fff",
            },
            "& .MuiDataGrid-row:nth-of-type(odd)": {
              backgroundColor: "#eee",
            },
            "& .MuiDataGrid-row:hover": {
              backgroundColor: hoveredColor,
              color: theme.palette.primary.contrastText,
              "&.Mui-selected": {
                backgroundColor: hoveredColor,
              },
            },
            "& .MuiDataGrid-row.Mui-selected": {
              backgroundColor: selectedColor,
            },
            "& .MuiCheckbox-root": {
              color: "#333", // チェックボックスの色を黄色に設定
            },
            "& .MuiCheckbox-root.Mui-checked": {
              color: "#333", // チェックされた状態のチェックボックスの色も黄色に設定
            },
            "& .MuiDataGrid-columnHeaderCheckbox .MuiCheckbox-root": {
              color: "white", // ヘッダーのチェックボックスの色を黄色に設定
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
