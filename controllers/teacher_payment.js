const { teacher_payment } = require("../models");

const getAllTeacherPayments = async (req, res, next) => {
  try {
    const data = await teacher_payment.findAll({
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

const createTeacherPayment = async (req, res, next) => {
  try {
    const createdTeacherPayment = await teacher_payment.create(req.body);

    const data = await teacher_payment.findOne({
      where: {
        id: createdTeacherPayment.id,
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
  getAllTeacherPayments,
  createTeacherPayment,
};
