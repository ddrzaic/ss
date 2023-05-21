import React, { useEffect } from "react";
import * as S from "./FiltersBar.styled";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import { Category, Filters } from "@/types/common";
import axios from "axios";
import { validateName } from "@/helpers/common";

type FiltersBarProps = {
  filters: Filters;
  setFilters: (filters: Filters) => void;
  testId?: string;
};

export const FiltersBar: React.FC<FiltersBarProps> = ({
  filters,
  setFilters,
  testId,
}) => {
  const [categories, setCategories] = React.useState<Category[]>([]);
  const [category, setCategory] = React.useState<Category>(
    filters.category as Category
  );
  const [name, setName] = React.useState(filters.name);
  const [isNameInvalid, setIsNameInvalid] = React.useState<boolean>(false);

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
    setIsNameInvalid(false);
    const name = event.target.value;
    const isNameValid = validateName(name);
    setName(name);
    if (!isNameValid) {
      setIsNameInvalid(true);
      return;
    }

    // set filters after 350ms
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    timeoutRef.current = setTimeout(() => {
      setFilters({ ...filters, name: event.target.value });
    }, 350);
  };

  useEffect(() => {
    const asyncFetchCategories = async () => {
      const response = await axios.get("/api/categories");
      const categories = response.data.categories;
      setCategories(categories);
    };

    asyncFetchCategories();
  }, []);

  return (
    <S.FiltersBarWrapper data-testid={testId}>
      <Autocomplete
        disablePortal
        id="category-select"
        options={categories}
        sx={{ width: 300 }}
        renderInput={(params) => <TextField {...params} label="Category" />}
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
          error={isNameInvalid}
          data-testid="filters-name-input"
        />
      </S.TextFieldWrapper>
    </S.FiltersBarWrapper>
  );
};
