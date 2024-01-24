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
import { useNavigate, useParams } from "react-router-dom";
import CustomTextField from "@/components/CustomTextField";
import initialFormData from "@/constants/initialFormData"



function JigyosyoTransactionEdit() {
  const [formData, setFormData] = useState(initialFormData);
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState("info");
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();
  const theme = useTheme();
  const MINIMUM_VISIT_MEMO_LINES = 3;
  const { id } = useParams();



  useEffect(() => {
    const fetchTransactionData = async () => {
      try {
        const response = await axiosInstance.get(`http://localhost:8000/api/jigyosyo-transaction/${id}`);
        setFormData(response.data);
      } catch (error) {
        console.error("エラー発生:", error);
      } finally {
        setIsLoading(false);
      }
    };

    if (id) {
      fetchTransactionData();
    } else {
      setIsLoading(false);
    }
  }, [id]);

  if (isLoading) {
    return <CircularProgress />;
  }


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
      <form onSubmit={handleSubmit}>
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
}
export default JigyosyoTransactionEdit;
