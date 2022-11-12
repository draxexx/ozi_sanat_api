const { user } = require("../models");

const getAllUsers = async (req, res, next) => {
  try {
    const users = await user.findAll();
    return res.json(users);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getAllUsers,
};
