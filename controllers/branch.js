const { branch } = require("../models");

const getAllBranches = async (req, res, next) => {
  try {
    const data = await branch.findAll({});

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

const createBranch = async (req, res, next) => {
  try {
    const createdBranch = await branch.create(req.body);

    const data = await branch.findOne({
      where: {
        id: createdBranch.id,
      },
    });

    return res.status(201).json({
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
  getAllBranches,
  createBranch,
};
