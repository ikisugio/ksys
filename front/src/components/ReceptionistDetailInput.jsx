import { TextField, Button, MenuItem, Grid } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";

const ReceptionistDetailInput = ({
  receptionistDetails,
  setReceptionistDetails,
}) => {
  const addReceptionistDetail = () => {
    setReceptionistDetails([
      ...receptionistDetails,
      { receptionist_name: "", position: "" },
    ]);
  };

  const removeReceptionistDetail = (index) => {
    const newDetails = [...receptionistDetails];
    newDetails.splice(index, 1);
    setReceptionistDetails(newDetails);
  };

  const handleReceptionistDetailChange = (index, field, value) => {
    const newDetails = [...receptionistDetails];
    newDetails[index][field] = value;
    setReceptionistDetails(newDetails);
  };

  return (
    <div style={{ marginBottom: "16px" }}>
      {" "}
      {/* コンポーネント全体の下マージンを追加 */}
      <Grid container spacing={2}>
        {receptionistDetails.map((detail, index) => (
          <Grid key={index} container item spacing={1} alignItems="center">
            <Grid item xs={6}>
              {" "}
              {/* スタッフ名の幅を調整 */}
              <TextField
                fullWidth
                label="訪問した職員名"
                value={detail.receptionist_name}
                onChange={(e) =>
                  handleReceptionistDetailChange(
                    index,
                    "receptionist_name",
                    e.target.value
                  )
                }
              />
            </Grid>
            <Grid item xs={4}>
              {" "}
              {/* 役職の幅を狭く調整 */}
              <TextField
                fullWidth
                select
                label="役職"
                value={detail.position}
                onChange={(e) =>
                  handleReceptionistDetailChange(
                    index,
                    "position",
                    e.target.value
                  )
                }
              >
                <MenuItem value="branch_manager">支部長</MenuItem>
                <MenuItem value="instructor">インストラクター</MenuItem>
                <MenuItem value="advisor">アドバイザー</MenuItem>
                <MenuItem value="other">その他</MenuItem>
              </TextField>
            </Grid>
            <Grid item>
              <Button
                variant="outlined"
                onClick={() => removeReceptionistDetail(index)}
              >
                削除
              </Button>
            </Grid>
          </Grid>
        ))}
      </Grid>
      <div
        style={{
          display: "flex",
          justifyContent: "flex-end",
          marginTop: "1rem",
        }}
      >
        {" "}
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={addReceptionistDetail}
        >
          訪問した職員を追加
        </Button>
      </div>
    </div>
  );
};

export default ReceptionistDetailInput;
