"use strict";

const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class LessonStudent extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      LessonStudent.belongsTo(models.student_payment, {
        foreignKey: "studentPaymentId",
        as: "studentPayment",
      });
      LessonStudent.belongsTo(models.lesson, {
        foreignKey: "lessonId",
        as: "lesson",
      });
    }
  }
  LessonStudent.init(
    {
      id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
      },
      lessonId: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false,
        references: {
          model: "lesson",
          key: "id",
        },
        onUpdate: "CASCADE",
        onDelete: "RESTRICT",
      },
      studentPaymentId: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false,
        references: {
          model: "student_payment",
          key: "id",
        },
        onUpdate: "CASCADE",
        onDelete: "RESTRICT",
      },
      status: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0,
      },
      active: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: true,
      },
    },
    {
      sequelize,
      modelName: "lesson_student",
      timestamps: false,
      tableName: "lesson_student",
    }
  );
  return LessonStudent;
};
