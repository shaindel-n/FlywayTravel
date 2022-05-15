import React, { useReducer } from "react";

var initialList = [];
const changeFavoritesReducer = (state, action) => {
  var newFavorites = [];
  switch (action.type) {
    case "add":
      newFavorites = [
        ...state,
        {
          title: action.title,
          id: action.id,
          index: action.index,
          image: action.image,
          isFavorited: true,
        },
      ];
      return newFavorites;

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
