const { lesson } = require("../models");

const getAllLessons = async (req, res, next) => {
  try {
    const data = await lesson.findAll();
    return res.json(data);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getAllLessons,
};
