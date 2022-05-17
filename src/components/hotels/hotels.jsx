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
  Grid,
} from "@mui/material";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import "./hotels.css";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { FavoritesContext } from "../state/home/context";
import Select, { SelectChangeEvent } from "@mui/material/Select";

import { useEffect, useState, useContext } from "react";
import { AlignVerticalBottom } from "@mui/icons-material";

export function Hotel(props) {
  const listContext = useContext(FavoritesContext);

  return (
    <div className="hotel">
      <Card
        sx={{ maxWidth: 330, minWidth: 330, minHeight: 300, maxHeight: 300 }}
        style={{
          background: "rgb(88, 214, 183)",
          //color: "white",
          minHeight: "20rem",
          marginRight: "1rem",
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
          {/* <Typography style={{ marginTop: ".2rem" }}>
            Cost per night: {props.price}
          </Typography> */}
          <Typography style={{ marginTop: ".2rem" }}>
            Rating: {props.starRating} Stars
          </Typography>
        </CardContent>
        <CardActions>
          <Button>
            <FavoriteIcon
              style={{
                color: "red",
                position: "relative",
                bottom: "20px",
                // left: "2",
              }}
              onClick={() => {
                listContext.listDispatch({
                  type: "add",
                  index: props.index,
                  title: props.title,
                  thumbnail: props.thumbnail,
                  streetAddress: props.streetAddress,
                  starRating: props.starRating,
                  id: props.id,
                });
              }}
            ></FavoriteIcon>
          </Button>
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

function RateFilter(props) {
  const [rating, setRating] = useState("");
  //const changed = false;
  const handleChange = (event: SelectChangeEvent) => {
    setRating(event.target.value);
    props.setRateFilter(event.target.value);
    //changed = true;
    //renderHotels();
  };
  const options = {
    method: "GET",
    headers: {
      "X-RapidAPI-Host": "hotels4.p.rapidapi.com",
      "X-RapidAPI-Key": "12754539cdmshf2c81b762b1275bp1db5dajsncd6d5dbc56ac",
    },
  };
  //if (changed) {
  // useEffect(() => {
  // fetch(
  //   `https://hotels4.p.rapidapi.com/properties/list?destinationId=${props.location}&pageNumber=1&pageSize=25&checkIn=2020-01-08&checkOut=2020-01-15&adults1=1&sortOrder=PRICE&locale=en_US&currency=USD&starRatings=${rating}&priceMin=${props.priceFilterMin}&priceMax=${props.priceFilterMax}`,
  //   options
  // )
  //   .then((response) => response.json())
  //   .then((response) =>
  //     props.setHotels(response.data.body.searchResults.results)
  //   )
  //   .catch((err) => console.error(err));
  //changed = false;
  //}, []);
  //}
  return (
    <Box class="filter">
      {/* style={{ position: "absolute", right: "5", top: "5" }}> */}
      <FormControl style={{ margin: "2rem" }}>
        <InputLabel id="demo-simple-select-label">Filter by Rating</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={rating}
          label="Filter by Rating"
          onChange={handleChange}
          style={{ maxWidth: "10%", minWidth: "10rem" }}
        >
          <MenuItem value={5}>5 Stars</MenuItem>
          <MenuItem value={4}>4 Stars</MenuItem>
          <MenuItem value={3}>3 Stars</MenuItem>
        </Select>
      </FormControl>
    </Box>
  );
}

function PriceFilter(props) {
  const [minPrice, setMinPrice] = useState("0");

  const handleMinChange = (event: SelectChangeEvent) => {
    setMinPrice(event.target.value);
  };
  const [maxPrice, setMaxPrice] = useState("100");

  const handleMaxChange = (event: SelectChangeEvent) => {
    setMaxPrice(event.target.value);
  };

  const options = {
    method: "GET",
    headers: {
      "X-RapidAPI-Host": "hotels4.p.rapidapi.com",
      "X-RapidAPI-Key": "12754539cdmshf2c81b762b1275bp1db5dajsncd6d5dbc56ac",
    },
  };
  //if (changed) {
  //useEffect(() => {
  // fetch(
  //   `https://hotels4.p.rapidapi.com/properties/list?destinationId=${props.location}&pageNumber=1&pageSize=25&checkIn=2020-01-08&checkOut=2020-01-15&adults1=1&sortOrder=PRICE&locale=en_US&currency=USD&starRatings=${props.rateFilter}&priceMin=${minPrice}&priceMax={maxPrice}`,
  //   options
  // )
  //   .then((response) => response.json())
  //   .then((response) =>
  //     props.setHotels(response.data.body.searchResults.results)
  //   )
  //   .catch((err) => console.error(err));
  //changed = false;
  //}, []);
  //}

  return (
    <div class="priceFilter">
      <Box class="minPrice">
        <FormControl fullWidth>
          <InputLabel id="demo-simple-select-label">Min</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={minPrice}
            label="minPrice"
            onChange={handleMinChange}
          >
            <MenuItem value={0}>$0</MenuItem>
            <MenuItem value={25}>$25</MenuItem>
            <MenuItem value={50}>$50</MenuItem>
            <MenuItem value={100}>$100</MenuItem>
            <MenuItem value={150}>$150</MenuItem>
            <MenuItem value={200}>$200</MenuItem>
          </Select>
        </FormControl>
      </Box>
      <Box class="maxPrice">
        <FormControl fullWidth>
          <InputLabel id="demo-simple-select-label">Max</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={maxPrice}
            label="minPrice"
            onChange={handleMaxChange}
          >
            <MenuItem value={50}>$50</MenuItem>
            <MenuItem value={100}>$100</MenuItem>
            <MenuItem value={150}>$150</MenuItem>
            <MenuItem value={300}>$300</MenuItem>
          </Select>
        </FormControl>
      </Box>
    </div>
  );
}

export const Hotels = (props) => {
  const [hotels, setHotels] = useState([]);
  const [rateFilter, setRateFilter] = useState("1");
  const [priceFilterMin, setPriceFilterMin] = useState("0");
  const [priceFilterMax, setPriceFilterMax] = useState("100");
  const [liked, setLiked] = useState([]);
  //const [locId, setLocId] = useState("");

  const [heading, setHeading] = useState("");

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

  const options = {
    method: "GET",
    headers: {
      "X-RapidAPI-Host": "hotels4.p.rapidapi.com",
      "X-RapidAPI-Key": "12754539cdmshf2c81b762b1275bp1db5dajsncd6d5dbc56ac",
    },
  };
  useEffect(() => {
    fetch(
      `https://hotels4.p.rapidapi.com/properties/list?destinationId=${props.location}&pageNumber=1&pageSize=25&checkIn=2020-01-08&checkOut=2020-01-15&adults1=1&sortOrder=PRICE&locale=en_US&currency=USD&starRatings=${rateFilter}`,
      options
    )
      .then((response) => response.json())
      .then((response) => setHotels(response.data.body.searchResults.results))
      .catch((err) => console.error(err));
  }, []);

  useEffect(() => {
    fetch(
      `https://hotels4.p.rapidapi.com/properties/list?destinationId=${props.location}&pageNumber=1&pageSize=25&checkIn=2020-01-08&checkOut=2020-01-15&adults1=1&sortOrder=PRICE&locale=en_US&currency=USD`,
      options
    )
      .then((response) => response.json())
      .then((response) => setHeading(response.data.body.header))
      .catch((err) => console.error(err));
  }, []);
  return (
    <div>
      <Typography class="header" fontSize={30}>
        Hotels near {heading}
      </Typography>
      <div>
        <div class="hotels">
          {/* <Pins addFavorite={addFavorite} removeFavorite={removeFavorite}/> */}
          <RateFilter
            rateFilter={rateFilter}
            setRateFilter={setRateFilter}
            setHotels={setHotels}
            location={props.location}
            priceFilterMin={priceFilterMin}
            priceFilterMax={priceFilterMax}
          />
          <PriceFilter
            setHotels={setHotels}
            location={props.location}
            setPriceFilterMin={setPriceFilterMin}
            setPriceFilterMax={setPriceFilterMax}
            rateFilter={rateFilter}
          />
        </div>
        <Grid container direction="row" columns={12} spacing={2}>
          {hotels.map((hotel, index) => (
            <Grid item xs={3}>
              <Hotel
                title={hotel.name}
                starRating={hotel.starRating}
                // liked={hotel.liked}
                streetAddress={hotel.address.streetAddress}
                thumbnail={hotel.optimizedThumbUrls.srpDesktop}
                // price={hotel.ratePlan.price.current}
                key={hotel.id}
                index={index}
                id={hotel.id}
              />
            </Grid>
          ))}
        </Grid>
      </div>
    </div>
  );
};
