import React from "react";
import { Card, CardContent, Typography, Button } from "@mui/material";

const EventCard = ({ event, onSelect }) => {
  return (
    <Card
      sx={{
        marginBottom: 2,
        borderRadius: "16px",
        boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.1)",
        overflow: "hidden",
      }}
    >
      <CardContent>
        <Typography variant="h6">{event.event_name}</Typography>
        <Typography variant="body2">{event.event_category}</Typography>
        <Typography variant="body2">
          {new Date(event.start_time).toLocaleTimeString()} -{" "}
          {new Date(event.end_time).toLocaleTimeString()}
        </Typography>
        <Button
          variant="contained"
          color="primary"
          onClick={() => onSelect(event)}
        >
          Select
        </Button>
      </CardContent>
    </Card>
  );
};

export default EventCard;
