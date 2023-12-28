import React from "react";
import {
  Timeline,
  TimelineItem,
  TimelineSeparator,
  TimelineDot,
  TimelineConnector,
  TimelineContent,
  TimelineOppositeContent,
} from "@mui/lab";
import { Typography, Card, CardContent, Box, Fab } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import EditIcon from "@mui/icons-material/Edit";
import IconButton from "@mui/material/IconButton";
import styled from "@emotion/styled";
import { useTheme } from "@mui/material/styles";

const CustomBox = styled(Box)({
  display: "flex",
  justifyContent: "flex-start",
  width: "100%",
  backgroundColor: "#fff",
});

const CustomTimeline = styled(Timeline)({
  maxWidth: "80%",
});

const timelineItemStyle = {
  // TimelineItem のスタイルを調整
  minHeight: "70px", // 各タイムラインアイテムの最小高さを設定
};

const timelineOppositeContentStyle = {
  // TimelineOppositeContent のスタイルを調整
  flex: 0.3, // 幅の割合を調整
  padding: "0 16px", // パディングを設定
};

const cardStyle = {
  width: "120%",
  maxWidth: "800px",
  borderRadius: "10px",
};

const cardContentStyle = {
  padding: "20px",
};

const editButtonStyle = {
  position: "absolute",
  top: "5px",
  right: "5px",
  color: "rgba(20,40,100,0.5)",
};

const MyTimeline = ({ events, target }) => {
  const theme = useTheme();
  const handleAddClick = () => {
    console.log(target);
  };

  const timelineItemHoverStyle = {
    "&:hover": {
      ".MuiTimelineDot-root": { backgroundColor: theme.palette.primary.main },
      ".MuiTimelineConnector-root": {
        backgroundColor: theme.palette.primary.main,
      },
    },
  };

  

  return (
    <CustomBox>
      <CustomTimeline>
        {events.map((event, index) => (
          <TimelineItem key={index} sx={timelineItemHoverStyle}>
            <TimelineOppositeContent style={timelineOppositeContentStyle}>
              <Typography color="textSecondary">{event.datetime}</Typography>
              <Typography color="textSecondary">{event.person}</Typography>
            </TimelineOppositeContent>
            <TimelineSeparator>
              <TimelineDot />
              {index < events.length - 1 && <TimelineConnector />}
            </TimelineSeparator>
            <TimelineContent>
              <Card variant="outlined" style={cardStyle}>
                <CardContent style={cardContentStyle}>
                  <IconButton
                    aria-label="edit"
                    size="small"
                    style={{ ...editButtonStyle, color: "rgba(20,60,120,0.4)" }}
                    onClick={() => console.log(`編集: ${event.id || index}`)}
                  >
                    <EditIcon fontSize="small" />
                  </IconButton>
                  <Typography variant="h6" component="h2">
                    {event.location}
                  </Typography>
                  <Typography color="textSecondary">{event.details}</Typography>
                </CardContent>
              </Card>
            </TimelineContent>
          </TimelineItem>
        ))}
      </CustomTimeline>
      <Fab
        color="primary"
        aria-label="add"
        size="small"
        style={{
          position: "fixed",
          right: "3vw",
          bottom: "7vh",
          boxShadow: "0px 1px 2px rgba(0, 0, 0, 0.2)",
        }}
        onClick={handleAddClick}
      >
        <AddIcon />
      </Fab>
    </CustomBox>
  );
};

export default MyTimeline;
