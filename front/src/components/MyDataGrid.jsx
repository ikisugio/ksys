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

const dummyData = [
  {
    datetime: "2023-11-24 12:11",
    person: "加藤",
    location: "株式会社テック",
    details: "サービス契約",
  },
  {
    datetime: "2023-11-18 12:11",
    person: "小林",
    location: "株式会社サンプル",
    details: "サービス契約",
  },
  {
    datetime: "2023-10-09 12:11",
    person: "加藤",
    location: "株式会社イノベーション",
    details: "サービス契約",
  },
  {
    datetime: "2023-10-01 12:11",
    person: "佐藤",
    location: "株式会社サンプル",
    details: "マーケティング協力",
  },
  {
    datetime: "2023-09-09 12:11",
    person: "佐藤",
    location: "株式会社サンプル",
    details: "サービス契約",
  },
  {
    datetime: "2023-08-16 12:11",
    person: "中村",
    location: "株式会社イノベーション",
    details: "商品購入",
  },
  {
    datetime: "2023-07-29 12:11",
    person: "伊藤",
    location: "株式会社サンプル",
    details: "システム開発",
  },
  {
    datetime: "2023-07-01 12:11",
    person: "加藤",
    location: "株式会社テック",
    details: "マーケティング協力",
  },
  {
    datetime: "2023-06-26 12:11",
    person: "渡辺",
    location: "株式会社サンプル",
    details: "システム開発",
  },
  {
    datetime: "2023-06-21 12:11",
    person: "加藤",
    location: "株式会社イノベーション",
    details: "コンサルティング提供",
  },
  {
    datetime: "2023-05-18 12:11",
    person: "佐藤",
    location: "株式会社イノベーション",
    details: "商品購入",
  },
  {
    datetime: "2023-04-28 12:11",
    person: "伊藤",
    location: "株式会社サンプル",
    details: "システム開発",
  },
  {
    datetime: "2023-03-25 12:11",
    person: "加藤",
    location: "株式会社グローバル",
    details: "マーケティング協力",
  },
  {
    datetime: "2023-03-25 12:11",
    person: "小林",
    location: "株式会社グローバル",
    details: "商品購入",
  },
  {
    datetime: "2023-03-14 12:11",
    person: "伊藤",
    location: "株式会社データソリューション",
    details: "商品購入",
  },
  {
    datetime: "2023-02-18 12:11",
    person: "佐藤",
    location: "株式会社サンプル",
    details: "コンサルティング提供",
  },
  {
    datetime: "2023-02-13 12:11",
    person: "高橋",
    location: "株式会社グローバル",
    details: "システム開発",
  },
  {
    datetime: "2023-02-07 12:11",
    person: "佐藤",
    location: "株式会社サンプル",
    details: "システム開発",
  },
  {
    datetime: "2023-02-06 12:11",
    person: "渡辺",
    location: "株式会社サンプル",
    details: "マーケティング協力",
  },
  {
    datetime: "2023-01-05 12:11",
    person: "加藤",
    location: "株式会社データソリューション",
    details: "コンサルティング提供",
  },
];

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

  const renderSlideDrawerButton = (params) => (
    <button onClick={() => handleRowClick(params)}>Open Drawer</button>
  );

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
    ...columns, // 他の列定義
  ];

  const hoveredColor = alpha(theme.palette.primary.main, 0.8);
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
      <div style={{ width: "90vw", overflowX: "auto" }}>
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
            open={Boolean(selectedRow)}
            onClose={() => setSelectedRow(null)}
          >
            <DrawerButton
              isOpen={Boolean(selectedRow)}
              leftData={selectedRow}
              rightData={dummyData}
              onClose={() => setSelectedRow(null)}
            />
          </Drawer>
        )}
      </div>
    </div>
  );
};

export default MyDataGrid;
