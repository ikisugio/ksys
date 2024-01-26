import { useState, useEffect } from "react";
import { Box, Chip, Menu, MenuItem } from "@mui/material";
import axiosInstance from "@/services/axios";
import { API_URL } from "@/constants/urls";
import MyDataGrid from "@/components/MyDataGrid";
import DrawerButton from "@/components/DrawerButton";
import SearchBar from "@/components/SearchBar";
import SliderFilter from "@/components/SliderFilter";
import Drawer from "@mui/material/Drawer";
import { searchDataColumns } from "@/constants/columns";
import { dummyTransactionData } from "@/constants/dummy";
import { filterLabels } from "@/constants/labels";
import TransactionViewerByJigyosyo from "@/components/TransactionViewerByJigyosyo";

const JigyosyoSearch = () => {
  const [data, setData] = useState([]);
  const [query, setQuery] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [selectedRow, setSelectedRow] = useState(null);

  const handleFilterSelect = (filterValue) => {
    console.log("Selected Filter: ", filterValue);
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

  const handleSearchSubmit = (event) => {
    event.preventDefault();
    fetchData(query);
  };

  const headerMapping = searchDataColumns.reduce((acc, col) => {
    acc[col.field] = col.headerName;
    return acc;
  }, {});

  const transformDataForDisplay = (data) => {
    if (!data || typeof data !== "object") {
      return [];
    }

    return Object.entries(data).map(([key, value], index) => {
      let displayValue = value;

      // 日時のフォーマットを変更
      if (key.includes("Datetime")) {
        const date = new Date(value);
        displayValue = date.toLocaleString("ja-JP");
      }

      // URLをリンクとして表示
      if (key.includes("Url")) {
        displayValue = (
          <a href={value} target="_blank" rel="noopener noreferrer">
            {value}
          </a>
        );
      }

      if (key === "jigyosyoAddress" || key === "companyAddress") {
        const encodedAddress = encodeURIComponent(value);
        const googleMapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodedAddress}`;
        displayValue = (
          <a href={googleMapsUrl} target="_blank" rel="noopener noreferrer">
            {value}
          </a>
        );
      }

      if (key === "jigyosyoCode") {
        const jigyosyoUrl = `https://www.kaigokensaku.mhlw.go.jp/01/index.php?action_kouhyou_detail_006_kihon=true&JigyosyoCd=${value}-00&ServiceCd=150`;
        displayValue = (
          <a href={jigyosyoUrl} target="_blank" rel="noopener noreferrer">
            {value}
          </a>
        );
      }

      const headerName = headerMapping[key] || key;
      return {
        key: `${headerName}-${index}`,
        title: headerName,
        data: displayValue,
      };
    });
  };

  return (
    <Box sx={{ display: "flex", justifyContent: "center", width: "100%" }}>
      <div
        style={{
          width: "100%",
          maxWidth: "1200px",
        }}
      >
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-evenly",
            alignItems: "center",
            marginBottom: "5px",
          }}
        >
          <Box sx={{ width: "45%" }}>
            <SearchBar
              query={query}
              onQueryChange={(e) => setQuery(e.target.value)}
              onSearch={handleSearchSubmit}
            />
          </Box>
          <Box sx={{ width: "45%" }}>
            <SliderFilter
              filters={filterLabels}
              onSelect={handleFilterSelect}
            />
          </Box>
        </Box>
        <MyDataGrid
          rows={data}
          columns={searchDataColumns}
          loading={isLoading}
          transformDataForDisplay={transformDataForDisplay}
          DrawerContent={TransactionViewerByJigyosyo}
        />
        {/* {selectedRow && (
          <DrawerButton
            leftData={transformDataForDisplay(selectedRow)}
            rightData={transactionData}
          />
        )} */}
      </div>
    </Box>
  );
};

export default JigyosyoSearch;
