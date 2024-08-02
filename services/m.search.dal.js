const dal = require("./m.db");
const fs = require("fs");

async function getByText(text, sort) {
  try {
    await dal.connect();

    const db = dal.db("bookstore");
    const view = db.collection("booksDetails");

    const books = await view
      .find({
        $or: [
          { title: { $regex: text, $options: "i" } },
          { author: { $regex: text, $options: "i" } },
          { genre: { $regex: text, $options: "i" } },
          { publisher: { $regex: text, $options: "i" } },
        ],
      })
      .toArray();

    return books;
  } catch (err) {
    throw err;
  } finally {
    dal.close();
  }
}

module.exports = {
  getByText,
};
