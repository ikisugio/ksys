import React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";

const DrawerCard = ({ title, data }) => {
  const cardStyle = {
    margin: "10px",
    boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.1)",
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

  return (
    <Card style={cardStyle}>
      <CardContent style={cardContentStyle}>
        <Typography variant="body2" component="div" style={titleStyle}>
          {title}
        </Typography>
        <Divider style={dividerStyle} />
        <Typography variant="body1" style={dataStyle}>
          {data}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default DrawerCard;
