module.exports = (sequelize, Sequelize) => {
  const Money_out = sequelize.define("money_out", {
    id: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    name: {
      type: Sequelize.STRING
    },
    amount: {
      type: Sequelize.INTEGER
    },
    notes: {
      type: Sequelize.STRING
    }
  }, {
    freezeTableName: true,
    timestamps: true,
  });

  return Money_out;
};