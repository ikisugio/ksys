import React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";

const DrawerCard = ({ key, data }) => {
  const cardStyle = {
    margin: "10px",
    boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.1)",
  };

  return (
    <Card key={key} style={cardStyle}>
      <CardContent>
        <Typography variant="h6" component="div">
          {key}
        </Typography>
        <Typography variant="body1">{data}</Typography>
      </CardContent>
    </Card>
  );
};

export default DrawerCard;
