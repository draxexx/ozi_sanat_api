const { branch, branch_course, student_payment, user } = require("../models");

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
};
