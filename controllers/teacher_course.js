const { teacher_course } = require("../models");

const getAllTeacherCourses = async (req, res, next) => {
  try {
    const data = await teacher_course.findAll({});

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

const createTeacherCourse = async (req, res, next) => {
  try {
    const createdTeacherCourse = await teacher_course.create(req.body);

    const data = await teacher_course.findOne({
      where: {
        id: createdTeacherCourse.id,
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
  getAllTeacherCourses,
  createTeacherCourse,
};
