import React from "react";
import { Header } from "@/components/Header/Header";
import { FiltersBar } from "@/components/FiltersBar/FiltersBar";
import { Filters } from "@/types/common";
import {
  StoryCardProps,
  StoryCardsWrapper,
} from "@/components/StoryCard/StoryCard";
import axios from "axios";
import { mapStoryToStoryCard } from "@/helpers/common";

type HomePageProps = {
  storyCards: StoryCardProps[];
};

export const HomePage = ({ storyCards: allStoryCards }: HomePageProps) => {
  const [filters, setFilters] = React.useState<Filters>({} as Filters);
  const [storyCards, setStoryCards] =
    React.useState<StoryCardProps[]>(allStoryCards);
  const [isLoading, setIsLoading] = React.useState<boolean>(false);

  const filtersChangeHandler = async (newFilters: Filters) => {
    setIsLoading(true);
    try {
      const response = await axios.get("/api/stories", {
        params: {
          name: newFilters.name,
          category: newFilters.category?.id,
        },
      });

      const stories = response.data.stories;

      let storyCards: StoryCardProps[] = [];

      stories.forEach((story: any) => {
        storyCards.push(mapStoryToStoryCard(story));
      });

      setStoryCards(storyCards);
      setFilters(newFilters);
    } catch (error) {
      console.log(error);
    }

    setIsLoading(false);
  };

  return (
    <>
      <Header />
      <FiltersBar filters={filters} setFilters={filtersChangeHandler} />
      <StoryCardsWrapper storyCards={storyCards} isLoading={isLoading} />
    </>
  );
};
