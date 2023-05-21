import React from "react";
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
import { formatDateTime } from "@/helpers/common";

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

  const handleChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setComment(event.target.value);
  };

  const handlePostComment = async () => {
    try {
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
  };

  const openConfirmationModal = () => {
    setIsModalOpen(true);
  };

  const handleDeleteComment = async (id: number) => {
    try {
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
  };

  const handleEditComment = (id: number) => {
    setEditingCommentId(id);
    const commentToEdit = comments.find((comment) => comment.id === id);
    if (commentToEdit) {
      setCommentEdit(commentToEdit.content);
    }
  };

  const handleSaveComment = async () => {
    try {
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
  };

  const commentCards = comments.map((comment) => (
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
                <DeleteIcon onClick={openConfirmationModal} />
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
                onChange={(e) => setCommentEdit(e.target.value)}
                value={commentEdit}
                minRows={2}
                placeholder="Type comment..."
              />
              <S.CommentActions>
                <S.Button
                  variant="contained"
                  color="primary"
                  onClick={handleSaveComment}
                >
                  Save
                </S.Button>

                <Button
                  variant="contained"
                  color="error"
                  onClick={() => setEditingCommentId(null)}
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
      <Modal open={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <S.ModalContainer>
          <h2>Are you sure you want to delete this comment?</h2>
          <S.CommentActions>
            <Button
              variant="contained"
              color="secondary"
              onClick={() => handleDeleteComment(comment.id)}
            >
              Yes
            </Button>
            <Button
              variant="contained"
              color="error"
              onClick={() => setIsModalOpen(false)}
            >
              No
            </Button>
          </S.CommentActions>
        </S.ModalContainer>
      </Modal>
    </S.Paper>
  ));

  return (
    <S.CommentSectionWrapper>
      <h2>Comments</h2>
      {isLoading ? (
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
          />
          <S.Button
            variant="contained"
            color="primary"
            onClick={handlePostComment}
            disabled={!user}
          >
            Post
          </S.Button>
        </>
      )}
    </S.CommentSectionWrapper>
  );
};
