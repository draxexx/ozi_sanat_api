const { user } = require("../models");

const getAllUsers = async (req, res, next) => {
  try {
    const data = await user.findAll();
    return res.json(data);
  } catch (error) {
    next(error);
  }
};

const getAllManagers = async (req, res, next) => {
  try {
    const data = await user.findAll({
      where: {
        authority: 1,
      },
    });
    return res.json(data);
  } catch (error) {
    next(error);
  }
};

const getAllBranchManagers = async (req, res, next) => {
  try {
    const data = await user.findAll({
      where: {
        authority: 2,
      },
    });
    return res.json(data);
  } catch (error) {
    next(error);
  }
};

const getAllTeachers = async (req, res, next) => {
  try {
    const data = await user.findAll({
      where: {
        authority: 3,
      },
    });
    return res.json(data);
  } catch (error) {
    next(error);
  }
};

const getAllStudents = async (req, res, next) => {
  try {
    const data = await user.findAll({
      where: {
        authority: 4,
      },
    });
    return res.json(data);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getAllUsers,
  getAllManagers,
  getAllBranchManagers,
  getAllTeachers,
  getAllStudents,
};
