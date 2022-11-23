const {
  branch_course,
  course,
  lesson,
  user,
  student_payment,
  teacher_course,
  notification,
  lesson_student,
} = require("../models");

const { encryptString } = require("../helpers/crypt_string");

const getAllStudents = async (req, res, next) => {
  try {
    const data = await user.findAll({
      where: {
        authority: 4,
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

const getSingleStudent = async (req, res, next) => {
  try {
    const data = await user.findOne({
      where: {
        id: req.params.id,
        authority: 4,
      },
    });
    return res.json({
      code: res.statusCode,
      status: "success",
      data: data,
      message: "Aranılan öğrenci başarıyla getirildi.",
    });
  } catch (error) {
    next(error);
    return res.status(404).json({
      code: res.statusCode,
      status: "error",
      message:
        "Öğrenci getirirken hata meydana geldi, lütfen daha sonra tekrar deneyiniz.",
    });
  }
};

const getSingleStudentLessons = async (req, res, next) => {
  try {
    const singleUser = await user.findOne({
      where: {
        id: req.params.id,
        authority: 4,
      },
      order: [["payments", "lessons", "date", "ASC"]],
      attributes: [],
      include: {
        model: student_payment,
        as: "payments",
        attributes: ["id"],
        include: {
          model: lesson,
          as: "lessons",
          attributes: ["id", "date"],
          through: { attributes: [] },
          include: {
            model: teacher_course,
            as: "teacherCourse",
            attributes: ["id"],
            include: [
              {
                model: branch_course,
                as: "branchCourse",
                attributes: ["id"],
                include: {
                  model: course,
                  as: "course",
                },
              },
              {
                model: user,
                as: "teacher",
              },
            ],
          },
        },
      },
    });

    const payments = singleUser.payments;

    let data = [];

    payments.forEach((element) => {
      let lessons = element.lessons;

      lessons.forEach((lesson) => {
        data.push({
          id: lesson.id,
          date: lesson.date,
          course: lesson.teacherCourse.branchCourse.course,
          teacher: lesson.teacherCourse.teacher,
        });
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

const getSingleStudentPayments = async (req, res, next) => {
  try {
    const student = await user.findOne({
      where: {
        id: req.params.id,
        authority: 4,
      },
    });

    const data = await student_payment.findAll({
      where: {
        studentId: student.id,
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

const getSingleStudentCourses = async (req, res, next) => {
  try {
    const student = await user.findOne({
      where: {
        id: req.params.id,
        authority: 4,
      },
    });

    const studentPayments = await student_payment.findAll({
      where: {
        studentId: student.id,
      },
      include: [
        {
          model: branch_course,
          as: "branchCourse",
          include: {
            model: course,
            as: "course",
          },
        },
        {
          model: lesson,
          as: "lessons",
          through: { as: "lessonStudent", attributes: ["status"] },
        },
      ],
    });

    let data = [];

    studentPayments.forEach((element) => {
      data.push({
        startDate: element.startDate,
        endDate: element.endDate,
        compensationAmount: element.compensationAmount,
        course: element.branchCourse.course,
        lessons: element.lessons,
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

const getSingleStudentNotifications = async (req, res, next) => {
  try {
    const student = await user.findOne({
      where: {
        id: req.params.id,
        authority: 4,
      },
      attributes: [],
      include: {
        model: notification,
        as: "notifications",
        include: {
          model: user,
          as: "teacher",
          attributes: ["firstName", "lastName"],
        },
      },
    });

    const data = student.notifications;

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

const createStudent = async (req, res, next) => {
  try {
    const createdStudent = await user.create({
      email: req.body.email,
      password: encryptString(req.body.password),
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      gender: req.body.gender,
      phone: req.body.phone,
      authority: 4,
      birthDate: req.body.birthDate,
      registerDate: req.body.registerDate,
    });

    const data = await user.findOne({
      where: {
        id: createdStudent.id,
      },
    });

    return res.status(201).json({
      code: res.statusCode,
      status: "success",
      message: "Öğrenci kaydı başarıyla gerçekleştirildi.",
      data: data,
    });
  } catch (error) {
    next(error);
    return res.status(404).json({
      code: res.statusCode,
      status: "error",
      message:
        "Öğrenci kaydederken hata meydana geldi, lütfen daha sonra tekrar deneyiniz.",
    });
  }
};

const updateStudent = async (req, res, next) => {
  try {
    await user.update(
      {
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
      message: "Güncelleme işlemi başarıyla gerçekleştirildi.",
    });
  } catch (error) {
    next(error);
    return res.status(404).json({
      code: res.statusCode,
      status: "error",
      message: "Güncelleme sırasında hata meydana geldi.",
    });
  }
};

const createStudentLessons = async (req, res, next) => {
  try {
    const createdStudentPayment = await student_payment.create({
      studentId: req.params.id,
      branchCourseId: req.body.studentPayment.branchCourseId,
      startDate: req.body.studentPayment.startDate,
      endDate: req.body.studentPayment.endDate,
      paymentDate: req.body.studentPayment.paymentDate,
      price: req.body.studentPayment.price,
      compensationAmount: 1,
    });

    let createdLessons = [];

    req.body.dates.forEach(async (element) => {
      const createdLesson = await lesson.create({
        teacherCourseId: req.body.teacherCourseId,
        date: element,
      });

      const createdLessonStudent = await lesson_student.create({
        lessonId: createdLesson.id,
        studentPaymentId: createdStudentPayment.id,
      });

      createdLessons.push({
        createdLesson,
        createdLessonStudent,
      });
    });

    const data = {
      createdStudentPayment,
      createdLessons,
    };

    // const data = await user.findOne({
    //   where: {
    //     id: createdStudent.id,
    //   },
    // });

    return res.status(201).json({
      code: res.statusCode,
      status: "success",
      message: "Öğrenci ders kaydı başarıyla gerçekleştirildi.",
      data: data,
    });
  } catch (error) {
    next(error);
    return res.status(404).json({
      code: res.statusCode,
      status: "error",
      message:
        "Öğrenci dersi kaydederken hata meydana geldi, lütfen daha sonra tekrar deneyiniz.",
    });
  }
};

module.exports = {
  getAllStudents,
  getSingleStudent,
  getSingleStudentLessons,
  getSingleStudentPayments,
  getSingleStudentCourses,
  getSingleStudentNotifications,
  createStudent,
  updateStudent,
  createStudentLessons,
};
