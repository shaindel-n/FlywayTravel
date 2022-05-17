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
  TextField,
} from "@mui/material";

// function Filter(props) {
//   const handleChange = (e) => {
//     props.setFilter(e.target.value);
//   };

//   return (
//     <Box style={{ position: "absolute", right: "5", top: "5" }}>
//       <FormControl style={{ margin: "2rem" }}>
//         <InputLabel id="demo-simple-select-label">Filter by Rating</InputLabel>
//         <Select
//           labelId="demo-simple-select-label"
//           id="demo-simple-select"
//           value={props.filter}
//           label="Filter by Rating"
//           onChange={handleChange}
//           style={{ maxWidth: "10%", minWidth: "10rem", justifyItems: "left" }}
//         >
//           <MenuItem value={5}>5 Stars</MenuItem>
//           <MenuItem value={4}>4 Stars</MenuItem>
//           <MenuItem value={3}>3 Stars</MenuItem>
//         </Select>
//       </FormControl>
//     </Box>
//   );
// }

import React, { useState, useEffect } from "react";

export const MainPage = (props) => {
  return (
    <div>
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
      {loading && <div>loading new activities.. </div>}
      {activities.map((activity, index) => (
        <Activity
          title={activity.name}
          starRating={activity.rate}
          neighborhood={activity.address.neighbourhood}
          city={activity.address.city}
          url={activity.url}
        />
      ))}
    </div>
  );
};

// const Activity = (props) => {
//   return (
//     <div>
//       <div>title: {props.title}</div>
//       <div>rating: {props.starRating}</div>
//       <div>
//         {props.neighborhood}, {props.city}
//       </div>
//     </div>
//   );
// };

function Activity(props) {
  return (
    <div className="activity">
      <Card
        sx={{ maxWidth: 345 }}
        style={{
          background: "rgb(88, 214, 183)",
          color: "white",
          minHeight: "20rem",
          margin: "1rem",
        }}
      >
        {/* <CardMedia
          component="img"
          height="140"
          image={props.thumbnail}
          alt="thumnail"
        /> */}
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            <a href={props.url}>{props.title}</a>
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {props.neighborhood}, {props.city}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {props.starRating}
          </Typography>
        </CardContent>
        <CardActions>
          {/* <IconButton
            onClick={() => (
              props.liked ? (props.liked = false) : (props.liked = true),
              console.log(props.liked)
            )}
            style={{
              color: props.liked ? "red" : "lightgrey",
            }}
          >
            <FavoriteIcon />
          </IconButton> */}
        </CardActions>
      </Card>
    </div>
  );
}
