import React from "react";
import { Card, CardContent, Typography, Button } from "@mui/material";

const SelectedEventCard = ({ event, onDeselect }) => {
  return (
    <Card
      sx={{
        marginBottom: 2,
        borderRadius: "16px",
        boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.1)",
        backgroundColor: "#e0f7fa",
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
          color="secondary"
          onClick={() => onDeselect(event)}
        >
          Deselect
        </Button>
      </CardContent>
    </Card>
  );
};

export default SelectedEventCard;
