const { branch, expense } = require("../models");

const getAll = async (req, res, next) => {
  try {
    const data = await expense.findAll({
      where: {
        active: true,
      },
      order: [["expenseDate", "DESC"]],
      include: {
        model: branch,
        as: "branch",
      },
    });

    return res.json({
      code: res.statusCode,
      status: "success",
      data: data,
      message: "Giderler başarıyla getirildi.",
    });
  } catch (error) {
    next(error);
    return res.status(404).json({
      code: res.statusCode,
      status: "error",
      message:
        "Giderler getirilirken hata meydana geldi, lütfen daha sonra tekrar deneyiniz.",
    });
  }
};

const create = async (req, res, next) => {
  try {
    const createdExpense = await expense.create({
      title: req.body.title,
      branchId: req.body.branch.id,
      price: req.body.price,
      expenseDate: req.body.expenseDate,
    });

    const data = await expense.findOne({
      where: {
        id: createdExpense.id,
      },
    });

    return res.status(201).json({
      code: res.statusCode,
      status: "success",
      data: data,
      message: "Gider kaydı başarıyla gerçekleştirildi.",
    });
  } catch (error) {
    next(error);
    return res.status(404).json({
      code: res.statusCode,
      status: "error",
      message:
        "Gider kaydederken hata meydana geldi, lütfen daha sonra tekrar deneyiniz.",
    });
  }
};

const deleteExpense = async (req, res, next) => {
  try {
    const data = await expense.findOne({
      where: {
        id: req.params.id,
      },
    });

    await expense.destroy({
      where: {
        id: data.id,
      },
    });

    return res.status(200).json({
      code: res.statusCode,
      status: "success",
      data: data,
      message: "Gider başarıyla silindi.",
    });
  } catch (error) {
    next(error);
    return res.status(404).json({
      code: res.statusCode,
      status: "error",
      message:
        "Gider silerken hata meydana geldi, lütfen daha sonra tekrar deneyiniz.",
    });
  }
};

module.exports = {
  getAll,
  create,
  deleteExpense,
};
