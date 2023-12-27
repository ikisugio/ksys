import React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";

const TimelineCard = ({ title, data }) => {
  const cardStyle = {
    margin: "10px",
    boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.1)",
  };

  return (
    <Card style={cardStyle}>
      <CardContent>
        <Typography variant="h6" component="div">
          {title}
        </Typography>
        <Typography variant="body1">{data}</Typography>
      </CardContent>
    </Card>
  );
};

export default TimelineCard;
