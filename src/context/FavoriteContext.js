import React, { createContext, useContext, useReducer } from "react";

const FavoriteContext = createContext();

const initialState = {
  favorites: [],
};

function favoriteReducer(state, action) {
  switch (action.type) {
    case "ADD_FAVORITE": {
      const exists = state.favorites.find(
        (book) => book.key === action.payload.key
      );

      if (exists) {
        return state;
      }

      return {
        ...state,
        favorites: [...state.favorites, action.payload],
      };
    }

    case "REMOVE_FAVORITE":
      return {
        ...state,
        favorites: state.favorites.filter(
          (book) => book.key !== action.payload
        ),
      };

    default:
      return state;
  }
}

export function FavoriteProvider({ children }) {
  const [state, dispatch] = useReducer(favoriteReducer, initialState);

  function addFavorite(book) {
    dispatch({
      type: "ADD_FAVORITE",
      payload: book,
    });
  }

  function removeFavorite(bookKey) {
    dispatch({
      type: "REMOVE_FAVORITE",
      payload: bookKey,
    });
  }

  function isFavorite(bookKey) {
    return state.favorites.some((book) => book.key === bookKey);
  }

  return (
    <FavoriteContext.Provider
      value={{
        favorites: state.favorites,
        addFavorite,
        removeFavorite,
        isFavorite,
      }}
    >
      {children}
    </FavoriteContext.Provider>
  );
}

export function useFavorites() {
  return useContext(FavoriteContext);
}