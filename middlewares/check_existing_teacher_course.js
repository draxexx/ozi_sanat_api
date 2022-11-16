const { teacher_course } = require("../models");

const checkExistingTeacherCourse = async (req, res, next) => {
  const branchCourseId = req.body.branchCourseId;
  const teacherId = req.body.teacherId;

  const data = await teacher_course.findOne({
    where: {
      branchCourseId: branchCourseId,
      teacherId: teacherId,
    },
  });

  if (data != null) {
    return res.status(403).json({
      code: res.statusCode,
      status: "error",
      message:
        "Eşleştirmek istediğiniz kurs ile eğitmen daha önceden eşleştirilmiştir.",
    });
  }

  next();
};

module.exports = {
  checkExistingTeacherCourse,
};
