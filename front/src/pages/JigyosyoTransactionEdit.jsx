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
} from "@/constants/TRANSACTION_FORM_UI_FIELDS";
import CustomDropdown from "../components/CustomDropdown";
import { useNavigate, useParams } from "react-router-dom";
import CustomTextField from "@/components/CustomTextField";
import initialFormData from "@/constants/initialFormData";
import TransactionFormUI from "@/components/TransactionFormUI";

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
        const response = await axiosInstance.get(
          `/jigyosyo-transaction/${id}`
        );
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

  return (
    <TransactionFormUI
      requestMethod="put"
      id={id}
      initialFormData={formData}
    ></TransactionFormUI>
  );
}
export default JigyosyoTransactionEdit;
