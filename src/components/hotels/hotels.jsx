import FavoriteIcon from "@mui/icons-material/Favorite";
import {
  Box,
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
import { FavoritesContext } from "../state/hotelContext";
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
          style={{ position: "relative", top: "10rem", float: "right" }}
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
                    favorited: true,
                    id: props.id,
                    price: props.price,
                  });
                }
                setFavorited(true);
              }}
            />
          </Button>
        </CardActions>
        <CardContent style={{}}>
          <Typography
            gutterBottom
            variant="h5"
            component="div"
            color="rgb(88, 214, 183)"
            style={{
              position: "relative",
              left: "2rem",
              fontFamily: "Segoe Print, Display, Script, Sans Serif",
              fontStyle: "italic",
              textAlign: "center",
            }}
          >
            {props.title}
          </Typography>
          <Typography
            variant="body2"
            style={{
              fontFamily: "Segoe Print, Display, Script, Sans Serif",
              color: "grey",
            }}
          >
            {props.streetAddress}
          </Typography>
          <Typography
            style={{
              marginTop: ".2rem",
              fontFamily: "Segoe Print, Display, Script, Sans Serif",
              color: "grey",
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

function RateFilter(props) {
  const [rating, setRating] = useState("");
  const handleChange = (event) => {
    setRating(event.target.value);
    props.changeRating(event.target.value);
    fetch(
      `https://hotels4.p.rapidapi.com/properties/list?destinationId=${props.location}&pageNumber=1&pageSize=24&checkIn=2020-01-08&checkOut=2020-01-15&adults1=1&sortOrder=PRICE&locale=en_US&currency=USD&starRatings=${event.target.value}&priceMin=${props.priceFilterMin}&priceMax=${props.priceFilterMax}`,
      options
    )
      .then((response) => response.json())
      .then((response) =>
        props.setHotels(response.data.body.searchResults.results)
      )
      .catch((err) => console.error(err));
  };
  console.log(props.priceFilterMin + " " + props.priceFilterMax);
  const options = {
    method: "GET",
    headers: {
      "X-RapidAPI-Host": "hotels4.p.rapidapi.com",
      "X-RapidAPI-Key": "12754539cdmshf2c81b762b1275bp1db5dajsncd6d5dbc56ac",
    },
  };

  return (
    <Box class="filter">
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
    props.changePriceMin(event.target.value);
    fetch(
      `https://hotels4.p.rapidapi.com/properties/list?destinationId=${props.location}&pageNumber=1&pageSize=24&checkIn=2020-01-08&checkOut=2020-01-15&adults1=1&sortOrder=PRICE&locale=en_US&currency=USD&starRatings=${props.ratingFilter}&priceMin=${event.target.value}&priceMax=${maxPrice}`,
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
    props.changePriceMax(event.target.value);
    fetch(
      `https://hotels4.p.rapidapi.com/properties/list?destinationId=${props.location}&pageNumber=1&pageSize=24&checkIn=2020-01-08&checkOut=2020-01-15&adults1=1&sortOrder=PRICE&locale=en_US&currency=USD&starRatings=${props.ratingFilter}&priceMin=${minPrice}&priceMax=${event.target.value}`,
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
  const [heading, setHeading] = useState("");

  const changeRating = (rating) => {
    setRateFilter(rating);
  };

  const changePriceMin = (price) => {
    setPriceFilterMin(price);
  };

  const changePriceMax = (price) => {
    setPriceFilterMax(price);
  };

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
        style={{
          color: "rgb(12, 84, 66)",
          fontFamily: "Segoe Print, Display, Script, Sans Serif",
          textAlign: "center",
          fontWeight: "bold",
          marginTop: "4rem",
          fontSize: "1.8rem",
        }}
      >
        Hotels near {heading}
      </Typography>
      <div>
        <div class="hotels">
          <RateFilter
            rateFilter={rateFilter}
            changeRating={changeRating}
            setHotels={setHotels}
            location={props.location}
            priceFilterMin={priceFilterMin}
            priceFilterMax={priceFilterMax}
          />
          <PriceFilter
            setHotels={setHotels}
            location={props.location}
            changePriceMin={changePriceMin}
            changePriceMax={changePriceMax}
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
