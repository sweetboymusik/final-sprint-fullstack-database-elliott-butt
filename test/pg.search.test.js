const db = require("../services/pg.db");
const { getAllBooks, getByText } = require("../services/pg.search.dal"); // Adjust the path to your module

jest.mock("../services/pg.db", () => ({
  query: jest.fn(),
}));

describe("Database functions", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  test("getAllBooks resolves with books", async () => {
    const mockBooks = [{ id: 1, title: "Book 1" }];
    db.query.mockImplementation((sql, callback) => {
      callback(null, { rows: mockBooks });
    });

    const result = await getAllBooks();
    expect(result).toEqual(mockBooks);
  });

  test("getAllBooks rejects with error", async () => {
    db.query.mockImplementation((sql, callback) => {
      callback(new Error("Query failed"));
    });

    await expect(getAllBooks()).rejects.toThrow("Query failed");
  });

  test("getByText resolves with books based on search text", async () => {
    const mockBooks = [{ id: 1, title: "Search Result 1" }];
    db.query.mockImplementation((sql, values, callback) => {
      callback(null, { rows: mockBooks });
    });

    const result = await getByText("text", "ORDER BY title ASC");
    expect(result).toEqual(mockBooks);
  });

  test("getByText rejects with error", async () => {
    db.query.mockImplementation((sql, values, callback) => {
      callback(new Error("Query failed"));
    });

    await expect(getByText("text", "ORDER BY title ASC")).rejects.toThrow(
      "Query failed"
    );
  });
});
