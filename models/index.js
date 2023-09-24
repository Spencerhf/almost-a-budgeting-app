//importing modules
const { Sequelize, DataTypes } = require("sequelize");

// const sequelize = new Sequelize(
//   `postgres://postgres:123456@localhost:5432/tracker_db`,
//   { dialect: "postgres" }
// );
// Connection parameters
const sequelize = new Sequelize('tracker_db', 'spencer', '', {
  host: 'localhost',
  dialect: 'postgres'
});

const testDbConnection = async () => {
  try {
    await sequelize.authenticate();
    console.log("Connection has been established successfully.");
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
};

const db = {};
db.Sequelize = Sequelize;
db.sequelize = sequelize;

// //connecting to model
db.money_in = require("./money_in.model")(sequelize, DataTypes);
db.money_out = require("./money_out.model")(sequelize, DataTypes);

//exporting the module
module.exports = db;
