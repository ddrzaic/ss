import { fetchStory } from "@/helpers/fetching";
import { Comment, Story } from "@/types/common";
import { StoryPage as StoryPageComponent } from "@/views/Story/Story";
import { GetServerSideProps } from "next";
import React from "react";

type StoryPageProps = {
  story: Story;
};

export const StoryPage = ({ story }: StoryPageProps) => {
  return <StoryPageComponent story={story}></StoryPageComponent>;
};

export const getServerSideProps: GetServerSideProps<StoryPageProps> = async (
  context
) => {
  const id = context.params?.id;

  const story = await fetchStory(parseInt(id as string));
  return {
    props: {
      story,
    },
  };
};

export default StoryPage;
