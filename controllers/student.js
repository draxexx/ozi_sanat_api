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

const { findUniqueItem } = require("../helpers/find_unique_in_list");

const getAllStudents = async (req, res, next) => {
  try {
    const data = await user.findAll({
      where: {
        authority: 4,
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

const getLastStudents = async (req, res, next) => {
  try {
    const data = await user.findAll({
      where: {
        authority: 4,
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

const getSingleStudent = async (req, res, next) => {
  try {
    const data = await user.findOne({
      where: {
        id: req.params.id,
        authority: 4,
        active: true,
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
        active: true,
      },
      order: [["payments", "lessonStudents", "lesson", "date", "ASC"]],
      attributes: [],
      include: {
        model: student_payment,
        as: "payments",
        attributes: ["id"],
        include: {
          model: lesson_student,
          as: "lessonStudents",
          attributes: ["id", "status"],
          include: {
            model: lesson,
            as: "lesson",
            attributes: ["id", "date"],
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
      },
    });

    const payments = singleUser.payments;

    let data = [];

    payments.forEach((element) => {
      let lessonStudents = element.lessonStudents;

      lessonStudents.forEach((lessonStudent) => {
        data.push({
          id: lessonStudent.lesson.id,
          date: lessonStudent.lesson.date,
          lessonStudent: {
            status: lessonStudent.status,
          },
          course: lessonStudent.lesson.teacherCourse.branchCourse.course,
          teacher: lessonStudent.lesson.teacherCourse.teacher,
        });
      });
    });

    data.sort((a, b) => Date.parse(a.date) - Date.parse(b.date));

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
        active: true,
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
        active: true,
      },
    });

    const studentPayments = await student_payment.findAll({
      where: {
        studentId: student.id,
      },
      order: [["lessons", "date", "ASC"]],
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

    let unsortedData = [];

    studentPayments.forEach((element) => {
      unsortedData.push({
        id: element.id,
        startDate: element.startDate,
        endDate: element.endDate,
        paymentDate: element.paymentDate,
        price: element.price,
        compensationAmount: element.compensationAmount,
        isPaymentCompleted: element.isPaymentCompleted,
        course: element.branchCourse.course,
        lessons: element.lessons,
      });
    });

    const data = unsortedData.sort(
      (a, b) =>
        Date.parse(new Date(b.startDate)) - Date.parse(new Date(a.startDate))
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

const getSingleStudentCoursesByTeacher = async (req, res, next) => {
  try {
    const student = await user.findOne({
      where: {
        id: req.params.id,
        authority: 4,
        active: true,
      },
    });

    const studentPayments = await student_payment.findAll({
      where: {
        studentId: student.id,
      },
      order: [["lessons", "date", "ASC"]],
      include: [
        {
          model: branch_course,
          as: "branchCourse",
          include: [
            {
              model: course,
              as: "course",
            },
            {
              model: user,
              as: "teachers",
              where: {
                id: req.params.teacherId,
              },
            },
          ],
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
      if (element.branchCourse != null) {
        data.push({
          startDate: element.startDate,
          endDate: element.endDate,
          compensationAmount: element.compensationAmount,
          course: element.branchCourse.course,
          lessons: element.lessons,
        });
      }
    });

    return res.json({
      code: res.statusCode,
      status: "success",
      message: "Öğrenci kursları başarıyla getirildi.",
      data: data,
    });
  } catch (error) {
    next(error);
    return res.status(404).json({
      code: res.statusCode,
      status: "error",
      message: "Öğrenci kursları getirilirken hata meydana geldi.",
    });
  }
};

const getSingleStudentNotifications = async (req, res, next) => {
  try {
    const student = await user.findOne({
      where: {
        id: req.params.id,
        authority: 4,
        active: true,
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
      isPaymentCompleted: req.body.studentPayment.isPaymentCompleted,
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

const getNonPayingStudents = async (req, res, next) => {
  try {
    const studentPayments = await student_payment.findAll({
      where: {
        isPaymentCompleted: false,
        active: true,
      },
      attributes: [],
      order: [
        ["student", "firstName", "ASC"],
        ["student", "lastName", "ASC"],
      ],
      include: {
        model: user,
        as: "student",
      },
    });

    let students = [];

    studentPayments.forEach((payment) => {
      students.push(payment.student);
    });

    const data = findUniqueItem(students);

    return res.json({
      code: res.statusCode,
      status: "success",
      message: "Ödemesini yapmayan öğrenciler başarıyla getirildi.",
      data: data,
    });
  } catch (error) {
    next(error);
    return res.status(404).json({
      code: res.statusCode,
      status: "error",
      message:
        "Ödemesini yapmayan öğrenciler getirilirken hata meydana geldi, lütfen daha sonra tekrar deneyiniz.",
    });
  }
};

module.exports = {
  getAllStudents,
  getLastStudents,
  getSingleStudent,
  getSingleStudentLessons,
  getSingleStudentPayments,
  getSingleStudentCourses,
  getSingleStudentNotifications,
  createStudent,
  updateStudent,
  createStudentLessons,
  getSingleStudentCoursesByTeacher,
  getNonPayingStudents,
};
