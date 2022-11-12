const {
  branch_course,
  course,
  lesson,
  teacher_course,
  user,
} = require("../models");

const getAllLessons = async (req, res, next) => {
  try {
    const data = await lesson.findAll({
      include: [
        {
          model: teacher_course,
          include: [
            {
              model: user,
              as: "teacher",
            },
            {
              model: branch_course,
              as: "branchCourse",
              include: [
                {
                  model: course,
                },
              ],
            },
          ],
        },
        {
          model: user,
          as: "students",
        },
      ],
    });
    return res.json(data);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getAllLessons,
};
