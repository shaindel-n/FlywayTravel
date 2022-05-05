import { Paper, TextField, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { useState } from "react";

function LocationInput() {
  return (
    <TextField
      id="standard-basic"
      label="Where would you like to go?"
      variant="standard"
      style={{ minWidth: "20rem", justifyContent: "center" }}
    />
  );
}

function Airport(props) {
  return (
    <Box
      className="airport"
      sx={{
        display: "flex",
        flexWrap: "wrap",
        flexDirection: "row",
      }}
      defaultValue=""
      style={{
        justifyContent: "center",
        marginTop: "1rem",
      }}
    >
      <Paper
        style={{
          padding: ".5rem",
          backgroundColor: "rgb(88, 214, 183)",
          color: "white",
          minWidth: "30rem",
        }}
        label={props.title}
      >
        <h1>{props.title}</h1>
        <h4>{props.location}</h4>
      </Paper>
    </Box>
  );
}

function Welcome() {
  return (
    <div>
      <Typography
        variant="h2"
        style={{
          color: "rgb(12, 84, 66)",
          fontWeight: "bolder",
        }}
      >
        Welcome to TRAVELAID
      </Typography>
      <h3>We hope you enjoy your travels</h3>
    </div>
  );
}

export const Home = () => {
  const [airports, setAirports] = useState([
    {
      title: "LaGuardia",
      location: "NY",
    },
    {
      title: "Newark",
      location: "NJ",
    },
  ]);

  return (
    <div>
      <Welcome />
      <LocationInput />
      {airports.map((airport, index) => (
        <Airport
          title={airport.title}
          location={airport.location}
          key={index}
        />
      ))}
    </div>
  );
};
