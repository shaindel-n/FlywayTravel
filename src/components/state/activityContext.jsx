import React, { useReducer } from "react";

var initialList = [];
const changeFavoritesReducer = (state, action) => {
  var newFavorites = [];
  switch (action.type) {
    case "add":
      if (!state.some((activity) => action.id === activity.id)) {
        newFavorites = [
          ...state,
          {
            title: action.title,
            id: action.id,
            index: action.index,
            isFavorited: true,
            starRating: action.starRating,
            neighborhood: action.neighborhood,
            city: action.city,
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

export const ActivityFavoritesContext = React.createContext();

export const ActivityFavoritesProvider = (props) => {
  const [favoritesState, dispatchChangeFavorites] = useReducer(
    changeFavoritesReducer,
    initialList
  );

  return (
    <ActivityFavoritesContext.Provider
      value={{
        listState: favoritesState,
        listDispatch: dispatchChangeFavorites,
      }}
    >
      {props.children}
    </ActivityFavoritesContext.Provider>
  );
};
