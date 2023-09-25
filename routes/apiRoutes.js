const money = require("../controllers/money.controller");
var router = require("express").Router();

router.post("/add-item", money.createPurchase);

router.get("/activity-list", money.getMonthlyActivity);

router.post("/remove-list/:id", money.removeItem);

// GET TOTAL FOR MONTH
router.get("/monthly-total", money.monthlySum);

module.exports = router;
