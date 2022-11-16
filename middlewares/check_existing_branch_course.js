const { branch_course } = require("../models");

const checkExistingBranchCourse = async (req, res, next) => {
  const branchId = req.body.branchId;
  const courseId = req.body.courseId;

  const data = await branch_course.findOne({
    where: {
      branchId: branchId,
      courseId: courseId,
    },
  });

  if (data != null) {
    return res.status(403).json({
      message:
        "Eşleştirmek istediğiniz kurs ile şube daha önceden eşleştirilmiştir.",
    });
  }

  next();
};

module.exports = {
  checkExistingBranchCourse,
};
