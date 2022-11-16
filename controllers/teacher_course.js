const { teacher_course } = require("../models");

const getAllTeacherCourses = async (req, res, next) => {
  try {
    const data = await teacher_course.findAll({});

    return res.json(data);
  } catch (error) {
    next(error);
  }
};

const createTeacherCourse = async (req, res, next) => {
  try {
    const createdTeacherCourse = await teacher_course.create(req.body);

    const data = await teacher_course.findOne({
      where: {
        id: createdTeacherCourse.id,
      },
    });

    return res.status(201).json(data);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getAllTeacherCourses,
  createTeacherCourse,
};
