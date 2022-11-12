const { lesson, user } = require("../models");

const getAllUsers = async (req, res, next) => {
  try {
    const data = await user.findAll();
    return res.json(data);
  } catch (error) {
    next(error);
  }
};

// managers

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

// branch managers

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

// teachers

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

// students

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

const getSingleStudent = async (req, res, next) => {
  try {
    const data = await user.findOne({
      where: {
        id: req.params.id,
        authority: 4,
      },
    });
    return res.json(data);
  } catch (error) {
    next(error);
  }
};

const getSingleStudentLessons = async (req, res, next) => {
  try {
    const data = await user.findOne({
      where: {
        id: req.params.id,
        authority: 4,
      },
      include: [
        {
          model: lesson,
          as: "lessons",
        },
      ],
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
  getSingleStudent,
  getSingleStudentLessons,
};
