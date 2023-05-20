import React from "react";
import { Header } from "@/components/Header/Header";
import { FiltersBar } from "@/components/FiltersBar/FiltersBar";
import { Filters } from "@/types/common";
import {
  StoryCardProps,
  StoryCardsWrapper,
} from "@/components/StoryCard/StoryCard";
import { filterStoryCards } from "@/helpers/common";

type HomePageProps = {
  storyCards: StoryCardProps[];
};

export const HomePage = ({ storyCards: allStoryCards }: HomePageProps) => {
  const [filters, setFilters] = React.useState<Filters>({} as Filters);
  const [storyCards, setStoryCards] =
    React.useState<StoryCardProps[]>(allStoryCards);

  const filtersChangeHandler = (newFilters: Filters) => {
    setFilters(newFilters);
    const filteredStoryCards = filterStoryCards(allStoryCards, newFilters);
    setStoryCards(filteredStoryCards);
  };

  return (
    <>
      <Header />
      <FiltersBar filters={filters} setFilters={filtersChangeHandler} />
      <StoryCardsWrapper storyCards={storyCards} />
    </>
  );
};
