import { useState, useEffect } from "react";
import axiosInstance from "@/services/axios";
import InputAdornment from "@mui/material/InputAdornment";
import SaveIcon from "@mui/icons-material/Save";
import SearchIcon from "@mui/icons-material/Search";
import { useTheme } from "@mui/material/styles";
import {
  TextField,
  Grid,
  Button,
  Checkbox,
  FormControlLabel,
  Select,
  MenuItem,
  IconButton,
  InputLabel,
  FormControl,
  CircularProgress,
  Typography,
  Paper,
  Box,
  Switch,
} from "@mui/material";
import {
  TRANSACTION_FIELDS,
  AUXILIARY_FIELDS,
} from "@/constants/transaction-fields";
import CustomDropdown from "../components/CustomDropdown";
import { useNavigate } from "react-router-dom";
import ManagementDisplayTable from "@/components/ManagementDisplayTable";
import CustomTextField from "@/components/CustomTextField";
import StaffDetailInput from "@/components/StaffDetailInput";
import INITIAL_FORM_DATA from "@/constants/initialFormData";
import submitJigyosyoTransaction from "@/utilities/submitJigyosyoTransaction";

const initialStaffDetails = [{ staff_name: "", position: "" }];

const initialTableItems = [
  { label: "事業所コード", value: "", name: "jigyosyo_code" },
  { label: "独自コード", value: "", name: "custom_code" },
  { label: "法人名", value: "", name: "company.name" },
  { label: "事業所名", value: "", name: "name" },
  { label: "サービス種別", value: "", name: "type" },
  { label: "職員数", value: "", name: "number_of_member" },
  { label: "開業日", value: "", name: "established_date" },
  { label: "住所", value: "", name: "address" },
  { label: "電話番号", value: "", name: "tel_number" },
  { label: "代表者名", value: "", name: "repr_name" },
  { label: "選任状況", value: "", name: "koyoukanri_sekinin_status" },
  { label: "賛助会員", value: "", name: "supporting_member" },
];

