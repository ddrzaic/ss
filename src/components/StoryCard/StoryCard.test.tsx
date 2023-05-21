import React from "react";
import { render, screen } from "@testing-library/react";
import { StoryCard } from "./StoryCard";

const mockStory = {
  id: 1,
  title: "title",
  content: "content",
  category: "category",
  author: "author",
  date: "2021-01-01T00:00:00.000Z",
  isFavorite: false,
  handleFavoriteClick: jest.fn(),
};

jest.mock("next/router", () => ({
  useRouter() {
    return {
      push: jest.fn(),
    };
  },
}));

describe("StoryCard", () => {
  it("renders correctly", () => {
    render(<StoryCard testId="story-card" {...mockStory} />);
    expect(screen.getByTestId("story-card")).toBeInTheDocument();
    const favoriteButton = screen.getByTestId("favorite-button");
    expect(favoriteButton).toBeInTheDocument();
    favoriteButton.click();
    expect(mockStory.handleFavoriteClick).toHaveBeenCalledTimes(1);
  });
});
