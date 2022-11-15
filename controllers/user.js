const { user } = require("../models");

const getAllUsers = async (req, res, next) => {
  try {
    const data = await user.findAll();
    return res.json(data);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getAllUsers,
};
