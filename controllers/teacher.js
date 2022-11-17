const {
  branch_course,
  course,
  lesson,
  user,
  student_payment,
  teacher_course,
} = require("../models");

const { encryptString } = require("../helpers/crypt_string");
const { findUniqueItem } = require("../helpers/find_unique_in_list");

const getAllTeachers = async (req, res, next) => {
  try {
    const data = await user.findAll({
      where: {
        authority: 3,
      },
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

const getSingleTeacher = async (req, res, next) => {
  try {
    const data = await user.findOne({
      where: {
        id: req.params.id,
        authority: 3,
      },
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

const getSingleTeacherCourses = async (req, res, next) => {
  try {
    const teacher = await user.findOne({
      where: {
        id: req.params.id,
        authority: 3,
      },
      include: {
        model: branch_course,
        as: "branchCourses",
        through: { as: "teacherCourse", attributes: [] },
        include: [
          {
            model: course,
            as: "course",
          },
        ],
      },
    });

    let data = [];

    teacher.branchCourses.forEach((element) => {
      data.push(element.course);
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

const getSingleTeacherLessons = async (req, res, next) => {
  try {
    const teacher = await user.findOne({
      where: {
        id: req.params.id,
        authority: 3,
      },
      attributes: [],
      include: {
        model: teacher_course,
        as: "teacherCourses",
        attributes: ["id"],
        include: {
          model: lesson,
          as: "lessons",
          include: [
            {
              model: teacher_course,
              as: "teacherCourse",
              attributes: ["id"],
              include: {
                model: branch_course,
                as: "branchCourse",
                attributes: ["id"],
                include: {
                  model: course,
                  as: "course",
                },
              },
            },
            {
              model: student_payment,
              as: "studentPayments",
              through: { attributes: [] },

              attributes: ["id"],
              include: {
                model: user,
                as: "student",
              },
            },
          ],
        },
      },
    });

    let data = [];

    teacher.teacherCourses.forEach((element) => {
      element.lessons.forEach((lesson) => {
        let students = [];

        lesson.studentPayments.forEach((studentPayment) => {
          students.push(studentPayment.student);
        });

        data.push({
          id: lesson.id,
          isCompleted: lesson.isCompleted,
          date: lesson.date,
          active: lesson.active,
          course: lesson.teacherCourse.branchCourse.course,
          students: students,
        });
      });
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

const getSingleTeacherStudents = async (req, res, next) => {
  try {
    const teacher = await user.findOne({
      where: {
        id: req.params.id,
        authority: 3,
      },
      attributes: [],
      include: {
        model: teacher_course,
        as: "teacherCourses",
        attributes: ["id"],
        include: {
          model: lesson,
          as: "lessons",
          include: [
            {
              model: teacher_course,
              as: "teacherCourse",
              attributes: ["id"],
              include: {
                model: branch_course,
                as: "branchCourse",
                attributes: ["id"],
                include: {
                  model: course,
                  as: "course",
                },
              },
            },
            {
              model: student_payment,
              as: "studentPayments",
              through: { attributes: [] },

              attributes: ["id"],
              include: {
                model: user,
                as: "student",
              },
            },
          ],
        },
      },
    });

    let students = [];

    teacher.teacherCourses.forEach((element) => {
      element.lessons.forEach((lesson) => {
        lesson.studentPayments.forEach((studentPayment) => {
          students.push(studentPayment.student);
        });
      });
    });

    const data = findUniqueItem(students);

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

const createTeacher = async (req, res, next) => {
  try {
    const createdTeacher = await user.create({
      email: req.body.email,
      password: encryptString(req.body.password),
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      gender: req.body.gender,
      phone: req.body.phone,
      authority: req.body.authority,
      image: req.body.image,
      birthDate: req.body.birthDate,
      registerDate: req.body.registerDate,
    });

    await teacher_course.create({
      branchCourseId: req.body.branchCourseId,
      teacherId: createdTeacher.id,
    });

    const data = await user.findOne({
      where: {
        id: createdTeacher.id,
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

const updateTeacher = async (req, res, next) => {
  try {
    await user.update(
      {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        phone: req.body.phone,
        birthDate: req.body.birthDate,
      },
      {
        where: {
          id: req.params.id,
        },
      }
    );

    const data = await user.findOne({
      where: {
        id: req.params.id,
      },
    });

    return res.status(200).json({
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
  getAllTeachers,
  getSingleTeacher,
  getSingleTeacherCourses,
  getSingleTeacherLessons,
  getSingleTeacherStudents,
  createTeacher,
  updateTeacher,
};
