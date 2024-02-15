import { TextField, Button, MenuItem, Grid } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";

const ReceptionistDetailInput = ({ staffDetails, setStaffDetails }) => {
  const addStaffDetail = () => {
    setStaffDetails([...staffDetails, { staff_name: "", position: "" }]);
  };

  const removeStaffDetail = (index) => {
    const newDetails = [...staffDetails];
    newDetails.splice(index, 1);
    setStaffDetails(newDetails);
  };

  const handleStaffDetailChange = (index, field, value) => {
    const newDetails = [...staffDetails];
    newDetails[index][field] = value;
    setStaffDetails(newDetails);
  };

  return (
    <div style={{ marginBottom: "16px" }}>
      {" "}
      {/* コンポーネント全体の下マージンを追加 */}
      <Grid container spacing={2}>
        {staffDetails.map((detail, index) => (
          <Grid key={index} container item spacing={1} alignItems="center">
            <Grid item xs={6}>
              {" "}
              {/* スタッフ名の幅を調整 */}
              <TextField
                fullWidth
                label="対応者の氏名"
                value={detail.staff_name}
                onChange={(e) =>
                  handleStaffDetailChange(index, "staff_name", e.target.value)
                }
              />
            </Grid>
            <Grid item xs={4}>
              {" "}
              {/* 役職の幅を狭く調整 */}
              <TextField
                fullWidth
                label="役職"
                value={detail.position}
                onChange={(e) =>
                  handleStaffDetailChange(index, "position", e.target.value)
                }
              ></TextField>
            </Grid>
            <Grid item>
              <Button
                variant="outlined"
                onClick={() => removeStaffDetail(index)}
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
          onClick={addStaffDetail}
        >
          対応者を追加
        </Button>
      </div>
    </div>
  );
};

export default ReceptionistDetailInput;
