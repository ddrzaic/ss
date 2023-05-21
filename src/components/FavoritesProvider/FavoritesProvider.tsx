import React, { useEffect } from "react";
import { useUser } from "../UserProvider/UserProvider";
import axios from "axios";

type FavoritesContextProps = {
  favorites: number[];
  setFavorites: React.Dispatch<React.SetStateAction<number[]>>;
  isFetching: boolean;
};

const FavoritesContext = React.createContext<FavoritesContextProps>({
  favorites: [],
  setFavorites: () => {},
  isFetching: false,
});

type FavoritesProviderProps = {
  children: React.ReactNode;
};

export const FavoritesProvider: React.FC<FavoritesProviderProps> = ({
  children,
}) => {
  const { user } = useUser();
  const [favorites, setFavorites] = React.useState<number[]>([]);
  const [isFetching, setIsFetching] = React.useState<boolean>(true);

  useEffect(() => {
    // fetch fevorite stories
    const asyncFetchFavorites = async () => {
      setIsFetching(true);
      const response = await axios.get(`/api/favorites/${user?.id}`);
      setFavorites(response.data.favorites);
      setIsFetching(false);
    };
    if (user.id) {
      asyncFetchFavorites();
    }
  }, [user.id]);

  return (
    <FavoritesContext.Provider value={{ favorites, setFavorites, isFetching }}>
      {children}
    </FavoritesContext.Provider>
  );
};

export const useFavorites = () => React.useContext(FavoritesContext);
