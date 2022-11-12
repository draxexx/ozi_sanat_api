const { student_payment } = require("../models");

const getStudentPayments = async (req, res, next) => {
  try {
    const data = await student_payment.findAll({
      where: {
        studentId: req.params.studentId,
      },
      attributes: {
        exclude: ["teacherCourseId"],
      },
    });
    return res.json(data);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getStudentPayments,
};
