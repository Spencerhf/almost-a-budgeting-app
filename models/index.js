//importing modules
const { Sequelize, DataTypes } = require("sequelize");

const sequelize = new Sequelize(
  `postgres://postgres:123456@localhost:5432/tracker_db`,
  { dialect: "postgres" }
);

//checking if connection is done
sequelize
  .authenticate()
  .catch((err) => {
    console.log(err);
  });

const db = {};
db.Sequelize = Sequelize;
db.sequelize = sequelize;

//connecting to model
db.money_in = require("./money_in.model")(sequelize, DataTypes);
db.money_out = require("./money_out.model")(sequelize, DataTypes);

//exporting the module
module.exports = db;
