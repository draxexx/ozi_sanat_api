const { user } = require("../models");
const { encryptString } = require("../helpers/crypt_string");

const getAllManagers = async (req, res, next) => {
  try {
    const data = await user.findAll({
      where: {
        authority: 1,
      },
    });
    return res.json(data);
  } catch (error) {
    next(error);
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

    return res.status(201).json(data);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getAllManagers,
  createManager,
};
