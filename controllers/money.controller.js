const { sequelize } = require("../models/index");
const { Sequelize, Op } = require("sequelize");
const MoneyActivity = sequelize.money_in;

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
    if (data[0].dataValues.totalAmount === null) {
      return '0';
    } else {
      return data[0].dataValues.totalAmount;
    }
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

const createPurchase = async (req, res) => {
  try {
    await MoneyActivity.create({
      name: req.body.name,
      amount: req.body.amount,
      notes: req.body.notes
    });
    res.status(200).send({
      message: "Item added.",
    })
  } catch(err) {
    console.log(err);
    res.status(400).send({
      message: "There was an issue adding this item",
      error: err
    });
  }
}

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
  // createIncome,
  createPurchase,
  removeItem,
  monthlySum,
  getMonthlyActivity,
};
