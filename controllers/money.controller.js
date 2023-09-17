const db = require("../models/index");
const { Sequelize, Op } = require("sequelize");
const MoneyActivity = db.money_in;

const monthlySum = async (req, res) => {
  var date = new Date();
  var firstDay = new Date(date.getFullYear(), date.getMonth(), 1);
  var lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0);

  let sum = await MoneyActivity.findAll({
    where: {
      createdAt: {
        [Op.between]: [firstDay, lastDay],
      },
    },
    attributes: [[Sequelize.fn("sum", Sequelize.col("amount")), "totalAmount"]],
  }).then((data) => {
    return data[0].dataValues.totalAmount;
  });

  res.send(sum);
};

const getMonthlyActivity = async (req, res) => {
  var date = new Date();
  var firstDay = new Date(date.getFullYear(), date.getMonth(), 1);
  var lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0);
  let activityList = await MoneyActivity.findAll({
    where: {
      createdAt: {
        [Op.between]: [firstDay, lastDay],
      },
    },
    order: [["updatedAt", "ASC"]],
  });
  res.send(activityList);
};

const removeItem = async (req, res) => {
  await MoneyActivity.findOne({
    where: {
      id: req.params.id,
    },
  }).then((data) => {
    if (data) {
      MoneyActivity.destroy({
        where: {
          id: req.params.id,
        },
      }).then(() => {
        return res.status(200).send("Deleted");
      });
    } else {
      return res.status(404).send("No line item found with that ID");
    }
  });
};

module.exports = {
  // getAll,
  // createPurchase,
  // createIncome,
  removeItem,
  monthlySum,
  getMonthlyActivity,
};
