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
      User.hasMany(models.teacher_course, {
        foreignKey: "teacherId",
        as: "teacher_courses",
      });
      User.belongsToMany(models.branch_course, {
        through: models.teacher_course,
        foreignKey: "teacherId",
        as: "branch_courses",
      });

      User.hasMany(models.lesson_student, {
        foreignKey: "studentId",
        as: "lesson_students",
      });
      User.belongsToMany(models.lesson, {
        through: models.lesson_student,
        foreignKey: "studentId",
        as: "lessons",
      });

      User.hasMany(models.student_payment, {
        foreignKey: "studentId",
        as: "payment_students",
      });
      User.belongsToMany(models.branch_course, {
        through: models.student_payment,
        foreignKey: "studentId",
        as: "payment_branch_courses",
      });

      User.hasMany(models.teacher_payment, {
        foreignKey: "teacherId",
        as: "payment_teachers",
      });

      User.hasMany(models.notification, {
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
