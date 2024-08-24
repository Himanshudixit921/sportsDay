import React from "react";
import {
  Grid,
  Card,
  CardContent,
  Typography,
  Button,
  Box,
} from "@mui/material";

const EventList = ({ events, onSelect }) => {
  return (
    <Grid container spacing={4}>
      {events.map((event) => (
        <Grid item xs={12} sm={6} key={event.id}>
          {" "}
          <Card
            sx={{
              borderRadius: "12px",
              borderColor: "#E1E1E1",
              overflow: "hidden",
            }}
          >
            <CardContent>
              <Typography variant="h6" gutterBottom>
                {event.event_name}
              </Typography>
              <Typography color="text.secondary">
                Category: {event.event_category}
              </Typography>
              <Typography color="text.secondary">
                Start: {new Date(event.start_time).toLocaleString()}
              </Typography>
              <Typography color="text.secondary">
                End: {new Date(event.end_time).toLocaleString()}
              </Typography>
              <Box mt={2}>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={() => onSelect(event)}
                >
                  Select Event
                </Button>
              </Box>
            </CardContent>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
};

export default EventList;
