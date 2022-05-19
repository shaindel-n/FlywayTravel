// import FavoriteIcon from "@mui/icons-material/Favorite";
import {
  Paper,
  Box,
  IconButton,
  InputLabel,
  MenuItem,
  FormControl,
  Select,
  Card,
  CardMedia,
  CardContent,
  Typography,
  CardActions,
  Grid,
  TextField,
  Rating,
  Button,
} from "@mui/material";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { useContext } from "react";
import { FavoritesContext } from "../state/home/context";
import "./activities.css";
import React, { useState, useEffect } from "react";
import { fontFamily } from "@mui/system";

export const MainPage = (props) => {
  const [heading, setHeading] = useState("");

  useEffect(() => {
    fetch(
      `https://hotels4.p.rapidapi.com/properties/list?destinationId=${props.locationId}&pageNumber=1&pageSize=28&checkIn=2020-01-08&checkOut=2020-01-15&adults1=1&sortOrder=PRICE&locale=en_US&currency=USD`,
      options
    )
      .then((response) => response.json())
      .then((response) => setHeading(response.data.body.header))
      .catch((err) => console.error(err));
  }, []);
  const options = {
    method: "GET",
    headers: {
      "X-RapidAPI-Host": "hotels4.p.rapidapi.com",
      "X-RapidAPI-Key": "12754539cdmshf2c81b762b1275bp1db5dajsncd6d5dbc56ac",
    },
  };
  return (
    <div>
      <Typography
        class="header"
        fontSize={50}
        style={{
          color: "grey",
          textAlign: "center",
          marginTop: "4rem",
          fontWeight: "bold",
          fontFamily: "Segoe Print, Display, Script, Sans Serif",
        }}
      >
        Activities near {heading}
      </Typography>
      <Activities latitude={props.latitude} longitude={props.longitude} />
    </div>
  );
};

const Activities = (props) => {
  const [activityXids, setActivityXids] = useState([]);
  const [activities, setActivities] = useState([]);
  const [loading, setLoading] = useState(false);

  const options = {
    method: "GET",
    headers: {
      "X-RapidAPI-Host": "opentripmap-places-v1.p.rapidapi.com",
      "X-RapidAPI-Key": "12754539cdmshf2c81b762b1275bp1db5dajsncd6d5dbc56ac",
    },
  };

  useEffect(() => {
    if (props.latitude != "" && props.longitude != "") {
      fetch(
        `https://opentripmap-places-v1.p.rapidapi.com/en/places/radius?radius=1000&lon=${props.longitude}&lat=${props.latitude}`,
        options
      )
        .then((response) => response.json())
        .then((body) => {
          console.log("setting radius response");
          const newActivityXids = body.features.map(
            (feature) => feature.properties.xid
          );
          console.log(newActivityXids);
          setActivityXids(newActivityXids); // you might want to reduce the size of the array so that the results load faster, maybe dont save more than 100
          setLoading(true);
          fetchNewActivities(newActivityXids);
        })
        .catch((err) => console.error(err));
    }
  }, [props.latitude, props.longitude]);

  function fetchNewActivities(activityXids) {
    var promises = activityXids.map((xid) =>
      fetch(
        `https://opentripmap-places-v1.p.rapidapi.com/en/places/xid/${xid}`,
        options
      ).then((response) => response.json())
    );

    Promise.all(promises).then((results) => {
      console.log("Promise.all");
      console.log(results);
      setLoading(false);
      setActivities(results);
    });
  }

  return (
    <div style={{ marginTop: "3rem" }}>
      <RateFilter
        latitude={props.latitude}
        longitude={props.longitude}
        setActivities={setActivities}
        setActivityXids={setActivityXids}
        fetchNewActivities={fetchNewActivities}
      />
      {loading && <div>loading activities.. </div>}
      <Grid container direction="row" columns={12} spacing={2}>
        {activities.map((activity, index) => (
          <Grid item xs={3}>
            <Activity
              title={activity.name}
              starRating={activity.rate}
              neighborhood={activity.address.neighbourhood}
              city={activity.address.city}
              url={activity.url}
            />
          </Grid>
        ))}
      </Grid>
    </div>
  );
};

export function Activity(props) {
  const listContext = useContext(FavoritesContext);
  const [favorited, setFavorited] = useState(false);

  return (
    <div className="activity">
      <Card
        sx={{ maxWidth: 345 }}
        style={{
          background: "white",
          color: "rgb(88, 214, 183)",
          minHeight: "10rem",
          maxHeight: "10rem",
          margin: "1rem",
        }}
      >
        <CardActions
          style={{ position: "relative", top: "6rem", float: "right" }}
        >
          <Rating
            name="read-only"
            value={props.starRating}
            precision={0.5}
            max={3}
            readOnly
            style={{}}
          />
          <Button>
            <FavoriteIcon
              style={{
                color: favorited ? "red" : "lightgray",
              }}
              onClick={() => {
                if (!favorited) {
                  listContext.listDispatch({
                    type: "add",
                    index: props.index,
                    title: props.title,
                    starRating: props.starRating,
                    id: props.id,
                  });
                  setFavorited(true);
                }
              }}
            />
          </Button>
        </CardActions>
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            <a
              href={props.url}
              style={{
                textDecoration: "none",
                color: "rgb(88, 214, 183)",
                fontStyle: "italic",
                fontWeight: "bold",
                fontFamily: "Segoe Print, Display, Script, Sans Serif",
              }}
            >
              {props.title}
            </a>
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {props.neighborhood}, {props.city}
          </Typography>
          <Typography variant="body2" color="text.secondary"></Typography>
        </CardContent>
      </Card>
    </div>
  );
}

function RateFilter(props) {
  const [rating, setRating] = useState("");
  const [activities, setActivities] = useState([]);
  const [loading, setLoading] = useState(false);
  const handleChange = (event) => {
    setRating(event.target.value);
    fetch(
      `https://opentripmap-places-v1.p.rapidapi.com/en/places/radius?radius=1000&lon=${props.longitude}&lat=${props.latitude}&rate=${event.target.value}`,
      options
    )
      .then((response) => response.json())
      .then((body) => {
        console.log("setting radius response");
        console.log(props.longitude + ", " + props.latitude);
        const newActivityXids = body.features?.map(
          (feature) => feature.properties.xid
        );
        console.log(newActivityXids);
        props.setActivityXids(newActivityXids); // you might want to reduce the size of the array so that the results load faster, maybe dont save more than 100
        fetchNewActivities(newActivityXids);
      })
      .catch((err) => console.error(err));
  };
  function fetchNewActivities(activityXids) {
    var promises = activityXids.map((xid) =>
      fetch(
        `https://opentripmap-places-v1.p.rapidapi.com/en/places/xid/${xid}`,
        options
      ).then((response) => response.json())
    );

    Promise.all(promises).then((results) => {
      console.log("Promise.all");
      console.log(results);
      setLoading(false);
      setActivities(results);
    });
  }
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
        style={{ margin: "2rem", marginLeft: "4rem" }}
      >
        <InputLabel id="demo-simple-select-standard-label">
          Filter by Rating
        </InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={rating}
          label="Filter by Rating"
          onChange={handleChange}
          style={{ maxWidth: "10%", minWidth: "10rem" }}
        >
          <MenuItem value={3}>3 Stars</MenuItem>
          <MenuItem value={2}>2 Stars</MenuItem>
          <MenuItem value={1}>1 Star</MenuItem>
        </Select>
      </FormControl>
    </Box>
  );
}
