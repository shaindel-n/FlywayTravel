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
  Rating,
} from "@mui/material";
import "./hotels.css";
import { FavoritesContext } from "../state/home/context";
import Select from "@mui/material/Select";
import { useEffect, useState, useContext } from "react";

export function Hotel(props) {
  const listContext = useContext(FavoritesContext);
  const [favorited, setFavorited] = useState(false);
  return (
    <div className="hotel">
      <Card
        sx={{ maxWidth: 330, minWidth: 330 }}
        style={{
          background: "white",
          //color: "white",
          minHeight: "23rem",
          maxHeight: "23rem",
          marginRight: "1rem",
        }}
      >
        <CardMedia
          component="img"
          height="140"
          image={props.thumbnail}
          alt="thumbnail"
        />
        <CardActions
          style={{ position: "relative", top: "10rem", float: "left" }}
        >
          <Button>
            <FavoriteIcon
              style={{
                color: favorited ? "red" : "lightgray",
              }}
              onClick={() => {
                console.log("clicked");
                if (!favorited) {
                  listContext.listDispatch({
                    type: "add",
                    index: props.index,
                    title: props.title,
                    thumbnail: props.thumbnail,
                    streetAddress: props.streetAddress,
                    starRating: props.starRating,
                    id: props.id,
                    price:
                      props.price &&
                      props.price.ratePlan &&
                      props.price.ratePlan.price &&
                      props.price.ratePlan.price.current
                        ? props.price.ratePlan.price.current
                        : "-----",
                  });
                }
                setFavorited(true);
              }}
            />
          </Button>
        </CardActions>
        <CardContent style={{ position: "relative" }}>
          <Typography
            gutterBottom
            variant="h5"
            component="div"
            color="rgb(88, 214, 183)"
            style={{
              position: "relative",
              right: "2rem",
              fontFamily: "Segoe Print, Display, Script, Sans Serif",
              fontStyle: "italic",
            }}
          >
            {props.title}
          </Typography>
          <Typography
            variant="body2"
            style={{
              fontFamily: "Segoe Print, Display, Script, Sans Serif",
            }}
          >
            {props.streetAddress}
          </Typography>
          <Typography
            style={{
              marginTop: ".2rem",
              fontFamily: "Segoe Print, Display, Script, Sans Serif",
            }}
          >
            Cost per night:
            {props.price &&
            props.price.ratePlan &&
            props.price.ratePlan.price &&
            props.price.ratePlan.price.current
              ? props.price.ratePlan.price.current
              : "-----"}
          </Typography>
          <Typography style={{ marginTop: ".2rem" }}>
            <Rating
              name="read-only"
              value={props.starRating}
              precision={0.5}
              readOnly
            />
          </Typography>
        </CardContent>
      </Card>
    </div>
  );
}

// function CheckInInput() {
//   const [value, setValue] = useState();
//   return (
//     <div class="checkIn">
//       {/*style={{ margin: "2rem" }}*/}
//       <LocalizationProvider dateAdapter={AdapterDateFns}>
//         <DatePicker
//           label="Check In"
//           value={value}
//           onChange={(newValue) => {
//             setValue(newValue);
//             console.log(value);
//           }}
//           renderInput={(params) => <TextField {...params} />}
//         />
//       </LocalizationProvider>
//     </div>
//   );
// }

// function CheckOutInput() {
//   const [value, setValue] = useState();
//   return (
//     <div class="checkOut">
//       {/* style={{ margin: "2rem" }}> */}
//       <LocalizationProvider dateAdapter={AdapterDateFns}>
//         <DatePicker
//           label="Check Out"
//           value={value}
//           onChange={(newValue) => {
//             setValue(newValue);
//           }}
//           renderInput={(params) => <TextField {...params} />}
//         />
//       </LocalizationProvider>
//     </div>
//   );
// }

