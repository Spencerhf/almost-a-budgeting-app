// //importing modules
// const { Sequelize, DataTypes } = require("sequelize");

// const sequelize = new Sequelize({
//   database: process.env.DB,
//   username: process.env.USER,
//   password: process.env.PASSWORD,
//   host: process.env.HOST,
//   port: process.env.PORT,
//   dialect: "postgres"
// });

// // checking if connection is done
// sequelize.authenticate().catch((err) => {
//   console.log(err);
// });

// const db = {};
// db.Sequelize = sequelize;
// db.sequelize = sequelize;

// //connecting to model
// db.money_in = require("./money_in.model")(sequelize, DataTypes);
// db.money_out = require("./money_out.model")(sequelize, DataTypes);

// //exporting the module
// module.exports = db;
