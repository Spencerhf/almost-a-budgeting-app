const money = require("../controllers/money.controller");
var router = require("express").Router();

router.post("/add-item", money.createPurchase);
router.post("/item-update/:id", money.updateLineItem);

router.get("/activity-list", money.getMonthlySnapshot);
router.get("/all-activity", money.getAllMonthlyActivity);
router.get("/money-out", money.getMoneyOut);
router.get("/money-in", money.getMoneyIn);

router.post("/remove-list/:id", money.removeItem);

// GET TOTAL FOR MONTH
router.get("/monthly-total", money.monthlySum);

module.exports = router;
