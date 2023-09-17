const money = require("../controllers/money.controller");
var router = require("express").Router();

router.get("/activity-list", money.getMonthlyActivity);

router.post("/remove-list/:id", money.removeItem);

// GET TOTAL FOR MONTH
router.get("/monthly-total", money.monthlySum);

// Retrieve all Tutorials
// router.get("/all", money.getAll);

// // Create new purchase
// router.post("/new-purchase", money.createPurchase);

// // Create new income
// router.post("/new-income", money.createIncome);

module.exports = router;
