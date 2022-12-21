const {
  branch,
  branch_course,
  course,
  user,
  teacher_course,
} = require("../models");

const getAllCourses = async (req, res, next) => {
  try {
    const courses = await course.findAll({
      where: {
        active: true,
      },
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

const getSingleCourse = async (req, res, next) => {
  try {
    const data = await course.findOne({
      where: {
        id: req.params.id,
        active: true,
      },
      include: {
        model: branch,
        as: "branches",
      },
    });

    return res.json({
      code: res.statusCode,
      status: "success",
      data: data,
      message: "Kurs başarıyla getirildi.",
    });
  } catch (error) {
    next(error);
    return res.status(404).json({
      code: res.statusCode,
      status: "error",
      message:
        "Kurs getirilirken hata meydana geldi, lütfen daha sonra tekrar deneyiniz.",
    });
  }
};

const createCourse = async (req, res, next) => {
  try {
    var Client = require("ftp");

    const serverOptions = {
      host: process.env.FTP_HOST,
      port: process.env.FTP_PORT,
      user: process.env.FTP_USERNAME,
      password: process.env.FTP_PASSWORD,
    };

    var c = new Client();

    const buffer = new Buffer.from(req.body.base64, "base64");

    c.on("ready", function () {
      c.put(buffer, "/course-images/" + req.body.image, function (err) {
        if (err) {
          return res.status(404).json({
            code: res.statusCode,
            status: "error",
            message:
              "Görsel yüklerken hata meydana geldi, lütfen daha sonra tekrar deneyiniz.",
          });
        }
        c.end();
      });
    });

    c.connect(serverOptions);

    const createdCourse = await course.create({
      title: req.body.title,
      image: `${process.env.FTP_URL}course-images/${req.body.image}`,
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

const updateCourse = async (req, res, next) => {
  try {
    if (req.body.base64 == null) {
      await course.update(
        {
          title: req.body.title,
          price: req.body.price,
        },
        {
          where: {
            id: req.params.id,
          },
        }
      );
    } else {
      var Client = require("ftp");

      const serverOptions = {
        host: process.env.FTP_HOST,
        port: process.env.FTP_PORT,
        user: process.env.FTP_USERNAME,
        password: process.env.FTP_PASSWORD,
      };

      var c = new Client();

      const buffer = new Buffer.from(req.body.base64, "base64");

      const getCourse = await course.findOne({
        where: {
          id: req.params.id,
        },
      });

      if (getCourse.image != "") {
        var splittedImageUrl = getCourse.image.split("/");
        if (splittedImageUrl.length > 0) {
          c.on("ready", function () {
            c.delete(
              "/course-images/" + splittedImageUrl[splittedImageUrl.length - 1],
              function (err) {
                if (err) {
                  console.log(err);
                }
                c.end();
              }
            );
          });
        }
      }

      c.on("ready", function () {
        c.put(buffer, "/course-images/" + req.body.image, function (err) {
          if (err) {
            return res.status(404).json({
              code: res.statusCode,
              status: "error",
              message:
                "Görsel yüklerken hata meydana geldi, lütfen daha sonra tekrar deneyiniz.",
            });
          }
          c.end();
        });
      });

      c.connect(serverOptions);

      await course.update(
        {
          title: req.body.title,
          image: `${process.env.FTP_URL}course-images/${req.body.image}`,
          price: req.body.price,
        },
        {
          where: {
            id: req.params.id,
          },
        }
      );
    }

    const data = await course.findOne({
      where: {
        id: req.params.id,
      },
    });

    return res.status(200).json({
      code: res.statusCode,
      status: "success",
      data: data,
      message: "Kurs başarıyla güncellendi.",
    });
  } catch (error) {
    next(error);
    return res.status(404).json({
      code: res.statusCode,
      status: "error",
      message:
        "Kurs güncellerken hata meydana geldi, lütfen daha sonra tekrar deneyiniz.",
    });
  }
};

const getAllCourseTeachers = async (req, res, next) => {
  try {
    const data = await teacher_course.findAll({
      where: {
        branchCourseId: req.params.id,
        active: true,
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
  updateCourse,
  getAllCourseTeachers,
  getSingleCourse,
};
