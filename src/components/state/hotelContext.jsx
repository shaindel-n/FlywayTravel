import React, { useReducer } from "react";

var initialList = [];
const changeFavoritesReducer = (state, action) => {
  var newFavorites = [];
  switch (action.type) {
    case "add":
      if (!state.some((hotel) => action.id === hotel.id)) {
        newFavorites = [
          ...state,
          {
            title: action.title,
            id: action.id,
            index: action.index,
            thumbnail: action.thumbnail,
            isFavorited: true,
            streetAddress: action.streetAddress,
            starRating: action.starRating,
            price: action.price,
          },
        ];
        return newFavorites;
      }
      return state;
    case "remove":
      newFavorites = [...state];
      newFavorites.splice(action.index, 1);
      return newFavorites;

    default:
      throw new Error(`Count Reducer does not recognize ${action.type}`);
  }
};

export const FavoritesContext = React.createContext();

export const FavoritesProvider = (props) => {
  const [favoritesState, dispatchChangeFavorites] = useReducer(
    changeFavoritesReducer,
    initialList
  );

  return (
    <FavoritesContext.Provider
      value={{
        listState: favoritesState,
        listDispatch: dispatchChangeFavorites,
      }}
    >
      {props.children}
    </FavoritesContext.Provider>
  );
};
