const express = require("express");
const cors = require("cors");
const db = require("./models/index");
const app = express();

app.use(express.static(
  path.join(__dirname,"./client/build")));

app.use(express.json());
app.use(express.urlencoded({ extended: true }))
app.use(cors(corsOptions));

db.sequelize.sync({ alter: true }).then(() => {
  console.log("Drop and re-sync db.");
});

var corsOptions = {
  origin: "http://localhost:8080",
};

const routes = require ("./routes/apiRoutes");
app.use("/", routes);

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log("Server Listening on PORT:", PORT);
});
