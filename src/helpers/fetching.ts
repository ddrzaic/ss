import { Category, Comment, Filters, Story } from "@/types/common";
import { conn } from "./db";

export const fetchStories = async (filters: Filters): Promise<Story[]> => {
  let WHERE = "WHERE stories.id IS NOT NULL";

  if (filters.name) {
    WHERE += ` 
    AND (
    stories.title ILIKE '%${filters.name}%' 
    OR stories.content ILIKE '%${filters.name}%'
    OR stories.shortened ILIKE '%${filters.name}%'
    OR users.name ILIKE '%${filters.name}%'
    OR users.surname ILIKE '%${filters.name}%'
    OR CONCAT(users.name, ' ', users.surname) ILIKE '%${filters.name}%'
    OR CONCAT(users.surname, ' ', users.name) ILIKE '%${filters.name}%'
    OR genres.name ILIKE '%${filters.name}%')
    `;
  }

  if (filters.category) {
    WHERE += ` AND stories.genreId = ${filters.category.id}`;
  }

  const storiesQuery = `
  SELECT stories.*, genres.name as genreName, users.name as authorName, users.surname as authorSurname 
  FROM stories 
  LEFT JOIN genres ON genres.id = stories.genreId 
  LEFT JOIN users ON stories.userid = users.id
  ${WHERE}
  ORDER BY stories.published DESC
  LIMIT 15

`;
  const response = await conn.query(storiesQuery);

  let stories: Story[] = [];

  if (response.rows.length > 0) {
    stories = response.rows.map((dbRow) => {
      const row = JSON.parse(JSON.stringify(dbRow));
      return {
        id: row.id,
        title: row.title,
        content: row.content,
        shortened: row.shortened,
        category: {
          id: row.genreid,
          label: row.genrename,
        },
        author: `${row.authorname} ${row.authorsurname}`,
        date: row.published,
        isFavorite: false,
        comments: [],
      };
    });
  }

  return stories;
};

export const fetchFavorites = async (userId: number) => {
  const favoritesQuery = `
    SELECT storyId FROM likes WHERE userId = $1
  `;
  const response = await conn.query(favoritesQuery, [userId]);

  let favorites: number[] = [];

  if (response.rows.length > 0) {
    response.rows.forEach((row) => {
      favorites.push(row.storyid);
    });
  }

  return favorites;
};

export const fetchCategories = async () => {
  const categoriesQuery = `
    SELECT * FROM genres
  `;

  const response = await conn.query(categoriesQuery);

  let categories: Category[] = [];

  if (response.rows.length > 0) {
    categories = response.rows.map((row) => {
      return {
        id: row.id,
        label: row.name,
      };
    });
  }

  return categories;
};

export const addFavorite = async (userId: number, storyId: number) => {
  const addFavoriteQuery = `
    INSERT INTO likes (userId, storyId) VALUES ($1, $2)
  `;

  await conn.query(addFavoriteQuery, [userId, storyId]);
};

export const deleteFavorite = async (userId: number, storyId: number) => {
  const deleteFavoriteQuery = `
    DELETE FROM likes WHERE userId = $1 AND storyId = $2
  `;

  await conn.query(deleteFavoriteQuery, [userId, storyId]);
};

export const fetchComments = async (storyId: number) => {
  const commentsQuery = `
    SELECT comments.* , users.name, users.surname
    FROM comments
    LEFT JOIN users ON comments.userid = users.id
    WHERE comments.storyId = $1
  `;
  const response = await conn.query(commentsQuery, [storyId]);

  let comments: Comment[] = [];

  if (response.rows.length > 0) {
    comments = response.rows.map((row) => {
      const comment = JSON.parse(JSON.stringify(row));
      return {
        id: comment.id,
        timestamp: comment.published,
        content: comment.content,
        user: `${comment.name} ${comment.surname}`,
        userId: comment.userid,
        storyId: comment.storyid,
      };
    });
  }

  return comments;
};

export const fetchStory = async (storyId: number, userId?: number) => {
  const storyQuery = `
    SELECT stories.*, genres.name as genreName, users.name as authorName, users.surname as authorSurname 
    FROM stories 
    LEFT JOIN genres ON genres.id = stories.genreId 
    LEFT JOIN users ON stories.userid = users.id
    WHERE stories.id = $1
  `;

  const storyResponse = await conn.query(storyQuery, [storyId]);

  let favorites: number[] = [];
  if (userId) {
    favorites = await fetchFavorites(userId);
  }

  let story: Story = {} as Story;

  if (storyResponse.rows.length > 0) {
    const row = JSON.parse(JSON.stringify(storyResponse.rows[0]));
    story = {
      id: row.id,
      title: row.title,
      content: row.content,
      shortened: row.shortened,
      category: {
        id: row.genreid,
        label: row.genrename,
      },
      author: `${row.authorname} ${row.authorsurname}`,
      date: row.published,
      isFavorite: favorites.includes(row.id),
      comments: [],
    };
  }

  const comments: Comment[] = await fetchComments(storyId);

  story.comments = comments;

  return story;
};

export const checkToken = async (userId: number, token: string) => {
  const checkTokenQuery = `
    SELECT * FROM usertoken WHERE userId = $1 AND token = $2
  `;

  const response = await conn.query(checkTokenQuery, [userId, token]);

  return response.rows.length > 0;
};

export const addComment = async (
  userId: number,
  storyId: number,
  content: string
) => {
  const timestamp = new Date().toISOString();
  console.log("timestamp", timestamp);

  const addCommentQuery = `
    INSERT INTO comments (userId, storyId, content, published) VALUES ($1, $2, $3, $4)
  `;

  await conn.query(addCommentQuery, [userId, storyId, content, timestamp]);
};

export const deleteComment = async (commentId: number) => {
  const deleteCommentQuery = `
    DELETE FROM comments WHERE id = $1
  `;

  await conn.query(deleteCommentQuery, [commentId]);
};

export const editComment = async (commentId: number, content: string) => {
  const timestamp = new Date().toISOString();

  const editCommentQuery = `
    UPDATE comments SET content = $1, published = $2 WHERE id = $3
  `;

  await conn.query(editCommentQuery, [content, timestamp, commentId]);
};
