const { notification } = require("../models");

const getAllNotifications = async (req, res, next) => {
  try {
    const data = await notification.findAll({});

    return res.json(data);
  } catch (error) {
    next(error);
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

    return res.status(201).json(data);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getAllNotifications,
  createNotification,
};
