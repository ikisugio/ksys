import { useState, useEffect } from "react";
import {
  Box,
  IconButton,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Button,
} from "@mui/material";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import RemoveCircleOutlineIcon from "@mui/icons-material/RemoveCircleOutline";
import HelpOutlineIcon from "@mui/icons-material/HelpOutline";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import axiosInstance from "@/services/axios";
import { API_URL } from "@/constants/urls";
import TRANSACTION_LIST_FIELDS from "@/constants/TRANSACTION_LIST_FIELDS";
import MyDataGrid from "@/components/MyDataGrid";
import {
  TRANSACTION_FIELDS,
  AUXILIARY_FIELDS,
} from "@/constants/transaction-fields";
import { useNavigate } from "react-router-dom";
import {
  KEIKEI_KUBUN_CHOICES,
  SUPPORT_STATUS_CHOICES,
  SUPPORT_MEANS_CHOICES,
} from "@/constants/label-choices";

const JigyosyoTransactionList = () => {
  const [transactions, setTransactions] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [deleteTransaction, setDeleteTransaction] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    fetchTransactions();
  }, []);

  console.log("TRANSACTION_FIELDS", TRANSACTION_FIELDS);
  console.log("transactions", transactions);

  const convertValueToLabel = (value, choices) => {
    const choice = choices.find((choice) => choice.value === value);
    return choice ? choice.label : value;
  };

  const renderBooleanCell = (params) => {
    if (params.value === true) {
      return <CheckCircleOutlineIcon color="success" />;
    } else if (params.value === false || params.value === undefined) {
      return <RemoveCircleOutlineIcon color="disabled" />;
    }
  };

  const fetchTransactions = () => {
    setIsLoading(true);
    axiosInstance
      .get(`${API_URL}/api/jigyosyo-transaction/`)
      .then((response) => {
        const formattedData = response.data.map((item) => ({
          ...item,
          visit_date: item.visit_date ? new Date(item.visit_date) : null,
          keikei_kubun: convertValueToLabel(
            item.keikei_kubun,
            KEIKEI_KUBUN_CHOICES
          ),
          support_status: convertValueToLabel(
            item.support_status,
            SUPPORT_STATUS_CHOICES
          ),
          support_means: convertValueToLabel(
            item.support_means,
            SUPPORT_MEANS_CHOICES
          ),
        }));
        setTransactions(formattedData);
      })
      .catch((error) => {
        console.error("Error fetching transactions: ", error);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  const [dialogOpen, setDialogOpen] = useState(false); // ダイアログの表示状態
  const [transactionToDelete, setTransactionToDelete] = useState(null); // 削除するトランザクション

  const handleDeleteClick = (transaction) => {
    setTransactionToDelete(transaction);
    setDialogOpen(true);
  };

  const handleDialogClose = () => {
    setDialogOpen(false);
  };

  const handleConfirmDelete = () => {
    // 削除APIを呼び出し
    axiosInstance
      .delete(`${API_URL}/api/jigyosyo-transaction/${transactionToDelete.id}`)
      .then(() => {
        // 削除成功時の処理
        fetchTransactions();
      })
      .catch((error) => {
        console.error("Error deleting transaction: ", error);
      });

    setDialogOpen(false);
  };

  const handleCloseDialog = () => {
    setOpenDeleteDialog(false);
  };

  const handleEdit = (transaction) => {
    navigate(`/transaction/edit/${transaction.id}`);
  };

  const columns = [
    {
      field: "actions",
      headerName: "アクション",
      sortable: false,
      width: 100,
      renderCell: (params) => (
        <>
          <IconButton
            onClick={() => handleDeleteClick(params.row)}
            // style={{ color: "rgba(100, 30, 40, 0.5)" }}
          >
            <DeleteIcon />
          </IconButton>
          <IconButton
            onClick={() => handleEdit(params.row)}
            // style={{ color: "rgba(30, 100, 50, 0.5)" }}
          >
            <EditIcon />
          </IconButton>
        </>
      ),
    },
    ...TRANSACTION_LIST_FIELDS.filter(
      (object) => object.field !== "actions"
    ).map((field) => ({
      ...field,
      renderCell: field.type === "checkbox" ? renderBooleanCell : undefined,
    })),
  ];

  return (
    <Box sx={{ display: "flex", justifyContent: "center", width: "100%" }}>
      <MyDataGrid rows={transactions} columns={columns} loading={isLoading} />
      {console.log("TRANSACTIONS: ", transactions)}
      {console.log("COLUMNS: ", columns)}
      <Dialog open={dialogOpen} onClose={handleDialogClose}>
        <DialogTitle>削除確認</DialogTitle>
        <DialogContent>
          <DialogContentText>
            {`事業所名: ${transactionToDelete?._jigyosyo_name || ""}`}
          </DialogContentText>
          <DialogContentText>
            {`訪問日: ${transactionToDelete?.visit_date || ""}`}
          </DialogContentText>
          <DialogContentText>
            {`訪問メモ: ${transactionToDelete?.visit_memo || ""}`}
          </DialogContentText>
          <DialogContentText>
            <br />
            {`こちらを削除してもよろしいですか？`}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDialogClose}>キャンセル</Button>
          <Button onClick={handleConfirmDelete} color="primary">
            削除
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default JigyosyoTransactionList;
