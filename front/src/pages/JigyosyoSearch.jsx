import { useState } from "react";
import axiosInstance from "@/services/axios";
import { API_URL } from "@/constants/urls";
import MyDataGrid from "@/components/MyDataGrid";
import SearchBar from "@/components/SearchBar";
import LinearProgress from "@mui/material/LinearProgress";
import Drawer from "@mui/material/Drawer";

const JigyosyoSearch = () => {
  const [data, setData] = useState([]);
  const [query, setQuery] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [selectedRow, setSelectedRow] = useState(null);

  const handleRowClick = (params) => {
    console.log("Row clicked: ", params.row);
    setSelectedRow(params.row);
  };

  const fetchData = (searchTerm) => {
    setIsLoading(true);
    axiosInstance
      .get(`${API_URL}/api/search/jigyosyo/?q=${searchTerm}`)
      .then((response) => {
        const transformedData = response.data.map((item) => ({
          id: item.id,
          jigyosyoCode: item.jigyosyo_code,
          jigyosyoType: item.type,
          jigyosyoName: item.name,
          jigyosyoPostalCode: item.postal_code,
          jigyosyoAddress: item.address,
          jigyosyoTel: item.tel_number,
          jigyosyoFax: item.fax_number,
          jigyosyoReprName: item.repr_name,
          jigyosyoReprPosition: item.repr_position,
          jigyosyoUrl: item.kourou_jigyosyo_url,
          jigyosyoReleaseDatetime: item.kourou_release_datetime,
          companyCode: item.company.company_code,
          companyName: item.company.name,
          companyKana: item.company.name_kana,
          companyPostalCode: item.company.postal_code,
          companyAddress: item.company.address,
          companyTel: item.company.tel_number,
          companyFax: item.company.fax_number,
          companyUrl: item.company.url,
          companyReprName: item.company.repr_name,
          companyReprPosition: item.company.repr_position,
          companyEstablishedDate: item.company.established_date,
          companyReleaseDatetime: item.company.release_datetime,
        }));
        setData(transformedData);
      })
      .catch((error) => {
        console.error("Error fetching data: ", error);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  const columns = [
    { field: "jigyosyoCode", headerName: "事業所コード", width: 130 },
    { field: "jigyosyoType", headerName: "事業所タイプ", width: 150 },
    { field: "jigyosyoName", headerName: "事業所名", width: 150 },
    { field: "jigyosyoPostalCode", headerName: "事業所郵便番号", width: 120 },
    { field: "jigyosyoAddress", headerName: "事業所住所", width: 200 },
    { field: "jigyosyoTel", headerName: "事業所電話番号", width: 130 },
    { field: "jigyosyoFax", headerName: "事業所FAX番号", width: 130 },
    { field: "jigyosyoReprName", headerName: "事業所代表者名", width: 150 },
    {
      field: "jigyosyoReprPosition",
      headerName: "事業所代表者の役職",
      width: 150,
    },
    { field: "jigyosyoUrl", headerName: "事業所URL", width: 150 },
    {
      field: "jigyosyoReleaseDatetime",
      headerName: "事業所公開日時",
      width: 150,
    },
    { field: "companyName", headerName: "法人名", width: 150 },
    { field: "companyCode", headerName: "法人コード", width: 120 },
    { field: "companyKana", headerName: "法人名（カナ）", width: 150 },
    { field: "companyPostalCode", headerName: "法人郵便番号", width: 120 },
    { field: "companyAddress", headerName: "法人住所", width: 200 },
    { field: "companyTel", headerName: "法人電話番号", width: 130 },
    { field: "companyFax", headerName: "法人FAX番号", width: 130 },
    { field: "companyUrl", headerName: "法人URL", width: 150 },
    { field: "companyReprName", headerName: "法人代表者名", width: 150 },
    { field: "companyReprPosition", headerName: "代表者の役職", width: 150 },
    { field: "companyEstablishedDate", headerName: "設立日", width: 130 },
    { field: "companyReleaseDatetime", headerName: "公開日時", width: 150 },
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
      <SearchBar
        query={query}
        onQueryChange={(e) => setQuery(e.target.value)}
        onSearch={handleSearchSubmit}
      />
      {isLoading && <LinearProgress />}
      <div style={{ height: 500, width: "100%" }}>
        <MyDataGrid
          rows={data}
          columns={columns}
          loading={isLoading}
          onRowClick={handleRowClick}
        />
      </div>
      <Drawer
        anchor="right"
        open={selectedRow != null}
        onClose={() => setSelectedRow(null)}
        style={{ width: "50%" }}
      >
        {selectedRow && (
          <div style={{ padding: 20, width: "50%" }}>
            {JSON.stringify(selectedRow, null, 2)}
          </div>
        )}
      </Drawer>
    </div>
  );
};

export default JigyosyoSearch;
