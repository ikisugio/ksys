import React from "react";
import MyTimeline from "@/components/MyTimeline";

const events = [
  {
    datetime: "2023-01-01 09:00",
    person: "Person A",
    location: "Location 1",
    details: "Event details 1",
  },
  {
    datetime: "2023-01-02 10:30",
    person: "Person B",
    location: "Location 2",
    details: "Event details 2",
  },
  {
    datetime: "2023-01-03 12:00",
    person: "Person C",
    location: "Location 3",
    details: "Event details 3",
  },
  {
    datetime: "2023-01-04 14:00",
    person: "Person D",
    location: "Location 4",
    details: "Event details 4",
  },
  {
    datetime: "2023-01-05 17:00",
    person: "Person D",
    location: "Location 2",
    details: "Event details 5",
  },
];

const CustomTimeline = () => {
  return <MyTimeline events={events} />;
};

export default CustomTimeline;
