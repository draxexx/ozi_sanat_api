const { student_payment } = require("../models");

const getAllStudentPayments = async (req, res, next) => {
  try {
    const data = await student_payment.findAll({});

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

module.exports = {
  getAllStudentPayments,
  createStudentPayment,
};
