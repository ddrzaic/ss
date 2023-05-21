import React, { useCallback } from "react";
import * as S from "./CommentSection.styled";
import {
  Avatar,
  Box,
  Button,
  CircularProgress,
  Grid,
  Modal,
} from "@mui/material";
import { Comment } from "@/types/common";
import { useUser } from "../UserProvider/UserProvider";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import axios from "axios";
import { formatDateTime, validateComment } from "@/helpers/common";

type CommentSectionProps = {
  comments: Comment[];
  storyId: number;
  notify?: () => void;
  isLoading?: boolean;
};

export const CommentSection = ({
  comments,
  storyId,
  notify,
  isLoading,
}: CommentSectionProps) => {
  const [comment, setComment] = React.useState("");
  const [commentEdit, setCommentEdit] = React.useState("");
  const [editingCommentId, setEditingCommentId] = React.useState<number | null>(
    null
  );
  const { user } = useUser();
  const [isModalOpen, setIsModalOpen] = React.useState(false);
  const [isLoadingState, setIsLoadingState] = React.useState(isLoading);
  const [isCommentInvalid, setIsCommentInvalid] = React.useState(false);
  const [commentToDelete, setCommentToDelete] = React.useState<number | null>(
    null
  );

  const handleChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    const content = event.target.value;
    const isContentValid = validateComment(content);
    setIsCommentInvalid(!isContentValid);
    setComment(content);
  };

  const handlePostComment = async () => {
    if (!user || isCommentInvalid) {
      return;
    }

    try {
      setIsLoadingState(true);
      const response = await axios.post(`/api/comment`, {
        content: comment,
        userId: user?.id,
        jwt: user?.jwt,
        storyId: storyId,
      });

      if (response.status === 200) {
        setComment("");
      }

      if (notify) {
        notify();
      }
    } catch (error) {
      console.log(error);
    }
    setIsLoadingState(false);
  };

  const openConfirmationModal = () => {
    setIsModalOpen(true);
  };

  const handleDeleteComment = useCallback(
    async (id: number) => {
      try {
        setIsLoadingState(true);
        const response = await axios.delete(`/api/comment`, {
          params: { id: id, jwt: user?.jwt, userId: user?.id },
        });

        if (response.status === 200 && notify) {
          notify();
        }
      } catch (error) {
        console.log(error);
      }

      setIsModalOpen(false);
      setIsLoadingState(false);
    },
    [user, notify]
  );

  const handleEditComment = useCallback(
    (id: number) => {
      setIsCommentInvalid(false);
      setEditingCommentId(id);
      setComment("");
      const commentToEdit = comments.find((comment) => comment.id === id);
      if (commentToEdit) {
        setCommentEdit(commentToEdit?.content || "");
      }
    },
    [comments]
  );

  const handleEditCommentContent = useCallback(
    (event: React.ChangeEvent<HTMLTextAreaElement>) => {
      const content = event.target.value;
      const isContentValid = validateComment(content);
      setIsCommentInvalid(!isContentValid);
      setCommentEdit(content);
    },
    []
  );

  const handleSaveComment = useCallback(async () => {
    if (!user || isCommentInvalid) {
      return;
    }

    try {
      setIsLoadingState(true);
      const response = await axios.patch(`/api/comment`, {
        id: editingCommentId,
        content: commentEdit,
        jwt: user?.jwt,
        userId: user?.id,
      });

      if (response.status === 200 && notify) {
        notify();
      }
    } catch (error) {
      console.log(error);
    }

    setEditingCommentId(null);
    setCommentEdit("");
    setIsLoadingState(false);
  }, [editingCommentId, commentEdit, user, notify, isCommentInvalid]);

  const commentCards = React.useMemo(() => {
    return comments.map((comment) => (
      <S.Paper key={comment.id}>
        <Grid container wrap="nowrap" spacing={2}>
          <Grid item>
            <Avatar alt="user" />
            {user?.id === comment.userId && (
              <S.CommentActions>
                <S.ActionButton title="Edit" placement="top">
                  <EditIcon onClick={() => handleEditComment(comment.id)} />
                </S.ActionButton>
                <S.ActionButton title="Delete" placement="top">
                  <DeleteIcon
                    onClick={() => {
                      openConfirmationModal();
                      setCommentToDelete(comment.id);
                    }}
                  />
                </S.ActionButton>
              </S.CommentActions>
            )}
          </Grid>
          <Grid justifyContent="left" item xs zeroMinWidth>
            <S.CommentAuthor style={{ margin: 0, textAlign: "left" }}>
              {comment.user}
            </S.CommentAuthor>
            {editingCommentId === comment.id ? (
              <S.CommentEditingWrapper>
                <S.CommentInput
                  onChange={handleEditCommentContent}
                  value={commentEdit}
                  minRows={2}
                  isInvalid={isCommentInvalid}
                />
                <S.CommentActions>
                  <S.Button
                    variant="contained"
                    color="primary"
                    onClick={handleSaveComment}
                    disabled={!user || isCommentInvalid}
                  >
                    Save
                  </S.Button>

                  <Button
                    variant="contained"
                    color="error"
                    onClick={() => {
                      setEditingCommentId(null);
                      setIsCommentInvalid(false);
                    }}
                  >
                    Cancel
                  </Button>
                </S.CommentActions>
              </S.CommentEditingWrapper>
            ) : (
              <p>{comment.content}</p>
            )}
            <S.CommentTimestamp>
              {formatDateTime(comment.timestamp).date}
              {" at "}
              {formatDateTime(comment.timestamp).time}
            </S.CommentTimestamp>
          </Grid>
        </Grid>
      </S.Paper>
    ));
  }, [
    comments,
    user,
    editingCommentId,
    commentEdit,
    isCommentInvalid,
    handleEditComment,
    handleEditCommentContent,
    handleSaveComment,
  ]);

  return (
    <S.CommentSectionWrapper data-testid="comment-section">
      <h2>Comments</h2>
      {isLoadingState ? (
        <Box sx={{ width: "100%", display: "flex", justifyContent: "center" }}>
          <CircularProgress color="secondary" />
        </Box>
      ) : (
        commentCards
      )}
      {editingCommentId === null && (
        <>
          <S.CommentInput
            onChange={handleChange}
            value={comment}
            minRows={5}
            placeholder="Type comment..."
            data-testid="comment-input"
            isInvalid={isCommentInvalid}
          />
          <S.Button
            variant="contained"
            color="primary"
            onClick={handlePostComment}
            data-testid="post-comment-button"
            disabled={!user || isCommentInvalid}
          >
            Post
          </S.Button>
        </>
      )}
      <Modal
        open={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setCommentToDelete(null);
        }}
      >
        <S.ModalContainer>
          <h2>Are you sure you want to delete this comment?</h2>
          <S.CommentActions>
            <Button
              variant="contained"
              color="secondary"
              onClick={() =>
                commentToDelete && handleDeleteComment(commentToDelete)
              }
              data-testid="delete-comment-button"
            >
              Yes
            </Button>
            <Button
              variant="contained"
              color="error"
              onClick={() => {
                setIsModalOpen(false);
                setCommentToDelete(null);
              }}
            >
              No
            </Button>
          </S.CommentActions>
        </S.ModalContainer>
      </Modal>
    </S.CommentSectionWrapper>
  );
};
