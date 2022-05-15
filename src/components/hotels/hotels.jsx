import FavoriteIcon from "@mui/icons-material/Favorite";
import {
  Paper,
  Box,
  TextField,
  IconButton,
  InputLabel,
  MenuItem,
  FormControl,
  Card,
  CardMedia,
  CardContent,
  Typography,
  CardActions,
  Button,
} from "@mui/material";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import "./hotels.css";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { FavoritesContext } from "../state/home/context";
import Select, { SelectChangeEvent } from "@mui/material/Select";

import { useEffect, useState, useContext } from "react";
import { AlignVerticalBottom } from "@mui/icons-material";

// function Location({ setLocation }) {
//   const [locationInput, setLocationInput] = useState("");

// const inputLocation = (e) => {
//   e.preventDefault();
//   if (!inputLocation) {
//     console.log("error");
//     return;
//   }
//   setLocationInput(locationInput);
//   console.log(locationInput);
//   setLocationInput("");
// };
// const options1 = {
//   method: "GET",
//   headers: {
//     "X-RapidAPI-Host": "hotels4.p.rapidapi.com",
//     "X-RapidAPI-Key": "12754539cdmshf2c81b762b1275bp1db5dajsncd6d5dbc56ac",
//   },
// };

//const [locId, setLocId] = useState("");
// useEffect(() => {
//   fetch(
//     `https://hotels4.p.rapidapi.com/locations/v2/search?query=${locationInput}&locale=en_US&currency=USD`,
//     options1
//   )
//     .then((response) => response.json())
//     .then(
//       (response) => setLocation(response) //.suggestions[0].entities[0].destinationId)
//     )
//     .catch((err) => console.error(err));
// }, []);
// const options2 = {
//   method: "GET",
//   headers: {
//     "X-RapidAPI-Host": "hotels4.p.rapidapi.com",
//     "X-RapidAPI-Key": "12754539cdmshf2c81b762b1275bp1db5dajsncd6d5dbc56ac",
//   },
// };

// fetch(
//   `https://hotels4.p.rapidapi.com/properties/list?destinationId=${locId}&pageNumber=1&pageSize=25&checkIn=2020-01-08&checkOut=2020-01-15&adults1=1&sortOrder=PRICE&locale=en_US&currency=USD`,
//   options2
// )
//   .then((response) => response.json())
//   .then((response) =>
//     props.setHotels(response.data.body.searchResults.results)
//   )
//   .catch((err) => console.error(err));

//   return (
//     <div>
//       <form onSubmit={inputLocation}>
//         <TextField
//           id="standard-basic"
//           label="Where would you like to go?"
//           variant="standard"
//           style={{ minWidth: "20rem" }} //justifyContent: "center" }}
//           onChange={(e) => setLocationInput(e.target.value)}
//         />
//       </form>
//     </div>
//   );
// }

function Hotel(props) {
  return (
    <div className="hotel">
      <Card
        sx={{ maxWidth: 345 }}
        style={{
          background: "rgb(88, 214, 183)",
          //color: "white",
          minHeight: "20rem",
          margin: "1rem",
        }}
      >
        <CardMedia
          component="img"
          height="140"
          image={props.thumbnail}
          alt="thumnail"
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div" color="white">
            {props.title}
          </Typography>
          <Typography variant="body2">{props.streetAddress}</Typography>
          <Typography style={{ marginTop: ".2rem" }}>
            Rating: {props.starRating}
          </Typography>
        </CardContent>
        <CardActions>
          <IconButton
            onClick={() => (
              props.liked ? (props.liked = false) : (props.liked = true),
              console.log(props.liked)
            )}
            style={{
              color: props.liked ? "red" : "lightgrey",
            }}
          >
            <FavoriteIcon />
          </IconButton>
        </CardActions>
      </Card>
    </div>
  );
}

