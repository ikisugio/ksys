import React, { useState } from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import EditIcon from "@mui/icons-material/Edit";
import { useTheme } from "@mui/material/styles";

const DrawerCard = ({ title, initialData }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [data, setData] = useState(initialData);
  const theme = useTheme();

  const cardStyle = {
    margin: "10px",
    boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.1)",
    position: "relative",
    "&:hover": {
      boxShadow: `0px 0px 10px 2px ${theme.palette.primary.main}`,
    },
  };

  const cardContentStyle = {
    paddingTop: "5px",
    paddingBottom: "5px",
  };

  const titleStyle = {
    fontWeight: "bold",
    color: "#555",
  };

  const dataStyle = {
    wordWrap: "break-word",
    wordBreak: "break-all",
  };

  const dividerStyle = {
    marginTop: "3px",
    marginBottom: "3px",
  };

  const editButtonStyle = {
    position: "absolute",
    right: "10px",
    top: "4px",
    padding: "0px",
    color: "rgba(20,50,150,0.3)",
  };

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleSave = () => {
    // 保存処理をここに実装
    setIsEditing(false);
    // 保存したデータを外部に伝えるためのコールバックを呼び出す場合があります
  };

  const handleCancel = () => {
    setData(initialData);
    setIsEditing(false);
  };

  const handleChange = (e) => {
    setData(e.target.value);
  };

  return (
    <Card style={cardStyle}>
      <CardContent style={cardContentStyle}>
        <Typography variant="body2" component="div" style={titleStyle}>
          {title}
        </Typography>
        {isEditing ? (
          <>
            <input type="text" value={data} onChange={handleChange} />
            <button onClick={handleSave}>保存</button>
            <button onClick={handleCancel}>キャンセル</button>
          </>
        ) : (
          <>
            <IconButton
              style={editButtonStyle}
              size="small"
              onClick={handleEditClick}
            >
              <EditIcon fontSize="small" />
            </IconButton>
            <Divider style={dividerStyle} />
            <Typography variant="body1" style={dataStyle}>
              {data}
            </Typography>
          </>
        )}
      </CardContent>
    </Card>
  );
};
export default DrawerCard;
