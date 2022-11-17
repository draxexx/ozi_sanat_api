const { user } = require("../models");
const { decryptString } = require("../helpers/crypt_string");

const getAllUsers = async (req, res, next) => {
  try {
    const data = await user.findAll();
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

const login = async (req, res, next) => {
  try {
    const data = await user.findOne({
      where: {
        email: req.body.email,
      },
    });

    if (data == null) {
      return res.status(404).json({
        code: res.statusCode,
        status: "error",
        message: "Bilgiler hatalı, lütfen tekrar deneyiniz.",
      });
    }

    if (decryptString(data.password) == req.body.password) {
      return res.json({
        code: res.statusCode,
        status: "success",
        message: "Giriş başarılı",
        data: data,
      });
    } else {
      return res.status(404).json({
        code: res.statusCode,
        status: "error",
        message: "Bilgiler hatalı, lütfen tekrar deneyiniz.",
      });
    }
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
  getAllUsers,
  login,
};
