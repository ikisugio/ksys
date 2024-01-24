import { useState, useEffect } from "react";
import axiosInstance from "@/services/axios";
import SaveIcon from "@mui/icons-material/Save";
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
} from "@mui/material";
import {
  TRANSACTION_FIELDS,
  AUXILIARY_FIELDS,
} from "@/constants/transaction-fields";
import CustomDropdown from "../components/CustomDropdown";
import { useNavigate } from "react-router-dom";
import CustomTextField from "@/components/CustomTextField";
import INITIAL_FORM_DATA from "@/constants/initialFormData";
import submitJigyosyoTransaction from "@/utilities/submitJigyosyoTransaction";

const TransactionFormUI = ({
  requestMethod,
  id,
  initialFormData = INITIAL_FORM_DATA,
}) => {
  console.log("req", requestMethod);
  console.log("id", id);
  console.log("initialData", initialFormData);
  const [formData, setFormData] = useState(initialFormData);
  const [searchCode, setSearchCode] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [selectedResult, setSelectedResult] = useState(null);
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState("info");
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();
  const theme = useTheme();
  const MINIMUM_VISIT_MEMO_LINES = 3;

  const navigator = {
    navigate,
    setOpenSnackbar,
    setSnackbarMessage,
    setSnackbarSeverity,
  };

  const handleSearch = async (e) => {
    const jigyosyoCode = formData["_jigyosyo_code"];
    const jigyosyoName = formData["_jigyosyo_name"];
    const jigyosyoAddress = formData["_jigyosyo_address"];
    console.log("jigyosyocode : ", jigyosyoCode);
    console.log("e is =>", jigyosyoCode);
    const query = jigyosyoCode || jigyosyoName || jigyosyoAddress;
    console.log("query is", query);

    try {
      const response = await axiosInstance.get(
        `http://localhost:8000/api/search/jigyosyo/?q=${query}`
      );
      console.log("responsedata =>", response.data);
      setSearchResults(response.data);
    } catch (error) {
      console.error("APIからデータを取得中にエラーが発生しました:", error);
    }
  };

  const handleSearchResultSelect = (selected) => {
    let updatedFormData = { ...formData };
    console.log("updateFormData:", updatedFormData);
    console.log("selected:", selected);

    updatedFormData["_jigyosyo_code"] = selected.jigyosyo_code;
    updatedFormData["_jigyosyo_custom_code"] = selected.custom_code;
    updatedFormData["_jigyosyo_name"] = selected.name;
    updatedFormData["_jigyosyo_postal_code"] = selected.postal_code;
    updatedFormData["_jigyosyo_address"] = selected.address;
    updatedFormData["_jigyosyo_tel_number"] = selected.tel_number;
    updatedFormData["_jigyosyo_fax_number"] = selected.fax_number;
    updatedFormData["_jigyosyo_repr_name"] = selected.repr_name;
    updatedFormData["_jigyosyo_repr_position"] = selected.repr_position;
    updatedFormData["_jigyosyo_kourou_url"] = selected.kourou_jigyosyo_url;
    updatedFormData["_jigyosyo_kourou_release_datetime"] =
      selected.kourou_release_datetime;

    if (selected.company) {
      updatedFormData["companyName"] = selected.company.name;
      updatedFormData["companyPostalCode"] = selected.company.postal_code;
    }

    setFormData(updatedFormData);
    setSearchResults([]);
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
            options={searchResults}
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
            key={field.name}
            control={
              <Checkbox
                name={field.name}
                checked={!!formData[field.name]}
                onChange={handleChange}
              />
            }
            label={field.label}
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

  return (
    <div style={{ position: "relative" }}>
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
            height: "80vh",
            overflow: "hidden",
            marginLeft: "0",
            marginBottom: "4em",
            paddingBottom: "1em",
            borderBottom: "1px solid lightgrey",
          }}
        >
          {/* 左カラム */}
          <Grid
            item
            xs={5}
            style={{
              padding: "0 3em",
              height: "100%",
              overflowY: "auto",
              overflowX: "hidden",
              direction: "rtl",
              borderRight: "2px solid lightgrey",
            }}
          >
            <div style={{ direction: "ltr" }}>
              {" "}
              {/* 内容は LTR 方向性 */}
              {AUXILIARY_FIELDS.filter((field) => field.isDisplay).map(
                createInputField
              )}
            </div>
          </Grid>

          {/* 右カラム */}
          <Grid
            item
            xs={7}
            style={{ padding: "0 3em", height: "100%", overflow: "auto" }}
          >
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
              <Grid
                container
                spacing={1}
                justifyContent="flex-end"
                style={{ paddingTop: "1.5em", paddingBottom: "1em" }}
              >
                <Grid item xs={5.8}>
                  {checkboxFields
                    .filter((_, index) => index % 2 === 0)
                    .map(createInputField)}
                </Grid>
                <Grid item xs={5.8}>
                  {checkboxFields
                    .filter((_, index) => index % 2 !== 0)
                    .map(createInputField)}
                </Grid>
              </Grid>
            </Grid>

            {/* visit_memo フィールド */}
            {createInputField(visitMemoField)}
          </Grid>
        </Grid>

        <div
          style={{
            position: "absolute",
            bottom: 15,
            left: 0, // 左端に配置
            right: 0, // 右端に配置
            display: "flex",
            justifyContent: "space-between", // 左右にボタンを寄せる
            alignItems: "center",
            padding: "0 50px", // 左右に余白を設定
          }}
        >
          {/* 検索ボタン */}
          <Button variant="contained" color="primary" onClick={handleSearch}>
            検索
          </Button>

          {/* 保存ボタン */}
          <IconButton
            type="submit"
            color="primary"
            style={{
              borderRadius: "5%",
              backgroundColor: theme.palette.primary.main,
              fontSize: "large",
            }}
          >
            <span style={{ padding: "0 0.2em", color: "white" }}>保存</span>
            <SaveIcon style={{ paddingRight: "0.1em", color: "white" }} />
          </IconButton>
        </div>
      </form>
    </div>
  );
};

export default TransactionFormUI;
