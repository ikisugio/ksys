import { useState } from "react";
import axiosInstance from "@/services/axios";
import TextField from "@mui/material/TextField";
import IconButton from "@mui/material/IconButton";
import SearchIcon from "@mui/icons-material/Search";
import { API_URL } from "@/constants/urls";
import MyDataGrid from "@/components/MyDataGrid";

const JigyosyoTransactionList = () => {
  const [data, setData] = useState([]);
  const [query, setQuery] = useState("");

  const fetchData = (searchTerm) => {
    axiosInstance
      .get(`${API_URL}/api/search/jigyosyo/?q=${searchTerm}`)
      .then((response) => {
        const transformedData = response.data.map((item) => ({
          id: item.id,
          companyName: item.company.name,
          companyCode: item.company.company_code,
          companyAddress: item.company.address,
        }));
        setData(transformedData);
      })
      .catch((error) => {
        console.error("Error fetching data: ", error);
      });
  };

  const columns = [
    { field: "companyName", headerName: "法人名", width: 150 },
    { field: "companyCode", headerName: "法人コード", width: 120 },
    { field: "companyAddress", headerName: "法人住所", width: 200 },
  ];

  const handleSearchChange = (event) => {
    setQuery(event.target.value);
  };

  const handleSearchSubmit = (event) => {
    event.preventDefault();
    fetchData(query);
  };

  return (
    <div>
      <form
        onSubmit={handleSearchSubmit}
        style={{ display: "flex", alignItems: "center" }}
      >
        <TextField
          label="Search"
          variant="outlined"
          value={query}
          onChange={handleSearchChange}
          fullWidth
          margin="normal"
        />
        <IconButton type="submit">
          <SearchIcon />
        </IconButton>
      </form>
      <div style={{ height: 500, width: "100%" }}>
        <MyDataGrid rows={data} columns={columns} />
      </div>
    </div>
  );
};

export default JigyosyoTransactionList;
