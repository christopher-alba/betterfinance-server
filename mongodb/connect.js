const mongoose = require("mongoose");
mongoose.connect(
    "mongodb+srv://admin:admin@cluster0.ikbo5.mongodb.net/myFirstDatabase?retryWrites=true&w=majority",
  { useNewUrlParser: true, useUnifiedTopology: true }
);

const db = mongoose.connection;

db.on("error", console.error.bind(console, "connection error:"));
db.once("open", function () {
  console.log("Connect succesfully to db.");
});

module.exports = {
  db,
};
