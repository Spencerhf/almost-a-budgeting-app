module.exports = (sequelize, Sequelize) => {
  const activity = sequelize.define("activity", {
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

  return activity;
};