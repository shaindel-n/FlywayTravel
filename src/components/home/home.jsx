import { Button, Paper, TextField, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { useContext, useEffect, useState } from "react";
//import { HomeContext } from "../state/home/context";
import "./home.css";
import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import Hotels from "../hotels/hotels";
import { Link } from "react-router-dom";

function LocationInput({ setCurrLocation, setAirports, setCurrLocationId }) {
  const [locationInput, setLocationInput] = useState("");

  const inputLocation = (e) => {
    e.preventDefault();
    if (!inputLocation) {
      console.log("error");
      return;
    }
    setCurrLocation(locationInput);
    console.log(locationInput);
    setLocationInput("");
    try {
      const options = {
        method: "GET",
        headers: {
          "X-RapidAPI-Host": "hotels4.p.rapidapi.com",
          "X-RapidAPI-Key":
            "12754539cdmshf2c81b762b1275bp1db5dajsncd6d5dbc56ac",
        },
      };
      //useEffect(() => {
      fetch(
        `https://hotels4.p.rapidapi.com/locations/v2/search?query=${locationInput}&locale=en_US&currency=USD`,
        options
      )
        .then((response) => response.json())
        .then((response) => setAirports(response.suggestions[3].entities))
        // .then((response) =>
        //   setCurrLocationId(response.suggestions[0].entities[0].destinationId)
        // )
        .catch((err) => console.error(err));
      //}, []);
    } catch (err) {
      console.log("error", err);
    }
  };

  return (
    <div class="locationInput">
      <form onSubmit={inputLocation}>
        <TextField
          id="standard-basic"
          label="Where would you like to go?"
          variant="standard"
          style={{
            fontFamily: "Segoe Print, Display, Script, Sans Serif",
            minWidth: "16rem",
          }}
          onChange={(e) => setLocationInput(e.target.value)}
        />
      </form>
    </div>
  );
}

function Airport(props) {
  const handleClick = () => {
    props.setCurrLocationId(props.locationId);
    props.setCurrLong(props.longitude);
    props.setCurrLat(props.latitude);
    console.log(
      "longitude: " + props.longitude + "latitude: " + props.latitude
    );
    console.log(props.locationId);
  };
  return (
    //<div>
    <Link to="/hotels" style={{ textDecoration: "none" }}>
      <Button
        onClick={() => {
          handleClick();
        }}
      >
        <Box class="airport" defaultValue="">
          <Paper
            style={{
              padding: ".5rem",
              backgroundColor: "rgb(88, 214, 183)",
              color: "white",
              minWidth: "40rem",
              maxWidth: "45rem",
              minHeight: "10rem",
              maxHeight: "10rem",
              fontFamily: "Segoe Print, Display, Script, Sans Serif",
            }}
            label={props.name}
          >
            <h1>{props.name}</h1>

            <h3>({props.type})</h3>
          </Paper>
        </Box>
      </Button>
    </Link>
    //</div>
  );
}

function Welcome() {
  return (
    <div class="welcome">
      <Typography
        variant="h2"
        style={{
          color: "rgb(12, 84, 66)",
          fontWeight: "bolder",
          fontFamily: "Segoe Print, Display, Script, Sans Serif",
        }}
      >
        FLYWAY TRAVEL AGENCY
      </Typography>
      <h1
        style={{
          fontFamily: "Segoe Print, Display, Script, Sans Serif",
          marginTop: "3rem",
        }}
      >
        We plan, you fly.
      </h1>
    </div>
  );
}

export const Home = (props) => {
  const [location, setLocation] = useState("");

  const setCurrLocation = (text) => {
    setLocation(text);
  };

  const setCurrLocationId = (text) => {
    props.changeLocation(text);
  };

  const setCurrLong = (text) => {
    props.changeLongitude(text);
  };

  const setCurrLat = (text) => {
    props.changeLatitude(text);
  };

  const [airports, setAirports] = useState([]);

  const options = {
    method: "GET",
    headers: {
      "X-RapidAPI-Host": "hotels4.p.rapidapi.com",
      "X-RapidAPI-Key": "12754539cdmshf2c81b762b1275bp1db5dajsncd6d5dbc56ac",
    },
  };

  const changeLocation = document.getElementById("locationInput");
  if (changeLocation) {
    changeLocation.addEventListener("submit", () =>
      fetch(
        `https://hotels4.p.rapidapi.com/locations/v2/search?query=${location}&locale=en_US&currency=USD`,
        options
      )
        .then((response) => response.json())
        .then((response) => setAirports(response.suggestions[3].entities))
        .catch((err) => console.error(err))
    );
  }

  return (
    <div class="home">
      <Welcome />
      <LocationInput
        setAirports={setAirports}
        setCurrLocation={setCurrLocation}
        id="locationInput"
        setCurrLocationId={setCurrLocationId}
      />
      {airports.map((airport, index) => (
        <Airport
          name={airport.name}
          type={airport.type}
          key={index}
          locationId={airport.destinationId}
          longitude={airport.longitude}
          latitude={airport.latitude}
          setCurrLong={setCurrLong}
          setCurrLat={setCurrLat}
          setCurrLocationId={setCurrLocationId}
        />
      ))}
    </div>
  );
};
