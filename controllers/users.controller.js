const usersService = require("../services/user.services");
const jwt = require("jsonwebtoken");

// Generic grab all users
const getUsers = async (req, res) => {
    const users = await usersService.getUsers();
    return res.json(users);
};

// Sign in with email and password
const userSignin = async (req, res) => {
    if (!req.body.email || !req.body.password) {
        return res.status(400).send({
            status: 400,
            message: "email or password missing",
        });
    }

    let user;
    try {
        user = await usersService.authenticateSignin(req.body);
    } catch (err) {
        return res.status(err.status).send(err);
    }

    const token = jwt.sign({ id: user.id }, process.env.SECRET_KEY);
    return res.json({ user, token });
};

// Create a new user
const userSignUp = async (req, res) => {
    if (!req.body.email || !req.body.password) {
        return res.status(400).send({
            status: 400,
            message: "email or password missing",
        });
    }

    let user;
    try {
        user = await usersService.createNewUser(req.body);
    } catch (err) {
        return res.status(err.status).send(err);
    }

    const token = jwt.sign({ id: user.id }, process.env.SECRET_KEY);
    return res.json({ user, token });
};

module.exports = {
    getUsers,
    userSignin,
    userSignUp,
};
