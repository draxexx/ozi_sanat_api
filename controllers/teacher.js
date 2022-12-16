const {
  branch_course,
  course,
  lesson,
  lesson_student,
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
        authority: [1, 2, 3],
        active: true,
      },
      order: [
        ["firstName", "ASC"],
        ["lastName", "ASC"],
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

const getLastTeachers = async (req, res, next) => {
  try {
    const data = await user.findAll({
      where: {
        authority: [1, 2, 3],
        active: true,
      },
      limit: parseInt(req.params.limit),
      order: [
        ["registerDate", "DESC"],
        ["firstName", "ASC"],
        ["lastName", "ASC"],
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

const getSingleTeacher = async (req, res, next) => {
  try {
    const data = await user.findOne({
      where: {
        id: req.params.id,
        authority: [1, 2, 3],
        active: true,
      },
    });
    return res.json({
      code: res.statusCode,
      status: "success",
      data: data,
      message: "Aranılan eğitmen başarıyla getirildi.",
    });
  } catch (error) {
    next(error);
    return res.status(404).json({
      code: res.statusCode,
      status: "error",
      message:
        "Eğitmen getirirken hata meydana geldi, lütfen daha sonra tekrar deneyiniz.",
    });
  }
};

const getSingleTeacherCourses = async (req, res, next) => {
  try {
    const teacher = await user.findOne({
      where: {
        id: req.params.id,
        authority: [1, 2, 3],
        active: true,
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
      message: "Eğitmen kursları başarıyla getirildi",
    });
  } catch (error) {
    next(error);
    return res.status(404).json({
      code: res.statusCode,
      status: "error",
      message:
        "Eğitmen kurslarını getirirken hata meydana geldi, lütfen daha sonra tekrar deneyiniz.",
    });
  }
};

const getSingleTeacherLessons = async (req, res, next) => {
  try {
    const teacher = await user.findOne({
      where: {
        id: req.params.id,
        authority: [1, 2, 3],
        active: true,
      },
      attributes: [],
      order: [["teacherCourses", "lessons", "date", "ASC"]],
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
        authority: [1, 2, 3],
        active: true,
      },
      attributes: [],
      order: [
        [
          "teacherCourses",
          "lessons",
          "studentPayments",
          "student",
          "firstName",
          "ASC",
        ],
      ],
      include: {
        model: teacher_course,
        as: "teacherCourses",
        attributes: ["id"],
        include: {
          model: lesson,
          as: "lessons",
          where: {
            active: true,
          },
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
                where: {
                  active: true,
                },
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
      authority: 3,
      birthDate: req.body.birthDate,
      registerDate: req.body.registerDate,
    });

    const data = await user.findOne({
      where: {
        id: createdTeacher.id,
      },
    });

    return res.status(201).json({
      code: res.statusCode,
      status: "success",
      message: "Eğitmen kaydı başarıyla gerçekleştirildi.",
      data: data,
    });
  } catch (error) {
    next(error);
    return res.status(404).json({
      code: res.statusCode,
      status: "error",
      message:
        "Eğitmen kaydederken hata meydana geldi, lütfen daha sonra tekrar deneyiniz.",
    });
  }
};

const updateTeacher = async (req, res, next) => {
  try {
    await user.update(
      {
        email: req.body.email,
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
  getLastTeachers,
  getSingleTeacher,
  getSingleTeacherCourses,
  getSingleTeacherLessons,
  getSingleTeacherStudents,
  createTeacher,
  updateTeacher,
};
