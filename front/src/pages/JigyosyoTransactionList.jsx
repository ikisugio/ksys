import { useState, useEffect } from "react";
import { Box, IconButton, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Button } from "@mui/material";
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import axiosInstance from "@/services/axios";
import { API_URL } from "@/constants/urls";
import MyDataGrid from "@/components/MyDataGrid";
import { TRANSACTION_FIELDS, AUXILIARY_FIELDS } from "@/constants/transaction-fields";
import { useNavigate } from 'react-router-dom';


const JigyosyoTransactionList = () => {
  const [transactions, setTransactions] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [deleteTransaction, setDeleteTransaction] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    fetchTransactions();
  }, []); 

  const fetchTransactions = () => {
    setIsLoading(true);
    axiosInstance
      .get(`${API_URL}/api/jigyosyo-transaction/`)
      .then((response) => {
        const formattedData = response.data.map(item => ({
          ...item,
          visit_date: item.visit_date ? new Date(item.visit_date) : null, // 日付データをDateオブジェクトに変換
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
    axiosInstance.delete(`${API_URL}/api/jigyosyo-transaction/${transactionToDelete.id}`)
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
          <IconButton onClick={() => handleDeleteClick(params.row)}>
            <DeleteIcon />
          </IconButton>
          <IconButton onClick={() => handleEdit(params.row)}>
            <EditIcon />
          </IconButton>
        </>
      )
    },
    ...TRANSACTION_FIELDS.concat(AUXILIARY_FIELDS).filter(field => field.name !== "management").map(field => ({
      field: field.name,
      headerName: field.label,
      width: 150,
      type: field.type,
    }))
  ];

  return (
    <Box sx={{ display: "flex", justifyContent: "center", width: "100%" }}>
      <MyDataGrid
        rows={transactions}
        columns={columns}
        loading={isLoading}
      />
      <Dialog
        open={dialogOpen}
        onClose={handleDialogClose}
      >
        <DialogTitle>削除確認</DialogTitle>
        <DialogContent>
          <DialogContentText>
            {`事業所名: ${transactionToDelete?._jigyosyo_name || ''}, 訪問日: ${transactionToDelete?.visit_date || ''}`}
            を削除してもよろしいですか？
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

