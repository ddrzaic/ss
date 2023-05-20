import styled, { css } from "styled-components";

export const StoryCardContainer = styled.div(
  ({ theme }) => css`
    display: flex;
    flex-direction: column;
    max-width: 280px;
    height: 405px;
    border-radius: 5px;
    padding: 10px;
    box-shadow: 0 0 15px 0 rgba(0, 0, 0, 0.3);
    transition: all 0.2s ease-in-out;
    overflow: hidden;
    background-color: ${theme.palette?.primary.white};
    &:hover {
      transform: scale(1.03);
    }

    /* full width on mobile */
    @media (max-width: 768px) {
      width: 100%;
      max-width: 100%;
    }
  `
);

export const StoryCardTitle = styled.h2`
  font-size: 1.5rem;
  font-weight: 500;
  margin: 0;
  margin-bottom: 10px;
  overflow: hidden;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 1; /* start showing ellipsis when 3rd line is reached */
  white-space: pre-wrap;
`;

export const StoryCardContent = styled.p`
  font-size: 1rem;
  font-weight: 400;
  margin: 0;
  flex-grow: 1;
  margin-bottom: 10px;
  overflow: hidden;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 14; /* start showing ellipsis when 3rd line is reached */
  white-space: pre-wrap;
`;

export const StoryCardMeta = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: auto;
`;

export const StoryCardMetaItem = styled.span`
  font-size: 0.8rem;
  font-weight: 400;
  margin: 0;
`;

export const StoryCardActions = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  gap: 10px;
`;

export const StoryCardsWrapper = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: center;
  gap: 20px;
`;
