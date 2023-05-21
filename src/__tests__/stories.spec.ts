import { createMocks } from "node-mocks-http";
import handler from "../pages/api/stories/index";
import { conn } from "../helpers/db";

const mockDBResponse = {
  rows: [
    {
      id: 1,
      title: "Story 1",
      content: "Content 1",
      shortened: "Shortened 1",
      genreid: 1,
      genrename: "Genre 1",
      authorname: "Author 1",
      authorsurname: "Surname 1",
      published: "2021-01-01",
    },
    {
      id: 2,
      title: "Story 2",
      content: "Content 2",
      shortened: "Shortened 2",
      genreid: 2,
      genrename: "Genre 2",
      authorname: "Author 2",
      authorsurname: "Surname 2",
      published: "2021-01-02",
    },
  ],
};

describe("/api/stories", () => {
  beforeEach(() => {
    jest.spyOn(conn, "query").mockImplementation(async (query, params) => {
      return mockDBResponse;
    });
  });
  test("returns stories", async () => {
    const { req, res } = createMocks({
      method: "GET",
    });

    await handler(req, res);

    expect(res._getStatusCode()).toBe(200);

    const data = JSON.parse(res._getData());

    expect(data.stories).toHaveLength(2);
    expect(data.stories[0].id).toBe(1);
    expect(data.stories[0].title).toBe("Story 1");
    expect(data.stories[0].content).toBe("Content 1");
    expect(data.stories[0].shortened).toBe("Shortened 1");
    expect(data.stories[0].category.id).toBe(1);
    expect(data.stories[0].category.label).toBe("Genre 1");
    expect(data.stories[0].author).toBe("Author 1 Surname 1");
    expect(data.stories[0].date).toBe("2021-01-01");
    expect(data.stories[0].isFavorite).toBe(false);
    expect(data.stories[0].comments).toHaveLength(0);
  });
});
