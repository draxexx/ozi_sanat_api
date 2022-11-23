const { lesson_student, student_payment } = require("../models");

const getAllLessonStudents = async (req, res, next) => {
  try {
    const data = await lesson_student.findAll({});

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

const createLessonStudent = async (req, res, next) => {
  try {
    const createdLessonStudent = await lesson_student.create(req.body);

    const data = await lesson_student.findOne({
      where: {
        id: createdLessonStudent.id,
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

const updateStudentStatus = async (req, res, next) => {
  try {
    await lesson_student.update(
      {
        status: req.body.status,
      },
      {
        where: {
          id: req.params.id,
        },
      }
    );

    const data = await lesson_student.findOne({
      where: {
        id: req.params.id,
      },
    });

    if (req.body.status == 1) {
      await student_payment.update(
        {
          compensationAmount: req.body.compensationAmount - 1,
        },
        {
          where: {
            id: req.body.studentPaymentId,
          },
        }
      );
    }

    return res.json({
      code: res.statusCode,
      status: "success",
      data: data,
      message: "Öğrenci devamsızlık bilgisi başarıyla güncellendi",
    });
  } catch (error) {
    next(error);
    return res.status(404).json({
      code: res.statusCode,
      status: "error",
      message:
        "Öğrenci devamsızlık bilgisi değiştirilirken hata meydana geldi, lütfen daha sonra tekrar deneyiniz",
    });
  }
};

module.exports = {
  getAllLessonStudents,
  createLessonStudent,
  updateStudentStatus,
};
