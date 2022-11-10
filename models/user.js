"use strict";

const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      User.hasMany(models.TeacherCourse, {
        foreignKey: "teacherId",
        as: "teachers",
      });
      User.belongsToMany(models.BranchCourse, {
        through: models.BranchCourse,
        foreignKey: "teacherId",
        as: "branch_courses",
      });

      User.hasMany(models.LessonStudent, {
        foreignKey: "studentId",
        as: "students",
      });
      User.belongsToMany(models.Lesson, {
        through: models.LessonStudent,
        foreignKey: "studentId",
        as: "lessons",
      });

      User.hasMany(models.StudentPayment, {
        foreignKey: "studentId",
        as: "students",
      });
      User.belongsToMany(models.BranchCourse, {
        through: models.StudentPayment,
        foreignKey: "studentId",
        as: "branch_courses",
      });

      User.hasMany(models.TeacherPayment, {
        foreignKey: "teacherId",
        as: "teachers",
      });

      User.hasMany(models.Notification, {
        foreignKey: "studentId",
        as: "users",
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
        allowNull: false,
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
    }
  );
  return User;
};
