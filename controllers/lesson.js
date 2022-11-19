const {
  branch_course,
  course,
  lesson,
  lesson_student,
  teacher_course,
  user,
  student_payment,
  homework,
} = require("../models");

const getAllLessons = async (req, res, next) => {
  try {
    const data = await lesson.findAll({
      include: [
        {
          model: teacher_course,
          as: "teacherCourse",
          include: [
            {
              model: user,
              as: "teacher",
            },
            {
              model: branch_course,
              as: "branchCourse",
              include: [
                {
                  model: course,
                  as: "course",
                },
              ],
            },
          ],
        },
        // {
        //   model: user,
        //   as: "students",
        // },
      ],
    });
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

const getSingleLesson = async (req, res, next) => {
  try {
    const singleLesson = await lesson.findOne({
      where: {
        id: req.params.id,
      },
      include: [
        {
          model: teacher_course,
          as: "teacherCourse",
          attributes: ["id"],
          include: [
            {
              model: user,
              as: "teacher",
              attributes: ["firstName", "lastName"],
            },
            {
              model: branch_course,
              as: "branchCourse",
              attributes: ["id"],
              include: {
                model: course,
                as: "course",
              },
            },
          ],
        },
        {
          model: lesson_student,
          as: "lessonStudents",
          attributes: ["id", "status"],
          include: [
            {
              model: student_payment,
              as: "studentPayment",
              attributes: ["id"],
              include: [
                {
                  model: user,
                  as: "student",
                },
              ],
            },
          ],
        },
        {
          model: homework,
          as: "homeworks",
        },
      ],
    });

    let lessonStudents = [];

    singleLesson.lessonStudents.forEach((element) => {
      lessonStudents.push({
        id: element.id,
        status: element.status,
        student: element.studentPayment.student,
      });
    });

    const data = {
      id: singleLesson.id,
      isCompleted: singleLesson.isCompleted,
      date: singleLesson.date,
      active: singleLesson.active,
      teacher: singleLesson.teacherCourse.teacher,
      course: singleLesson.teacherCourse.branchCourse.course,
      lessonStudents,
      homeworks: singleLesson.homeworks,
    };

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

const createLesson = async (req, res, next) => {
  try {
    const createdLesson = await lesson.create(req.body);

    const data = await lesson.findOne({
      where: {
        id: createdLesson.id,
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
  getAllLessons,
  getSingleLesson,
  createLesson,
};
