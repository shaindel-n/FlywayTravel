import React, { useContext } from "react";
import { FavoritesContext } from "../state/home/context";
import { Hotel } from "../hotels/hotels";
import { Grid } from "@mui/material";

export const Favorites = () => {
  const listContext = useContext(FavoritesContext);
  return (
    <div>
      {listContext.listState.map((hotel, index) => (
        <Grid item xs={3}>
          <Hotel
            title={hotel.name}
            starRating={hotel.starRating}
            // liked={hotel.liked}
            streetAddress={hotel.streetAddress}
            thumbnail={hotel.thumbnail}
            // price={hotel.ratePlan.price.current}
            key={index}
            index={hotel.index}
          />
        </Grid>
      ))}
    </div>
  );
};
