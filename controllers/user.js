const {
  branch,
  branch_course,
  course,
  lesson,
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
    const data = await user.findOne({
      where: {
        id: req.params.id,
        authority: 3,
      },
      include: {
        model: branch_course,
        as: "branchCourses",
        include: [
          {
            model: course,
            as: "course",
          },
          {
            model: branch,
            as: "branch",
          },
        ],
      },
    });
    return res.json(data);
  } catch (error) {
    next(error);
  }
};

const getSingleTeacherLessons = async (req, res, next) => {
  try {
    const data = await user.findOne({
      where: {
        id: req.params.id,
        authority: 3,
      },
      include: {
        model: teacher_course,
        as: "teacherCourses",
        include: {
          model: lesson,
          as: "lessons",
        },
      },
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
    const data = await user.findOne({
      where: {
        id: req.params.id,
        authority: 4,
      },
      include: {
        model: student_payment,
        as: "payments",
        include: {
          model: branch_course,
          as: "branchCourse",
          include: {
            model: course,
            as: "course",
          },
        },
      },
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
};
