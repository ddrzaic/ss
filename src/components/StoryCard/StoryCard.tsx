import React from "react";
import * as S from "./StoryCard.styled";
import { IconButton } from "@mui/material";
import FavoriteIcon from "@mui/icons-material/Favorite";

export type StoryCardProps = {
  title: string;
  content: string;
  category: string;
  author: string;
  date: string;
  isFavorite: boolean;
  testId?: string;
};

export const StoryCard: React.FC<StoryCardProps> = ({
  title,
  content,
  category,
  author,
  date,
  isFavorite,
  testId,
}) => {
  return (
    <S.StoryCardContainer data-testid={testId}>
      <S.StoryCardTitle>{title}</S.StoryCardTitle>
      <S.StoryCardContent>{content}</S.StoryCardContent>
      <S.StoryCardMeta>
        <S.StoryCardMetaItem>{category}</S.StoryCardMetaItem>
        <S.StoryCardMetaItem>{author}</S.StoryCardMetaItem>
        <S.StoryCardMetaItem>{date}</S.StoryCardMetaItem>
      </S.StoryCardMeta>
      <S.StoryCardActions>
        <IconButton aria-label="add to favorites" disableRipple>
          <FavoriteIcon color={isFavorite ? "secondary" : "primary"} />
        </IconButton>
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
      />
    );
  });

  return <S.StoryCardsWrapper>{cards}</S.StoryCardsWrapper>;
};
