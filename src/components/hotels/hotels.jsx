import FavoriteIcon from "@mui/icons-material/Favorite";
import {
  Paper,
  Box,
  TextField,
  IconButton,
  InputLabel,
  MenuItem,
  FormControl,
} from "@mui/material";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";

import Select, { SelectChangeEvent } from "@mui/material/Select";

import { useState } from "react";

function Hotel(props) {
  return (
    <Box
      className="hotel"
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
          minWidth: "20rem",
        }}
        label={props.title}
      >
        <h4>{props.title}</h4>

        <IconButton
          onClick={() => (
            props.liked ? (props.liked = false) : (props.liked = true),
            console.log(props.liked)
          )}
          style={{
            color: props.liked ? "red" : "lightgrey",
            float: "left",
          }}
        >
          <FavoriteIcon />
        </IconButton>
        {props.location}
      </Paper>
    </Box>
  );
}

function CheckInInput() {
  const [value, setValue] = useState();
  return (
    <div style={{ margin: "2rem" }}>
      <LocalizationProvider dateAdapter={AdapterDateFns}>
        <DatePicker
          label="Check In"
          value={value}
          onChange={(newValue) => {
            setValue(newValue);
          }}
          renderInput={(params) => <TextField {...params} />}
        />
      </LocalizationProvider>
    </div>
  );
}

function CheckOutInput() {
  const [value, setValue] = useState();
  return (
    <div style={{ margin: "2rem" }}>
      <LocalizationProvider dateAdapter={AdapterDateFns}>
        <DatePicker
          label="Check Out"
          value={value}
          onChange={(newValue) => {
            setValue(newValue);
          }}
          renderInput={(params) => <TextField {...params} />}
        />
      </LocalizationProvider>
    </div>
  );
}

function Filter() {
  const [filter, setFilter] = useState("");

  const handleChange = (e) => {
    setFilter(e.target.value);
  };

  return (
    <Box style={{ position: "absolute", right: "5", top: "5" }}>
      <FormControl style={{ margin: "2rem" }}>
        <InputLabel id="demo-simple-select-label">Filter by Rating</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={filter}
          label="Filter by Rating"
          onChange={handleChange}
          style={{ maxWidth: "10%", minWidth: "10rem", justifyItems: "left" }}
        >
          <MenuItem value={5}>5 Stars</MenuItem>
          <MenuItem value={4}>4 Stars</MenuItem>
          <MenuItem value={3}>3 Stars</MenuItem>
        </Select>
      </FormControl>
    </Box>
  );
}

function Pins(props) {
  const [pins, setPins] = useState([]);
  return <FavoriteIcon style={{ float: "right" }} />;
}

export const Hotels = () => {
  const [hotels, setHotels] = useState([
    {
      location: "NY",
      title: "A hotel",
      liked: false,
    },
    {
      location: "NJ",
      title: "Another hotel",
      liked: true,
    },
  ]);

  /* const options = {
    method: "GET",
    headers: {
      "X-RapidAPI-Host": "hotels4.p.rapidapi.com",
      "X-RapidAPI-Key": "12754539cdmshf2c81b762b1275bp1db5dajsncd6d5dbc56ac",
    },
  };

  fetch(
    "https://hotels4.p.rapidapi.com/properties/list?destinationId=1506246&pageNumber=1&pageSize=25&checkIn=2020-01-08&checkOut=2020-01-15&adults1=1&sortOrder=PRICE&locale=en_US&currency=USD",
    options
  )
    .then((response) => response.json())
    .then((response) => console.log(response))
    .catch((err) => console.error(err));*/

  return (
    <div style={{ marginTop: "3rem" }}>
      <Pins />
      <Filter />
      <div style={{ justifyContent: "left" }}>
        <CheckInInput />
        <CheckOutInput />
      </div>
      {hotels.map((hotel, index) => (
        <Hotel
          title={hotel.title}
          location={hotel.location}
          liked={hotel.liked}
          key={index}
        />
      ))}
    </div>
  );
};
