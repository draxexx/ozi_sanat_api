const {
  branch_course,
  course,
  lesson,
  user,
  student_payment,
  teacher_course,
} = require("../models");

const { encryptString } = require("../helpers/crypt_string");
const { findUniqueItem } = require("../helpers/find_unique_in_list");
const {
  firstAndLastDayOfTheWeek,
  findTheDateInTheWeek,
} = require("../helpers/date_helpers");

const getAllTeachers = async (req, res, next) => {
  try {
    const data = await user.findAll({
      where: {
        authority: [1, 2, 3],
        active: true,
      },
      order: [
        ["firstName", "ASC"],
        ["lastName", "ASC"],
      ],
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

const getLastTeachers = async (req, res, next) => {
  try {
    const data = await user.findAll({
      where: {
        authority: [1, 2, 3],
        active: true,
      },
      limit: parseInt(req.params.limit),
      order: [
        ["registerDate", "DESC"],
        ["firstName", "ASC"],
        ["lastName", "ASC"],
      ],
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

const getSingleTeacher = async (req, res, next) => {
  try {
    const data = await user.findOne({
      where: {
        id: req.params.id,
        authority: [1, 2, 3],
        active: true,
      },
    });
    return res.json({
      code: res.statusCode,
      status: "success",
      data: data,
      message: "Aranılan eğitmen başarıyla getirildi.",
    });
  } catch (error) {
    next(error);
    return res.status(404).json({
      code: res.statusCode,
      status: "error",
      message:
        "Eğitmen getirirken hata meydana geldi, lütfen daha sonra tekrar deneyiniz.",
    });
  }
};

const getSingleTeacherCourses = async (req, res, next) => {
  try {
    const teacher = await user.findOne({
      where: {
        id: req.params.id,
        authority: [1, 2, 3],
        active: true,
      },
      include: {
        model: branch_course,
        as: "branchCourses",
        through: { as: "teacherCourse", attributes: [] },
        include: [
          {
            model: course,
            as: "course",
          },
        ],
      },
    });

    let data = [];

    teacher.branchCourses.forEach((element) => {
      data.push(element.course);
    });

    return res.json({
      code: res.statusCode,
      status: "success",
      data: data,
      message: "Eğitmen kursları başarıyla getirildi",
    });
  } catch (error) {
    next(error);
    return res.status(404).json({
      code: res.statusCode,
      status: "error",
      message:
        "Eğitmen kurslarını getirirken hata meydana geldi, lütfen daha sonra tekrar deneyiniz.",
    });
  }
};

const getSingleTeacherLessons = async (req, res, next) => {
  try {
    const teacher = await user.findOne({
      where: {
        id: req.params.id,
        authority: [1, 2, 3],
        active: true,
      },
      attributes: [],
      order: [["teacherCourses", "lessons", "date", "ASC"]],
      include: {
        model: teacher_course,
        as: "teacherCourses",
        attributes: ["id"],
        include: {
          model: lesson,
          as: "lessons",
          include: [
            {
              model: teacher_course,
              as: "teacherCourse",
              attributes: ["id"],
              include: {
                model: branch_course,
                as: "branchCourse",
                attributes: ["id"],
                include: {
                  model: course,
                  as: "course",
                },
              },
            },
            {
              model: student_payment,
              as: "studentPayments",
              through: { attributes: [] },

              attributes: ["id"],
              include: {
                model: user,
                as: "student",
              },
            },
          ],
        },
      },
    });

    let unsortedDateList = [];

    teacher.teacherCourses.forEach((element) => {
      element.lessons.forEach((lesson) => {
        let students = [];

        lesson.studentPayments.forEach((studentPayment) => {
          students.push(studentPayment.student);
        });

        unsortedDateList.push({
          id: lesson.id,
          isCompleted: lesson.isCompleted,
          date: lesson.date,
          active: lesson.active,
          course: lesson.teacherCourse.branchCourse.course,
          students: students,
        });
      });
    });

    const data = unsortedDateList.sort(
      (a, b) => Date.parse(new Date(b.date)) - Date.parse(new Date(a.date))
    );

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

const getSingleTeacherStudents = async (req, res, next) => {
  try {
    const teacher = await user.findOne({
      where: {
        id: req.params.id,
        authority: [1, 2, 3],
        active: true,
      },
      attributes: [],
      order: [
        [
          "teacherCourses",
          "lessons",
          "studentPayments",
          "student",
          "firstName",
          "ASC",
        ],
      ],
      include: {
        model: teacher_course,
        as: "teacherCourses",
        attributes: ["id"],
        include: {
          model: lesson,
          as: "lessons",
          where: {
            active: true,
          },
          include: [
            {
              model: teacher_course,
              as: "teacherCourse",
              attributes: ["id"],
              include: {
                model: branch_course,
                as: "branchCourse",
                attributes: ["id"],
                include: {
                  model: course,
                  as: "course",
                },
              },
            },
            {
              model: student_payment,
              as: "studentPayments",
              through: { attributes: [] },
              attributes: ["id"],
              include: {
                model: user,
                as: "student",
                where: {
                  active: true,
                },
              },
            },
          ],
        },
      },
    });

    let students = [];

    teacher.teacherCourses.forEach((element) => {
      element.lessons.forEach((lesson) => {
        lesson.studentPayments.forEach((studentPayment) => {
          students.push(studentPayment.student);
        });
      });
    });

    const data = findUniqueItem(students);

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

const createTeacher = async (req, res, next) => {
  try {
    const createdTeacher = await user.create({
      email: req.body.email,
      password: encryptString(req.body.password),
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      gender: req.body.gender,
      phone: req.body.phone,
      authority: 3,
      birthDate: req.body.birthDate,
      registerDate: req.body.registerDate,
    });

    const data = await user.findOne({
      where: {
        id: createdTeacher.id,
      },
    });

    return res.status(201).json({
      code: res.statusCode,
      status: "success",
      message: "Eğitmen kaydı başarıyla gerçekleştirildi.",
      data: data,
    });
  } catch (error) {
    next(error);
    return res.status(404).json({
      code: res.statusCode,
      status: "error",
      message:
        "Eğitmen kaydederken hata meydana geldi, lütfen daha sonra tekrar deneyiniz.",
    });
  }
};

const updateTeacher = async (req, res, next) => {
  try {
    await user.update(
      {
        email: req.body.email,
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        phone: req.body.phone,
        birthDate: req.body.birthDate,
      },
      {
        where: {
          id: req.params.id,
        },
      }
    );

    const data = await user.findOne({
      where: {
        id: req.params.id,
      },
    });

    return res.status(200).json({
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

const getSingleTeacherLessonsGroupByDay = async (req, res, next) => {
  try {
    const teacher = await user.findOne({
      where: {
        id: req.params.id,
        authority: [1, 2, 3],
        active: true,
      },
      attributes: [],
      order: [["teacherCourses", "lessons", "date", "ASC"]],
      include: {
        model: teacher_course,
        as: "teacherCourses",
        attributes: ["id"],
        include: {
          model: lesson,
          as: "lessons",
          include: [
            {
              model: teacher_course,
              as: "teacherCourse",
              attributes: ["id"],
              include: {
                model: branch_course,
                as: "branchCourse",
                attributes: ["id"],
                include: {
                  model: course,
                  as: "course",
                },
              },
            },
            {
              model: student_payment,
              as: "studentPayments",
              through: { attributes: [] },

              attributes: ["id"],
              include: {
                model: user,
                as: "student",
              },
            },
          ],
        },
      },
    });

    let unsortedDateList = [];

    teacher.teacherCourses.forEach((element) => {
      element.lessons.forEach((lesson) => {
        let students = [];

        lesson.studentPayments.forEach((studentPayment) => {
          students.push(studentPayment.student);
        });

        unsortedDateList.push({
          id: lesson.id,
          isCompleted: lesson.isCompleted,
          date: lesson.date,
          active: lesson.active,
          course: lesson.teacherCourse.branchCourse.course,
          students: students,
        });
      });
    });

    const sortedLessonList = unsortedDateList.sort(
      (a, b) => Date.parse(new Date(b.date)) - Date.parse(new Date(a.date))
    );

    let lessonsInTheWeek = [];

    const firstAndLastDaysOfTheWeek = firstAndLastDayOfTheWeek();

    sortedLessonList.forEach((element) => {
      const isInTheWeek = findTheDateInTheWeek(
        firstAndLastDaysOfTheWeek[0],
        element.date,
        firstAndLastDaysOfTheWeek[1]
      );

      if (isInTheWeek) {
        lessonsInTheWeek.push(element);
      }
    });

    let sunday = [];
    let monday = [];
    let tuesday = [];
    let wednesday = [];
    let thursday = [];
    let friday = [];
    let saturday = [];

    lessonsInTheWeek.forEach((element) => {
      const date = new Date(element.date);
      date.setMinutes(date.getMinutes() - date.getTimezoneOffset());

      if (date.getDay() == 0) {
        sunday.push(element);
      } else if (date.getDay() == 1) {
        monday.push(element);
      } else if (date.getDay() == 2) {
        tuesday.push(element);
      } else if (date.getDay() == 3) {
        wednesday.push(element);
      } else if (date.getDay() == 4) {
        thursday.push(element);
      } else if (date.getDay() == 5) {
        friday.push(element);
      } else if (date.getDay() == 6) {
        saturday.push(element);
      } else {
        console.log("not equal to any days");
      }
    });

    let data = {
      monday: monday.sort(
        (a, b) => Date.parse(new Date(a.date)) - Date.parse(new Date(b.date))
      ),
      tuesday: tuesday.sort(
        (a, b) => Date.parse(new Date(a.date)) - Date.parse(new Date(b.date))
      ),
      wednesday: wednesday.sort(
        (a, b) => Date.parse(new Date(a.date)) - Date.parse(new Date(b.date))
      ),
      thursday: thursday.sort(
        (a, b) => Date.parse(new Date(a.date)) - Date.parse(new Date(b.date))
      ),
      friday: friday.sort(
        (a, b) => Date.parse(new Date(a.date)) - Date.parse(new Date(b.date))
      ),
      saturday: saturday.sort(
        (a, b) => Date.parse(new Date(a.date)) - Date.parse(new Date(b.date))
      ),
      sunday: sunday.sort(
        (a, b) => Date.parse(new Date(a.date)) - Date.parse(new Date(b.date))
      ),
    };

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
  getAllTeachers,
  getLastTeachers,
  getSingleTeacher,
  getSingleTeacherCourses,
  getSingleTeacherLessons,
  getSingleTeacherLessonsGroupByDay,
  getSingleTeacherStudents,
  createTeacher,
  updateTeacher,
};
