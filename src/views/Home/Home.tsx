import React from "react";
import { Header } from "@/components/Header/Header";
import { FiltersBar } from "@/components/FiltersBar/FiltersBar";
import { Filters } from "@/types/common";
import {
  StoryCardProps,
  StoryCardsWrapper,
} from "@/components/StoryCard/StoryCard";
import { filterStoryCards } from "@/helpers/common";

const allStoryCards: StoryCardProps[] = [
  {
    title: "Story 1Story 1Story 1Story 1",
    content:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit.Lorem ipsum dolor sit amet, consectetur adipiscing elit.Lorem ipsum dolor sit amet, consectetur adipiscing elit.Lorem ipsum dolor sit amet, consectetur adipiscing elit.Lorem ipsum dolor sit amet, consectetur adipiscing elit.Lorem ipsum dolor sit amet, consectetur adipiscing elit.Lorem ipsum dolor sit amet, consectetur adipiscing elit.Lorem ipsum dolor sit amet, consectetur adipiscing elit.Lorem ipsum dolor sit amet, consectetur adipiscing elit.Lorem ipsum dolor sit amet, consectetur adipiscing elit.Lorem ipsum dolor sit amet, consectetur adipiscing elit.Lorem ipsum dolor sit amet, consectetur adipiscing elit.Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    category: "Action",
    author: "Author 1",
    date: "2021-10-10",
    isFavorite: false,
  },
  {
    title: "Story 2",
    content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    category: "Category 2",
    author: "Author 2",
    date: "2021-10-10",
    isFavorite: true,
  },
  {
    title: "Story 1",
    content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    category: "Category 1",
    author: "Author 1",
    date: "2021-10-10",
    isFavorite: false,
  },
  {
    title: "Story 2",
    content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    category: "Category 2",
    author: "Author 2",
    date: "2021-10-10",
    isFavorite: true,
  },
  {
    title: "Story 1",
    content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    category: "Category 1",
    author: "Author 1",
    date: "2021-10-10",
    isFavorite: false,
  },
  {
    title: "Story 2",
    content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    category: "Category 2",
    author: "Author 2",
    date: "2021-10-10",
    isFavorite: true,
  },
];

export const HomePage = () => {
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
