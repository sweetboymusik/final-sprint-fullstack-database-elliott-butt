const dal = require("../services/m.db");
const { getByText } = require("../services/m.search.dal");

jest.mock("../services/m.db");

describe("getByText", () => {
  beforeAll(() => {
    dal.connect.mockResolvedValue();
    dal.db.mockReturnValue({
      collection: jest.fn().mockReturnValue({
        find: jest.fn().mockReturnValue({
          toArray: jest
            .fn()
            .mockResolvedValue([{ title: "Test Book", author: "Test Author" }]),
        }),
      }),
    });
    dal.close.mockResolvedValue();
  });

  test("returns books", async () => {
    const books = await getByText("Test", "title");

    expect(books).toEqual([{ title: "Test Book", author: "Test Author" }]);
  });

  test("handles errors", async () => {
    dal.connect.mockRejectedValue(new Error("Connection error"));

    await expect(getByText("Test", "title")).rejects.toThrow(
      "Connection error"
    );
  });
});
