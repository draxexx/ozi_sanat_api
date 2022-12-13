const { homework } = require("../models");

const getAllHomeworks = async (req, res, next) => {
  try {
    const data = await homework.findAll({
      where: {
        active: true,
      },
    });

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
    var Client = require("ftp");

    const serverOptions = {
      host: process.env.FTP_HOST,
      port: process.env.FTP_PORT,
      user: process.env.FTP_USERNAME,
      password: process.env.FTP_PASSWORD,
    };

    var c = new Client();

    const buffer = new Buffer.from(req.body.base64, "base64");

    c.on("ready", function () {
      c.put(buffer, "/homeworks/" + req.body.name, function (err) {
        if (err) {
          return res.status(404).json({
            code: res.statusCode,
            status: "error",
            message:
              "Ödev yüklenirken hata meydana geldi, lütfen daha sonra tekrar deneyiniz.",
          });
        }
        c.end();
      });
    });

    c.connect(serverOptions);

    const createdHomework = await homework.create({
      lessonId: req.body.lessonId,
      file: `${process.env.FTP_URL}homeworks/${req.body.name}`,
    });

    const data = await homework.findOne({
      where: {
        id: createdHomework.id,
      },
    });

    return res.status(201).json({
      code: res.statusCode,
      status: "success",
      data: data,
      message: "Ödev başarıyla gönderildi.",
    });
  } catch (error) {
    next(error);
    return res.status(404).json({
      code: res.statusCode,
      status: "error",
      message:
        "Ödev gönderilirken hata meydana geldi, lütfen daha sonra tekrar deneyiniz.",
    });
  }
};

module.exports = {
  getAllHomeworks,
  createHomework,
};
