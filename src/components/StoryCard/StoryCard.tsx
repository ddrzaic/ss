import React from "react";
import * as S from "./StoryCard.styled";
import { IconButton, Tooltip } from "@mui/material";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { useRouter } from "next/router";
import CircularProgress from "@mui/material/CircularProgress";
import { useUser } from "../UserProvider/UserProvider";
import axios from "axios";
import { useFavorites } from "../FavoritesProvider/FavoritesProvider";
import { formatDateTime } from "@/helpers/common";

export type StoryCardProps = {
  id: number;
  title: string;
  content: string;
  category: string;
  author: string;
  date: string;
  isFavorite: boolean;
  testId?: string;
  handleFavoriteClick?: (id: number) => void;
};

export const StoryCard: React.FC<StoryCardProps> = ({
  id,
  title,
  content,
  category,
  author,
  date,
  isFavorite,
  testId,
  handleFavoriteClick,
}) => {
  const { push } = useRouter();
  const { isFetching } = useFavorites();

  const onClickHandler = () => {
    push(`/story/${id}`);
  };

  return (
    <S.StoryCardContainer data-testid={testId} onClick={onClickHandler}>
      <Tooltip title={title} placement="top">
        <S.StoryCardTitle>{title}</S.StoryCardTitle>
      </Tooltip>
      <S.StoryCardContent>{content}</S.StoryCardContent>
      <S.StoryCardMeta>
        <S.StoryCardMetaItem>{category}</S.StoryCardMetaItem>
        <S.StoryCardMetaItem>{author}</S.StoryCardMetaItem>
        <S.StoryCardMetaItem>{formatDateTime(date).date}</S.StoryCardMetaItem>
      </S.StoryCardMeta>
      <S.StoryCardActions>
        {!isFetching ? (
          <Tooltip
            title={isFavorite ? "Remove from favorites" : "Add to favorites"}
            placement="top"
          >
            <IconButton
              aria-label="add to favorites"
              disableRipple
              onClick={(e) => {
                e.stopPropagation();
                handleFavoriteClick && handleFavoriteClick(id);
              }}
              data-testid="favorite-button"
            >
              <FavoriteIcon color={isFavorite ? "secondary" : "primary"} />
            </IconButton>
          </Tooltip>
        ) : (
          <CircularProgress color="secondary" />
        )}
      </S.StoryCardActions>
    </S.StoryCardContainer>
  );
};

type StoryCardsWrapperProps = {
  storyCards: StoryCardProps[];
  isLoading?: boolean;
};

export const StoryCardsWrapper = ({
  storyCards,
  isLoading,
}: StoryCardsWrapperProps) => {
  const cards: JSX.Element[] = [];
  const { favorites, setFavorites } = useFavorites();
  const { user } = useUser();

  const handleFavoriteClick = async (id: number) => {
    const shouldAddToFavorites = !favorites.includes(id);

    if (shouldAddToFavorites) {
      const response = await axios.post(`/api/favorites/${user?.id}`, {
        storyId: id,
        jwt: user?.jwt,
      });
      if (response.status === 200) {
        setFavorites([...favorites, id]);
      }
    } else {
      const response = await axios.delete(`/api/favorites/${user?.id}`, {
        params: { storyId: id, jwt: user?.jwt },
      });
      if (response.status === 200) {
        setFavorites(favorites.filter((favorite) => favorite !== id));
      }
    }
  };

  storyCards.forEach((storyCard, index) => {
    cards.push(
      <StoryCard
        key={index}
        title={storyCard.title}
        content={storyCard.content}
        category={storyCard.category}
        author={storyCard.author}
        date={storyCard.date}
        isFavorite={favorites.includes(storyCard.id)}
        id={storyCard.id}
        handleFavoriteClick={handleFavoriteClick}
        testId={`story-card-${index}`}
      />
    );
  });

  return (
    <S.StoryCardsWrapper>
      {isLoading ? (
        <CircularProgress color="secondary" style={{ marginTop: "200px" }} />
      ) : (
        cards
      )}
    </S.StoryCardsWrapper>
  );
};
