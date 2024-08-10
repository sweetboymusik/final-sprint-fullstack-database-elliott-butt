// import libraries
const express = require("express");
const methodOverride = require("method-override");
const session = require("express-session");

// import passport configuration
const { passport } = require("./services/passport");

// import .env file
if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}

// set up port number
const PORT = 3000;

// configure express
const app = express();

app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
  })
);

// configure passport
app.use(passport.initialize());
app.use(passport.session());

// set up routes
app.use("/public", express.static("public"));

const search = require("./routes/search");
app.use("/search", search);

const results = require("./routes/results");
app.use("/results", results);

const auth = require("./routes/auth");
app.use("/auth", auth);

// base route
app.get("/", (req, res) => {
  res.redirect("/search");
});

// start the server
app.listen(PORT, () => {
  console.log(`Search engine app is running on port ${PORT}...`);
});
