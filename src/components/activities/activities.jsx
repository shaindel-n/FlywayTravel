import FavoriteIcon from "@mui/icons-material/Favorite";
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
import { useEffect, useState } from "react";

//fetches:

//get each activity's details, need xid
// fetch('https://opentripmap-places-v1.p.rapidapi.com/%7Blang%7D/places/xid/%7Bxid%7D', options)
// 	.then(response => response.json())
// 	.then(response => console.log(response))
// 	.catch(err => console.error(err));

//get activity details by id

// function LocationInput(props) {
//   const [locationInput, setLocationInput] = useState("");

//   const inputLocation = (e) => {
//     e.preventDefault();
//     if (!inputLocation) {
//       console.log("error");
//       return;
//     }
//     props.setCurrLocation(locationInput);
//     console.log(locationInput);
//     setLocationInput("");
//     //get coordinates:
//     const options = {
//       method: "GET",
//       headers: {
//         "X-RapidAPI-Host": "opentripmap-places-v1.p.rapidapi.com",
//         "X-RapidAPI-Key": "12754539cdmshf2c81b762b1275bp1db5dajsncd6d5dbc56ac",
//       },
//     };
//     fetch(
//       `https://opentripmap-places-v1.p.rapidapi.com/en/places/geoname?name=${locationInput}`,
//       options
//     )
//       .then((response) => response.json())
//       .then((response) => props.setCurrLocation(response.properties)) //get .lon and .lat
//       .catch((err) => console.error(err));
//   };
//   return (
//     <div class="locationInput">
//       <form onSubmit={inputLocation}>
//         <TextField
//           id="standard-basic"
//           label="Where would you like to go?"
//           variant="standard"
//           //style={{ minWidth: "20rem" }} // justifyContent: "center" }}
//           onChange={(e) => setLocationInput(e.target.value)}
//         />
//       </form>
//     </div>
//   );
// }

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
        <CardMedia
          component="img"
          height="140"
          image={props.thumbnail}
          alt="thumnail"
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {props.title}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {props.streetAddress}
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

function Filter(props) {
  const handleChange = (e) => {
    props.setFilter(e.target.value);
  };

  return (
    <Box style={{ position: "absolute", right: "5", top: "5" }}>
      <FormControl style={{ margin: "2rem" }}>
        <InputLabel id="demo-simple-select-label">Filter by Rating</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={props.filter}
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

export const Activities = (props) => {
  const [activityIdsList, setActivityIdsList] = useState([]);
  const [activity, setActivity] = useState([]);
  const [activities, setActivities] = useState([]);
  const [filter, setFilter] = useState(0);

  const options = {
    method: "GET",
    headers: {
      "X-RapidAPI-Host": "opentripmap-places-v1.p.rapidapi.com",
      "X-RapidAPI-Key": "12754539cdmshf2c81b762b1275bp1db5dajsncd6d5dbc56ac",
    },
  };
  //get activities by radius, need lon and lat
  useEffect(() => {
    fetch(
      `https://opentripmap-places-v1.p.rapidapi.com/en/places/radius?radius=1000&lon=${props.longitude}&lat=${props.latitude}`,
      options
    )
      //console.log("longitude: " + props.longitude);
      .then((response) => response.json())
      .then((response) => setActivityIdsList(response.features)) //[i].properties.xid)) //need to map it, then can get each one's properties.xid, can get rating here also
      .catch((err) => console.error(err));
  }, []);
  console.log(activityIdsList);

  //get list of xids
  const options2 = {
    method: "GET",
    headers: {
      "X-RapidAPI-Host": "opentripmap-places-v1.p.rapidapi.com",
      "X-RapidAPI-Key": "12754539cdmshf2c81b762b1275bp1db5dajsncd6d5dbc56ac",
    },
  };
  useEffect(() => {
    activityIdsList.forEach((element) => {
      fetch(
        `https://opentripmap-places-v1.p.rapidapi.com/en/places/xid/${element.properties.xid}`,
        options2
      )
        .then((response) => response.json())
        .then((response) =>
          setActivities(
            fetch(
              `https://opentripmap-places-v1.p.rapidapi.com/en/places/xid/${response}`,
              options
            )
              .then((response) => response.json())
              .then((response) => setActivity(response))
              .catch((err) => console.error(err))
          ).catch((err) => console.error(err))
        );
      console.log(activity);
    });
  }, []);

  //activitiesList.forEach((element) => console.log(element.properties.xid));

  return (
    <div style={{ marginTop: "3rem" }}>
      <Filter filter={filter} setFilter={setFilter} />
      {/* <LocationInput setCurrLocation={setCurrLocation} /> */}
      <div
        style={{ justifyContent: "left" }}
        //fillActivityIds={fillActivityIds}
      />

      {activity.map((act, index) => (
        <Activity
          title={act.name}
          starRating={act.rate}
          thumbnail={act.image}
          liked={act.liked}
          key={index}
        />
      ))}
    </div>
  );
};
