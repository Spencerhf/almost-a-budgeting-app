//importing modules
const { Sequelize, DataTypes } = require("sequelize");

let sequelize;
// if (process.env.NODE_ENV === "production") {
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
// } else {
//   sequelize = new Sequelize(
//     "tracker_db",
//     "spencer",
//     "",
//     {
//       host: "localhost",
//       "dialect": "postgres"
//     }
//   ) 
// }

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
sequelize.money_out = require("./money_out.model")(sequelize, DataTypes);

//exporting the module
module.exports = {
  sequelizeConnection,
  sequelize,
};
