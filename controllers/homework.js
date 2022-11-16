const { homework } = require("../models");

const getAllHomeworks = async (req, res, next) => {
  try {
    const data = await homework.findAll({});

    return res.json({ code: res.statusCode, status: "success", data: data });
  } catch (error) {
    next(error);
    return res.status(404).json({
      code: res.statusCode,
      status: "error",
      message: error,
    });
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

    return res
      .status(201)
      .json({ code: res.statusCode, status: "success", data: data });
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
  getAllHomeworks,
  createHomework,
};
