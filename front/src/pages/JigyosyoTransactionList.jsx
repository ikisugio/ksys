import { Typography, Timeline, TimelineItem, TimelineSeparator, TimelineDot, TimelineConnector, TimelineContent, Card, CardContent } from '@mui/material';


const JigyosyoSearch = () => {
  // ダミーデータの例
  const items = [
    {
      date: "2023-01-01",
      title: "イベント1",
      description: "イベント1の説明文"
    },
    {
      date: "2023-02-01",
      title: "イベント2",
      description: "イベント2の説明文"
    },
    {
      date: "2023-03-01",
      title: "イベント3",
      description: "イベント3の説明文"
    }
  ];

  return (
    <Timeline>
      {items.map((item, index) => (
        <TimelineItem key={index}>
          <TimelineSeparator>
            <TimelineDot />
            {index < items.length - 1 && <TimelineConnector />}
          </TimelineSeparator>
          <TimelineContent>
            <Card sx={{ mb: 2 }}>
              <CardContent>
                <Typography variant="h6">{item.title}</Typography>
                <Typography>{item.description}</Typography>
                <Typography color="textSecondary">{item.date}</Typography>
              </CardContent>
            </Card>
          </TimelineContent>
        </TimelineItem>
      ))}
    </Timeline>
  );
}

export default JigyosyoSearch;
