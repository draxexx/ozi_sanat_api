const { branch_course, course, user, teacher_course } = require("../models");

const getAllCourses = async (req, res, next) => {
  try {
    const courses = await course.findAll({
      order: [["title", "ASC"]],
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

const createCourse = async (req, res, next) => {
  try {
    const createdCourse = await course.create({
      title: req.body.title,
      image: req.body.image,
      price: req.body.price,
      registerDate: req.body.registerDate,
    });

    const data = await course.findOne({
      where: {
        id: createdCourse.id,
      },
    });

    return res.status(201).json({
      code: res.statusCode,
      status: "success",
      data: data,
      message: "Kurs kaydı başarıyla gerçekleştirildi.",
    });
  } catch (error) {
    next(error);
    return res.status(404).json({
      code: res.statusCode,
      status: "error",
      message:
        "Kurs kaydederken hata meydana geldi, lütfen daha sonra tekrar deneyiniz.",
    });
  }
};

const getAllCourseTeachers = async (req, res, next) => {
  try {
    const data = await teacher_course.findAll({
      where: {
        branchCourseId: req.params.id,
      },
      include: {
        model: user,
        as: "teacher",
      },
    });

    return res.json({
      code: res.statusCode,
      status: "success",
      message: "Kurs eğitmenleri başarıyla getirildi.",
      data: data,
    });
  } catch (error) {
    next(error);
    return res.status(404).json({
      code: res.statusCode,
      status: "error",
      message:
        "Kurs eğitmenleri getirilirken hata meydana geldi, lütfen daha sonra tekrar deneyiniz.",
    });
  }
};

module.exports = {
  getAllCourses,
  createCourse,
  getAllCourseTeachers,
};
