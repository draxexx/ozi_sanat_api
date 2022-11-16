const { user } = require("../models");

const getAllUsers = async (req, res, next) => {
  try {
    const data = await user.findAll();
    return res.json({
      code: res.statusCode,
      status: "success",
      data: data,
    });
  } catch (error) {
    next(error);
    return res.status(404).json({
      code: res.statusCode,
      status: "error",
      message: error,
    });
  }
};

module.exports = {
  getAllUsers,
};
