const dal = require("./m.db");
const fs = require("fs");

async function getByText(text, sort) {
  try {
    // connect to database
    await dal.connect();

    // select database and collection (or view, in this case)
    const db = dal.db("bookstore");
    const view = db.collection("booksDetails");

    // search for keyword
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
    // close the databse connection
    dal.close();
  }
}

// export functions
module.exports = {
  getByText,
};
