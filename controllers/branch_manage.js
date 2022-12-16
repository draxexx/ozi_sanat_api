const { branch_manage, branch, branch_course, user } = require("../models");
const { findUniqueItem } = require("../helpers/find_unique_in_list");

const getAllBranchManages = async (req, res, next) => {
  try {
    const data = await branch_manage.findAll({
      where: {
        active: true,
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

const getBranchStudents = async (req, res, next) => {
  try {
    const singleBranchManage = await branch_manage.findOne({
      where: {
        teacherId: req.params.id,
        active: true,
      },
      //   attributes: [],
      order: [
        ["branch", "branchCourses", "students", "firstName", "ASC"],
        ["branch", "branchCourses", "students", "lastName", "ASC"],
      ],
      include: {
        model: branch,
        as: "branch",
        include: {
          model: branch_course,
          as: "branchCourses",
          attributes: ["id"],
          include: {
            model: user,
            as: "students",
            where: {
              active: true,
            },
          },
        },
      },
    });

    let tempStudents = [];

    singleBranchManage.branch.branchCourses.forEach((element) => {
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

const getBranchByTeacher = async (req, res, next) => {
  try {
    const branchManages = await branch_manage.findAll({
      where: {
        teacherId: req.params.teacherId,
      },
      attributes: [],
      include: {
        model: branch,
        as: "branch",
      },
    });

    let data = [];

    branchManages.forEach((item) => {
      data.push(item.branch);
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

module.exports = {
  getAllBranchManages,
  getBranchStudents,
  getBranchByTeacher,
};