function RateFilter(props) {
  const [rating, setRating] = useState("");
  const handleChange = (event) => {
    setRating(event.target.value);
    fetch(
      `https://hotels4.p.rapidapi.com/properties/list?destinationId=${props.location}&pageNumber=1&pageSize=24&checkIn=2020-01-08&checkOut=2020-01-15&adults1=1&sortOrder=PRICE&locale=en_US&currency=USD&starRatings=${event.target.value}`,
      options
    )
      .then((response) => response.json())
      .then((response) =>
        props.setHotels(response.data.body.searchResults.results)
      )
      .catch((err) => console.error(err));
  };
  const options = {
    method: "GET",
    headers: {
      "X-RapidAPI-Host": "hotels4.p.rapidapi.com",
      "X-RapidAPI-Key": "12754539cdmshf2c81b762b1275bp1db5dajsncd6d5dbc56ac",
    },
  };

  return (
    <Box class="filter">
      {/* style={{ position: "absolute", right: "5", top: "5" }}> */}
      <FormControl
        variant="standard"
        sx={{ m: 1, minWidth: 120 }}
        style={{ margin: "2rem" }}
      >
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
          <MenuItem value={2}>2 Stars</MenuItem>
          <MenuItem value={1}>1 Star</MenuItem>
        </Select>
      </FormControl>
    </Box>
  );
}

function PriceFilter(props) {
  const [minPrice, setMinPrice] = useState("0");

  const handleMinChange = (event) => {
    setMinPrice(event.target.value);
    fetch(
      `https://hotels4.p.rapidapi.com/properties/list?destinationId=${props.location}&pageNumber=1&pageSize=24&checkIn=2020-01-08&checkOut=2020-01-15&adults1=1&sortOrder=PRICE&locale=en_US&currency=USD&priceMin=${event.target.value}&priceMax=${maxPrice}`,
      options
    )
      .then((response) => response.json())
      .then((response) =>
        props.setHotels(response.data.body.searchResults.results)
      )
      .catch((err) => console.error(err));
    console.log("min" + event.target.value + " max" + maxPrice);
  };
  const [maxPrice, setMaxPrice] = useState("100");

  const handleMaxChange = (event) => {
    setMaxPrice(event.target.value);
    fetch(
      `https://hotels4.p.rapidapi.com/properties/list?destinationId=${props.location}&pageNumber=1&pageSize=24&checkIn=2020-01-08&checkOut=2020-01-15&adults1=1&sortOrder=PRICE&locale=en_US&currency=USD&priceMin=${minPrice}&priceMax=${event.target.value}`,
      options
    )
      .then((response) => response.json())
      .then((response) =>
        props.setHotels(response.data.body.searchResults.results)
      )
      .catch((err) => console.error(err));
    console.log("min" + minPrice + " max" + event.target.value);
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

  //}, []);
  //}

  return (
    <div class="priceFilter">
      <Box class="minPrice" style={{ marginRight: "-4rem" }}>
        <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>
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
      <Box class="maxPrice" style={{ marginRight: "-6rem" }}>
        <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>
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

  const options = {
    method: "GET",
    headers: {
      "X-RapidAPI-Host": "hotels4.p.rapidapi.com",
      "X-RapidAPI-Key": "12754539cdmshf2c81b762b1275bp1db5dajsncd6d5dbc56ac",
    },
  };
  useEffect(() => {
    fetch(
      `https://hotels4.p.rapidapi.com/properties/list?destinationId=${props.location}&pageNumber=1&pageSize=24&checkIn=2020-01-08&checkOut=2020-01-15&adults1=1&sortOrder=PRICE&locale=en_US&currency=USD`,
      options
    )
      .then((response) => response.json())
      .then((response) => setHotels(response.data.body.searchResults.results))
      .catch((err) => console.error(err));
  }, []);

  useEffect(() => {
    fetch(
      `https://hotels4.p.rapidapi.com/properties/list?destinationId=${props.location}&pageNumber=1&pageSize=24&checkIn=2020-01-08&checkOut=2020-01-15&adults1=1&sortOrder=PRICE&locale=en_US&currency=USD`,
      options
    )
      .then((response) => response.json())
      .then((response) => setHeading(response.data.body.header))
      .catch((err) => console.error(err));
  }, []);
  return (
    <div>
      <Typography
        class="header"
        fontSize={50}
        // fontWeight="bold"
        style={{
          color: "grey",
          fontFamily: "Segoe Print, Display, Script, Sans Serif",
          textAlign: "center",
          fontWeight: "bold",
          marginTop: "4rem",
        }}
      >
        Hotels near {heading}
      </Typography>
      <div>
        <div class="hotels">
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
          {hotels &&
            hotels.map((hotel, index) => (
              <Grid item xs={3}>
                <Hotel
                  title={hotel.name}
                  starRating={hotel.starRating}
                  streetAddress={hotel.address.streetAddress}
                  thumbnail={hotel.optimizedThumbUrls.srpDesktop}
                  price={hotel}
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
