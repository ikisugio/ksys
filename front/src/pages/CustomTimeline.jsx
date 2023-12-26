import React from 'react';
import { Timeline, TimelineItem, TimelineSeparator, TimelineDot, TimelineConnector, TimelineContent, TimelineOppositeContent } from '@mui/lab';
import { Typography, Card, CardContent, Box } from '@mui/material'; // Boxをインポート
import styled from '@emotion/styled';

const CustomBox = styled(Box)({
  display: 'flex',
  justifyContent: 'flex-start',
  width: '100%',
  backgroundColor: '#fff', // 背景色はテスト用
});

const CustomTimeline = styled(Timeline)({
  maxWidth: '80%',
});

const events = [
  { datetime: '2023-01-01 09:00', person: 'Person A', location: 'Location 1', details: 'Event details 1' },
  { datetime: '2023-01-02 10:30', person: 'Person B', location: 'Location 2', details: 'Event details 2' },
  { datetime: '2023-01-03 12:00', person: 'Person C', location: 'Location 3', details: 'Event details 3' },
  { datetime: '2023-01-04 14:00', person: 'Person D', location: 'Location 4', details: 'Event details 4' },
  { datetime: '2023-01-05 17:00', person: 'Person D', location: 'Location 2', details: 'Event details 4' }
];

export default function CustomTimelineComponent() {
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
                  <Typography color="textSecondary">
                    {event.details}
                  </Typography>
                </CardContent>
              </Card>
            </TimelineContent>
          </TimelineItem>
        ))}
      </CustomTimeline>
    </CustomBox>
  );
}
