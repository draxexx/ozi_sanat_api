const { course } = require("../models");

const getAllCourses = async (req, res, next) => {
  try {
    const data = await course.findAll();
    return res.json(data);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getAllCourses,
};
