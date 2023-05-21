import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import { FiltersBar } from "./FiltersBar";
import userEvent from "@testing-library/user-event";
import axios from "axios";

jest.mock("axios");

const props = {
  filters: {},
  setFilters: jest.fn(),
  testId: "filters-bar",
};

describe("FiltersBar", () => {
  it("renders correctly", async () => {
    (axios.get as any).mockResolvedValueOnce({ data: { categories: [] } });
    render(<FiltersBar {...props} />);
    expect(screen.getByTestId("filters-bar")).toBeInTheDocument();
    expect(screen.getByTestId("filters-bar")).toMatchSnapshot();
    const nameInput = screen
      .getByTestId("filters-name-input")
      .querySelector("input");
    expect(nameInput).toBeInTheDocument();

    nameInput?.click();
    userEvent.type(nameInput!, "test");

    await waitFor(() => {
      expect(nameInput).toHaveValue("test");
      expect(props.setFilters).toHaveBeenCalledTimes(1);
    });
  });
});