function CheckInInput() {
  const [value, setValue] = useState();
  return (
    <div class="checkIn">
      {/*style={{ margin: "2rem" }}*/}
      <LocalizationProvider dateAdapter={AdapterDateFns}>
        <DatePicker
          label="Check In"
          value={value}
          onChange={(newValue) => {
            setValue(newValue);
            console.log(value);
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
    <div class="checkOut">
      {/* style={{ margin: "2rem" }}> */}
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

function Filter(props) {
  const handleChange = (e) => {
    props.setFilter(e.target.value);
  };

  return (
    <Box class="filter">
      {/* style={{ position: "absolute", right: "5", top: "5" }}> */}
      <FormControl style={{ margin: "2rem" }}>
        <InputLabel id="demo-simple-select-label">Filter by Rating</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={props.filter}
          label="Filter by Rating"
          onChange={handleChange}
          style={{ maxWidth: "10%", minWidth: "10rem" }} // justifyItems: "left" }}
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
  // const [pins, setPins] = useState([]);
  // return (
  //   <div>
  //     <Card
  //       sx={{ maxWidth: 345 }}
  //       style={{
  //         background: "rgb(88, 214, 183)",
  //         //color: "white",
  //         minHeight: "20rem",
  //         margin: "1rem",
  //       }}
  //     >
  //       <CardMedia
  //         component="img"
  //         height="140"
  //         image={props.thumbnail}
  //         alt="thumbnail"
  //       />
  //       <CardContent>
  //         <Typography gutterBottom variant="h5" component="div" color="white">
  //           {props.title}
  //         </Typography>
  //         <Typography variant="body2">{props.streetAddress}</Typography>
  //         <Typography style={{ marginTop: ".2rem" }}>
  //           Rating: {props.starRating}
  //         </Typography>
  //       </CardContent>
  //       <CardActions>
  //         <IconButton
  //           onClick={() => (
  //             props.liked ? (props.liked = false) : (props.liked = true),
  //             console.log(props.liked)
  //           )}
  //           style={{
  //             color: props.liked ? "red" : "lightgrey",
  //           }}
  //         >
  //           <FavoriteIcon />
  //         </IconButton>
  //       </CardActions>
  //     </Card>
  //   </div>
  // );
}

export const Hotels = (props) => {
  const [hotels, setHotels] = useState([]);
  const [filter, setFilter] = useState(1);
  const [liked, setLiked] = useState([]);
  //const [locId, setLocId] = useState("");
  const listContext = useContext(FavoritesContext);

  // const addFavorite = () => {
  //   listContext.listDispatch({
  //     type: "remove",
  //     //index: props.index,
  //   });
  // };

  // const removeFavorite = () => {
  //   listContext.listDispatch({
  //     type: "add",
  //     //index: props.index,
  //     title: props.title,
  //     id: props.id,
  //     image: props.image,
  //   });
  // };

  // const setLocation = (text) => {
  //   setLocId(text);
  //   console.log(locId);
  // };

  const setHotelLiked = (index) => {
    hotels[index].liked
      ? (setLiked[index] = false)
      : (setLiked[index].liked = true);
    const newList = [...liked];
    setLiked(newList);
  };
  // const changeLocation = document.getElementById("locationInput");
  // if (changeLocation) {
  console.log("locId:" + props.location);
  const options = {
    method: "GET",
    headers: {
      "X-RapidAPI-Host": "hotels4.p.rapidapi.com",
      "X-RapidAPI-Key": "12754539cdmshf2c81b762b1275bp1db5dajsncd6d5dbc56ac",
    },
  };
  useEffect(() => {
    fetch(
      `https://hotels4.p.rapidapi.com/properties/list?destinationId=${props.location}&pageNumber=1&pageSize=25&checkIn=2020-01-08&checkOut=2020-01-15&adults1=1&sortOrder=PRICE&locale=en_US&currency=USD&starRatings=${filter}`,
      options
    )
      .then((response) => response.json())
      .then((response) => setHotels(response.data.body.searchResults.results))
      .catch((err) => console.error(err));
  }, []);
  // }
  return (
    <div class="hotels">
      {/* <Pins addFavorite={addFavorite} removeFavorite={removeFavorite}/> */}
      {/* <Location setLocation={setLocation} id="locationInput" /> */}
      <Filter filter={filter} setFilter={setFilter} />

      <CheckInInput />
      <CheckOutInput />
      {hotels.map((hotel, index) => (
        <Hotel
          title={hotel.name}
          starRating={hotel.starRating}
          liked={hotel.liked}
          streetAddress={hotel.address.streetAddress}
          thumbnail={hotel.optimizedThumbUrls.srpDesktop}
          key={index}
        />
      ))}
    </div>
  );
};
