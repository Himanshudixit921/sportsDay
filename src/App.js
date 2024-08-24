import React, { useState, useEffect } from "react";
import EventList from "./component/EventList";
import SelectedEventList from "./component/SelectedEventList";
import { Grid, Typography, Container, Box, Button } from "@mui/material";

function App() {
  const [events, setEvents] = useState([]);
  const [selectedEvents, setSelectedEvents] = useState([]);
  const [alertMessage, setAlertMessage] = useState("");
  const [showAlert, setShowAlert] = useState(false);

  useEffect(() => {
    // Fetch events from the public directory
    fetch("/events.json")
      .then((response) => response.json())
      .then((data) => setEvents(data));

    const storedEvents =
      JSON.parse(localStorage.getItem("selectedEvents")) || [];
    setSelectedEvents(storedEvents);
  }, []);

  useEffect(() => {
    localStorage.setItem("selectedEvents", JSON.stringify(selectedEvents));
  }, [selectedEvents]);

  const handleSelect = (event) => {
    if (selectedEvents.length >= 3) {
      setAlertMessage("You can only select up to 3 events.");
      setShowAlert(true);
      return;
    }

    const isConflicting = selectedEvents.some((selectedEvent) => {
      return (
        (event.start_time < selectedEvent.end_time &&
          event.start_time >= selectedEvent.start_time) ||
        (event.end_time > selectedEvent.start_time &&
          event.end_time <= selectedEvent.end_time)
      );
    });

    if (isConflicting) {
      setAlertMessage("This event conflicts with an already selected event.");
      setShowAlert(true);
      return;
    }

    setSelectedEvents([...selectedEvents, event]);
  };

  const handleDeselect = (event) => {
    setSelectedEvents(selectedEvents.filter((e) => e.id !== event.id));
  };

  // Function to close the alert
  const closeAlert = () => {
    setShowAlert(false);
    setAlertMessage("");
  };

  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        Sports Day Event Registration
      </Typography>

      {/* Centered Alert Div with Translucent Background */}
      {showAlert && (
        <Box
          sx={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100vw",
            height: "100vh",
            bgcolor: "rgba(0, 0, 0, 0.5)", // Translucent background
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 1000,
          }}
          onClick={closeAlert} // Close alert on click
        >
          <Box
            sx={{
              bgcolor: "white",
              padding: "24px",
              borderRadius: "8px",
              boxShadow: 3,
              maxWidth: "400px",
              textAlign: "center",
            }}
            onClick={(e) => e.stopPropagation()} // Prevent click event from propagating to parent
          >
            <Typography variant="h6" gutterBottom>
              {alertMessage}
            </Typography>
            <Button variant="contained" color="primary" onClick={closeAlert}>
              OK
            </Button>
          </Box>
        </Box>
      )}

      <Grid container spacing={4}>
        <Grid item xs={12} md={8}>
          <Typography variant="h5">Available Events</Typography>
          <EventList events={events} onSelect={handleSelect} />
        </Grid>
        <Grid item xs={12} md={4}>
          <Typography variant="h5">Selected Events</Typography>
          <SelectedEventList
            selectedEvents={selectedEvents}
            onDeselect={handleDeselect}
          />
        </Grid>
      </Grid>
    </Container>
  );
}

export default App;
