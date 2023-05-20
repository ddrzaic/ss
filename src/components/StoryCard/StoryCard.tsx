import React from "react";
import * as S from "./StoryCard.styled";
import { IconButton, Tooltip } from "@mui/material";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { useRouter } from "next/router";

export type StoryCardProps = {
  id: number;
  title: string;
  content: string;
  category: string;
  author: string;
  date: string;
  isFavorite: boolean;
  testId?: string;
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
}) => {
  const { push } = useRouter();

  const onClickHandler = () => {
    push(`/story/${id}`);
  };

  const handleFavoriteClick = (id: number) => {};

  return (
    <S.StoryCardContainer data-testid={testId} onClick={onClickHandler}>
      <Tooltip title={title} placement="top">
        <S.StoryCardTitle>{title}</S.StoryCardTitle>
      </Tooltip>
      <S.StoryCardContent>{content}</S.StoryCardContent>
      <S.StoryCardMeta>
        <S.StoryCardMetaItem>{category}</S.StoryCardMetaItem>
        <S.StoryCardMetaItem>{author}</S.StoryCardMetaItem>
        <S.StoryCardMetaItem>{date}</S.StoryCardMetaItem>
      </S.StoryCardMeta>
      <S.StoryCardActions>
        <Tooltip
          title={isFavorite ? "Remove from favorites" : "Add to favorites"}
          placement="top"
        >
          <IconButton
            aria-label="add to favorites"
            disableRipple
            onClick={(e) => {
              e.stopPropagation();
              handleFavoriteClick(id);
            }}
          >
            <FavoriteIcon color={isFavorite ? "secondary" : "primary"} />
          </IconButton>
        </Tooltip>
      </S.StoryCardActions>
    </S.StoryCardContainer>
  );
};

type StoryCardsWrapperProps = {
  storyCards: StoryCardProps[];
};

export const StoryCardsWrapper = ({ storyCards }: StoryCardsWrapperProps) => {
  const cards: JSX.Element[] = [];

  storyCards.forEach((storyCard, index) => {
    cards.push(
      <StoryCard
        key={index}
        title={storyCard.title}
        content={storyCard.content}
        category={storyCard.category}
        author={storyCard.author}
        date={storyCard.date}
        isFavorite={storyCard.isFavorite}
        id={storyCard.id}
      />
    );
  });

  return <S.StoryCardsWrapper>{cards}</S.StoryCardsWrapper>;
};
