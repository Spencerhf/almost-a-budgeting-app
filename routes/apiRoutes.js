const money = require("../controllers/money.controller");
var router = require("express").Router();

router.get("/", (req, res) => {
  res.send("It's actually working");
})

router.get("/activity-list", money.getMonthlyActivity);

router.post("/remove-list/:id", money.removeItem);

// GET TOTAL FOR MONTH
router.get("/monthly-total", money.monthlySum);

module.exports = router;
