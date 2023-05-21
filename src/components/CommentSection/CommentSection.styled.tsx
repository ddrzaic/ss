import styled, { css } from "styled-components";
import {
  Paper as MaterialPaper,
  TextareaAutosize,
  Tooltip,
  Button as ButtonComponent,
} from "@mui/material";

export const CommentSectionWrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

export const Paper = styled(MaterialPaper)(
  ({ theme }) => css`
    padding: 20px 20px 0 20px;
    margin-top: 10px;
    background-color: ${theme.palette.primary.white};
  `
);

export const CommentAuthor = styled.h4`
  margin: 0;
  text-align: left;
`;

export const CommentTimestamp = styled.p(
  ({ theme }) => css`
    color: ${theme.palette.typography.secondary};
  `
);

export const CommentInput = styled(TextareaAutosize)(
  ({ theme }) => css`
    margin: 10px 0;
    resize: none;
    padding: 10px;
    border: 1px solid ${theme.palette.primary.main};
    border-radius: 5px;
    font-size: 16px;
    &:focus {
      outline: none;
    }
  `
);

export const CommentActions = styled.div(
  ({ theme }) => css`
    display: flex;
    justify-content: flex-start;
    margin-top: 15px;
    color: ${theme.palette.typography.secondary};
    gap: 7px;
  `
);

export const ActionButton = styled(Tooltip)`
  cursor: pointer;
`;

export const ModalContainer = styled.div(
  ({ theme }) => css`
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    background-color: ${theme.palette.primary.white};
    padding: 20px;
    border-radius: 5px;
    display: flex;
    flex-direction: column;
    gap: 10px;
    width: 400px;
    height: 200px;
    justify-content: center;
    align-items: center;
  `
);

export const CommentEditingWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

export const Button = styled(ButtonComponent)(
  ({ theme }) => css`
    background-color: ${theme.palette.primary.main};
    color: ${theme.palette.typography.primary};
    &:hover {
      background-color: ${theme.palette.secondary.main};
    }
    align-self: center;
  `
);
