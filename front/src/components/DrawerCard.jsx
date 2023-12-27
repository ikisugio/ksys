import React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import EditIcon from "@mui/icons-material/Edit";
import { useTheme } from "@mui/material/styles";

const DrawerCard = ({ title, data }) => {
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

  return (
    <Card style={cardStyle}>
      <CardContent style={cardContentStyle}>
        <Typography variant="body2" component="div" style={titleStyle}>
          {title}
        </Typography>
        <IconButton
          style={editButtonStyle}
          size="small"
          onClick={() => console.log("Edit clicked")}
        >
          <EditIcon fontSize="small" />
        </IconButton>
        <Divider style={dividerStyle} />
        <Typography variant="body1" style={dataStyle}>
          {data}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default DrawerCard;
