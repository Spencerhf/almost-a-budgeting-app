const { sequelize } = require("../models/index");
const { Sequelize, Op } = require("sequelize");
const Users = sequelize.users;
const bcrypt = require("bcrypt");
const saltRounds = 10;

const getUsers = async () => {
  return Users.findAll();
};

const authenticateSignin = async (signinObj) => {
  const user = await Users.findOne({
    where: {
      email: signinObj.email,
    },
  });
  if (user === null) {
    throw {
      status: 404,
      message: "No user found",
    };
  }

  let isValid = bcrypt.compareSync(signinObj.password, user.password);

  if (isValid) {
    return user;
  } else {
    throw {
      status: 400,
      message: "Password did not match",
    };
  }
};

const createNewUser = async (userObj) => {
  const checkEmail = await Users.findOne({
    where: {
      email: userObj.email,
    },
  });

  if (!checkEmail) {
    const hash = await bcrypt.hash(userObj.password, saltRounds);
    userObj.password = hash;
    return await Users.create(userObj);
  } else {
    throw {
      status: 400,
      message: "That email is already linked to an account",
    };
  }
};

module.exports = {
  getUsers,
  authenticateSignin,
  createNewUser,
};
