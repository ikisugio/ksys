import { useTheme, alpha } from "@mui/material/styles";
import { useState } from "react";
import { DataGrid, GridOverlay } from "@mui/x-data-grid";
import LinearProgress from "@mui/material/LinearProgress";
import CircularProgress from "@mui/material/CircularProgress";
import { jaJP } from "@mui/x-data-grid";
import DetailViewDrawer from "./DetailViewDrawer";
import { DETAIL_VIEW_WIDTH_RATIO } from "@/constants/styles";


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
  const [drawerWidth, setDrawerWidth] = useState(DETAIL_VIEW_WIDTH_RATIO);
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
  const selectedColor = alpha(theme.palette.primary.main, 0.3);

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
          resizableColumns={true}
          localeText={jaJP.components.MuiDataGrid.defaultProps.localeText}
          rows={rows}
          columns={columns}
          pageSize={5}
          checkboxSelection
          loading={loading}
          onRowClick={handleRowClick}
          getRowClassName={(params) => {
            return params.id === selectedRow ? "selectedRow" : "";
          }}
          components={{
            LoadingOverlay: CustomLoadingOverlay,
          }}
          sx={{
            "& .MuiDataGrid-columnHeaders": {
              backgroundColor: "#444",
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
              color: "#333",
            },
            "& .MuiCheckbox-root.Mui-checked": {
              color: "#333",
            },
            "& .MuiDataGrid-columnHeaderCheckbox .MuiCheckbox-root": {
              color: "white",
            },
            "& .MuiDataGrid-cell": {
              borderRight: "1px solid #ccc",
            },
            "& .MuiDataGrid-cell:focus": {
              outline: "none",
            },
            "& .MuiDataGrid-cell:selected": {
              borderRight: "10px #fff",
            },
            "& .MuiDataGrid-columnHeader:focus, & .MuiDataGrid-columnHeader:focus-within":
              {
                outline: "none",
              },
          }}
        />
        {isDrawerOpen && (
          <DetailViewDrawer
            isDrawerOpen={isDrawerOpen}
            handleDrawerClose={handleDrawerClose}
            drawerWidth={drawerWidth}
            handleSliderChange={handleSliderChange}
            selectedRow={selectedRow}
          />
        )}
      </div>
    </div>
  );
};

export default MyDataGrid;
