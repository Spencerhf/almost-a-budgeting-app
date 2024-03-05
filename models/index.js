//importing modules
const { Sequelize, DataTypes } = require("sequelize");

let sequelize;
sequelize = new Sequelize(
  process.env.DB,
  process.env.USER,
  process.env.PASSWORD,
  {
    host: process.env.HOST,
    dialect: "postgres",
    dialectOptions: {
      ssl: {
        require: true,
        rejectUnauthorized: false,
      },
    },
  }
);

const sequelizeConnection = async () => {
  try {
    sequelize.authenticate().then(() => {
      console.log("Postgres connection has been established successfully.");
    });
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
};

// //connecting to model
sequelize.money_in = require("./money_in.model")(sequelize, DataTypes);
sequelize.users = require("./users.model")(sequelize, DataTypes);

//exporting the module
module.exports = {
  sequelizeConnection,
  sequelize,
};
