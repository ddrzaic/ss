import { StoryCardProps } from "@/components/StoryCard/StoryCard";
import { Filters, Story } from "@/types/common";

export const mapStoryToStoryCard = (story: Story): StoryCardProps => {
  return {
    id: story.id,
    title: story.title,
    content: story.shortened,
    category: story.category.label,
    author: story.author,
    date: story.date,
    isFavorite: story.isFavorite,
  };
};
