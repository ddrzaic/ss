import React from "react";
import * as S from "./FiltersBar.styled";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import { Category, Filters } from "@/types/common";

type FiltersBarProps = {
  filters: Filters;
  setFilters: (filters: Filters) => void;
};

const categories: Category[] = [
  { label: "All", id: 1 },
  { label: "Action", id: 2 },
  { label: "Adventure", id: 3 },
  { label: "Comedy", id: 4 },
  { label: "Crime", id: 5 },
  { label: "Drama", id: 6 },
  { label: "Fantasy", id: 7 },
  { label: "Historical", id: 8 },
  { label: "Horror", id: 9 },
  { label: "Mystery", id: 10 },
  { label: "Romance", id: 11 },
  { label: "Science Fiction", id: 12 },
  { label: "Thriller", id: 13 },
  { label: "Western", id: 14 },
];

export const FiltersBar: React.FC<FiltersBarProps> = ({
  filters,
  setFilters,
}) => {
  const [category, setCategory] = React.useState<Category>(
    filters.category as Category
  );
  const [name, setName] = React.useState(filters.name);
  const timeoutRef = React.useRef<NodeJS.Timeout>();

  const handleCategoryChange = (
    event: React.SyntheticEvent<Element, Event>,
    value: Category | null
  ) => {
    setCategory(value as Category);
    setFilters({ ...filters, category: value as Category });
  };

  const handleNameChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ): void => {
    setName(event.target.value);

    // set filters after 350ms
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    timeoutRef.current = setTimeout(() => {
      setFilters({ ...filters, name: event.target.value });
    }, 350);
  };

  return (
    <S.FiltersBarWrapper>
      <Autocomplete
        disablePortal
        id="combo-box-demo"
        options={categories}
        sx={{ width: 300 }}
        renderInput={(params) => (
          <TextField {...params} label="Category" onChange={handleNameChange} />
        )}
        onChange={handleCategoryChange}
        value={category}
      />
      <S.TextFieldWrapper>
        <TextField
          id="name"
          label="Search"
          variant="standard"
          size="medium"
          fullWidth
          onChange={handleNameChange}
          value={name}
        />
      </S.TextFieldWrapper>
    </S.FiltersBarWrapper>
  );
};
