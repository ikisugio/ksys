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
import { Typography, Card, CardContent, Box } from "@mui/material";
import styled from "@emotion/styled";

const CustomBox = styled(Box)({
  display: "flex",
  justifyContent: "flex-start",
  width: "100%",
  backgroundColor: "#fff",
});

const CustomTimeline = styled(Timeline)({
  maxWidth: "80%",
});

const MyTimeline = ({ events }) => {
  return (
    <CustomBox>
      <CustomTimeline>
        {events.map((event, index) => (
          <TimelineItem key={index}>
            <TimelineOppositeContent>
              <Typography color="textSecondary">{event.datetime}</Typography>
              <Typography color="textSecondary">{event.person}</Typography>
            </TimelineOppositeContent>
            <TimelineSeparator>
              <TimelineDot />
              {index < events.length - 1 && <TimelineConnector />}
            </TimelineSeparator>
            <TimelineContent>
              <Card variant="outlined">
                <CardContent>
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
    </CustomBox>
  );
};

export default MyTimeline;
