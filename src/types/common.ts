export type Filters = {
  category?: Category;
  name?: string;
};

export type Category = {
  id: number;
  label: string;
};

export type Comment = {
  id: number;
  timestamp: string;
  content: string;
};

export type Story = {
  id: number;
  title: string;
  content: string;
  category: Category;
  author: string;
  date: string;
  isFavorite: boolean;
  comments: Comment[];
};
