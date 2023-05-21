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
  user: string;
  userId: number;
  storyId: number;
};

export type Story = {
  id: number;
  title: string;
  content: string;
  shortened: string;
  category: Category;
  author: string;
  date: string;
  isFavorite: boolean;
  comments: Comment[];
};

export type User = {
  id: number;
  name: string;
  email: string;
  jwt?: string;
};

export type DateTime = {
  date: string;
  time: string;
};
