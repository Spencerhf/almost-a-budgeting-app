module.exports = (sequelize, Sequelize) => {
  const activity = sequelize.define(
    "activity",
    {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      name: {
        type: Sequelize.STRING,
      },
      amount: {
        type: Sequelize.INTEGER,
      },
      notes: {
        type: Sequelize.STRING,
      },
      userReferenceId: {
        type: Sequelize.INTEGER,
        references: {
          model: 'users',
          key: 'id',
        }
      },
    },
    {
      freezeTableName: true,
      timestamps: true,
    }
  );

  return activity;
};
