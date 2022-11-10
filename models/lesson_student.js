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
      LessonStudent.belongsTo(models.lesson, {
        foreignKey: "lessonId",
        as: "lesson",
      });
      LessonStudent.belongsTo(models.user, {
        foreignKey: "studentId",
        as: "student",
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
      studentId: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false,
        references: {
          model: "user",
          key: "id",
        },
        onUpdate: "CASCADE",
        onDelete: "RESTRICT",
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
    }
  );
  return LessonStudent;
};
