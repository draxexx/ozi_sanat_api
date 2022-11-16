const { notification } = require("../models");

const getAllNotifications = async (req, res, next) => {
  try {
    const data = await notification.findAll({});

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

const createNotification = async (req, res, next) => {
  try {
    const createdNotification = await notification.create(req.body);

    const data = await notification.findOne({
      where: {
        id: createdNotification.id,
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
  getAllNotifications,
  createNotification,
};
