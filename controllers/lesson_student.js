const { lesson_student } = require("../models");

const getAllLessonStudents = async (req, res, next) => {
  try {
    const data = await lesson_student.findAll({});

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

const createLessonStudent = async (req, res, next) => {
  try {
    const createdLessonStudent = await lesson_student.create(req.body);

    const data = await lesson_student.findOne({
      where: {
        id: createdLessonStudent.id,
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
  getAllLessonStudents,
  createLessonStudent,
};
