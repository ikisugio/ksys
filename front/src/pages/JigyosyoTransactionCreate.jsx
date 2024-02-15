import { useState } from "react";
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
} from "@mui/material";
import {
  TRANSACTION_FIELDS,
  AUXILIARY_FIELDS,
} from "@/constants/TRANSACTION_FORM_UI_FIELDS";
import CustomDropdown from "../components/CustomDropdown";
import { useNavigate } from "react-router-dom";
import CustomTextField from "@/components/CustomTextField";
import initialFormData from "@/constants/initialFormData";
import TransactionFormUI from "@/components/TransactionFormUI";

function JigyosyoTransactionForm() {
  const [formData, setFormData] = useState(initialFormData);
  const [searchCode, setSearchCode] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [selectedResult, setSelectedResult] = useState(null);
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState("info");
  const navigate = useNavigate();
  const theme = useTheme();
  const MINIMUM_VISIT_MEMO_LINES = 3;

  return <TransactionFormUI requestMethod="post"></TransactionFormUI>;
}
export default JigyosyoTransactionForm;
