import styled, { css } from "styled-components";

export const StoryDetailsContainer = styled.div(
  ({ theme }) => css`
    display: flex;
    flex-direction: column;

    padding: 20px;
    background-color: ${theme.palette.primary.white};
    margin: 10px 0;
    box-shadow: 0px 0px 10px 0px rgba(0, 0, 0, 0.2);
  `
);

export const Title = styled.h2(
  ({ theme }) => css`
    font-weight: 500;
    font-size: 25px;
    margin: 0;
    margin-bottom: 10px;
    align-self: flex-start;
    color: ${theme.palette.typography.primary};

    @media (max-width: 768px) {
      font-size: 20px;
    }
  `
);

export const TitleAndAuthorWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-self: flex-start;

  @media (max-width: 768px) {
    margin-bottom: 10px;
  }
`;

export const HeadingWrapper = styled.div(
  ({ theme }) => css`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    color: ${theme.palette.typography.secondary};
    padding-bottom: 25px;
    border-bottom: 1px solid ${theme.palette.typography.secondary};

    svg {
      font-size: 18px;
    }

    @media (max-width: 768px) {
      flex-direction: column;
    }
  `
);

export const MetaWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  gap: 10px;

  & > p {
    margin: 5px 0;
  }

  @media (max-width: 768px) {
    align-self: flex-start;
  }
`;

export const MetaItem = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 7px;
`;

export const Content = styled.p`
  font-size: 18px;

  @media (max-width: 768px) {
    font-size: 16px;
  }
`;
