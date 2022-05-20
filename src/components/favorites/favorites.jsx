import React, { useContext } from "react";
import { FavoritesContext } from "../state/hotelContext";
import { Hotel } from "../hotels/hotels";
import { Activity } from "../activities/activities";
import { Grid, Typography } from "@mui/material";
import { ActivityFavoritesContext } from "../state/activityContext";

export const Favorites = () => {
  const hotelListContext = useContext(FavoritesContext);
  const activityListContext = useContext(ActivityFavoritesContext);
  return (
    <div>
      <Typography
        variant="h2"
        fontWeight="bolder"
        color="rgb(12, 84, 66)"
        style={{
          margin: "4rem",
          textAlign: "center",
          fontFamily: "Segoe Print, Display, Script, Sans Serif",
        }}
      >
        My Favorites
      </Typography>
      <Typography
        variant="h4"
        style={{
          margin: "2rem",
          fontFamily: "Segoe Print, Display, Script, Sans Serif",
          color: "grey",
        }}
      >
        Hotels
      </Typography>
      <Grid container direction="row" columns={12} spacing={2}>
        {hotelListContext.listState.map((hotel, index) => (
          <Grid item xs={3}>
            <Hotel
              title={hotel.title}
              starRating={hotel.starRating}
              streetAddress={hotel.streetAddress}
              thumbnail={hotel.thumbnail}
              key={index}
              index={hotel.index}
              price={hotel.price}
            />
            {console.log(hotel.price)}
          </Grid>
        ))}
      </Grid>
      <Typography
        variant="h4"
        style={{
          margin: "2rem",
          fontFamily: "Segoe Print, Display, Script, Sans Serif",
          color: "grey",
        }}
      >
        Activities
      </Typography>
      <Grid container direction="row" columns={12} spacing={2}>
        {activityListContext.listState.map((activity, index) => (
          <Grid item xs={3}>
            <Activity
              title={activity.title}
              starRating={activity.starRating}
              index={index}
              neighborhood={activity.neighborhood}
              city={activity.city}
            />
          </Grid>
        ))}
      </Grid>
    </div>
  );
};
