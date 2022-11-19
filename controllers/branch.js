const { branch, branch_course, course } = require("../models");

const getAllBranches = async (req, res, next) => {
  try {
    const data = await branch.findAll({});

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

const createBranch = async (req, res, next) => {
  try {
    const createdBranch = await branch.create(req.body);

    const data = await branch.findOne({
      where: {
        id: createdBranch.id,
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

const getAllBranchCourses = async (req, res, next) => {
  try {
    const data = await branch_course.findAll({
      where: {
        branchId: req.params.id,
      },
      include: {
        model: course,
        as: "course",
      },
    });

    return res.json({
      code: res.statusCode,
      status: "success",
      message: "Şube kursları başarıyla getirildi.",
      data: data,
    });
  } catch (error) {
    next(error);
    return res.status(404).json({
      code: res.statusCode,
      status: "error",
      message:
        "Şube kursları getirilirken hata meydana geldi, lütfen daha sonra tekrar deneyiniz.",
    });
  }
};

module.exports = {
  getAllBranches,
  createBranch,
  getAllBranchCourses,
};
