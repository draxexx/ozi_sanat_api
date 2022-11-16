const { lesson_student } = require("../models");

const getAllLessonStudents = async (req, res, next) => {
  try {
    const data = await lesson_student.findAll({});

    return res.json(data);
  } catch (error) {
    next(error);
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

    return res.status(201).json(data);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getAllLessonStudents,
  createLessonStudent,
};
