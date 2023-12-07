import { useTheme } from "@mui/material/styles";
import { DataGrid } from "@mui/x-data-grid";
import { jaJP } from "@mui/x-data-grid";

const MyDataGrid = ({ rows, columns }) => {
  const theme = useTheme(); // テーマを取得

  return (
    <div>
      <div style={{ height: 500, width: "100%" }}>
        <DataGrid
          localeText={jaJP.components.MuiDataGrid.defaultProps.localeText}
          rows={rows}
          columns={columns}
          pageSize={5}
          sx={{
            "& .MuiDataGrid-columnHeaders": {
              backgroundColor: theme.palette.primary.main,
              color: "#fafafa",
            },
            "& .MuiDataGrid-row:nth-of-type(odd)": {
              backgroundColor: "#f0f0f0",
            },
          }}
        />
      </div>
    </div>
  );
};

export default MyDataGrid;
