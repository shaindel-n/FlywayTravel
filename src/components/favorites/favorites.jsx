import React, { useContext } from "react";
import { FavoritesContext } from "../state/home/context";
import { Hotel } from "../hotels/hotels";
import { Activity } from "../activities/activities";
import { Grid, Typography } from "@mui/material";

export const Favorites = () => {
  const listContext = useContext(FavoritesContext);
  return (
    <div>
      <Typography
        variant="h2"
        fontWeight="bolder"
        color="rgb(12, 84, 66)"
        style={{ margin: "4rem", textAlign: "center" }}
      >
        My Favorites
      </Typography>
      <Grid container direction="row" columns={12} spacing={2}>
        {listContext.listState.map((hotel, index) => (
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
          </Grid>
        ))}
      </Grid>
    </div>
  );
};
