const { sequelize } = require("../models/index");
const { Sequelize, Op } = require("sequelize");
const MoneyActivity = sequelize.money_in;

const monthlySum = async (req, res) => {
  var date = new Date();
  var firstDay = new Date(date.getFullYear(), date.getMonth(), 1);
  var lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 1);

  let sum = await MoneyActivity.findAll({
    where: {
      createdAt: {
        [Op.between]: [firstDay, lastDay],
      },
    },
    attributes: [[Sequelize.fn("sum", Sequelize.col("amount")), "totalAmount"]],
  }).then((data) => {
    if (data[0].dataValues.totalAmount === null) {
      return "0";
    } else {
      return data[0].dataValues.totalAmount;
    }
  });

  res.send(sum);
};

const getMonthlySnapshot = async (req, res) => {
  var date = new Date();
  var firstDay = new Date(date.getFullYear(), date.getMonth(), 1);
  var lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 1);

  let activityList = await MoneyActivity.findAll({
    where: {
      createdAt: {
        [Op.between]: [firstDay, lastDay],
      },
    },
    limit: 5,
    order: [["updatedAt", "DESC"]],
  });
  res.send(activityList);
};

const getAllMonthlyActivity = async (req, res) => {
  var date = new Date();
  var firstDay = new Date(date.getFullYear(), date.getMonth(), 1);
  var lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 1);

  let activityList = await MoneyActivity.findAll({
    where: {
      createdAt: {
        [Op.between]: [firstDay, lastDay],
      },
    },
    order: [["updatedAt", "DESC"]],
  });
  res.send(activityList);
}

const getMoneyOut = async (req, res) => {
  var date = new Date();
  var firstDay = new Date(date.getFullYear(), date.getMonth(), 1);
  var lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 1);

  let activityList = await MoneyActivity.findAll({
    where: {
      amount: {
        [Op.lte]: 0,
      },
      createdAt: {
        [Op.between]: [firstDay, lastDay],
      },
    },
    limit: 5,
    order: [["updatedAt", "DESC"]],
  });
  res.send(activityList);
};

const getMoneyIn = async (req, res) => {
  var date = new Date();
  var firstDay = new Date(date.getFullYear(), date.getMonth(), 1);
  var lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 1);

  let activityList = await MoneyActivity.findAll({
    where: {
      amount: {
        [Op.gt]: 0,
      },
      createdAt: {
        [Op.between]: [firstDay, lastDay],
      },
    },
    limit: 5,
    order: [["updatedAt", "DESC"]],
  });
  res.send(activityList);
};

const createPurchase = async (req, res) => {
  try {
    await MoneyActivity.create({
      name: req.body.name,
      amount: req.body.amount,
      notes: req.body.notes,
    });
    res.status(200).send({
      message: "Item added.",
    });
  } catch (err) {
    console.log(err);
    res.status(400).send({
      message: "There was an issue adding this item",
      error: err,
    });
  }
};

const updateLineItem = async (req, res) => {
  try {
    await MoneyActivity.update(
      {
        name: req.body.name,
        amount: req.body.amount,
        notes: req.body.notes,
      },
      {
        where: {
          id: req.params.id
        },
      }
    );
    res.status(200).send({
      message: "Item updated.",
    });
  } catch(err) {
    console.log(err);
    res.status(400).send({
      message: "There was an issue updating this item",
      error: err,
    });
  }
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
  getMoneyOut,
  getMoneyIn,
  createPurchase,
  removeItem,
  monthlySum,
  getMonthlySnapshot,
  getAllMonthlyActivity,
  updateLineItem,
};
