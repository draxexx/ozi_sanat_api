const { branch_course, course, user } = require("../models");

const getAllCourses = async (req, res, next) => {
  try {
    const courses = await course.findAll({
      include: [
        {
          model: branch_course,
          as: "branchCourses",
          attributes: ["id"],
          include: [
            {
              model: user,
              as: "teachers",
              through: { attributes: [] },
            },
            {
              model: user,
              as: "students",
              through: { attributes: [] },
            },
          ],
        },
      ],
    });

    let data = [];

    courses.forEach((course) => {
      let teachers = [];
      let students = [];

      course.branchCourses.forEach((element) => {
        teachers = element.teachers;
        students = element.students;
      });

      data.push({
        id: course.id,
        title: course.title,
        image: course.image,
        price: course.price,
        active: course.active,
        teachers,
        students,
      });
    });

    return res.json(data);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getAllCourses,
};