const TransactionFormUI = ({
  requestMethod,
  id,
  initialFormData = INITIAL_FORM_DATA,
}) => {
  console.log("req", requestMethod);
  console.log("id", id);
  console.log("initialData", initialFormData);
  const [formData, setFormData] = useState(initialFormData);
  const [tableItems, setTableItems] = useState(initialTableItems);
  const [staffDetails, setStaffDetails] = useState(initialStaffDetails);
  const [isOpenCustomDropdown, setIsOpenCustomDropdown] = useState(false);
  const [searchText, setSearchText] = useState("");
  const [searchFormattedResults, setSearchFormattedResults] = useState(null);
  const [searchResults, setSearchResults] = useState([]);
  const [selectedResult, setSelectedResult] = useState(null);
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState("info");
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();
  const theme = useTheme();
  const MINIMUM_VISIT_MEMO_LINES = 10;

  const navigator = {
    navigate,
    setOpenSnackbar,
    setSnackbarMessage,
    setSnackbarSeverity,
  };

  const handleSearch = async (e) => {
    const query = searchText;
    console.log("handle search", query);

    try {
      const response = await axiosInstance.get(
        `http://localhost:8000/api/search/jigyosyo/?q=${query}`
      );
      const formattedResults = response.data.map((item) => ({
        label: `事業所コード : ${item.company.company_code}\n事業所名     : ${item.company.name}`,
        value: item,
      }));
      console.log("responsedata =>", response.data);
      setSearchFormattedResults(formattedResults);
      console.log("searchFormattedResults: ", searchFormattedResults);
      setSearchResults(response.data);
      setIsOpenCustomDropdown(true);
    } catch (error) {
      console.error("APIからデータを取得中にエラーが発生しました:", error);
      setIsOpenCustomDropdown(false);
    }
  };

  const handleModify = () => {
    console.log("modify");
  };

  const handleSearchResultSelect = (selected) => {
    console.log("SSSSS", selected);
    console.log("LLLLL", tableItems);
    const updatedTableItems = tableItems.map((item) => {
      switch (item.name) {
        case "jigyosyo_code":
          return { ...item, value: selected.jigyosyo_code };
        case "custom_code":
          return { ...item, value: selected.custom_code };
        case "company.name":
          return { ...item, value: selected.company.name };
        case "name":
          return { ...item, value: selected.name };
        case "type":
          return { ...item, value: selected.type };
        case "number_of_member":
          return { ...item, value: selected.numberOfMember };
        case "established_date":
          return { ...item, value: selected.establishedDate };
        case "address":
          return { ...item, value: selected.address };
        case "tel_number":
          return { ...item, value: selected.tel_number };
        case "repr_name":
          return { ...item, value: selected.repr_name };
        case "koyoukanri_sekinin_status":
          return { ...item, value: selected.koyoukanri_sekinin_status };
        case "supporting_member":
          return { ...item, value: selected.supportingMember };
        default:
          return item;
      }
    });

    setTableItems(updatedTableItems);
    setIsOpenCustomDropdown(false);
  };

  const createInputField = (field) => {
    if (field.name === "_jigyosyo_code") {
      return (
        <div key={field.name} style={{ position: "relative" }}>
          <CustomTextField
            field={field}
            formData={formData}
            handleChange={handleChange}
          />
          <CustomDropdown
            options={searchFormattedResults}
            onSelect={(selected) => {
              handleSearchResultSelect(selected);
              setSearchResults([]);
            }}
            isOpen={searchResults.length > 0}
            setIsOpen={(isOpen) =>
              setSearchResults(isOpen ? searchResults : [])
            }
          />
        </div>
      );
    }
    if (field.name === "jigyosyo_custom_code") {
      return (
        <TextField
          key={field.name}
          name={field.name}
          label="事業所独自コード"
          type="text"
          value={formData[field.name] || ""}
          onChange={handleChange}
          fullWidth
          margin="normal"
          variant="outlined"
        />
      );
    }
    switch (field.type) {
      case "text":
        if (field.name === "visit_memo") {
          return (
            <TextField
              key={field.name}
              name={field.name}
              label={field.label}
              type={field.type}
              value={formData[field.name] || ""}
              onChange={handleChange}
              fullWidth
              margin="normal"
              variant="outlined"
              multiline
              rows={formData.visit_memo_rows || MINIMUM_VISIT_MEMO_LINES}
            />
          );
        }
        return (
          <TextField
            key={field.name}
            name={field.name}
            label={field.label}
            type={field.type}
            value={formData[field.name] || ""}
            onChange={handleChange}
            fullWidth
            margin="normal"
            variant="outlined"
          />
        );
      case "file":
        return (
          <FormControl
            fullWidth
            margin="normal"
            variant="outlined"
            key={field.name}
            style={{ border: "none" }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                marginTop: "8px",
              }}
            >
              <Button
                variant="contained"
                component="label"
                style={{ marginRight: "1em" }}
              >
                ファイルを選択
                <input
                  type="file"
                  hidden
                  onChange={(e) =>
                    handleChange({
                      target: {
                        name: field.name,
                        value: e.target.files[0]?.name || "",
                      },
                    })
                  }
                />
              </Button>
              <div style={{ color: "gray" }}>
                {formData[field.name] || "ファイルは選択されていません"}
              </div>
            </div>
          </FormControl>
        );
      case "date":
        return (
          <TextField
            key={field.name}
            name={field.name}
            label={field.label}
            type="date"
            value={formData[field.name] || ""}
            onChange={handleChange}
            fullWidth
            margin="normal"
            variant="outlined"
            InputLabelProps={{ shrink: true }}
            InputProps={{
              inputProps: {
                format: "yyyy-MM-dd",
              },
            }}
          />
        );
      case "select":
        return (
          <FormControl
            fullWidth
            margin="normal"
            variant="outlined"
            key={field.name}
          >
            <InputLabel htmlFor={field.name}>{field.label}</InputLabel>
            <Select
              name={field.name}
              value={formData[field.name] || ""}
              onChange={handleChange}
              label={field.label}
            >
              {field.options.map((option, index) => (
                <MenuItem key={index} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        );
      case "checkbox":
        return (
          <FormControlLabel
            control={
              <Switch
                name={field.name}
                checked={!!formData[field.name]}
                onChange={handleChange}
              />
            }
            label={field.label}
            style={{ marginTop: "1em", marginBottom: "1em" }}
          />
        );
      default:
        return null;
    }
  };

  const visitMemoField = TRANSACTION_FIELDS.find(
    (field) => field.name === "visit_memo"
  );
  const fileField = TRANSACTION_FIELDS.find((field) => field.type === "file");
  const fieldsWithoutVisitMemoAndFile = TRANSACTION_FIELDS.filter(
    (field) => field.name !== "visit_memo" && field.type !== "file"
  );
  const orderedFields = [
    ...fieldsWithoutVisitMemoAndFile,
    fileField,
    visitMemoField,
  ];
  const normalFields = orderedFields.filter(
    (field) => field.type !== "checkbox" && field.name !== "visit_memo"
  );
  const checkboxFields = orderedFields.filter(
    (field) => field.type === "checkbox"
  );

  const handleChange = (e) => {
    const { name, value, checked, type } = e.target;
    let newFormData = {
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    };

    if (name === "visit_memo") {
      const lineCount = value.split("\n").length;
      const minRows = MINIMUM_VISIT_MEMO_LINES;
      newFormData = {
        ...newFormData,
        visit_memo_rows: lineCount > minRows ? lineCount : minRows,
      };
    }

    setFormData(newFormData);
  };

  const groupCheckboxFields = () => {
    const checkboxFields = TRANSACTION_FIELDS.filter(
      (field) => field.type === "checkbox"
    );
    const groupedFields = {};
    const NON_EXISTS_STRING = "";

    checkboxFields.forEach((field) => {
      const mLabel = field.mLabelGroup || NON_EXISTS_STRING;
      const sLabel = field.sLabelGroup || NON_EXISTS_STRING;

      if (!groupedFields[mLabel]) {
        groupedFields[mLabel] = {};
      }

      if (!groupedFields[mLabel][sLabel]) {
        groupedFields[mLabel][sLabel] = [];
      }

      groupedFields[mLabel][sLabel].push(field);
    });

    return groupedFields;
  };

  const checkboxGroups = groupCheckboxFields();
  console.log("formData", formData);

  const formatDataForTable = (fields, formData) => {
    return fields
      .filter((field) => field.isDisplay)
      .map((field) => ({
        label: field.label,
        value: formData[field.name] || "",
      }));
  };

  return (
    <div style={{ marginTop: "1em" }}>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          submitJigyosyoTransaction(requestMethod)(e, formData, navigator, id);
        }}
      >
        <Grid
          container
          justifyContent="space-around"
          style={{
            height: "90vh",
          }}
        >
          {/* 左カラム */}
          <Grid
            item
            xs={5}
            style={{
              padding: "1em 2em",
              height: "100%",
              overflowY: "auto",
              overflowX: "hidden",
              borderRight: "2px solid lightgrey",
              overflow: "visible",
            }}
          >
            <div style={{ direction: "ltr" }}>
              <div className="flex items-center w-full gap-2 mb-4">
                <div style={{ flexGrow: 1, position: "relative" }}>
                  <TextField
                    fullWidth={true}
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="end">
                          <IconButton onClick={handleSearch}>
                            <SearchIcon />
                          </IconButton>
                        </InputAdornment>
                      ),
                      inputProps: {
                        style: { fontSize: "20px", padding: "0.4em 1.0em" },
                      },
                    }}
                    value={searchText}
                    onChange={(e) => setSearchText(e.target.value)}
                  />
                  {isOpenCustomDropdown && (
                    <CustomDropdown
                      isOpen={isOpenCustomDropdown}
                      setIsOpen={setIsOpenCustomDropdown}
                      options={searchFormattedResults}
                      onSelect={handleSearchResultSelect}
                      style={{
                        position: "absolute",
                        top: "100%",
                        left: 0,
                        right: 0,
                        zIndex: 1000,
                      }}
                    />
                  )}
                </div>

                <Button
                  variant="contained"
                  color="primary"
                  onClick={handleSearch}
                >
                  検索
                </Button>
                <Button
                  variant="contained"
                  color="success"
                  onClick={handleModify}
                >
                  修正
                </Button>
              </div>
              <ManagementDisplayTable items={tableItems} />
            </div>
          </Grid>

          {/* 右カラム */}
          <Grid
            item
            xs={7}
            style={{
              padding: "1em 2em",
              height: "100%",
              overflow: "auto",
              margin: "0",
            }}
          >
            <Grid item xs={12}>
              <StaffDetailInput
                staffDetails={staffDetails}
                setStaffDetails={setStaffDetails}
              />
            </Grid>
            <Grid container spacing={2}>
              {/* 通常の入力フィールドを2つのサブカラムに分割 */}
              <Grid item xs={6}>
                {normalFields
                  .filter((_, index) => index % 2 === 0)
                  .map(createInputField)}
              </Grid>
              <Grid item xs={6}>
                {normalFields
                  .filter((_, index) => index % 2 !== 0)
                  .map(createInputField)}
              </Grid>

              {/* チェックボックスフィールド */}
              <Grid container item xs={12} spacing={2}>
                {Object.entries(checkboxGroups).map(
                  ([mLabelGroup, sLabelGroups], index) => {
                    const isSpecialGroup =
                      mLabelGroup === "雇用管理に係る支援（全員入力）" ||
                      mLabelGroup === "アドバイザーによる支援";

                    return (
                      <Grid key={mLabelGroup} item xs={isSpecialGroup ? 6 : 12}>
                        <Box
                          style={{
                            margin: "10px 0",
                            padding: "15px",
                            border: "1px solid lightgrey",
                            borderRadius: "4px",
                          }}
                        >
                          <Typography
                            variant="h6"
                            style={{ fontWeight: "bold", marginBottom: "10px" }}
                          >
                            {mLabelGroup}
                          </Typography>
                          {Object.entries(sLabelGroups).map(
                            ([sLabelGroup, fields], sIndex) => (
                              <Box key={sLabelGroup}>
                                {sIndex > 0 && (
                                  <hr style={{ margin: "10px 0" }} />
                                )}{" "}
                                {/* 中項目間の仕切り線 */}
                                <Typography
                                  variant="subtitle1"
                                  style={{
                                    fontWeight: "bold",
                                    marginLeft: "0.3em",
                                  }}
                                >
                                  {sLabelGroup}
                                </Typography>
                                <Grid container spacing={1}>
                                  {fields.map((field) => (
                                    <Grid item xs={6} key={field.name}>
                                      <FormControlLabel
                                        control={
                                          <Switch
                                            name={field.name}
                                            checked={!!formData[field.name]}
                                            onChange={handleChange}
                                          />
                                        }
                                        label={field.label}
                                        style={{ marginLeft: "0.5em" }}
                                      />
                                    </Grid>
                                  ))}
                                </Grid>
                              </Box>
                            )
                          )}
                        </Box>
                      </Grid>
                    );
                  }
                )}
              </Grid>
            </Grid>

            {/* visit_memo フィールド */}
            {createInputField(visitMemoField)}
            <Button
              type="submit"
              variant="contained"
              color="primary"
              style={{ marginTop: "20px" }}
            >
              保存
            </Button>
          </Grid>
        </Grid>
      </form>
    </div>
  );
};

export default TransactionFormUI;
