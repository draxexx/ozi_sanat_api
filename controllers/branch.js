const { branch, branch_course, course, user } = require("../models");
const { findUniqueItem } = require("../helpers/find_unique_in_list");

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

const getBranchStudents = async (req, res, next) => {
  try {
    const singleBranch = await branch.findOne({
      where: {
        id: req.params.id,
      },
      attributes: [],
      order: [
        ["branchCourses", "students", "firstName", "ASC"],
        ["branchCourses", "students", "lastName", "ASC"],
      ],
      include: {
        model: branch_course,
        as: "branchCourses",
        attributes: ["id"],
        include: {
          model: user,
          as: "students",
        },
      },
    });

    let tempStudents = [];

    singleBranch.branchCourses.forEach((element) => {
      element.students.forEach((student) => {
        tempStudents.push(student);
      });
    });

    const data = findUniqueItem(tempStudents);

    return res.json({
      code: res.statusCode,
      status: "success",
      message: "Şube öğrencileri başarıyla getirildi.",
      data: data,
    });
  } catch (error) {
    next(error);
    return res.status(404).json({
      code: res.statusCode,
      status: "error",
      message:
        "Şube öğrencileri getirilirken hata meydana geldi, lütfen daha sonra tekrar deneyiniz.",
    });
  }
};

module.exports = {
  getAllBranches,
  createBranch,
  getAllBranchCourses,
  getBranchStudents,
};
