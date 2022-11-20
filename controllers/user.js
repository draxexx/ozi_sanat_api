const { user } = require("../models");
const { decryptString, encryptString } = require("../helpers/crypt_string");

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

const getSingleUser = async (req, res, next) => {
  try {
    const data = await user.findOne({
      where: {
        id: req.params.id,
      },
    });

    if (data != null) {
      return res.json({
        code: res.statusCode,
        status: "success",
        data: data,
        message: "Kullanıcı başarıyla getirildi.",
      });
    }

    return res.status(404).json({
      code: res.statusCode,
      status: "error",
      message: "Aranılan kullanıcı bulunamadı.",
    });
  } catch (error) {
    next(error);
    return res.status(404).json({
      code: res.statusCode,
      status: "error",
      message:
        "Kullanıcı getirilirken hata meydana geldi, lütfen daha sonra tekrar deneyiniz",
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

const updatePassword = async (req, res, next) => {
  try {
    const data = await user.findOne({
      where: {
        id: req.params.id,
      },
    });

    console.log(decryptString(data.password));

    if (data != null) {
      const password = decryptString(data.password);

      if (password == req.body.oldPassword) {
        await user.update(
          {
            password: encryptString(req.body.password),
          },
          {
            where: {
              id: req.params.id,
            },
          }
        );

        data.password = encryptString(req.body.password);

        return res.json({
          code: res.statusCode,
          status: "success",
          message: "Parola başarıyla değiştirildi.",
          data: data,
        });
      }

      return res.status(404).json({
        code: res.statusCode,
        status: "error",
        message: "Girilen parola hatalıdır, lütfen tekrar deneyiniz.",
      });
    }

    return res.status(404).json({
      code: res.statusCode,
      status: "error",
      message: "Aranılan kullanıcı bulunamadı.",
    });
  } catch (error) {
    next(error);
    return res.status(404).json({
      code: res.statusCode,
      status: "error",
      message:
        "Parola değiştirirken bir hata meydana geldi, lütfen daha sonra tekrar deneyiniz.",
    });
  }
};

module.exports = {
  getAllUsers,
  login,
  getSingleUser,
  updatePassword,
};
