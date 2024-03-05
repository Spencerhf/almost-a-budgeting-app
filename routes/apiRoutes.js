const money = require("../controllers/money.controller");
const user = require("../controllers/users.controller");
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

// USERS
router.route("/users").get(user.getUsers);
router.route("/users/sign-in").put(user.userSignin);
router.route("/users/sign-up").post(user.userSignUp);

module.exports = router;
