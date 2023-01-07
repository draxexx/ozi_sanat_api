const {
  branch,
  branch_course,
  homework,
  lesson,
  lesson_student,
  student_payment,
  user,
} = require("../models");

const getAllStudentPayments = async (req, res, next) => {
  try {
    const data = await student_payment.findAll({
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

const createStudentPayment = async (req, res, next) => {
  try {
    const createdStudentPayment = await student_payment.create(req.body);

    const data = await student_payment.findOne({
      where: {
        id: createdStudentPayment.id,
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

const update = async (req, res, next) => {
  try {
    await student_payment.update(
      {
        startDate: req.body.startDate,
        endDate: req.body.endDate,
        paymentDate: req.body.paymentDate,
        price: req.body.price,
        compensationAmount: req.body.compensationAmount,
      },
      {
        where: {
          id: req.params.id,
        },
      }
    );

    const data = await student_payment.findOne({
      where: {
        id: req.params.id,
      },
    });

    return res.status(200).json({
      code: res.statusCode,
      status: "success",
      data: data,
      message: "İşlem başarıyla gerçekleştirildi.",
    });
  } catch (error) {
    next(error);
    return res.status(404).json({
      code: res.statusCode,
      status: "error",
      message:
        "İşlem sırasında hata meydana geldi, lütfen daha sonra tekrar deneyiniz.",
    });
  }
};

const deleteStudentPayment = async (req, res, next) => {
  try {
    const studentPayment = await student_payment.findOne({
      where: {
        id: req.params.id,
      },
    });

    const studentLessons = await lesson_student.findAll({
      where: {
        studentPaymentId: studentPayment.id,
      },
    });

    for (let i = 0; i < studentLessons.length; i++) {
      await lesson_student.destroy({
        where: {
          id: studentLessons[i].id,
        },
      });

      await homework.destroy({
        where: {
          lessonId: studentLessons[i].lessonId,
        },
      });

      await lesson.destroy({
        where: {
          id: studentLessons[i].lessonId,
        },
      });
    }

    const data = await student_payment.destroy({
      where: {
        id: studentPayment.id,
      },
    });

    return res.status(201).json({
      code: res.statusCode,
      status: "success",
      data: data,
      message: "Öğrenci ödemesi başarıyla silindi.",
    });
  } catch (error) {
    next(error);
    return res.status(404).json({
      code: res.statusCode,
      status: "error",
      message:
        "İşlem sırasında hata meydana geldi, lütfen daha sonra tekrar deneyiniz.",
    });
  }
};

const checkLastLessonOfPayment = async (req, res, next) => {
  try {
    const studentPayment = await student_payment.findOne({
      where: {
        id: req.params.id,
      },
    });

    if (req.body.date == studentPayment.endDate) {
      return res.status(200).json({
        code: res.statusCode,
        status: "success",
        data: true,
      });
    } else {
      return res.status(200).json({
        code: res.statusCode,
        status: "success",
        data: false,
      });
    }
  } catch (error) {
    next(error);
    return res.status(404).json({
      code: res.statusCode,
      status: "error",
      message: error,
    });
  }
};

const getAllStudentPaymentsWithStudentInfo = async (req, res, next) => {
  try {
    const data = await student_payment.findAll({
      where: {
        active: true,
      },
      order: [["startDate", "DESC"]],
      include: [
        {
          model: branch_course,
          as: "branchCourse",
          attributes: ["id"],
          include: {
            model: branch,
            as: "branch",
          },
        },
        {
          model: user,
          as: "student",
        },
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

module.exports = {
  getAllStudentPayments,
  createStudentPayment,
  checkLastLessonOfPayment,
  getAllStudentPaymentsWithStudentInfo,
  update,
  deleteStudentPayment,
};
