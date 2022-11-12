const { branch_course, course, user } = require("../models");

const getAllCourses = async (req, res, next) => {
  try {
    const data = await course.findAll({
      include: [
        {
          model: branch_course,
          as: "branchCourses",
          include: [
            {
              model: user,
              as: "teachers",
            },
            {
              model: user,
              as: "students",
            },
          ],
        },
      ],
    });
    return res.json(data);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getAllCourses,
};
