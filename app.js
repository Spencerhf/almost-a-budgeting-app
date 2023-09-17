const express = require("express");
const cors = require("cors");
const path = require("path");
const db = require("./models/index");
const app = express();
require('dotenv').config()

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors(corsOptions));

app.use(express.static(path.join(__dirname, 'build')));

db.sequelize.sync({ alter: true }).then(() => {
  console.log("Drop and re-sync db.");
});

var corsOptions = {
  origin: "https://almost-a-budgeting-app-6b804606f213.herokuapp.com/",
};

const routes = require("./routes/apiRoutes");
app.use("/", routes);

const PORT = process.env.PORT || 5432;
app.listen(PORT, () => {
  console.log("Server Listening on PORT:", PORT);
});
