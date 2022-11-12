"use strict";

const { Model } = require("sequelize");
const teacher_course = require("./teacher_course");

module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      User.belongsToMany(models.branch_course, {
        through: models.teacher_course,
        foreignKey: "teacherId",
      });

      User.belongsToMany(models.lesson, {
        through: models.lesson_student,
        foreignKey: "studentId",
        as: "lessons",
      });

      User.belongsToMany(models.teacher_course, {
        through: models.student_payment,
        foreignKey: "studentId",
        as: "teacherCourses",
      });
    }
  }
  User.init(
    {
      id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      firstName: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      lastName: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      gender: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 1,
      },
      phone: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      authority: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      image: {
        type: DataTypes.STRING,
        allowNull: true,
        defaultValue: "",
      },
      notificationId: {
        type: DataTypes.STRING,
        allowNull: true,
        unique: true,
      },
      active: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: true,
      },
    },
    {
      sequelize,
      modelName: "user",
      timestamps: false,
      tableName: "user",
    }
  );
  return User;
};
