const {
  branch_course,
  course,
  lesson,
  user,
  student_payment,
} = require("../models");

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
  getAllStudents,
  getSingleStudent,
  getSingleStudentLessons,
  getSingleStudentPayments,
  getSingleStudentCourses,
};
