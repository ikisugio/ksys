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
import initialFormData from "@/constants/initialFormData";
import submitJigyosyoTransaction from "@/utilities/submitJigyosyoTransaction";
import createJigyosyoTransactionField from "@/utilities/createJigyosyoTransactionField";

const TransactionFormUI = (
  requestMethod,
  handleSearch,
  handleSearchResultSelect
) => {
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
  const createInputField = (field) => {
    createJigyosyoTransactionField(field);
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

  return (
    <div style={{ position: "relative" }}>
      <form
        onSubmit={(e) =>
          submitJigyosyoTransaction(requestMethod)(e, formData, navigator)
        }
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
