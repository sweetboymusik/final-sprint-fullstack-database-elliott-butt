// import modules
const events = require("events");
const fs = require("fs");
const path = require("path");
const { format, getYear } = require("date-fns");
const { v4: uuid } = require("uuid");

// create emitter
const emitter = new events.EventEmitter();

// event listeners
emitter.addListener("search", onSearch);

// event-log function
async function onSearch(event, type, status, message) {
  const dateTime = `${format(new Date(), "yyyyMMdd\tHH:mm:ss")}`;
  const year = `${getYear(new Date())}`;
  const logItem = `${dateTime}\t${type}\t${status}\t${message}\t${uuid()}`;

  console.log("here");

  try {
    const currFolder = "../logs/" + getYear(new Date());
    if (!fs.existsSync(path.join(__dirname, "../logs/"))) {
      // if the parent directory logs/ doesn't exist, create it
      await fsPromises.mkdir(path.join(__dirname, "../logs/"));
      if (!fs.existsSync(path.join(__dirname, currFolder))) {
        // create the directory for the year ./logs/yyyy
        await fsPromises.mkdir(path.join(__dirname, currFolder));
      }
    } else {
      if (!fs.existsSync(path.join(__dirname, currFolder))) {
        await fsPromises.mkdir(path.join(__dirname, currFolder));
      }
    }

    const fileName = `${format(new Date(), "yyyyMMdd")}` + `_search_events.log`;

    fs.appendFileSync(
      path.join(__dirname, "..", "logs", event, year, fileName),
      logItem + "\n"
    );
  } catch (error) {
    console.log(error);
  }
}

module.exports = { emitter };
