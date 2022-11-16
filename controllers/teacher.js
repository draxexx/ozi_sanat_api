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
    return res.json(data);
  } catch (error) {
    next(error);
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
    return res.json(data);
  } catch (error) {
    next(error);
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

    return res.json(data);
  } catch (error) {
    next(error);
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

    return res.json(data);
  } catch (error) {
    next(error);
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

    return res.json(data);
  } catch (error) {
    next(error);
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

    const data = await user.findOne({
      where: {
        id: createdTeacher.id,
      },
    });

    return res.status(201).json(data);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getAllTeachers,
  getSingleTeacher,
  getSingleTeacherCourses,
  getSingleTeacherLessons,
  getSingleTeacherStudents,
  createTeacher,
};
