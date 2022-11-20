const { user } = require("../models");
const { encryptString } = require("../helpers/crypt_string");

const getAllManagers = async (req, res, next) => {
  try {
    const data = await user.findAll({
      where: {
        authority: 1,
      },
      order: [
        ["firstName", "ASC"],
        ["lastName", "ASC"],
      ],
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

const createManager = async (req, res, next) => {
  try {
    const createdManager = await user.create({
      email: req.body.email,
      password: encryptString(req.body.password),
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      gender: req.body.gender,
      phone: req.body.phone,
      authority: req.body.authority,
      image: req.body.image,
      birthDate: req.body.birthDate,
      registerDate: req.body.registerDate,
    });

    const data = await user.findOne({
      where: {
        id: createdManager.id,
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

const updateManager = async (req, res, next) => {
  try {
    await user.update(
      {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        phone: req.body.phone,
        birthDate: req.body.birthDate,
      },
      {
        where: {
          id: req.params.id,
        },
      }
    );

    const data = await user.findOne({
      where: {
        id: req.params.id,
      },
    });

    return res.status(200).json({
      code: res.statusCode,
      status: "success",
      message: "Güncelleme işlemi başarıyla gerçekleştirildi.",
      data: data,
    });
  } catch (error) {
    next(error);
    return res.status(404).json({
      code: res.statusCode,
      status: "error",
      message: "Güncelleme sırasında hata meydana geldi.",
    });
  }
};

module.exports = {
  getAllManagers,
  createManager,
  updateManager,
};
