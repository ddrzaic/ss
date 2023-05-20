import { StoryCardProps } from "@/components/StoryCard/StoryCard";
import { Filters } from "@/types/common";

export const filterStoryCards = (
  storyCards: StoryCardProps[],
  filters: Filters
) => {
  let filteredStoryCards = [...storyCards];

  if (filters.category) {
    filteredStoryCards = filteredStoryCards.filter(
      (storyCard) => storyCard.category === filters.category?.label
    );
  }

  if (filters.name) {
    const filterString = filters.name.toLowerCase() as string;
    filteredStoryCards = filteredStoryCards.filter(
      (storyCard) =>
        storyCard.title.toLowerCase().includes(filterString) ||
        storyCard.content.toLowerCase().includes(filterString) ||
        storyCard.author.toLowerCase().includes(filterString) ||
        storyCard.category.toLowerCase().includes(filterString) ||
        storyCard.date.toLowerCase().includes(filterString)
    );
  }

  return filteredStoryCards;
};
