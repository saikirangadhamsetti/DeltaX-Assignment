const express = require("express");
const mongoose = require("mongoose");
const routes = require("./routes/route");
const username = encodeURIComponent("saikiran");
const password = encodeURIComponent("saikiran");
let uri = `mongodb+srv://${username}:${password}@cluster0.hyzmo10.mongodb.net/test`;
const app = express();
var cors = require("cors");
app.use(cors());
require("dotenv").config();

const mongoString = process.env.DATABASE_URL;
mongoose.connect(uri);
const database = mongoose.connection;

database.on("error", (error) => {
  console.log(error);
});

database.once("connected", () => {
  console.log("Database Connected");
});

app.listen(3004, () => {
  console.log(`Server Started at ${3004
  }`);
});

app.use("/api", routes);
