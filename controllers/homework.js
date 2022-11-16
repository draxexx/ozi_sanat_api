const { homework } = require("../models");

const getAllHomeworks = async (req, res, next) => {
  try {
    const data = await homework.findAll({});

    return res.json(data);
  } catch (error) {
    next(error);
  }
};

const createHomework = async (req, res, next) => {
  try {
    const createdHomework = await homework.create(req.body);

    const data = await homework.findOne({
      where: {
        id: createdHomework.id,
      },
    });

    return res.status(201).json(data);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getAllHomeworks,
  createHomework,
};
