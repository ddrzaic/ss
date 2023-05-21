import React from "react";
import * as S from "./StoryDetails.styled";
import { Category } from "@/types/common";
import WatchLaterIcon from "@mui/icons-material/WatchLater";
import CategoryIcon from "@mui/icons-material/Category";
import PersonIcon from "@mui/icons-material/Person";
import { formatDateTime } from "@/helpers/common";
import { IconButton, Tooltip } from "@mui/material";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { useFavorites } from "../FavoritesProvider/FavoritesProvider";
import axios from "axios";
import { useUser } from "../UserProvider/UserProvider";

type StoryDetailsProps = {
  id: number;
  title: string;
  content: string;
  category: Category;
  author: string;
  date: string;
  isFavorite: boolean;
};

export const StoryDetails = ({
  id,
  title,
  content,
  category,
  author,
  date,
  isFavorite,
}: StoryDetailsProps) => {
  const { favorites, setFavorites } = useFavorites();
  const [isFavoriteState, setIsFavoriteState] = React.useState(isFavorite);
  const { user } = useUser();

  const handleFavoriteClick = async (id: number) => {
    const shouldAddToFavorites = !isFavoriteState;
    if (shouldAddToFavorites) {
      const response = await axios.post(`/api/favorites/${user?.id}`, {
        storyId: id,
        jwt: user?.jwt,
      });
      if (response.status === 200) {
        setIsFavoriteState(true);
        setFavorites([...favorites, id]);
      }
    } else {
      const response = await axios.delete(`/api/favorites/${user?.id}`, {
        params: { storyId: id, jwt: user?.jwt },
      });
      if (response.status === 200) {
        setFavorites(favorites.filter((favorite) => favorite !== id));
        setIsFavoriteState(false);
      }
    }
  };

  return (
    <S.StoryDetailsContainer>
      <S.HeadingWrapper>
        <S.TitleAndAuthorWrapper>
          <S.Title>{title}</S.Title>
          <S.MetaItem>
            <PersonIcon /> {author}
          </S.MetaItem>
        </S.TitleAndAuthorWrapper>
        <S.MetaWrapper>
          <S.MetaItem style={{ justifyContent: "flex-end" }}>
            <Tooltip
              title={isFavorite ? "Remove from favorites" : "Add to favorites"}
              placement="top"
            >
              <S.HeartIconWrapper
                aria-label="add to favorites"
                disableRipple
                onClick={(e) => {
                  e.stopPropagation();
                  handleFavoriteClick && handleFavoriteClick(id);
                }}
              >
                <FavoriteIcon
                  color={isFavoriteState ? "secondary" : "primary"}
                />
              </S.HeartIconWrapper>
            </Tooltip>
          </S.MetaItem>
          <S.MetaItem>
            <WatchLaterIcon />
            {formatDateTime(date).date}
            {" at "}
            {formatDateTime(date).time}
          </S.MetaItem>
          <S.MetaItem>
            <CategoryIcon /> {category.label}
          </S.MetaItem>
        </S.MetaWrapper>
      </S.HeadingWrapper>
      <S.Content>{content}</S.Content>
    </S.StoryDetailsContainer>
  );
};
