const jwt = require("jsonwebtoken");
const noVerify = ["/users/sign-in", "/users/sign-up"];
const { sequelize } = require("../models/index");
const Users = sequelize.users;

const verifyUser = (req, res, next) => {
    const reqPath = req.path.toLowerCase();
    if (noVerify.includes(reqPath)) {
        next();
        return;
    }

    // check header for token
    const token = req.headers["x-access-token"];
    if (!token)
        return res.send({
            status: 400,
            message: "Bad request. Please specify token or target",
        });

    // verifies secret and checks exp
    jwt.verify(token, process.env.SECRET_KEY, async function (err, decoded) {
        if (err) {
            return res.send({
                status: 401,
                auth: false,
                message: "Failed to authenticate token.",
            });
        }

        //search for user in db
        let user = (await Users.findByPk(decoded.id)).toJSON();

        req.user = user;
        next();
    });
};

module.exports = verifyUser;
