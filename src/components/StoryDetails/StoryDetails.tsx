import React from "react";
import * as S from "./StoryDetails.styled";
import { Category } from "@/types/common";
import WatchLaterIcon from "@mui/icons-material/WatchLater";
import CategoryIcon from "@mui/icons-material/Category";
import PersonIcon from "@mui/icons-material/Person";

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
          <S.MetaItem>
            <WatchLaterIcon /> {date}
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
