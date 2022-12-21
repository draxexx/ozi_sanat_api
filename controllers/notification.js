const Op = require("Sequelize").Op;
const { notification, user } = require("../models");

const getAllNotifications = async (req, res, next) => {
  try {
    const data = await notification.findAll({
      where: {
        active: true,
      },
    });

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
    let receiverIds = req.body.receiverIds;

    let data = [];

    for (let i = 0; i < receiverIds.length; i++) {
      const createdNotification = await notification.create({
        receiverId: receiverIds[i],
        senderId: req.body.senderId,
        message: req.body.message,
        date: req.body.date,
      });

      data.push(createdNotification);
    }

    return res.status(201).json({
      code: res.statusCode,
      status: "success",
      data: data,
      message: "Bildirim başarıyla kaydedildi",
    });
  } catch (error) {
    next(error);
    return res.status(404).json({
      code: res.statusCode,
      status: "error",
      message:
        "Bildirim kaydederken hata meydana geldi, lütfen daha sonra tekrar deneyiniz.",
    });
  }
};

const getUserNotifications = async (req, res, next) => {
  try {
    const data = await notification.findAll({
      where: {
        [Op.or]: [
          {
            receiverId: {
              [Op.eq]: req.params.id,
            },
          },
          {
            senderId: {
              [Op.eq]: req.params.id,
            },
          },
        ],
        active: true,
      },
      order: [["date", "DESC"]],
      include: {
        model: user,
        as: "sender",
      },
    });

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

module.exports = {
  getAllNotifications,
  createNotification,
  getUserNotifications,
};
