import { useTheme, alpha } from "@mui/material/styles";
import { useState } from "react";
import { DataGrid, GridOverlay } from "@mui/x-data-grid";
import LinearProgress from "@mui/material/LinearProgress";
import CircularProgress from "@mui/material/CircularProgress";
import { jaJP } from "@mui/x-data-grid";
import DetailViewDrawer from "./DetailViewDrawer";
import { DETAIL_VIEW_WIDTH_RATIO } from "@/constants/styles";
import DrawerButton from "@/components/DrawerButton";
import { Drawer } from "@mui/material";
import NoRowsOverlay from "@/components/NoRowsOverlay";
import { dummyTransactionDataLong } from "@/constants/dummy";

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

const dummyData = dummyTransactionDataLong;

const MyDataGrid = ({
  rows,
  columns,
  loading,
  transformDataForDisplay,
  DrawerContent,
  onDrawerOpen,
  ...rest
}) => {
  const theme = useTheme();
  const [mainData, setMainData] = useState(null);
  const [drawerWidth, setDrawerWidth] = useState(DETAIL_VIEW_WIDTH_RATIO);
  const [selectedRow, setSelectedRow] = useState(null);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const handleRowClick = (params) => {
    setSelectedRow(params.row);
    setIsDrawerOpen(true);
  };

  const handleDrawerClose = () => {
    setIsDrawerOpen(false);
  };

  const renderDrawerButton = (params) => (
    <button onClick={() => handleRowClick(params.row)}>Open Drawer</button>
  );

  const extendedColumns = [
    {
      field: "openDrawer",
      headerName: "",
      renderCell: renderDrawerButton,
      width: 100,
      sortable: false,
      filterable: false,
    },
    ...columns,
  ];

  const hoveredColor = alpha(theme.palette.primary.main, 0.6);
  const selectedColor = alpha(theme.palette.primary.main, 0.3);

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        width: "100%",
        height: "73vh",
      }}
    >
      <div
        style={{ width: "90vw", overflowX: "auto" }}
        className="datagrid-container"
      >
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

        <div style={{ height: "4px" }}>
          {loading ? <LinearProgress /> : null}
        </div>
        <div style={{ height: "calc(100% - 13px)" }}>
          <DataGrid
            className="datagrid"
            resizableColumns={true}
            localeText={jaJP.components.MuiDataGrid.defaultProps.localeText}
            rows={rows}
            columns={columns}
            rowHeight={45}
            pageSize={5}
            checkboxSelection
            loading={loading}
            onRowClick={handleRowClick}
            getRowClassName={(params) => {
              return params.id === selectedRow ? "selectedRow" : "";
            }}
            components={{
              LoadingOverlay: CustomLoadingOverlay,
              NoRowsOverlay: NoRowsOverlay,
            }}
            sx={{
              "& .MuiDataGrid-columnHeaders": {
                backgroundColor: "#555",
                color: "#fff",
                minHeight: "45px !important",
                height: "45px !important",
              },
              "& .MuiDataGrid-footerContainer": {
                height: "35px",
                minHeight: "35px",
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
        </div>
        {selectedRow && (
          <Drawer
            anchor="right"
            open={isDrawerOpen}
            onClose={handleDrawerClose}
          >
            <div style={{ width: "80vw", maxWidth: "80vw" }}>
              {DrawerContent ? (
                <DrawerContent selectedRowData={selectedRow} />
              ) : (
                <div style={{ padding: "1em" }}>
                  <h3>Row Details</h3>
                  <div>{JSON.stringify(selectedRow, null, 2)}</div>
                </div>
              )}
            </div>
          </Drawer>
        )}
      </div>
    </div>
  );
};

export default MyDataGrid;
