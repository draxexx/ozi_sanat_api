const { branch, branch_course, course } = require("../models");

const getAllBranchCourses = async (req, res, next) => {
  try {
    const data = await branch_course.findAll({});

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

const createBranchCourse = async (req, res, next) => {
  try {
    const createdBranchCourse = await branch_course.create({
      branchId: req.body.branchId,
      courseId: req.body.courseId,
    });

    const data = await branch_course.findOne({
      where: {
        id: createdBranchCourse.id,
      },
      include: [
        {
          model: branch,
          as: "branch",
        },
        {
          model: course,
          as: "course",
        },
      ],
    });

    return res.status(201).json({
      code: res.statusCode,
      status: "success",
      data: data,
      message: "Kurs şube ilişkisiğ başarıyla gerçekleştirildi.",
    });
  } catch (error) {
    next(error);
    return res.status(404).json({
      code: res.statusCode,
      status: "error",
      message:
        "Kurs şube ilişkisi gerçekleştirilirken hata meydana geldi, lütfen tekrar deneyiniz.",
    });
  }
};

module.exports = {
  getAllBranchCourses,
  createBranchCourse,
};
