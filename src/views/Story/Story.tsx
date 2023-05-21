import { CommentSection } from "@/components/CommentSection/CommentSection";
import { Header } from "@/components/Header/Header";
import { StoryDetails } from "@/components/StoryDetails/StoryDetails";
import { Story } from "@/types/common";
import React, { useCallback } from "react";

type StoryProps = {
  story: Story;
};

export const StoryPage = ({ story }: StoryProps) => {
  const {
    id,
    title,
    content,
    category,
    author,
    date,
    isFavorite,
    comments: initialComments,
  } = story;

  const [comments, setComments] = React.useState(initialComments);
  const [isCommentSectionLoading, setIsCommentSectionLoading] =
    React.useState(false);

  const handleCommentSectionUpdate = useCallback(() => {
    // fetch comments
    const asyncFetchComments = async () => {
      setIsCommentSectionLoading(true);
      try {
        const response = await fetch(`/api/comments/${id}`);
        const data = await response.json();
        setComments(data.comments);
      } catch (error) {
        console.log(error);
      }

      setIsCommentSectionLoading(false);
    };
    asyncFetchComments();
  }, [id]);

  return (
    <>
      <Header />
      <StoryDetails
        id={id}
        title={title}
        content={content}
        category={category}
        author={author}
        date={date}
        isFavorite={isFavorite}
      />
      <CommentSection
        comments={comments}
        storyId={id}
        notify={handleCommentSectionUpdate}
        isLoading={isCommentSectionLoading}
      />
    </>
  );
};
