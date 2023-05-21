import { CommentSection } from "@/components/CommentSection/CommentSection";
import { Header } from "@/components/Header/Header";
import { StoryDetails } from "@/components/StoryDetails/StoryDetails";
import { Story } from "@/types/common";
import React from "react";

type StoryProps = {
  story: Story;
};

export const StoryPage = ({ story }: StoryProps) => {
  const { id, title, content, category, author, date, isFavorite, comments } =
    story;
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
      <CommentSection comments={comments} storyId={id} />
    </>
  );
};
