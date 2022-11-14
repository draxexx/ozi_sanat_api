const {
  branch,
  branch_course,
  course,
  lesson,
  lesson_student,
  user,
  student_payment,
  teacher_course,
} = require("../models");

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
      include: {
        model: lesson,
        as: "lessons",
      },
    });
    return res.json(data);
  } catch (error) {
    next(error);
  }
};

const getSingleStudentPayments = async (req, res, next) => {
  try {
    const student = await user.findOne({
      where: {
        id: req.params.id,
        authority: 4,
      },
    });

    const data = await student_payment.findAll({
      where: {
        studentId: student.id,
      },
    });

    return res.json(data);
  } catch (error) {
    next(error);
  }
};

const getSingleStudentCourses = async (req, res, next) => {
  try {
    const student = await user.findOne({
      where: {
        id: req.params.id,
        authority: 4,
      },
    });

    const studentPayments = await student_payment.findAll({
      where: {
        studentId: student.id,
      },
      include: [
        {
          model: branch_course,
          as: "branchCourse",
          include: {
            model: course,
            as: "course",
          },
        },
        {
          model: lesson,
          as: "lessons",
          through: { as: "lessonStudent", attributes: ["status"] },
        },
      ],
    });

    let data = [];

    studentPayments.forEach((element) => {
      data.push({
        startDate: element.startDate,
        endDate: element.endDate,
        course: element.branchCourse.course,
        lessons: element.lessons,
      });
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
  getSingleTeacher,
  getSingleTeacherCourses,
  getSingleTeacherLessons,
  getAllStudents,
  getSingleStudent,
  getSingleStudentLessons,
  getSingleStudentPayments,
  getSingleStudentCourses,
};
