const { teacher_payment } = require("../models");

const getAllTeacherPayments = async (req, res, next) => {
  try {
    const data = await teacher_payment.findAll({});

    return res.json(data);
  } catch (error) {
    next(error);
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

    return res.status(201).json(data);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getAllTeacherPayments,
  createTeacherPayment,
};
