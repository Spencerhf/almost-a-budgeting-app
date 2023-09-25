//importing modules
const { Sequelize, DataTypes } = require("sequelize");

const sequelize = new Sequelize(
  process.env.DB,
  process.env.USER,
  process.env.PASSWORD,
  {
    host: process.env.HOST,
    dialect: "postgres",
    ...(process.env.NODE_ENV === "production" && {
      dialectOptions: {
        ssl: {
          require: true,
          rejectUnauthorized: false,
        },
      },
    }),
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

// const db = {};
// db.Sequelize = Sequelize;
// db.sequelize = sequelize;

// //connecting to model
sequelize.money_in = require("./money_in.model")(sequelize, DataTypes);
sequelize.money_out = require("./money_out.model")(sequelize, DataTypes);

//exporting the module
module.exports = {
  sequelizeConnection,
  sequelize
};
